import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { subscribeToPushNotifications } from "../Features/Reminder/reminderSlice";
import { getPushSubscription, isPushSupported } from "../utils/push";

const PushNotificationButton = () => {
  const dispatch = useDispatch();
  const [isBusy, setIsBusy] = useState(false);

  if (!isPushSupported()) return null;

  const handleEnablePushNotifications = async () => {
    setIsBusy(true);
    try {
      const subscription = await getPushSubscription();
      await dispatch(subscribeToPushNotifications(subscription)).unwrap();
      toast.success("Push notifications enabled");
    } catch (error) {
      toast.error(error?.message || "Failed to enable push notifications");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <button onClick={handleEnablePushNotifications} type="button" disabled={isBusy}>
      {isBusy ? "Enabling…" : "Enable Push Notifications"}
    </button>
  );
};

export default PushNotificationButton;
