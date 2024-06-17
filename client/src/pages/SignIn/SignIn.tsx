import './SignIn.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Spinner } from 'react-bootstrap';
import DevModeOnly from '../../components/DevModeOnly/DevModeOnly';

export default function SignIn() {

  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');

  const [isBusy,setIsBusy] = useState<boolean>(false)

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)

    if (!auth) { setIsBusy(false); return }
    const { error } = await auth?.signIn(email,password)

    if (error) {
      toasts?.addToast('⚠️','Error Signing-In',error,'danger')
    } else {
      toasts?.addToast('👍🏼','Successfully Signed-In',`Welcome !`,'success')  // TODO: add the user's first name with toast
      navigate('/')
    }
    setIsBusy(false)
  }
  
  return (
    <div className='SignIn Page'>
      <h3>Sign-In Page</h3>
      <br></br>

      <form onSubmit={handleSubmit}>

        <input
          type='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder='Enter your email'
          required
        />

        <br></br><br></br>

        <input
          type='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder='Enter your password'
          required
        />

        <br></br><br></br>

        <Button type='submit' variant='primary' size='sm' disabled={isBusy}>
          {
          (isBusy) &&
            <Spinner
            className='me-2'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            />
          }
          Sign In
        </Button>

      </form>

          <DevModeOnly>
            <Button variant='warning' className='mx-2' onClick={()=> { setEmail('wrong@gmail.com'); setPassword('Wrong123!') } }>WRONG credentials</Button>
            <Button variant='success' className='mx-2' onClick={()=> { setEmail('user@gmail.com'); setPassword('User123!') } }>User credentials</Button>
            <Button variant='success' className='mx-2' onClick={()=> { setEmail('biz@gmail.com'); setPassword('Biz123!') } }>Business credentials</Button>
            <Button variant='success' className='mx-2' onClick={()=> { setEmail('admin@gmail.com'); setPassword('Admin123!') } }>Admin credentials</Button>
          </DevModeOnly>

    </div>
  )
}
