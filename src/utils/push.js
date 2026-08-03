// Single source of truth for Web Push subscription.
//
// Two things here are easy to get wrong and were previously wrong in three
// different places:
//   1. The VAPID key must be a Uint8Array, decoded from base64url (not base64).
//   2. The p256dh/auth keys must be base64url too. subscription.toJSON() already
//      encodes them correctly — hand-rolling it with btoa() produces standard
//      base64, which is a different alphabet.

export const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || "";

export const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
  return output;
};

export const isPushSupported = () =>
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  "Notification" in window;

const keyMatches = (existing, expected) => {
  if (!existing) return false;
  const a = new Uint8Array(existing);
  return a.length === expected.length && a.every((b, i) => b === expected[i]);
};

/**
 * What this device already has, without prompting for anything.
 *
 * The browser — not Redux — is the durable record of a push subscription: it
 * survives reloads, new tabs and restarts. Returns the subscription in the
 * backend's shape, or null if this device has never opted in (or has since
 * revoked permission).
 */
export const getExistingPushSubscription = async () => {
  if (!isPushSupported() || !VAPID_PUBLIC_KEY) return null;
  if (Notification.permission !== "granted") return null;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return null;

    // Left over from a different VAPID key pair — unusable, ignore it.
    if (
      !keyMatches(
        subscription.options?.applicationServerKey,
        urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      )
    ) {
      return null;
    }

    const { endpoint, keys } = subscription.toJSON();
    return { endpoint, keys };
  } catch {
    return null;
  }
};

/**
 * Ask for permission and return a push subscription in the exact shape the
 * backend's POST /reminders/subscribe expects: { endpoint, keys: { p256dh, auth } }.
 * Throws an Error with a user-presentable message on failure.
 */
export const getPushSubscription = async () => {
  if (!isPushSupported()) {
    throw new Error(
      window.matchMedia?.("(display-mode: browser)")?.matches &&
      /iPad|iPhone|iPod/.test(navigator.userAgent)
        ? "On iPhone and iPad, add MealMaster to your Home Screen first — Safari only allows notifications for installed apps."
        : "Push notifications are not supported in this browser."
    );
  }

  if (!VAPID_PUBLIC_KEY) {
    throw new Error("Push is not configured — VITE_VAPID_PUBLIC_KEY is missing.");
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error(
      permission === "denied"
        ? "Notifications are blocked. Enable them for this site in your browser settings."
        : "Notification permission was dismissed."
    );
  }

  const registration = await navigator.serviceWorker.ready;
  const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

  let subscription = await registration.pushManager.getSubscription();

  // A subscription created with a different VAPID key is unusable — replace it.
  if (subscription && !keyMatches(subscription.options?.applicationServerKey, applicationServerKey)) {
    await subscription.unsubscribe();
    subscription = null;
  }

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
  }

  // toJSON() gives correctly base64url-encoded keys
  const { endpoint, keys } = subscription.toJSON();
  return { endpoint, keys };
};
