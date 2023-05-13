// npm modules
import { useState, useEffect } from "react"


// services
import * as jobService from '../../services/jobsService'

// styles


// components


const Jobs = ({user, }) => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobService.index()
      setJobs(data)
    }
    fetchJobs()
  }, [])
  
  return ( 
    <main>
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