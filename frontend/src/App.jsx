import React, { useEffect } from 'react'
import AppRoutes from './Approutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { useDispatch } from 'react-redux'
import { getAllUsersSlice, getMeSlice } from './features/auth/authSlice'
import { getCartSlice } from './features/cart/cartSlice'
import { getWishlistSlice } from './features/wishlist/wishlistSlice'
import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getMeSlice())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(getCartSlice())
      dispatch(getWishlistSlice())
      
      if (user.role === 'admin') {
        dispatch(getAllUsersSlice())
      }
    }
  }, [isAuthenticated, user?.role, dispatch])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App