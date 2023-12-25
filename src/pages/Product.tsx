/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { deleteProduct, getAllProduct, searchProduct } from '~/apis/product.api'
import Loading from '~/components/Loading/Loading'
import CreateProduct from '~/components/Modal/CreateProduct'
import ShowProduct from '~/components/Modal/ShowProduct'
import Paginate from '~/components/Pagination/Paginate'
import SearchHeader from '~/components/Search/Search'
import { FormatNumber, FormatNumberK } from '~/hooks/useFormatNumber'
import usePagination from '~/hooks/usePagination'

const Products = () => {
  const [staff, setStaff] = useState<any>([])
  const [search, setSearch] = useState<string>('')
  const { currentPage, totalPages, currentData, setCurrentPage } = usePagination(8, staff)
  const [showComment, setShowComment] = useState()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalOpenCreate, setModalOpenCreate] = useState(false)

  const searchMutation = useMutation({
    mutationFn: (title: string) => searchProduct(title)
  })
  const deleteMutation = useMutation({
    mutationFn: (body: any) => deleteProduct(body)
  })
  const queryClient = useQueryClient()
  const handleDeleteStaff = (id: string) => {
    const body = [id]
    deleteMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Đã xoá!')
        queryClient.invalidateQueries({ queryKey: ['product', 11] })
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['product', 11],
    queryFn: () => {
      return getAllProduct()
    },
    onSuccess: (data) => {
      setStaff(data.data.Products)
    },
    cacheTime: 30000
  })
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
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
      <SearchHeader
        count={staff.length}
        search={search}
        setSearch={setSearch}
        handleSearch={(e: any) => handleSearch(e)}
        hanldeOpenModal={() => setModalOpenCreate(true)}
        title={'sản phẩm'}
      />
      <div className='flex flex-col gap-[30px] flex-1'>
        {isLoadingUser ? (
          <Loading />
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
                      Ảnh
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Tên
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Số lượng
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Đơn giá
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
                            {item?.image[0] == null && (
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
                            {item?.image[0] && (
                              <img
                                className='aa'
                                style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                                src={item.image}
                                alt='avatar'
                              />
                            )}
                          </th>
                          <th
                            scope='row'
                            className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                          >
                            {item.title}
                          </th>
                          <th
                            scope='row'
                            className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                          >
                            {FormatNumberK(item.quantity)}
                          </th>
                          <th
                            scope='row'
                            className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                          >
                            ${FormatNumber(item.price)}
                          </th>
                          <th
                            scope='row'
                            className='px-6 py-3 w-[200px] flex items-center gap-x-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                          >
                            <button
                              type='button'
                              onClick={() => {
                                setShowComment(item)
                                setModalOpen(true)
                              }}
                              className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900'
                            >
                              Xem
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
      </div>
      <ShowProduct data={showComment} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <CreateProduct isOpen={isModalOpenCreate} onClose={() => setModalOpenCreate(false)} />
    </>
  )
}

export default Products
