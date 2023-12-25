import http from '~/utils/http'

// Product
export const deleteProduct = (id: unknown) => http.delete(`/product/delete/${id}`)
export const addProduct = (product?: any) => http.post(`/product/create/`, product)
export const getProduct = (id: unknown) => http.get(`/product/get-details/${id}`)
export const updateProduct = (id: unknown, params: any) => http.put(`/product/update/${id}`, params)

export const blockFrize = (body: any) => http.patch(`/v1/wallet/block-frize`, body)
export const openFrize = (body: any) => http.patch(`/v1/wallet/open-frize`, body)

export const getAllInOne = () => http.get(`/v1/wallet/all-inf`)
