import React, { useContext, useState } from 'react'
import Header from '~/components/Header/Header'
import ProfileModal from '~/components/Modal/ProfileModal'
import { AppContext } from '~/contexts/app.context'
interface Props {
  children?: React.ReactNode
  title: string
}
const AdminLayout = ({ children, title }: Props) => {
  const { profile } = useContext(AppContext)
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className='flex dark:bg-gray-800'>
        <Header />
        <div className={`w-[100%] p-5 tablet:h-[100vh] mobile:h-screen overflow-auto pb-10`}>
          <div className='flex justify-between items-center mb-3'>
            <h1 className='mb-3  text-2xl font-bold dark:text-white'>{title}</h1>
            <button onClick={() => setModalOpen(true)} className='flex items-center space-x-4'>
              <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                {profile?.avatar[0] == null && (
                  <svg
                    className='absolute w-12 h-12 text-gray-400 -left-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                )}
                {profile?.avatar[0] && <img src={profile.avatar[0]} alt='profile' />}
              </div>
              <div className='font-medium dark:text-white'>
                <div>{profile?.name}</div>
              </div>
            </button>
          </div>
          {children}
          <ProfileModal data={profile} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
