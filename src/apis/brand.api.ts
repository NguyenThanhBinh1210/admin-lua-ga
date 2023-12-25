import http from '~/utils/http'

export const getAllBrand = (params?: unknown) => http.get('/v1/brand/get-brand', { params })
export const createBrand = (body: any) => http.post('v1/brand/create', body)
export const updateBrand = (id: string, body: any) => http.patch(`v1/brand/update/${id}`, body)
export const searchBrand = (name: string) => http.get(`/v1/brand/search?nameBrand=${name}`)
export const deleteBrand = (body: string[]) =>
  http.delete(`/v1/brand/delete`, {
    data: {
      id: body
    }
  })
