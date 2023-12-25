/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'
import upload from '~/utils/upload'

export const getPayment = () => http.get('v1/payment-admin')
export const searchPayment = (name: string) => http.get(`/v1/payment/search?bankName=${name}`)
export const deletePayment = (id: string) => http.delete(`v1/payment-admin/delete?id=${id}`)
export const updatePayment = (id: string, body: any) =>
  upload.patch(`v1/payment-admin/setting-pay-admin?id=${id}`, body)
export const createPayment = (body: any) => upload.post('v1/payment-admin/create', body)

export const AllHistory = (params: any) => http.get('/v1/wallet/all-history', { params })
export const UpdateHistory = (id: any) => http.patch(`/v1/wallet/update-history?id=${id}`)
