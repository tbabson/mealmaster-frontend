import customFetch from "../utils/customFetch";
import { getPushSubscription } from "../utils/push";

// Validate form data
export const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.meal) {
        newErrors.meal = "Meal is required";
    }

    if (!formData.reminderTime) {
        newErrors.reminderTime = "Reminder time is required";
    }

    if (!formData.notificationMethod) {
        newErrors.notificationMethod = "Notification method is required";
    }

    return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors,
    };
};

// Create reminder API call
export const createReminder = async (reminderData) => {
    try {
        const response = await customFetch.post(
            "/api/reminders",
            {
                ...reminderData,
                reminderTime: new Date(reminderData.reminderTime).toISOString(),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Reminder creation error:", error);
        throw error;
    }
};

// Re-exported for backwards compatibility — the implementation now lives in
// utils/push.js so subscription logic exists in exactly one place.
export { urlBase64ToUint8Array } from "../utils/push";

// Request notification permission and register this device with the backend.
// Returns true on success; the thrown reason is logged for diagnostics.
export const requestNotificationPermission = async () => {
    try {
        const subscription = await getPushSubscription();
        await customFetch.post("/reminders/subscribe", subscription);
        return true;
    } catch (error) {
        console.error("Notification subscription error:", error);
        return false;
    }
};
