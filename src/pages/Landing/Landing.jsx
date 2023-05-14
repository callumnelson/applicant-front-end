// npm modules
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

//components
import JobCard from '../../components/JobCard/JobCard'
import ResourceCard from '../../components/ResourceCard/ResourceCard'

//assets
import logo from '../../assets/branding/logo.svg'
import profileIcon from '../../assets/icons/profile.png'

// css
import styles from './Landing.module.css'

const Landing = ({ user, profile }) => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedResource, setSelectedResource] = useState(null)

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
          <div className={styles.table}>
            <header>
              <div className={styles.name}>
                <h4>Name</h4>
              </div>
              <div className={styles.category}>
                <h4>Category</h4>
              </div>
              <div className={styles.rating}>
                <h4>Average Rating</h4>
              </div>
              <div className={styles.link}>
                <h4>Link</h4>
              </div>
            </header>
            {profile.starredResources.map(resource =>
                <ResourceCard 
                  key={resource._id} 
                  resource={resource}
                  selectedResource={selectedResource} 
                  setSelectedResource={setSelectedResource}
                />
              )}
          </div>
        </div>
        <div className={styles.jobs}>
          <h3>My Newest Applications</h3>
          <div className={styles.table}>
            <header>
              <div className={styles.title}>
                <h4>Title</h4>
              </div>
              <div className={styles.company}>
                <h4>Company</h4>
              </div>
              <div className={styles.listing}>
                <h4>Listing</h4>
              </div>
              <div className={styles.status}>
                <h4>Status</h4>
              </div>
              <div className={styles.priority}>
                <h4>Priority</h4>
              </div>
              <div className={styles.salary}>
                <h4>Salary</h4>
              </div>
            </header>
            {profile.applications.map(job =>
              <JobCard 
              key={job._id} 
              job={job} 
              setSelectedJob={setSelectedJob}
              selectedJob={selectedJob}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
