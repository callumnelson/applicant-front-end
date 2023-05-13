// npm modules
import { NavLink } from 'react-router-dom'

//assets
import logo from '../../assets/branding/logo.svg'

// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  if (!user) return <img src={logo} alt="appliCANt logo" />

  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      <NavLink to="/auth/change-password">Change Password</NavLink>
    </main>
  )
}

export default Landing
