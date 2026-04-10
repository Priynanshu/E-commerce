import api from "./api.service"

const createReviewService = async (id, reviewData) => {
    try {
        const response = await api.post(`/review/create/${id}`, reviewData)
        return response.data
    }catch (err) {
        throw err
    }
}

const getReviewService = async (id) => {
    try {
        const response = await api.get(`/review/product/${id}`)
        return response.data
    }catch (err) {
        throw err
    }
}

const reviewService = {
    createReviewService,
    getReviewService
}

export default reviewService