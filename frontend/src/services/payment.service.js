import api from "./api.service";

const createPaymentService = async (paymentData) => {
    const response = await api.post("/payment/create", paymentData);
    return response.data;
};

const processPaymentService = async (paymentId, simulateSuccess = true) => {
    const response = await api.post(`/payment/process/${paymentId}`, { simulateSuccess });
    return response.data;
};

const getPaymentByOrderIdService = async (orderId) => {
    const response = await api.get(`/payment/order/${orderId}`);
    return response.data;
};

const paymentService = {
    createPaymentService,
    processPaymentService,
    getPaymentByOrderIdService
};

export default paymentService;
