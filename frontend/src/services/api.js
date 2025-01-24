const API_BASE_URL_USER = "http://localhost:5001"; // User Service
const API_BASE_URL_FEEDBACK = "http://localhost:5002"; // Feedback Service

export const registerUser = async (data) => {
    const response = await fetch(`${API_BASE_URL_USER}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const submitFeedback = async (data) => {
    const response = await fetch(`${API_BASE_URL_FEEDBACK}/feedback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const getFeedbackByUser = async (userId) => {
    const response = await fetch(`${API_BASE_URL_FEEDBACK}/feedback?user_id=${userId}`);
    return response.json();
};