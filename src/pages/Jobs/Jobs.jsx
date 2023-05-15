// npm modules
import { useState, useEffect } from "react"

// services
import * as jobsService from '../../services/jobsService'

// styles
import styles from './Jobs.module.css'

// components
import JobCard from "../../components/JobCard/JobCard"
import JobForm from "../../components/JobForm/JobForm"
import Notes from "../../components/Notes/Notes"
import JobsHeader from "../../components/JobsHeader/JobsHeader"

const Jobs = ({profile, setProfile}) => {
  const [displayedJobs, setDisplayedJobs] = useState([])
  const [allJobs, setAllJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState({schemaName: "title", order: 1})
  const [addJob, setAddJob] = useState(false)
  const [editedJob, setEditedJob] = useState(null)
  const [notesCategory, setNotesCategory] = useState("Resume")

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobsService.index()
      setDisplayedJobs(data.sort((a, b) => a.title.localeCompare(b.title)))
      setAllJobs(data.sort((a, b) => a.title.localeCompare(b.title)))
    }
    fetchJobs()
  }, [])

  const headers = [{col: 'Title', schemaName: 'title'}, 
    {col: 'Company', schemaName: 'company'}, 
    {col: 'Listing', schemaName: 'jobListing'}, 
    {col: 'Status', schemaName: 'status'},
    {col: 'Priority', schemaName: 'priority'}, 
    {col: 'Salary', schemaName: 'salary'}]

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value
    setSelectedJob(null)
    setEditedJob(null)
    setAddJob(null)
    setSearch(searchTerm)
    setDisplayedJobs(allJobs.filter(j => (
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase())
    )))
  }

  const handleAddJob = async (newJobFormData) => {
    const newJob = await jobsService.create(newJobFormData)
    setDisplayedJobs([newJob, ...displayedJobs])
    setAddJob(false)
    setProfile({...profile, applications: [newJob, ...allJobs]})
  }

  const handleUpdateJob = async (updatedJobFormData) => {
    const updatedJob = await jobsService.update(updatedJobFormData)
    setDisplayedJobs(displayedJobs.map(j => j._id === updatedJob._id ? updatedJob : j))
    setAllJobs(allJobs.map(j => j._id === updatedJob._id ? updatedJob : j))
    setEditedJob(null)
    setProfile({...profile, applications: allJobs.map(j => j._id === updatedJob._id ? updatedJob : j)})
  }

  const handleDeleteJob = async (job) => {
    const deletedJob = await jobsService.deleteJob(job._id)
    setDisplayedJobs(displayedJobs.filter(j => j._id !== deletedJob._id))
    setAllJobs(allJobs.filter(j => j._id !== deletedJob._id))
    setProfile({...profile, applications: allJobs.filter(j => j._id !== deletedJob._id)})
  }

  const handleClickAddJob = () => {
    setAddJob(true)
    setSelectedJob(null)
  }

  const handleAddNote = async (job, noteFormData) => {
    const updatedJob = await jobsService.createNote(job._id, noteFormData)
    setDisplayedJobs(displayedJobs.map(j => j._id === updatedJob._id ? updatedJob : j))
    setAllJobs(allJobs.map(j => j._id === updatedJob._id ? updatedJob : j))
    setSelectedJob(updatedJob)
    setProfile({...profile, applications: allJobs.map(j => j._id === updatedJob._id ? updatedJob : j)})
  }

  const handleDeleteNote = async (job, noteToDelete) => {
    const updatedJob = await jobsService.deleteNote(job._id, noteToDelete._id)
    setDisplayedJobs(displayedJobs.map(j => j._id === updatedJob._id ? updatedJob : j))
    setAllJobs(allJobs.map(j => j._id === updatedJob._id ? updatedJob : j))
    setSelectedJob(updatedJob)
    setProfile({...profile, applications: allJobs.map(j => j._id === updatedJob._id ? updatedJob : j)})
  }

  const handleUpdateSort = (e) => {
    const clickedCol = e.target.id
    const newSortOrder = clickedCol === sort.schemaName ? 
      sort.order * -1 : 1
    setSort({schemaName: clickedCol, order: newSortOrder})
    const sortedJobs = [...displayedJobs].sort((a, b) => {
      if (clickedCol === 'salary'){
        return newSortOrder > 0 ? 
          a[clickedCol] - b[clickedCol]
            :
          b[clickedCol] - a[clickedCol]
      }else {
        return newSortOrder > 0 ? 
          a[clickedCol].localeCompare(b[clickedCol])
            :
          b[clickedCol].localeCompare(a[clickedCol])
      }
    })
    setDisplayedJobs(sortedJobs)
  }
  
  if (!allJobs) return <h1>Loading...</h1>

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
          <JobsHeader 
            headers={headers}
            handleUpdateSort={handleUpdateSort}
            sort={sort}
          />
          {addJob && 
            <JobForm 
              handleAddJob={handleAddJob} 
              setAddJob={setAddJob}
            />
          }
          {displayedJobs.map(job => (
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
              notesCategory={notesCategory}
              setNotesCategory={setNotesCategory}
            />
          ))}
        </div>
      </section>
      <section className={styles.notes}>
        <Notes 
          selectedJob={selectedJob} 
          notesCategory={notesCategory}
          setNotesCategory={setNotesCategory}
          handleAddNote={handleAddNote}
          handleDeleteNote={handleDeleteNote}
        />
      </section>
    </main>
  )
}

export default Jobs