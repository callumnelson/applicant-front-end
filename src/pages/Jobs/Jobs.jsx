// npm modules
import { useState, useEffect } from "react"

// services
import * as jobsService from '../../services/jobsService'

// styles
import styles from './Jobs.module.css'

// components


const Jobs = ({user, }) => {
  const [jobs, setJobs] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobsService.index()
      setJobs(data)
    }
    fetchJobs()
  }, [])
  
  if (!jobs) return <h1>Loading...</h1>

  return ( 
    <main className={styles.container}>
      <section>
        <h1>Jobs List</h1>
        {jobs.map(job => (
          <div key={job._id}>
            <h1>{job.title}</h1>
          </div>
        ))}
      </section>
      <section>
        <h1>Notes</h1>
      </section>
    </main>
  )
}

export default Jobs