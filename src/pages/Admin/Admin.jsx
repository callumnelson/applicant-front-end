// npm modules
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'

//components
import Icon from '../../components/Icon/Icon'

// pages 
import Loading from '../Loading/Loading'

// css
import styles from './Admin.module.css'

// assets
import profileIcon from '../../assets/icons/circle-user.png'

const Admin = ({profile}) => {
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([])
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  const handleClickTrash = (profileId) => {
    setDeleting(profileId)
  }

  const handleDelete = async (profileId) => {
    const deletedProfile = await profileService.deleteProfile(profileId)
    setProfiles(profiles.filter(p => p._id !== deletedProfile._id))
  }

  if (!profile || !profiles.length) return <Loading />

  if (profile.role < 300) navigate('/')
  
  return (
    <main className={styles.container}>
      <h1>Admin Portal</h1>
      <div>
        {profiles.map(profile => (
          <div key={profile._id} className={styles.card}>
            <div className={deleting === profile._id ? styles.deleting : styles.hiding}>
              <button onClick={() => handleClickTrash(null)}>
                Cancel
              </button>
              <button onClick={() => handleDelete(profile._id)}>
                Confirm Delete
              </button>
            </div>
            <div className={deleting === profile._id ? styles.nocontent : styles.content}>
              <header className={styles.userheader}>
                <div>
                  <img src={profile.photo ? profile.photo : profileIcon} alt="user" />
                  <h2>{profile.name}</h2>
                </div>
                <p onClick={() => handleClickTrash(profile._id)}>
                  <Icon category="Trash"/>
                </p>
              </header>
              <div>
                <p>Role: {profile.role === 100 ? 'User' : profile.role === 200 ? 'Coach' : 'Admin'}</p>
                <p># jobs: {profile.applications.length}</p>
              </div>
              <div>
                <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
                <p>Last Activity: {new Date(profile.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Admin
