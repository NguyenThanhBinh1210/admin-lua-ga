/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getRecharges, getWithrowRecharges } from '~/apis/admin.api'
import { UpdateHistory } from '~/apis/payment.api'
import CreatePayment from '~/components/Modal/CreatePayment'

const PaymentHistory = () => {
  const queryClient = useQueryClient()

  const [showComment, setShowComment] = useState<any | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalOpenCreate, setModalOpenCreate] = useState(false)
  const [type, setType] = useState(0)

  const itemsPerPage = 8

  // const [currentPageWitdraw, setCurrentPageWitdraw] = useState(1)
  // const totalPagesWitdraw = Math.ceil(arrayWithoutInfoRechargeMoney?.length / itemsPerPage)
  // const startIndexWitdraw = (currentPageWitdraw - 1) * itemsPerPage
  // const endIndexWitdraw = startIndexWitdraw + itemsPerPage
  // const currentDataWitdraw = arrayWithoutInfoRechargeMoney?.slice(startIndexWitdraw, endIndexWitdraw)

  const searchMutation = useMutation({
    mutationFn: (userId: string) => getRecharges({ userId: userId })
  })

  const searchMutations = useMutation({
    mutationFn: (userId: string) => getWithrowRecharges({ userId: userId })
  })

  const updateMutation = useMutation({
    mutationFn: (id: string) => UpdateHistory(id)
  })
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  // const handlePageChangeWitdraw = (page: number) => {
  //   if (page >= 1 && page <= totalPagesWitdraw) {
  //     setCurrentPageWitdraw(page)
  //   }
  // }
  const [search, setSearch] = useState<string>('')

  const handleSearch = (e: any) => {
    e.preventDefault()
    if (type === 0) {
      searchMutation.mutate(search, {
        onSuccess: (data) => {
          setRecharge(data.data)
        },
        onError: (error: unknown) => {
          console.log(error)
        }
      })
    }
  }
  const [dataRecharge, setRecharge] = useState<any>([])
  const { isLoading: isLoadingOption } = useQuery({
    queryKey: ['history-rechare'],
    queryFn: () => {
      return getRecharges({})
    },
    onSuccess: (data) => {
      setRecharge(data.data)
    }
  })

  const [dataRecharges, setRecharges] = useState<any>([])
  const { isLoading: isLoadingOptions } = useQuery({
    queryKey: ['admin-all-history'],
    queryFn: () => {
      return getWithrowRecharges({})
    },
    onSuccess: (data) => {
      setRecharges(data.data)
    }
  })
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(dataRecharge.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = dataRecharge.slice(startIndex, endIndex)
  return (
    <>
      <div className='flex justify-between mb-3 mobile:flex-col tablet:flex-col'>
        <div className='mb-2 flex items-center'></div>
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
        {isLoadingOption ? (
          <div className='w-full flex justify-center items-center h-full gap-x-3'>
            <svg
              aria-hidden='true'
              className='inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='text-lg dark:text-white'>Đang tải...</span>
          </div>
        ) : (
          <>
            <div className='flex justify-between'>
              <div>
                {type === 0 && <h1 className='text-xl font-semibold mb-2'>Số giao dịch Nạp: {dataRecharge.length}</h1>}
                {type === 1 && <h1 className='text-xl font-semibold mb-2'>Số giao dịch Rút: {dataRecharge.length}</h1>}
              </div>
              <div className='flex gap-x-3 '>
                <button
                  onClick={() => setType(0)}
                  className={`w-[100px] cursor-pointer h-[40px] rounded-lg ${type === 0
                    ? ' bg-blue-600 text-white '
                    : ' ring-1 ring-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white '
                    }  flex transition-all items-center justify-center `}
                >
                  Lịch sử nạp
                </button>
                <button
                  onClick={() => setType(1)}
                  className={`w-[100px] cursor-pointer h-[40px] rounded-lg ${type === 1
                    ? ' bg-blue-600 text-white '
                    : ' ring-1 ring-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white '
                    }  flex transition-all items-center justify-center `}
                >
                  Lịch sử rút
                </button>
              </div>
            </div>
            <div className='grid grid-cols-2 min-h-[450px] gap-x-5  mobile:gap-y-10 tablet:gap-y-10'>
              {type === 0 && (
                <div className='col-span-2 '>
                  <div className='relative h-[460px] mobile:h-max tablet:h-max flex-1 overflow-x-auto rounded-md shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                          <th scope='col' className='px-6 py-3'>
                            STT
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Điểm nạp
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            UserId
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Status
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Ngày nạp
                          </th>
                        </tr>
                      </thead>
                      {currentData?.length !== 0 && (
                        <tbody>
                          {currentData?.map((item: any, idx: number) => {
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
                                  {item?.totalAmount}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  {item?.userId?.idUser}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  <span
                                    className={` ${item?.status === 'pending' ? 'bg-green-500' : 'bg-green'
                                      } text-white px-2 py-0.5 pb-1 text-xs rounded-md`}
                                  >
                                    Done
                                  </span>
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  {moment(item?.createdAt).format('DD/MM/YYYY')}
                                </th>
                              </tr>
                            )
                          })}
                        </tbody>
                      )}
                    </table>
                  </div>
                  <nav aria-label='Page navigation example' className='mx-auto mt-5'>
                    <ul className='flex items-center -space-x-px h-10 text-base justify-center'>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        <span className='sr-only'>Previous</span>
                        <svg
                          className='w-3 h-3'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 1 1 5l4 4'
                          />
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={
                            currentPage === index + 1
                              ? 'z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                              : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                          }
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        <span className='sr-only'>Next</span>
                        <svg
                          className='w-3 h-3'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='m1 9 4-4-4-4'
                          />
                        </svg>
                      </button>
                    </ul>
                  </nav>
                </div>
              )}
              {type === 1 && (
                <div className='col-span-2 '>
                  <div className='relative h-[460px] mobile:h-max tablet:h-max flex-1 overflow-x-auto rounded-md shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                          <th scope='col' className='px-6 py-3'>
                            STT
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Mã rút
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Tiền rút
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            UserId
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Email
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Số tài khoản
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Tên ngân hàng
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Status
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Ngày rút
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      {dataRecharges?.length !== 0 && (
                        <tbody>
                          {dataRecharges?.map((item: any, idx: number) => {
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
                                  {item?.codeOder}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  ${item?.totalAmount}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  {item?.userId?.idUser}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  {item?.userId?.email}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  {item?.bankNumber}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  {item?.bankName}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  <span
                                    className={` ${item?.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                                      } text-white px-2 py-0.5 pb-1 text-xs rounded-md`}
                                  >
                                    {item?.status}
                                  </span>
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  {moment(item?.createdAt).format('DD/MM/YYYY')}
                                </th>
                                <th
                                  scope='row'
                                  className='px-6 py-3 w-[200px] flex items-center gap-x-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                  <button
                                    type='button'
                                    onClick={() => {
                                      handleUpdate(item._id)
                                    }}
                                    className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900'
                                  >
                                    Xác nhận
                                  </button>
                                </th>
                              </tr>
                            )
                          })}
                        </tbody>
                      )}
                    </table>
                  </div>
                  {/* <nav aria-label='Page navigation example' className='mx-auto mt-5'>
                    <ul className='flex items-center -space-x-px h-10 text-base justify-center'>
                      <button
                        onClick={() => handlePageChangeWitdraw(currentPageWitdraw - 1)}
                        className='flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        <span className='sr-only'>Previous</span>
                        <svg
                          className='w-3 h-3'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 1 1 5l4 4'
                          />
                        </svg>
                      </button>
                      {Array.from({ length: totalPagesWitdraw }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChangeWitdraw(index + 1)}
                          className={
                            currentPageWitdraw === index + 1
                              ? 'z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                              : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                          }
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChangeWitdraw(currentPageWitdraw + 1)}
                        className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        <span className='sr-only'>Next</span>
                        <svg
                          className='w-3 h-3'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='m1 9 4-4-4-4'
                          />
                        </svg>
                      </button>
                    </ul>
                  </nav> */}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <CreatePayment
        data={showComment}
        isOpen={isModalOpenCreate || isModalOpen}
        onClose={() => {
          setModalOpenCreate(false)
          setModalOpen(false)
          setShowComment(null)
        }}
      />
    </>
  )
}

export default PaymentHistory
