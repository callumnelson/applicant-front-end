// npm modules
import { NavLink } from 'react-router-dom'

//assets
import logo from '../../assets/branding/logo.svg'

// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  if (!user) return <img src={logo} alt="appliCANt logo" />

  console.log(user.profile)

  return (
    <main className={styles.container}>
      <div className="profile-info">
        <img src={user.photo} alt="user" />
        <h2>{user.name}</h2>
        <h3>Resume:</h3>
          <p>add resume</p>
        <h3>Branding Statement:</h3>
          <p>add statement</p>
      <NavLink to="/auth/change-password">Change Password</NavLink>
      </div>
      <div className="resources">
        <h3>Starred Resources:</h3>
        <ul>
          <li>Resource</li>
          <li>Resource</li>
          <li>Resource</li>
        </ul>
      </div>
      <div className='jobs'>
        <h3>Applications I'm Working On:</h3>
        <ul>
          <li>Job</li>
          <li>Job</li>
          <li>Job</li>
        </ul>
      </div>
    </main>
  )
}

export default Landing
