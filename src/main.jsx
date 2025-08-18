import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'
import { Provider } from 'react-redux'
import store from "./Store/store.js"


const router=createBrowserRouter([{
   path: "/",
    element: <App />,
    children:[

      {
        path:"/signup",
        element:<SignUp />
      }
    ]
  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
  <RouterProvider router={router} />
    </Provider>
    
  </StrictMode>,
)
