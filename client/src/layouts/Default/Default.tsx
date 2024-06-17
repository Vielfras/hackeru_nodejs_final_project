import './Default.css'
import '../../pages/Page.css'

import { Route, Routes } from 'react-router-dom'

// components
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

// pages
import Home from '../../pages/Home/Home'
import Free from '../../pages/Free/Free'
import User from '../../pages/User/User'
import Business from '../../pages/Business/Business'
import Admin from '../../pages/Admin/Admin'
import NotFound from '../../pages/NotFound/NotFound'
import SignIn from '../../pages/SignIn/SignIn'
import UserProfile from '../../pages/UserProfile/UserProfile'
import CardDetails from '../../pages/CardDetails/CardDetails'
import SignUp from '../../pages/SignUp/SignUp'
import MyOwnCards from '../../pages/MyOwnCards/MyOwnCards'

export default function Default() {
  return (
    <div className='Default'>

      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/free' element={<Free/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/business' element={<Business/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/mycards' element={<MyOwnCards/>}/>
        <Route path='/card-details/:cardId' element={<CardDetails/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

      <Footer/>
      
    </div>
  )
}
