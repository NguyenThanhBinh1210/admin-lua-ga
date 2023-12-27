import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getCountDown, getTiso, updateCountDown, updateTiso } from '~/apis/setting.api'
const Settings = () => {
  const [cowndown, setCoundown] = useState<any>()
  const [tiso, setTiso] = useState<any>()
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)

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
        <label htmlFor='tiso'>Tỉ sô hối đoái</label>
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
      </div>
      <div className='col-span-4 tablet:col-span-2 mobile:col-span-4'>
        <label htmlFor='radom'>Tỉ lệ random</label>
        <div className='flex items-center gap-x-2 mt-2'>
          <input
            id='radom'
            type='text'
            placeholder='%'
            className='text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent'
          />
        </div>
      </div> */}
    </div>
  )
}

export default Settings
