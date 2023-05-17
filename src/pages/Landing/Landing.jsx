// npm modules
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

//services
import * as profileService from '../../services/profileService'

//components
import ResumeForm from '../../components/ResumeForm/ResumeForm'
import BrandForm from '../../components/BrandForm/BrandForm'
import ProfileJobCard from '../../components/ProfileJobCard/ProfileJobCard'
import ProfileResourceCard from '../../components/ProfileResourceCard/ProfileResourceCard'
import Icon from '../../components/Icon/Icon'

//assets
import profileIcon from '../../assets/icons/circle-user.png'

// css
import styles from './Landing.module.css'

const Landing = ({ user, profile, setProfile }) => {
  const [displayResumeForm, setDisplayResumeForm] = useState(false)
  const [displayBrandForm, setDisplayBrandForm] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      setProfile(null)
      navigate('/auth/login')
    }
  }, [user])

  const handleAddResume = async (resumeFormData) => {
    const newResume = await profileService.createResume(user, resumeFormData)
    setProfile({...profile, ...newResume})
    setDisplayResumeForm(false)
  }
  
  const handleAddBrand = async (brandFormData) => {
    const updatedProfileBrand = await profileService.createBrandStatement(user, brandFormData)
    setProfile({...updatedProfileBrand})
    setDisplayBrandForm(false)
  }

  function handleResumeClick() {
    setDisplayResumeForm(true)

  }
  function handleBrandClick() {
    setDisplayBrandForm(true)
  }

  if (!profile) return <p>Loading profile...</p>

  const photo = profile.photo ? profile.photo : profileIcon
  const resume = profile.baseResume ? profile.baseResume : ''
  const brandStatement = profile.brandStatement ? profile.brandStatement : ''
  const jobsToDisplay = profile.applications.sort((a, b) => (
    new Date(b.updatedAt) - new Date(a.updatedAt)
  )).slice(0, 3)
  
  return (
    <main className={styles.container}>
      <section className={styles.profile}>
        <div className={styles.info}>
      
          <img src={photo} alt="user" />
          <h1>{profile.name}</h1>
          <p className={styles.password}>
            <NavLink to="/auth/change-password">
              Change Password
            </NavLink>
          </p>
        </div>
        <div className={styles.resume}>
          <h2>My Resume:</h2>
          {(!resume) || displayResumeForm ? 
            <ResumeForm
              resume={resume}
              handleAddResume={handleAddResume}
            /> 
          : 
            <div className={styles.personalcontent}>
              <a href={resume.toString()}><Icon category="File"/></a>
              <button className={styles.edit} onClick={handleResumeClick}>Change</button>
            </div>
          }
        </div>
        <div className={styles.brand}>
          <h2>My Brand Statement:</h2>
          {(!brandStatement) || displayBrandForm ? 
            <BrandForm
              brandStatement={brandStatement}
              handleAddBrand={handleAddBrand}
            />
          : 
            <div className={styles.personalcontent}> 
              <a href={brandStatement.toString()}><Icon category="File"/></a>
              <button className={styles.edit} onClick={handleBrandClick}>Change</button>
            </div>
          }
        </div>
      </section>
      <section className={styles.right}>
        <div className={styles.resources}>
          <h3 className={styles.tabletitle}>My Starred Resources</h3>
          <div className={styles.table}>
            <header className={styles.resourcesheader}>
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
          <h3 className={styles.tabletitle}>My 3 Most Recent Applications</h3>
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
                <h4>Link</h4>
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
