// npm modules
import { useState, useEffect } from "react"

// services
import * as jobsService from '../../services/jobsService'

// styles
import styles from './Jobs.module.css'

// components
import JobCard from "../../components/JobCard/JobCard"

const Jobs = ({user, }) => {
  const [jobs, setJobs] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobsService.index()
      setJobs(data)
    }
    fetchJobs()
  }, [])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSelectJob = (job) => {
    setSelectedJob(job)
  }
  
  if (!jobs) return <h1>Loading...</h1>

  return ( 
    <main className={styles.container}>
      <section className={styles.jobs}>
        <nav>
          <h1>Jobs</h1>
          <div>
            <input
              type="text"
              value={search}
              name="search"
              placeholder="Search..."
              onChange={handleSearchChange}
              />
            <button>Add Job</button>
          </div>
        </nav>
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
          {jobs.map(job => (
            <JobCard 
              key={job._id} 
              className={styles.jobCard} 
              job={job}
            />
          ))}
        </div>
      </section>
      <section className={styles.notes}>
        <h1>Notes</h1>
      </section>
    </main>
  )
}

export default Jobs