// npm modules
import { NavLink } from 'react-router-dom'

//assets
import logo from '../../assets/branding/logo.svg'
// import profile from '../../assets/icons/profile.png'

// css
import styles from './Landing.module.css'

const Landing = ({ user, profile }) => {
  if (!user) return <img src={logo} alt="appliCANt logo" />

  console.log(profile)

  return (
    <main className={styles.container}>
      <section className={styles.profile}>
        <div className={styles.info}>
          <img src={profile.photo} alt="user" />
          <h2>{profile.name}</h2>
        </div>
        <div className="resume">
          <h3>Resume</h3>
            <p>add resume</p>
        </div>
        <div className="brand">
          <h3>Branding Statement</h3>
            <p>add statement</p>
        </div>
      <NavLink to="/auth/change-password">Change Password</NavLink>
      </section>
      <section className={styles.right}>
        <div className={styles.resources}>
          {profile.starredResources.map((resource) =>
          )}
          <h3>Starred Resources</h3>
          <ul>
            <li>Resource</li>
            <li>Resource</li>
            <li>Resource</li>
          </ul>
        </div>
        <div className={styles.jobs}>
          <h3>Applications I'm Working On</h3>
          <ul>
            <li>Job</li>
            <li>Job</li>
            <li>Job</li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Landing
