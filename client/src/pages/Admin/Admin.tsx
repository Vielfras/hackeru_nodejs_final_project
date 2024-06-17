import './Admin.css'
import Restricted from '../../components/Restricted/Restricted'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Admin() {

  const auth = useContext(AuthContext)

  return (
    <div className='Admin Page'>
      <h3>Admin Page</h3>
      <br></br>

      <Restricted allowedRoles={['admin']} action='message'>
        <div>Welcome {auth?.userDetails?.name.first} 😊</div>
      </Restricted>

    </div>
  )
}
