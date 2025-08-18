import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'



function App() {
 // const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Welcome to the App</h1>
      {/* This is where nested routes will render */}
      <Outlet />
      <h2> how are you </h2>
    </div>
  )
}

export default App
