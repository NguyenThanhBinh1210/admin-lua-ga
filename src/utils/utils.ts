/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, HttpStatusCode } from 'axios'
import jwt_decode from 'jwt-decode'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error: unknown) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function getShortString(inputStr: string) {
  let shortStr = inputStr.slice(0, 30)
  if (shortStr.length < inputStr.length) {
    shortStr += '...'
  }
  return shortStr
}
export const generateRandomOrderCode = (length: any) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}
export function objectToFormData(obj: any) {
  const formData = new FormData()

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any) => {
        formData.append(key, item)
      })
    } else {
      formData.append(key, obj[key])
    }
  }

  return formData
}

export const isJsonString = (data: any) => {
  try {
    JSON.parse(data)
  } catch (error) {
    return false
  }
  return true
}
export const handleDecoded = () => {
  let storageData = localStorage.getItem('access_token')
  let decoded = {}
  if (storageData && isJsonString(storageData)) {
    storageData = JSON.parse(storageData)
    decoded = jwt_decode(storageData as string)
  }
  return { decoded, storageData }
}
export function formatTime(isoString: string) {
  // Tạo đối tượng Date từ chuỗi thời gian
  const dateObject = new Date(isoString)

  // Lấy thông tin giờ, phút, ngày, tháng và năm
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const day = dateObject.getDate()
  const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = dateObject.getFullYear()

  // Tạo định dạng giờ:phút ngày/tháng/năm
  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`

  return formattedDateTime
}
