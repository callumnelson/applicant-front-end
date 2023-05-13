// npm modules
import { useState, useEffect } from "react"

// services
import * as jobsService from '../../services/jobsService'

// styles
import styles from './Jobs.module.css'

// components
import JobCard from "../../components/JobCard/JobCard"
import NewJob from "../../components/NewJob/NewJob"

const Jobs = ({user, }) => {
  const [jobs, setJobs] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [search, setSearch] = useState("")
  const [addJob, setAddJob] = useState(false)

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

  const handleAddJob = async (newJobFormData) => {
    const newJob = await jobsService.create(newJobFormData)
    setJobs([newJob, ...jobs])
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
            <button
              onClick={() => setAddJob(true)}
            >
              Add Job
            </button>
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
          {addJob && <NewJob handleAddJob={handleAddJob}/>}
          {jobs.map(job => (
            <JobCard 
              key={job._id}
              job={job}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
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