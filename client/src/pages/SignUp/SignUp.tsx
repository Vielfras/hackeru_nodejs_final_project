import './SignUp.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { IUserSignup } from '../../interfaces/UserInterfaces';
import { shcemaIUserSignup } from '../../schemas/IUserSchemas';

export default function SignUp() {

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate();

  // a state object to hold the form values
  const [formData, setFormData] = useState<IUserSignup>(
    {
      name: {
        first: '',
        last: '',
      },
      phone: '',
      email: '',
      password: '',
      image: {
        url: 'https://cdns-images.dzcdn.net/images/artist/300b1c998b93b8a62b050a4b10b14b12/264x264.jpg',
        alt: 'Profile',
      },
      address: {
        country: '',
        city: '',
        street: '',
        houseNumber: 0,
        zip: '',
      },
      isBusiness: false,
    }
  )
  // password verification field is not part of 'IUserSignup' interface, so it has its own state const
  const [passwordVerification, setPasswordVerification] = useState('')
  // an indication whether we are busy (waiting for server's response)
  const [isBusy, setIsBusy] = useState<boolean>(false);

  /*
  a versatile function to sync form values to their corresponsing state object keys.

  Using it on a form input:
  ------------------------
  <input
    name="name.first"               ---> this should correspond to the specific key name in your state object (the example shows a nested key, but a first-level key like 'phone' would work too)
    value={formData.name.first}     ---> this is the actual key that holds the value in the state object
    placeholder="First name"        
    onChange={handleChange}         ---> the generic call to this function
    type="text"                     ---> important. the function currently supports only 'text','number' & 'checkbox', but it can be easily extended.
  />
  */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split('.');

    setFormData((prevState) => {
      // A utility function to safely update nested objects
      const updateNestedObject = (obj: any, path: string[], val: any): any => {
        const key = path[0];
        // If it's the last key, set the value
        if (path.length === 1) {
          obj[key] = val;
          return obj;
        }
        // If the next level doesn't exist, create it
        if (!obj[key] || typeof obj[key] !== 'object') obj[key] = {};
        // Recurse to the next level
        obj[key] = updateNestedObject(obj[key], path.slice(1), val);
        return obj;
      };

      // Determine the value based on the input type
      let updatedValue;
      if (type === 'checkbox') {
        updatedValue = checked; // For checkboxes, use the 'checked' property
      } else if (type === 'number') {
        updatedValue = Number(value); // Convert to number, but handle empty string gracefully
      } else {
        updatedValue = value; // Use the value directly for other input types
      }

      // Clone the current state to avoid direct mutations
      const updatedState = { ...prevState };
      // Update the nested object safely
      updateNestedObject(updatedState, keys, updatedValue);

      return updatedState;
    });
  };

  // a function to handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)
    // validate the form input against 'joi' schema.
    // we add 'confirmPassword' to the object we sent for validation, so that joi can validate it too.
    // { abortEarly:true} means that not all errors will be shown at once, but rather one at a time.
    // also notice that we are destructuring {error} as 'joiError', that's because we already have a const with the same name down the line.
    const { error:joiError } = shcemaIUserSignup.validate( {...formData, confirmPassword:passwordVerification } , { abortEarly: true })
    // if we get errors- let's show a toast.
    if (joiError) {
      // Handle validation errors
      const validationMessages = joiError.details.map(detail => detail.message)
      toasts?.addToast('⚠️', 'Validation Error', validationMessages.join(', '), 'danger')
      setIsBusy(false)
      return
    }
    // make sure 'auth' is not undefined
    if (!auth) { setIsBusy(false); return }
    // try to signup
    const { error } = await auth?.signUp(formData)
    // error or success
    if (error) {
      toasts?.addToast('⚠️', 'Error Signing-Up', error, 'danger')
    } else {
      toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please sign in with your credentials.`, 'success')
      navigate('/signin')
    }
    setIsBusy(false)
  }

  return (
    <div className='SignUp Page'>
      <h3>Sign-Up Page</h3>
      <br></br>

      <Container>
        <Row>
          <Col></Col>
          <Col xs="auto" className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
            <Form onSubmit={handleSubmit}>

              {/* Full Name -------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name.first" value={formData.name.first} placeholder="First name" onChange={handleChange} type="text" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="name.last" value={formData.name.last} placeholder="Last name" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>

              {/* Phone & Email ---------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Phone & Email</Form.Label>
                  <Form.Control name="phone" value={formData.phone} placeholder="Phone number" onChange={handleChange} type="phone" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="email" value={formData.email} placeholder="Email address" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>

              {/* Profile Picture ------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group>
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control name="image.url" value={formData.image.url} placeholder="Image URL" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>

              {/* Password -------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" value={formData.password} placeholder="Password" onChange={handleChange} type="password" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control value={passwordVerification} placeholder="Password again" onChange={(e) => setPasswordVerification(e.target.value)} type="password" />
                </Form.Group>
              </Row>

              {/* Address ---------------------------------------------------- */}

              <Row className="fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address.country" value={formData.address.country} placeholder="Country" onChange={handleChange} type="text" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.city" value={formData.address.city} placeholder="City" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.street" value={formData.address.street} placeholder="Street" onChange={handleChange} type="text" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.houseNumber" value={formData.address.houseNumber} placeholder="House number" onChange={handleChange} type="number" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.zip" value={formData.address.zip} placeholder="Zip code" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>

              {/* Business --------------------------------------------------- */}

              <Row className="mt-4 fw-bold">
                <Form.Label>SignUp as a Business ?</Form.Label>
              </Row>

              <Row className="mt-1">
                <Form.Group className="mb-5">
                  <Form.Check name="isBusiness" checked={formData.isBusiness} onChange={handleChange} type="checkbox" label="Yes" />
                </Form.Group>
              </Row>

              {/* Submit ---------------------------------------------------- */}

              <Row className="fw-bold border-bottom"></Row>

              <Row>
                <Col></Col>
                <Col>
                  <div className="text-center mt-5 d-grid">
                    <Button type='submit' variant='primary' size='sm' disabled={isBusy}>
                      {
                        (isBusy) &&
                        <Spinner
                          className='me-3'
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      }
                      Sign Up
                    </Button>
                  </div>
                </Col>
                <Col></Col>
              </Row>

              {/* ----------------------------------------------------------- */}

            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    </div>
  )
}
