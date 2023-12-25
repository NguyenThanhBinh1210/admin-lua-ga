import http from '~/utils/http'

export const getAllChat = (params: any) => http.get('/v1/message/get-all-message', { params })
export const createMessage = (body: any) => http.post('/v1/message/create', body)
export const getMessages = (params: { sender: string }) => http.get('/v1/message/get-message-admin', { params })
