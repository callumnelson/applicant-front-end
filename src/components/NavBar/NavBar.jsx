// npm modules
import { NavLink } from 'react-router-dom'

// assets
import logo from '../../assets/branding/logo.svg'

// css
import styles from './NavBar.module.css'

const NavBar = ({ user, profile, handleLogout }) => {

  const publicLinks = (
    <ul>
      <li><NavLink to="/auth/login">LOG IN</NavLink></li>
      <li><NavLink to="/auth/signup">SIGN UP</NavLink></li>
    </ul>
  )

  const protectedLinks = (
    <ul>
      {
        profile.role > 200 ?
        <li>
          <NavLink to="/admin">ADMIN</NavLink>
        </li>
        :
        <>
        </>
      }
      <li>
        <NavLink to="/jobs">JOBS</NavLink>
      </li>
      <li>
        <NavLink to="/resources">RESOURCES</NavLink>
      </li>
      <li>
        <NavLink to="/auth/logout" onClick={handleLogout}>LOG OUT</NavLink>
      </li>
    </ul>
  )

  return (
    <nav className={styles.container}>
      <NavLink to="/">
        <img src={logo} alt="appliCANt logo" />
      </NavLink>
      {user ? protectedLinks : publicLinks}
    </nav>
  )
}

export default NavBar
