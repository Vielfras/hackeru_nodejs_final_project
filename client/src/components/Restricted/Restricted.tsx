import { useMemo, PropsWithChildren, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Button, Card, Container } from 'react-bootstrap'
import { BsSignStopFill } from 'react-icons/bs'

/*
  Action Type 
  -----------
  'hide' (default) =  hide whatever is wrapped inside the component '<Restricted> hide this </Restricted>' if the role don't match
  'message' =         shows a message asking the user to sign-in \ sign-up
*/
type ActionType = 'hide' | 'message'

type UserRolesType = undefined | 'user' | 'business' | 'admin'

interface IRestrictedProps {
  allowedRoles: UserRolesType[]
  action?: ActionType
}

export default function Restricted(props: PropsWithChildren<IRestrictedProps>) {

  const { allowedRoles, action = 'hide', children } = props;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const userRole = useMemo(() => {
    let role: UserRolesType = undefined;
    if (auth?.userDetails?.isAdmin) {
      role = 'admin';
    } else if (auth?.userDetails?.isBusiness) {
      role = 'business';
    } else if (auth?.userDetails) {
      role = 'user';
    }
    return role;
  }, [auth?.userDetails]); // Dependencies array- useMemo will only recompute the memoized value when 'auth.userDetails' has changed.

  return (
    <>
      {
        allowedRoles.includes(userRole) ?
          children
          :
          (action === 'hide') ?
            <></>
            :
            <Container className='px-5'>
              <Card>
                <Card.Header className='py-3 text-danger'><BsSignStopFill size={28} className='me-1' style={{ marginTop: '-4px' }} /> Access Denied</Card.Header>
                <Card.Body>
                  <Card.Text as="div">
                    Only an authorized
                    {
                      allowedRoles.map((role, idx) =>
                        <span key={idx}>
                          &nbsp;<strong>{role}</strong>
                          {
                            (idx + 1 < allowedRoles.length) ?
                              <span> /</span>
                              :
                              <span>&nbsp;</span>
                          }
                        </span>)
                    }
                    can view the content of this page.
                  </Card.Text>

                  <div className='pt-3'>
                    <Button onClick={() => navigate('/signin')} className='mx-2' variant='outline-primary' size='sm'>Sign In</Button>
                    <Button onClick={() => navigate('/signup')} className='mx-2' variant='outline-primary' size='sm'>Sign Up</Button>
                  </div>
                </Card.Body>
              </Card>
            </Container>
      }
    </>
  );
}
