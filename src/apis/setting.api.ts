/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'

// Product
export const getCountDown = () => http.get(`/v1/config-transition/get-countdown`)
export const updateCountDown = (body: any) => http.patch(`/v1/config-transition/setting-countdown`, body)
export const getTiso = () => http.get(`/v1/config-transition/get`)
export const updateTiso = (body: any) => http.patch(`/v1/config-transition/update`, body)
