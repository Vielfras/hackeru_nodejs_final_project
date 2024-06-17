import './Home.css'
import { useContext } from 'react'
import { ToastsContext } from '../../context/ToastsContext'

export default function Home() {

  const toasts = useContext(ToastsContext)

  return (
    <div className='Home Page'>
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold pb-3">CLOSE THIS PAGE</h1>
          <h3 className='pb-3'>IF YOU CAN'T HANDLE MORE CUSTOMERS.</h3>
          <div className="col-md-6 fs-4 mx-auto pb-4">Hundreds of people are currently surfing the web looking for a service right like the one that your business is offering.</div>
          <div className="col-md-6 fs-4 mx-auto pb-4">Help them out 😍 Create your FREE business card NOW.</div>
          <button className="btn btn-primary btn-lg" type="button" onClick={()=>toasts?.addToast("🍺","Wazzzup ?","Here's a toast for you 😄","primary")}>Click here to make a Toast !</button>
      </div>
    </div>
  )
}
