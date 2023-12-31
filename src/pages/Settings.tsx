import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  getCountDown,
  getTiso,
  updateCountDown,
  updateTiso,
  updateRandomProduct,
  updateRandomFaction,
  getRandomProduct,
  getRandomFaction
} from '~/apis/setting.api'
const Settings = () => {
  const [cowndown, setCoundown] = useState<any>()
  const [tiso, setTiso] = useState<any>()
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [product, setProduct] = useState<any>()
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
      setTiso(data.data[0].money)
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
  const handleUpdateTiso = () => {
    const body = {
      money: tiso
    }
    mutationUpdateTiso.mutate(body, {
      onSuccess: () => {
        alert('Cập nhật tỉ số hối đoái thành công!')
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
        console.log(body), alert('Thay đổi tỉ lệ thành công!')
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
  return (
    <div className='grid grid-cols-4 gap-5'>
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='tiso'>Phí rút tiền</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <input
            id=''
            type='text'
            placeholder='1 điểm'
            disabled
            className='text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
          =
          <input
            id='tiso'
            type='text'
            value={tiso}
            onChange={(e) => {
              setTiso(e.target.value)
              setShow1(true)
            }}
            placeholder='Vnđ'
            className='text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
          {show1 && (
            <button onClick={handleUpdateTiso} className='bg-blue-500 py-3 px-5 rounded-lg text-white'>
              Xác nhận
            </button>
          )}
        </div>
      </div>
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='time'>Thời gian đếm ngược</label>
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
            className='text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
          {show2 && (
            <button onClick={handleUpdateCountDowm} className='bg-blue-500 py-3 px-5 rounded-lg text-white'>
              Xác nhận
            </button>
          )}
        </div>
      </div>
      {/* <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='history'>Lịch sử hiển thị tối đa</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <input
            id='history'
            type='text'
            placeholder='dòng'
            className='text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
        </div>
      </div> */}
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='radom'>Tỉ lệ random faction</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <button
            id='radom'
            placeholder='%'
            className={`text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none   ${
              faction === '0' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
            }`}
            onClick={() => handleUpdateFaction('0')}
          >
            {' '}
            random
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none ${
              faction === '1' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
            } `}
            onClick={() => handleUpdateFaction('1')}
          >
            {' '}
            chẳn
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent  ${
              faction === '2' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
            }`}
            onClick={() => handleUpdateFaction('2')}
          >
            {' '}
            lẻ
          </button>
        </div>
      </div>
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='radom'>Tỉ lệ random Product</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <button
            id='radom'
            placeholder='%'
            className={`text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  ${
              product === '0' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
            }`}
            onClick={() => handleUpdateProduct('0')}
          >
            {' '}
            random
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none   ${
              product === '1' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
            }`}
            onClick={() => handleUpdateProduct('1')}
          >
            {' '}
            chẳn{' '}
          </button>
          <button
            id='radom'
            placeholder='%'
            className={`text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none   ${
              product === '2' ? 'bg-green-800 text-gray-50' : 'bg-transparent text-slate-950'
            }`}
            onClick={() => handleUpdateProduct('2')}
          >
            {' '}
            lẻ
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
