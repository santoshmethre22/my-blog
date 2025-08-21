import { useState,useEffect } from 'react'
import {login,logout} from "./Store/authSlice.js"
import './App.css'
import { Outlet } from 'react-router-dom'
import {Footer, Header} from "./Components/index.js"
import authService from './Appwrite/auth.js'
import { useDispatch } from 'react-redux'


function App() {
 // const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])



  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
