import './Footer.css'
import { BiSolidCircle } from 'react-icons/bi'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa6'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type subscribingStatusType = 'before' | 'working' | 'after'

export default function Footer() {

  //#region     -- start: fake subscribe
  const [email, setEmail] = useState('')
  const [subPhase, setSubPhase] = useState<subscribingStatusType>('before')
  const handleSubscribe = async () => {
    setSubPhase('working')
    const response = await fetch('https://fakeresponder.com?sleep=2000')
    console.log(`Email '${email}' Subscribed successfully! (status:${response.status})`)
    setSubPhase('after')
  }
  //#endregion  -- end: fake subscribe

  return (
    <div className='Footer'>
      <footer className='border-top pt-4'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div>
                <Link to='/' className="navbar-brand">
                  <BiSolidCircle size={23} color='red' />
                  <BiSolidCircle size={23} color='orange' style={{ marginLeft: '-12px', opacity: '0.7' }} />
                  <span className='pt-5' style={{ fontWeight: '500', fontFamily: 'monospace', fontSize: '1rem' }}>BizCard</span>
                </Link>
                <div className="mb-30 footer-desc pt-2">
                  We know it's tough, BizCard is a company dedicated to helping small business owners just like you connect with the right clients.
                </div>
                <div className='pt-2'>
                  Copyright &copy; BizCard, {new Date().getFullYear().toString()} All rights reserved.
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div>
                <h4>Services</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link to='/' className="text-decoration-none">Marketing</Link>
                  </li>
                  <li>
                    <Link to='/' className="text-decoration-none">Branding</Link>
                  </li>
                  <li>
                    <Link to='/' className="text-decoration-none">Web Design</Link>
                  </li>
                  <li>
                    <Link to='/' className="text-decoration-none">Graphics Design</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div>
                <h4>Social Media</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link to='/' className="text-decoration-none">
                      <span><FaTwitter size={15} className='SocialMediaIcon' />&nbsp;</span>
                      Tweet us a tweet
                    </Link>
                  </li>
                  <li>
                    <Link to='/' className="text-decoration-none">
                      <span><FaFacebook size={15} className='SocialMediaIcon' />&nbsp;</span>
                      Visit our page
                    </Link>
                  </li>
                  <li>
                    <Link to='/' className="text-decoration-none">
                      <span><FaInstagram size={15} className='SocialMediaIcon' />&nbsp;</span>
                      It's getting reel
                    </Link>
                  </li>
                  <li>
                    <Link to='/' className="text-decoration-none">
                      <span><FaLinkedinIn size={15} className='SocialMediaIcon' />&nbsp;</span>
                      We should link !
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-8 mx-auto">
              <div>
                <h4>Newsletter</h4>
                <div>
                  <label htmlFor="Newsletter" className="form-label">Subscribe To Our Newsletter</label>
                  <div className='d-flex'>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-sm me-2" placeholder="name@example.com" disabled={subPhase === 'after'} />
                    <button onClick={handleSubscribe} className={`btn btn-sm ${subPhase === 'after' ? 'btn-success' : 'btn-danger'}`} style={{ lineHeight: '18px' }} disabled={subPhase === 'after'}>
                      {
                        subPhase === 'before' && 'Subscribe'
                        ||
                        subPhase === 'working' && <div className='d-flex'>
                          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                          <span role="status">Wait...</span>
                        </div>
                        ||
                        subPhase === 'after' && 'Success'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
