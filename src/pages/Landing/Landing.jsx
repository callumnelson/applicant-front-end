//components
import JobCard from '../../components/JobCard/JobCard'
import ResourceCard from '../../components/ResourceCard/ResourceCard'

// npm modules
import { NavLink } from 'react-router-dom'

//assets
import logo from '../../assets/branding/logo.svg'
import profileIcon from '../../assets/icons/profile.png'

// css
import styles from './Landing.module.css'

const Landing = ({ user, profile }) => {
  if (!user) return <img src={logo} alt="appliCANt logo" />
  if (!profile) return <p>Loading profile...</p>

  const photo = profile.photo ? profile.photo : profileIcon
  console.log(profile)
  return (
    <main className={styles.container}>
      <section className={styles.profile}>
        <div className={styles.info}>
          <img src={photo} alt="user" />
          <h2>{profile.name}</h2>
        </div>
        <div className="resume">
          <h3>My Resume</h3>
            <p>add resume</p>
        </div>
        <div className="brand">
          <h3>My Branding Statement</h3>
            <p>add statement</p>
        </div>
      <NavLink to="/auth/change-password">Change Password</NavLink>
      </section>
      <section className={styles.right}>
        <div className={styles.resources}>
          <h3>Starred Resources</h3>
          {profile.starredResources.map(resource =>
              <ResourceCard key={resource._id} resource={resource}/>
            )}

        </div>
        <div className={styles.jobs}>
          <h3>Applications I'm Working On</h3>
          {profile.applications.map(job =>
            <JobCard key={job._id} job={job} />
          )}
        </div>
      </section>
    </main>
  )
}

export default Landing
