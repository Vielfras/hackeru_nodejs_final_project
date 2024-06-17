import './User.css'
import Restricted from '../../components/Restricted/Restricted'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function User() {

  const auth = useContext(AuthContext)

  return (
    <div className='User Page'>
      <h3>User Page</h3>
      <br></br>

      <Restricted allowedRoles={['user','business','admin']} action='message'>
        <div>Welcome {auth?.userDetails?.name.first} 😊</div>
      </Restricted>

    </div>
  )
}
