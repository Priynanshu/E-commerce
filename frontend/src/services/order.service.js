import api from "./api.service";

const createOrderService = async (orderData) => {
    try {
        const response = await api.post('/orders/create', orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const fetchUserOrdersService = async () => {
    try {
        const response = await api.get('/orders/my-orders');
        return response.data;
    } catch (error) {
        throw error;
    }
}

const fetchOrderByIdService = async (id) => {
    try {
        const response = await api.get(`/orders/my-order/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const fetchOrderHistoryService = async () => {
    try {
        const response = await api.get('/orders/order-history');
        return response.data;
    } catch (error) {
        throw error;
    }
}

const cancelOrderService = async (id) => {
    try {
        const response = await api.patch(`/orders/cancel/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const fetchAllOrdersService = async () => {
    try {
        const response = await api.get('/orders/all');
        return response.data;
    } catch (error) {
        throw error;
    }
}

const updateOrderStatusService = async ({orderId, status}) => {
    try {
        const response = await api.put(`/orders/update-status/${orderId}`, { status });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const orderService = {
    createOrderService,
    fetchUserOrdersService,
    fetchOrderByIdService,
    fetchOrderHistoryService,
    cancelOrderService,
    fetchAllOrdersService,
    updateOrderStatusService
}

export default orderService;