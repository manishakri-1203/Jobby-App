import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-container">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <ul className="nav-menu-mobile">
              <li>
                <Link to="/">
                  <AiFillHome className="mobile-nav-link" />
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <BsFillBriefcaseFill className="mobile-nav-link" />
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="mobile-logout-btn"
                  onClick={onClickLogout}
                >
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </div>
          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <ul className="nav-menu-desktop">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="desktop-logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
