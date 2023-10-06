import { BrowserRouter, Route, Router, Routes, Navigate } from 'react-router-dom'
import './App.css'
import UserLogin from './Pages/User/Auth/UserLogin'
import UserSignUp from './Pages/User/Auth/UserSignUp'
import MyProfile from './Pages/User/Profile/Profile'
import Home from './Pages/User/Home/home'
import { useSelector } from 'react-redux'

import ErrorPage from './Components/Error/Error'



function App() {
  const reduxToken = useSelector((store: { user: { token: string } }) => store.user.token)

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={reduxToken ? <Home /> : <UserLogin />} />
            <Route path='/signup' element={<UserSignUp />} />
            <Route path='/myProfile' element={<MyProfile />} />
            <Route path='/*' element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
