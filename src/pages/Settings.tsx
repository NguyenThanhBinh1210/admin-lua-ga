import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import {
  getCountDown,
  getTiso,
  updateCountDown,
  updateTiso,
  updateRandomProduct,
  updateRandomFaction,
  getRandomProduct,
  getRandomFaction,
  getGioiHan,
  updateGioiHan
} from '~/apis/setting.api'
const Settings = () => {
  const [cowndown, setCoundown] = useState<any>()
  const [tiso, setTiso] = useState<any>()
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [show3, setShow3] = useState<boolean>(false)
  const [product, setProduct] = useState<any>()
  const [gioihan, setGioihan] = useState<any>()
  const [faction, setFaction] = useState<any>()

  useQuery({
    queryKey: ['get-setting-faction'],
    queryFn: () => {
      return getRandomFaction()
    },
    onSuccess: (data) => {
      console.log('faction', data.data.number)
      setFaction(data.data.number)
    }
  })
  useQuery({
    queryKey: ['get-gioi-han'],
    queryFn: () => {
      return getGioiHan()
    },
    onSuccess: (data) => {
      setGioihan(data.data.number)
    }
  })

  useQuery({
    queryKey: ['get-setting-product'],
    queryFn: () => {
      return getRandomProduct()
    },
    onSuccess: (data) => {
      console.log('product', data.data.number)
      setProduct(data.data.number)
    }
  })
  useQuery({
    queryKey: ['get-countdown'],
    queryFn: () => {
      return getCountDown()
    },
    onSuccess: (data) => {
      setCoundown(data.data.countdown)
    }
  })
  useQuery({
    queryKey: ['get-tiso'],
    queryFn: () => {
      return getTiso()
    },
    onSuccess: (data) => {
      setTiso(data.data[0].numberOder)
    }
  })
  const mutationUpdateTiso = useMutation((body: any) => {
    return updateTiso(body)
  })
  const mutationUpdateProduct = useMutation((body: any) => {
    return updateRandomProduct(body)
  })
  const mutationUpdateFaction = useMutation((body: any) => {
    return updateRandomFaction(body)
  })
  const mutationUpdateCountDown = useMutation((body: any) => {
    return updateCountDown(body)
  })
  const mutationUpdateGioiHan = useMutation((body: any) => {
    return updateGioiHan(body)
  })
  const handleUpdateTiso = () => {
    const body = {
      numberOder: tiso
    }
    mutationUpdateTiso.mutate(body, {
      onSuccess: () => {
        alert('Cập nhật % phí giao dịch thành công!')
        setShow1(false)
      },
      onError: () => {
        alert('Lỗi, hãy thử lại!')
      }
    })
  }
  const handleUpdateProduct = (product: any) => {
    const body = {
      number: product
    }
    mutationUpdateProduct.mutate(body, {
      onSuccess: () => {
        console.log(body), alert('Thay đổi tỉ lệ thành công!')
        setShow1(false)
        setProduct(product)
      },
      onError: () => {
        alert('Lỗi, hãy thử lại!')
      }
    })
  }
  const handleUpdateFaction = (product: any) => {
    const body = {
      number: product
    }
    mutationUpdateFaction.mutate(body, {
      onSuccess: () => {
        alert('Thay đổi tỉ lệ thành công!')
        setShow1(false)
        setFaction(product)
      },
      onError: () => {
        alert('Lỗi, hãy thử lại!')
      }
    })
  }
  const handleUpdateCountDowm = () => {
    const body = {
      countdown: cowndown
    }
    mutationUpdateCountDown.mutate(body, {
      onSuccess: () => {
        alert('Cập nhật thời gian đếm ngược thành công!')
        setShow2(false)
      },
      onError: () => {
        alert('Lỗi, hãy thử lại!')
      }
    })
  }
  const handleUpdateGioiHan = () => {
    const body = {
      number: gioihan
    }
    mutationUpdateGioiHan.mutate(body, {
      onSuccess: () => {
        toast.success('Cập nhật giới hạn tiền rút thành công!')
        setShow3(false)
      },
      onError: () => {
        toast.success('Lỗi, hãy thử lại!')
      }
    })
  }
  return (
    <div className='grid grid-cols-4 gap-5 dark:text-white'>
      {/* <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='tiso' className='dark:text-white'>Phí rút tiền (%)</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <input
            id='tiso'
            type='text'
            value={tiso}
            onChange={(e) => {
              setTiso(e.target.value)
              setShow1(true)
            }}
            placeholder='0'
            className='text-center w-[100px] dark:bg-gray-600 border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
          {show1 && (
            <button onClick={handleUpdateTiso} className='bg-blue-500 py-3 px-5 rounded-lg text-white'>
              Xác nhận
            </button>
          )}
        </div>
      </div> */}
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='time' className='dark:text-white'>Thời gian đếm ngược (phút)</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <input
            value={cowndown}
            onChange={(e) => {
              setCoundown(e.target.value)
              setShow2(true)
            }}
            id='time'
            type='text'
            placeholder='phút'
            className='text-center dark:bg-gray-600 w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
          {show2 && (
            <button onClick={handleUpdateCountDowm} className='bg-blue-500 py-3 px-5 rounded-lg text-white'>
              Xác nhận
            </button>
          )}
        </div>
      </div>
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='time'>Số tiền rút tối thiểu (đ)</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <input
            value={gioihan}
            onChange={(e) => {
              setGioihan(e.target.value)
              setShow3(true)
            }}
            id='time'
            type='text'
            placeholder='đ'
            className='text-center w-[100px] dark:bg-gray-600 border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
          {show3 && (
            <button onClick={handleUpdateGioiHan} className='bg-blue-500 py-3 px-5 rounded-lg text-white'>
              Xác nhận
            </button>
          )}
        </div>
      </div>

      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='radom'>Tỉ lệ random thời trang</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <button
            id='radom'
            placeholder='%'
            className={`text-center dark:text-white w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none   ${faction === '0' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
              }`}
            onClick={() => handleUpdateFaction('0')}
          >
            {' '}
            Random
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center dark:text-white w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none ${faction === '1' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
              } `}
            onClick={() => handleUpdateFaction('1')}
          >
            {' '}
            Chẳn
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center dark:text-white w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none ${faction === '2' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
              }`}
            onClick={() => handleUpdateFaction('2')}
          >
            {' '}
            Lẻ
          </button>
        </div>
      </div>
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='radom'>Tỉ lệ random sản phẩm</label>
        <div className='flex items-center gap-x-2 mt-2 '>
          <button
            id='radom'
            placeholder='%'
            className={`text-center dark:text-white w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  ${product === '0' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
              }`}
            onClick={() => handleUpdateProduct('0')}
          >
            {' '}
            Random
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center dark:text-white w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none   ${product === '1' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
              }`}
            onClick={() => handleUpdateProduct('1')}
          >
            {' '}
            Chẳn{' '}
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center w-[100px] dark:text-white border border-slate-200 rounded-lg py-3 px-5 outline-none   ${product === '2' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
              }`}
            onClick={() => handleUpdateProduct('2')}
          >
            {' '}
            Lẻ
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
