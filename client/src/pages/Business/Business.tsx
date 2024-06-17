import './Business.css'
import Restricted from '../../components/Restricted/Restricted'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Business() {

  const auth = useContext(AuthContext)

  return (
    <div className='Business Page'>
      <h3>Business Page</h3>
      <br></br>

      <Restricted allowedRoles={['business','admin']} action='message'>
        <div>Welcome {auth?.userDetails?.name.first} 😊</div>
      </Restricted>

    </div>
  )
}
