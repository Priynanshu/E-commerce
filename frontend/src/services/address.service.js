
const addAddressService = async (addressData) => {
    try {
        const response = await api.post("/address/add", addressData)
        return response.data
    } catch (err) {
        throw err
    }
}

const fetchAddressService = async () => {
    try {
        const response = await api.get("/address/get")
        return response.data
    }catch(err) {
        throw err
    }
}

const updateAddressService = async ({id, addressData}) => {
    try {
        const response = await api.get(`/address/${id}`, {addressData})
        return response.data
    }catch(err) {
        throw err
    }
}

const deleteAddressService = async (id) => {
    try {
        const response = await api.get(`/address/${id}`)
        return response.data
    }catch(err) {
        throw err
    }
}

const addressService = {
    addAddressService,
    fetchAddressService,
    updateAddressService,
    deleteAddressService
}

export default addressService