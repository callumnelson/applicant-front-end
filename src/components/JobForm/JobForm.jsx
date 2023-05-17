// npm modules
import { useState } from "react"

// components
import Icon from "../Icon/Icon"

// css
import styles from './JobForm.module.css'

// assets
import profileIcon from '../../assets/icons/circle-user.png'

const JobForm = ({handleAddJob, setAddJob, editedJob, setEditedJob, handleUpdateJob}) => {

  const [formData, setFormData] = useState(
    editedJob ? editedJob : {
    title: '',
    company: '',
    jobListing: '',
    status: 'Interested',
    priority: 'Dream Job',
    salary: 50000,
    contactName: '',
    contactEmail: '',
    jobResume: '',
    jobCoverLetter: ''
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editedJob) handleUpdateJob(formData)
		else handleAddJob(formData)
  }

  const handleCancel = () => {
    if (editedJob) setEditedJob(null)
    else setAddJob(false)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.row}>
          <div>
            <p>
              Job Info
            </p>
          </div>
          <div className={styles.title}>
            <input
              required
              type="text"
              name="title"
              id="title-input"
              value={formData.title}
              placeholder="Title"
              onChange={handleChange}
            />
          </div>
          <div className={styles.company}>
            <input
              required
              type="text"
              name="company"
              id="company-input"
              value={formData.company}
              placeholder="Company"
              onChange={handleChange}
            />
          </div>
          <div className={styles.salary}>
            <input
              required
              type="number"
              name="salary"
              id="salary-input"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
          <div className={styles.status}>
            <select
              required
              name="status"
              id="status-input"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Interested">Interested</option>
              <option value="To Apply">To Apply</option>
              <option value="Preparing Materials">Preparing Materials</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>
          <div className={styles.priority}>
            <select
              required
              name="priority"
              id="priority-input"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Dream Job">Dream Job</option>
              <option value="Great Option">Great Option</option>
              <option value="Totally Fine">Totally Fine</option>
              <option value="Will Pay Bills">Will Pay Bills</option>
            </select>
          </div>
          <div className={styles.jobListing}>
            <input
              required
              type="url"
              name="jobListing"
              id="jobListing-input"
              value={formData.jobListing}
              placeholder="Listing url"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.detailsCard}>
          <div className={styles.contact}>
            <header>
              <img src={profileIcon} alt="Profile Icon" />
              <h3>Contact Info</h3>
            </header>
            <div className={styles.contactName}>
              <p>Name: </p>
              <input
                type="text"
                name="contactName"
                id="contactName-input"
                value={formData.contactName}
                placeholder="Contact Name"
                onChange={handleChange}
              />
            </div>
            <div className={styles.contactEmail}>
              <p>Email: </p>
              <input
                type="email"
                name="contactEmail"
                id="contactEmail-input"
                value={formData.contactEmail}
                placeholder="Contact Email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.documents}>
            <header>
              <h3>📄 Documents</h3>
            </header>
            <div className={styles.jobResume}>
              <p>Resume: </p>
              <input
                type="url"
                name="jobResume"
                id="jobResume-input"
                value={formData.jobResume}
                placeholder="Resume url"
                onChange={handleChange}
              />
            </div>
            <div className={styles.jobCoverLetter}>
              <p>Cover Letter: </p>
              <input
                type="url"
                name="jobCoverLetter"
                id="jobCoverLetter-input"
                value={formData.jobCoverLetter}
                placeholder="Cover Letter url"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <div>
              <button onClick={handleCancel}>
                <Icon category={'Cancel'}/>
              </button>
            </div>
            <div>
              <button type="submit">
                <Icon category={'Check'} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
 
export default JobForm