// npm modules
import { useState, useEffect } from "react"

// services
import * as jobsService from '../../services/jobsService'

// styles
import styles from './Jobs.module.css'

// components
import JobCard from "../../components/JobCard/JobCard"
import JobForm from "../../components/JobForm/JobForm"

const Jobs = ({user, }) => {
  const [jobs, setJobs] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [search, setSearch] = useState("")
  const [addJob, setAddJob] = useState(false)
  const [editedJob, setEditedJob] = useState(null)

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

  const handleAddJob = async (newJobFormFormData) => {
    const JobForm = await jobsService.create(newJobFormFormData)
    setJobs([JobForm, ...jobs])
    setAddJob(false)
  }

  const handleUpdateJob = async (updatedJobFormData) => {
    const updatedJob = await jobsService.update(updatedJobFormData)
    setJobs(jobs.map(j => j._id === updatedJob._id ? updatedJob : j))
    setEditedJob(null)
  }

  const handleDeleteJob = async (job) => {
    const deletedJob = await jobsService.deleteJob(job._id)
    setJobs(jobs.filter(j => j._id !== deletedJob._id))
  }

  const handleClickAddJob = () => {
    setAddJob(true)
    setSelectedJob(null)
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
              onClick={handleClickAddJob}
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
          {addJob && 
            <JobForm 
              handleAddJob={handleAddJob} 
              setAddJob={setAddJob}
            />
          }
          {jobs.map(job => (
            editedJob && job._id === editedJob._id ?
            <JobForm 
              key={job._id}
              editedJob={editedJob}
              setEditedJob={setEditedJob}
              handleUpdateJob={handleUpdateJob}
            />
            :
            <JobCard 
              key={job._id}
              job={job}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              setEditedJob={setEditedJob}
              handleDeleteJob={handleDeleteJob}
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