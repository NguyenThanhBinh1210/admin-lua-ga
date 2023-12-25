import * as React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import { AppContext } from './contexts/app.context'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Comment from './pages/Comment'
import Contact from './pages/Contact'
import Users from './pages/Users'
import Products from './pages/Product'
import Categories from './pages/Category'
import Oders from './pages/Order'
import Messages from './pages/Message'
import Brand from './pages/Brand'
import Payment from './pages/Payment'
import Custommer from './pages/Custommer'
import PaymentHistory from './pages/PaymentHistory'
import Chat from './pages/Chat'

function ProtecedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}
function RejectedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtecedRoute />,
      children: [
        {
          path: '/',
          index: true,
          element: (
            <AdminLayout title='Dashboard'>
              <Dashboard />
            </AdminLayout>
          )
        },
        {
          path: '/comment',
          element: (
            <AdminLayout title='Danh sách bình luận'>
              <Comment />
            </AdminLayout>
          )
        },
        {
          path: '/contact',
          element: (
            <AdminLayout title='Danh sách liên hệ'>
              <Contact />
            </AdminLayout>
          )
        },
        {
          path: '/user',
          element: (
            <AdminLayout title='Danh sách nhân viên'>
              <Users />
            </AdminLayout>
          )
        },
        {
          path: '/custommer',
          element: (
            <AdminLayout title='Danh sách khách hàng'>
              <Custommer />
            </AdminLayout>
          )
        },
        {
          path: '/product',
          element: (
            <AdminLayout title='Danh sách sản phẩm'>
              <Products />
            </AdminLayout>
          )
        },
        {
          path: '/category',
          element: (
            <AdminLayout title='Danh sách danh mục'>
              <Categories />
            </AdminLayout>
          )
        },
        {
          path: '/brand',
          element: (
            <AdminLayout title='Danh sách thương hiệu'>
              <Brand />
            </AdminLayout>
          )
        },
        {
          path: '/order',
          element: (
            <AdminLayout title='Danh sách đơn hàng'>
              <Oders />
            </AdminLayout>
          )
        },
        {
          path: '/message',
          element: (
            <AdminLayout title='Danh sách tin nhắn'>
              <Messages />
            </AdminLayout>
          )
        },
        {
          path: '/payment',
          element: (
            <AdminLayout title='Ngân hàng dùng để thanh toán'>
              <Payment />
            </AdminLayout>
          )
        },
        {
          path: '/payment-history',
          element: (
            <AdminLayout title='Lịch sử giao dịch'>
              <PaymentHistory />
            </AdminLayout>
          )
        },
        {
          path: '/chat',
          element: (
            <AdminLayout title='Chat'>
              <Chat />
            </AdminLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
export default useRouteElements
