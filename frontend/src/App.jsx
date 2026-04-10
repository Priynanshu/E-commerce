import React, { useEffect } from 'react'
import AppRoutes from './Approutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { useDispatch } from 'react-redux'
import { getMeSlice } from './features/auth/authSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMeSlice())
  }, [dispatch])
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