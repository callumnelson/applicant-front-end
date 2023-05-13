// npm modules
import { NavLink } from 'react-router-dom'

//assets
import logo from '../../assets/branding/logo.svg'

// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  if (!user) return <img src={logo} alt="appliCANt logo" />

  console.log(user)

  return (
    <main className={styles.container}>
      <div className="profile-info">
        <img src={user.photo} alt="user" />
        <h3>{user.name}</h3>
      </div>
      <NavLink to="/auth/change-password">Change Password</NavLink>
    </main>
  )
}

export default Landing
