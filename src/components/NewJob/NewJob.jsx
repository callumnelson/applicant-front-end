// npm modules
import { useState } from "react"

// css
import styles from './NewJob.module.css'

const NewJob = ({handleAddJob}) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    jobListing: '',
    status: 'Interested',
    priority: 'Dream Job',
    salary: 50000
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
		handleAddJob(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <div className={styles.jobListing}>
          <input
            required
            type="text"
            name="jobListing"
            id="jobListing-input"
            value={formData.jobListing}
            placeholder="Listing link"
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
            <option value="Totally Fine">Preparing Materials</option>
            <option value="Will Pay Bills">Will Pay Bills</option>
          </select>
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
        <button
          onClick={() => setAddJob(false)}
        >
          Cancel
        </button>
        <button type="submit">SUBMIT</button>
      </form>
  )
}
 
export default NewJob