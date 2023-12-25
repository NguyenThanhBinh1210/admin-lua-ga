/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createMessage, getMessages } from '~/apis/chat.api'

import io from 'socket.io-client'
import { generateRandomOrderCode } from '~/utils/utils'
import { AppContext } from '~/contexts/app.context'
const serverUrl = 'https://lostglobal.onrender.com'

const ShowMessage = ({ isOpen, onClose, data: data1 }: any) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [contentMessage, setContentMessage] = useState<any>()
  const messagesContainerRef = useRef<any | null>(null)

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
  }
  useEffect(() => {
    scrollToBottom()
  }, [contentMessage])
  const { data: dataMess } = useQuery({
    queryKey: ['message-chat', data1],
    queryFn: () => {
      return getMessages({ sender: data1 })
    },
    onSuccess: (data) => {
      setContentMessage(data?.data.getMessage.content)
    },
    cacheTime: 60000
  })
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }
  const [valueInput, setValueInput] = useState<string>('')
  const chatMutation = useMutation({
    mutationFn: (body: any) => {
      return createMessage(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message', 5] })
    }
  })
  const { profile } = useContext(AppContext)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (valueInput !== '') {
      const newData = {
        message: valueInput,
        sender: dataMess?.data.getMessage?.sender
      }
      setValueInput('')
      const dataState = [
        ...contentMessage,
        {
          _id: generateRandomOrderCode(10),
          userId: profile._id,
          message: valueInput
        }
      ]
      setContentMessage(dataState)
      const socket = io(serverUrl)
      socket.emit('sendMessAdmin')
      chatMutation.mutate(newData)
    }
  }
  const queryClient = useQueryClient()
  useEffect(() => {
    const socket = io(serverUrl)
    socket.on('receiveMessAdmin', (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['message-chat', data1] })
      queryClient.invalidateQueries({ queryKey: ['message', 5] })
    })
  }, [data1, queryClient])

  return (
    <div
      id='authentication-modal'
      tabIndex={-1}
      aria-hidden='true'
      onClick={handleModalClick}
      className={` ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } fixed bg-[#02020246] dark:bg-[#ffffff46] top-0 left-0 right-0 z-50 w-[100vw] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100vh] transition-all`}
    >
      <div
        ref={modalRef}
        className='relative z-100 w-full left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] max-w-md max-h-full'
      >
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <button
            onClick={onClose}
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
            data-modal-hide='authentication-modal'
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Nhắn tin</h3>
            <div className='space-y-6'>
              <div>
                <div
                  ref={messagesContainerRef}
                  className='border rounded-md p-2 min-h-[300px] h-[300px] overflow-x-auto flex items-end'
                >
                  <div className='h-max mt-auto w-full'>
                    {contentMessage?.map((item: any) => (
                      <div
                        key={item._id}
                        className={` p-2 mb-2 rounded-r-xl w-max max-w-[70%] ${
                          item.userId === dataMess?.data.getMessage.sender
                            ? 'rounded-r-xl bg-gray-100'
                            : 'rounded-l-xl ml-auto bg-blue-100'
                        }  rounded-t-xl`}
                      >
                        {item.message}
                      </div>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className='h-[30px] flex w-full rounded-md border mt-1'>
                  <input
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    className='w-full rounded-l-md border px-3'
                    type='text'
                  />
                  <button className='w-[50px] bg-blue-500 text-white ring-1 ring-blue-500 rounded-r-md'>Gửi</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowMessage
