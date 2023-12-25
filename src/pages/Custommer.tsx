/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { blockFrize, openFrize } from '~/apis/admin.api'
import { deleteStaff, getAllStaff, searchUser } from '~/apis/product.api'
import Loading from '~/components/Loading/Loading'
import Modal from '~/components/Modal'
import CreateStaff from '~/components/Modal/CreateStaff'
import NotReSearch from '~/components/NotReSearch/NotReSearch'
import Paginate from '~/components/Pagination/Paginate'
import SearchHeader from '~/components/Search/Search'
import usePagination from '~/hooks/usePagination'

const Custommer = () => {
  const [staff, setStaff] = useState<any>([])
  console.log(staff);
  const [search, setSearch] = useState<string>('')
  const { currentPage, totalPages, currentData, setCurrentPage } = usePagination(8, staff)
  const [showComment, setShowComment] = useState()
  const [isModalOpen, setModalOpen] = useState(false)

  const searchMutation = useMutation({
    mutationFn: (email: string) => searchUser(email)
  })
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStaff(id)
  })
  const blockMutation = useMutation({
    mutationFn: (id: any) => blockFrize(id)
  })
  const openMutation = useMutation({
    mutationFn: (id: any) => openFrize(id)
  })
  const queryClient = useQueryClient()
  const handleDeleteStaff = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Đã xoá!')
        queryClient.invalidateQueries({ queryKey: ['user', 3] })
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const handleBlockStaff = (id: string) => {
    const body: any = {
      userId: id
    }
    blockMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Đã chặn!')
        queryClient.invalidateQueries({ queryKey: ['user', 3] })
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const handleOpenStaff = (id: string) => {
    const body: any = {
      userId: id
    }
    openMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Đã mở!')
        queryClient.invalidateQueries({ queryKey: ['user', 3] })
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', 3],
    queryFn: () => {
      return getAllStaff()
    },
    onSuccess: (data) => {
      setStaff(data.data.user.filter((user: any) => !user.isStaff).filter((user: any) => !user.isAdmin))
    },
    cacheTime: 30000
  })
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  const handleReset = () => {
    searchMutation.mutate('', {
      onSuccess: (data) => {
        setSearch('')
        setStaff(data.data)
        setCurrentPage(1)
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const handleSearch = (e: any) => {
    e.preventDefault()
    searchMutation.mutate(search, {
      onSuccess: (data) => {
        setStaff(data.data)
        setCurrentPage(1)
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  return (
    <>
      <div className='flex justify-between mb-3 mobile:flex-col tablet:flex-col'>
        <div className='mb-2 flex items-center'>
          <span className='my-4 font-bold dark:text-white'>Số lượng khách hàng: {staff?.length}</span>
        </div>
        <div className='w-[50%] mobile:w-full'>
          <form onSubmit={(e) => handleSearch(e)}>
            <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search...'
              />
              <button
                type='submit'
                className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex flex-col gap-[30px] flex-1'>
        {isLoadingUser || searchMutation.isLoading ? (
          <Loading />
        ) : (
          <>
            {!searchMutation.isLoading && currentData.length === 0 ? (
              <NotReSearch handleReset={handleReset} />
            ) : (
              <>
                <div className='relative flex-1 overflow-x-auto rounded-md shadow-md sm:rounded-lg'>
                  <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          STT
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Avatar
                        </th>

                        <th scope='col' className='px-6 py-3'>
                          Username
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Mã giới thiệu
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Tên ngân hàng
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Số tài khoản
                        </th>

                        <th scope='col' className='px-6 py-3'>
                          Status
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    {staff.length !== 0 && (
                      <tbody>
                        {currentData.map((item: any, idx: number) => {
                          return (
                            <tr
                              key={item._id}
                              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                            >
                              <th
                                scope='row'
                                className='w-[100px] px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                {'#' + (idx + 1)}
                              </th>
                              <th
                                scope='row'
                                className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                {item?.avatar[0] == null && (
                                  <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                                    <svg
                                      className='absolute w-12 h-12 text-gray-400 -left-1'
                                      fill='currentColor'
                                      viewBox='0 0 20 20'
                                      // style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        // style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                                        clipRule='evenodd'
                                      ></path>
                                    </svg>
                                  </div>
                                )}
                                {item?.avatar[0] && (
                                  <img
                                    className='aa'
                                    style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                                    src={item.avatar}
                                    alt='avatar'
                                  />
                                )}
                              </th>
                              <th
                                scope='row'
                                className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                {item.username}
                              </th>
                              <th
                                scope='row'
                                className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                {item.idUser}
                              </th>
                              <th
                                scope='row'
                                className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                {item.bankName}
                              </th>
                              <th
                                scope='row'
                                className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                {item.banKNumber}
                              </th>
                              <th
                                scope='row'
                                className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                {item.prize ? (
                                  <div className='bg-yellow-500 text-white flex justify-center rounded-md text-xs py-0.5 px-2'>
                                    Blocked
                                  </div>
                                ) : (
                                  <div className='bg-green-500 text-white flex justify-center rounded-md text-xs py-0.5 px-2'>
                                    Open
                                  </div>
                                )}
                              </th>
                              <th
                                scope='row'
                                className='px-6 py-3 w-[200px] flex items-center gap-x-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                <button
                                  type='button'
                                  onClick={() => handleOpenStaff(item._id)}
                                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 ${!item.prize && 'hidden'
                                    }`}
                                >
                                  Mở
                                </button>
                                <button
                                  type='button'
                                  onClick={() => handleBlockStaff(item._id)}
                                  className={`text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-2 py-1 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900 ${item.prize && 'hidden'
                                    }`}
                                >
                                  Chặn
                                </button>
                                <button
                                  type='button'
                                  onClick={() => handleDeleteStaff(item._id)}
                                  className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                >
                                  Xoá
                                </button>
                              </th>
                            </tr>
                          )
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
                <Paginate totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
              </>
            )}
          </>
        )}
      </div>
      <Modal data={showComment} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default Custommer
