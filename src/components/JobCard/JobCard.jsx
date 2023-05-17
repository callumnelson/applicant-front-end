// npm modules
import { Link } from 'react-router-dom'

// components
import NotesCategoryButton from '../NotesCategoryButton/NotesCategoryButton'

// css
import styles from './JobCard.module.css'

// assets
import profileIcon from '../../assets/icons/circle-user.png'

const JobCard = ({selectedJob, job, setSelectedJob, setEditedJob, handleDeleteJob, notesCategory, setNotesCategory}) => {
  const selected = selectedJob && selectedJob._id === job._id
  const notesCategories = ['Resume', 'Interview Qs', 'Skills', 'To-Do', 'Networking', 'General']
  
  const handleSelectJob = () => {
    if(selected) setSelectedJob(null)
    else setSelectedJob(job)
    setNotesCategory("Resume")
  }

  const handleChangeEditedJob = () => {
    setEditedJob(job)
    if (job._id !== selectedJob._id) setSelectedJob(null)
  }

  const handleNoteCategoryChange = (e) => {
    setNotesCategory(e.target.value)
  }

  const currOpts = { style: 'currency', currency: 'USD', notation: 'compact'}
  const currFormat = new Intl.NumberFormat('en-US', currOpts)

  return (
    <div>
      <div
        className={
            `${styles.job} ${selected ? styles.selected : ''}`
          }>
        <span>
          <p
            className={styles.dropdown}
            onClick={handleSelectJob}
          >
            {selected ? "⬆️": "⬇️"}
          </p>
        </span>
        <div className={styles.title}>
          <p>{new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
        <div className={styles.title}>
          <p>{job.title}</p>
        </div>
        <div className={styles.company}>
          <p>{job.company}</p>
        </div>
        <div className={styles.salary}>
          <p>{currFormat.format(job.salary)}</p>
        </div>
        <div className={styles.status}>
          <p>{job.status}</p>
        </div>
        <div className={styles.priority}>
          <p id={styles[job.priority.toLowerCase().replaceAll(' ','-')]}>{job.priority}</p>
        </div>
        <div className={styles.jobListing}>
          <p><Link to={job.jobListing}>Posting</Link></p>
        </div>
        <span>
          <p className={styles.edit}
            onClick={handleChangeEditedJob}
          >
            ✏️
          </p>
        </span>
        <span>
          <p className={styles.delete}
            onClick={() => handleDeleteJob(job)}
          >
            🗑️
          </p>
        </span>
      </div>
      <div className={`${styles.details} ${selected ? styles.show : ''}`}>
        <div>
          <div className={styles.contact}>
            <header>
              <img src={profileIcon} alt="Profile Icon" />
              <h3>Contact Info</h3>
            </header>
            <div className={styles.contactName}>
              <p>Name: {job.contactName}</p>
            </div>
            <div className={styles.contactEmail}>
              <p>Email: {job.contactEmail}</p>
            </div>
          </div>
          <div className={styles.documents}>
            <header>
              <h3>📄 Documents</h3>
            </header>
            <div className={styles.resume}>
              <p>Resume:
                {
                  job.resume &&
                  <Link to={job.resume}>📄</Link>
                } 
              </p>
            </div>
            <div className={styles.coverLetter}>
              <p>Cover Letter: 
                {    
                  job.coverLetter &&
                  <Link to={job.coverLetter}>📄</Link>
                } 
              </p>
            </div>
          </div>
        </div>
        <div className={styles.notebuttons}>
          <header>
            <h3>📝 Notes</h3>
          </header>
          <div>
            {notesCategories.map(category => (
              <NotesCategoryButton 
                key={category}
                notesCategory={notesCategory}
                category={category}
                handleNoteCategoryChange={handleNoteCategoryChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default JobCard