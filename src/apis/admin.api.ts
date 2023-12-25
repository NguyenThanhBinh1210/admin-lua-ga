/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'

// Product
export const deleteProduct = (id: unknown) => http.delete(`/product/delete/${id}`)
export const addProduct = (product?: any) => http.post(`/product/create/`, product)
export const getProduct = (id: unknown) => http.get(`/product/get-details/${id}`)
export const updateProduct = (id: unknown, params: any) => http.put(`/product/update/${id}`, params)

export const createRecharge = (body: any) => http.post(`/v1/wallet/add`, body)
export const getRecharges = (params: any) => http.get(`/v1/wallet/all-history`, { params })
export const getAllInOne = () => http.get(`/v1/wallet/all-inf`)
