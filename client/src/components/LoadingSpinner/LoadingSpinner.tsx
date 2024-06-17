import './LoadingSpinner.css'
import { Spinner } from 'react-bootstrap'

interface ILoadingSpinnerProps {
  animation: 'grow'|'border'
  variant: 'primary'|'secondary'|'success'|'danger'|'warning'|'info'
}

export default function LoadingSpinner(props:ILoadingSpinnerProps) {

  const { animation, variant } = props

  return (
    <>
      <Spinner
        as="span"
        animation={animation}
        size="sm"
        role="status"
        variant={variant}
        aria-hidden="true"
        className='me-2'
      />
      <span>Loading, please wait ...</span>
    </>
  )
}
