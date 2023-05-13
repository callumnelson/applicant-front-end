// npm modules
import { NavLink } from 'react-router-dom'

// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      <NavLink to="/auth/change-password">Change Password</NavLink>
    </main>
  )
}

export default Landing
