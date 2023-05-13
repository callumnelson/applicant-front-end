// npm modules
import { useState, useEffect } from "react"

// services
import * as jobsService from '../../services/jobsService'

// styles
import styles from './Jobs.module.css'

// components


const Jobs = ({user, }) => {
  const [jobs, setJobs] = useState(null)
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
            <p>Title</p>
            <p>Company</p>
            <p>Listing</p>
            <p>Status</p>
            <p>Priority</p>
            <p>Salary</p>
          </header>
          {jobs.map(job => (
            <div key={job._id} className={styles.jobCard}>
              <h1>{job.title}</h1>
            </div>
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