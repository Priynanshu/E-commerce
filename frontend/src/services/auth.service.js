import api from './api.service';

const registerService = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const loginService = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const logoutService = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getMeService = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        throw error;
    }
}

const authService = {
    loginService,
    registerService,
    logoutService,
    getMeService,
}

export default authService