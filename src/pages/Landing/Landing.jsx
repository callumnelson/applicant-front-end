// npm modules
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

//services
import * as profileService from '../../services/profileService'

//components
import ResumeForm from '../../components/ResumeForm/ResumeForm'
import BrandForm from '../../components/BrandForm/BrandForm'
import ProfileJobCard from '../../components/ProfileJobCard/ProfileJobCard'
import ProfileResourceCard from '../../components/ProfileResourceCard/ProfileResourceCard'

//assets
import logo from '../../assets/branding/logo.svg'
import profileIcon from '../../assets/icons/profile.png'

// css
import styles from './Landing.module.css'

const Landing = ({ user, profile, setProfile }) => {
  const [displayResumeForm, setDisplayResumeForm] = useState(false)
  const [displayBrandForm, setDisplayBrandForm] = useState(false)

  const handleAddResume = async (resumeFormData) => {
    const updatedProfileResume = await profileService.createResume(user, resumeFormData)
    setProfile(updatedProfileResume)
    setDisplayResumeForm(false)
  }

  const handleAddBrand = async (brandFormData) => {
    const updatedProfileBrand = await profileService.createBrandStatement(user, brandFormData)
    setProfile(updatedProfileBrand)
    setDisplayBrandForm(false)
  }

  function handleResumeClick() {
    setDisplayResumeForm(true)

  }
  function handleBrandClick() {
    setDisplayBrandForm(true)
  }

  if (!user) return <img src={logo} alt="appliCANt logo" />
  if (!profile) return <p>Loading profile...</p>

  console.log(profile)

  const photo = profile.photo ? profile.photo : profileIcon
  const resume = profile.baseResume
  const brandStatement = profile.brandStatement
  const jobsToDisplay = profile.applications.sort((a, b) => (
    new Date(b.updatedAt) - new Date(a.updatedAt)
  )).slice(0, 3)

  return (
    <main className={styles.container}>
      <section className={styles.profile}>
        <div className={styles.info}>
          <img src={photo} alt="user" />
          <h1>{profile.name}</h1>
        </div>
        <div className={styles.resume}>
          <h2>My Resume:</h2>
          {(!resume) || displayResumeForm ? 
            <ResumeForm
              handleAddResume={handleAddResume}
            /> 
          : 
            <div className={styles.personalcontent}>
              <a href={resume.toString()}>fuck</a>
              <button className={styles.edit} onClick={handleResumeClick}>✏️</button>
            </div>
          }
        </div>
        <div className={styles.brand}>
          <h2>My Brand Statement:</h2>
          {(!brandStatement) || displayBrandForm ? 
            <BrandForm
              handleAddBrand={handleAddBrand}
            />
          : 
            <div className={styles.personalcontent}> 
              <a href={brandStatement.toString()}>this is worse than i thought</a>
              <button className={styles.edit} onClick={handleBrandClick}>✏️</button>
            </div>
          }
        </div>
      <div className={styles.password}> 
        <NavLink to="/auth/change-password">
          Change Password
        </NavLink>
      </div>
      </section>
      <section className={styles.right}>
        <div className={styles.resources}>
          <h3 className={styles.tabletitle}>My Starred Resources</h3>
          <div className={styles.table}>
            <header>
              <div className={styles.title}>
                <h4>Date Added</h4>
              </div>
              <div className={styles.title}>
                <h4>Name</h4>
              </div>
              <div className={styles.title}>
                <h4>Category</h4>
              </div>
              <div className={styles.title}>
                <h4>Link</h4>
              </div>
            </header>
            <div className={styles.list}>
              {(!profile.starredResources.length) ?
                <h4>No starred resources</h4> :
                profile.starredResources.map(resource =>
                  <ProfileResourceCard 
                    key={resource._id} 
                    resource={resource}
                  />
                )
              }
            </div>
          </div>
        </div>
        <div className={styles.jobs}>
          <h3 className={styles.tabletitle}>My Most Recent Applications</h3>
          <div className={styles.table}>
            <header className={styles.jobsheader}>
              <div className={styles.title}>
                <h4>Date Added</h4>
              </div>
              <div className={styles.title}>
                <h4>Title</h4>
              </div>
              <div className={styles.title}>
                <h4>Company</h4>
              </div>
              <div className={styles.title}>
                <h4>Salary</h4>
              </div>
              <div className={styles.title}>
                <h4>Status</h4>
              </div>
              <div className={styles.title}>
                <h4>Priority</h4>
              </div>
              <div className={styles.title}>
                <h4>Listing</h4>
              </div>
            </header>
            <div className={styles.list}>
              {(!profile.applications.length) ?
                <h4>No jobs</h4> :
                jobsToDisplay.map(job =>
                  <ProfileJobCard 
                    key={job._id} 
                    job={job} 
                  />
                )
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
