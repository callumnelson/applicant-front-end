// npm modules
import { useState, useEffect } from "react"

// services
import * as jobsService from '../../services/jobsService'

// styles
import styles from './Jobs.module.css'

// pages
import Loading from "../Loading/Loading"

// components
import JobCard from "../../components/JobCard/JobCard"
import JobForm from "../../components/JobForm/JobForm"
import Notes from "../../components/Notes/Notes"
import JobsHeader from "../../components/JobsHeader/JobsHeader"

const Jobs = ({profile, setProfile}) => {
  const [displayedJobs, setDisplayedJobs] = useState(null)
  const [allJobs, setAllJobs] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState({schemaName: "createdAt", order: 1})
  const [filter, setFilter] = useState({status: "", priority: ""})
  const [addJob, setAddJob] = useState(false)
  const [editedJob, setEditedJob] = useState(null)
  const [notesCategory, setNotesCategory] = useState("Resume")

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobsService.index()
      setDisplayedJobs(data.sort((a, b) => (
        new Date(b.createdAt) - new Date(a.createdAt))
      ))
      setAllJobs(data)
      if(!data.length) setAddJob(true)
    }
    fetchJobs()
  }, [])

  const headers = [{col: 'Created', schemaName: 'createdAt'},
    {col: 'Title', schemaName: 'title'}, 
    {col: 'Company', schemaName: 'company'}, 
    {col: 'Salary', schemaName: 'salary'},
    {col: 'Status', schemaName: 'status'},
    {col: 'Priority', schemaName: 'priority'}, 
    {col: 'Link', schemaName: 'jobListing'}, 
  ]

  const handleAddJob = async (newJobFormData) => {
    const newJob = await jobsService.create(newJobFormData)
    setDisplayedJobs([newJob, ...allJobs])
    setAllJobs([newJob, ...allJobs])
    setSearch("")
    setSort({schemaName: "createdAt", order: 1})
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
    if(allJobs.length < 2) setAddJob(true)
  }

  const handleClickAddJob = () => {
    setAddJob(true)
    setSelectedJob(null)
    setEditedJob(null)
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
    const sortedJobs = [...displayedJobs].sort((a, b) => sortJobs(a, b, clickedCol, newSortOrder))
    setDisplayedJobs(sortedJobs)
  }

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value
    setSelectedJob(null)
    setEditedJob(null)
    setAddJob(false)
    setSearch(searchTerm)
    setDisplayedJobs(
      allJobs.filter(j => (
      (j.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()))
      && 
      j.status.includes(filter.status) 
      && 
      j.priority.includes(filter.priority)
      ))
      .sort((a, b) => sortJobs(a, b, sort.schemaName, sort.order))
    )
  }

  const handleUpdateFilter = (e, schemaName) => {
    const newFilter = {...filter, [schemaName]: e.target.value}
    setFilter(newFilter)
    setDisplayedJobs(allJobs.filter(j => (
      j.status.includes(newFilter.status) && j.priority.includes(newFilter.priority)
    )))
  }

  const sortJobs = (a, b, sortCol, sortOrder) => {
    if (sortCol === 'salary'){
      return sortOrder > 0 ? 
        b[sortCol] - a[sortCol]
          :
        a[sortCol] - b[sortCol]
    }else if(sortCol === 'createdAt'){
      return sortOrder > 0 ? 
        new Date(b[sortCol]) - new Date(a[sortCol])
          :
          new Date(a[sortCol]) - new Date(b[sortCol])
    }
    else {
      return sortOrder > 0 ? 
        a[sortCol].localeCompare(b[sortCol])
          :
        b[sortCol].localeCompare(a[sortCol])
    }
  }
  
  if (!allJobs) return <Loading />

  return ( 
    <main className={styles.container}>
      <section className={styles.jobs}>
        <nav>
          <h1>Jobs ({displayedJobs.length})</h1>
          <div>
            <button
              onClick={handleClickAddJob}
            >
              Add Job
            </button>
            <input
              className={styles.search}
              type="text"
              value={search}
              name="search"
              placeholder="Search..."
              onChange={handleSearchChange}
              />
          </div>
        </nav>
        <div className={styles.table}>
          <JobsHeader 
            headers={headers}
            handleUpdateSort={handleUpdateSort}
            sort={sort}
            handleUpdateFilter={handleUpdateFilter}
          />
          {addJob && 
            <JobForm 
              handleAddJob={handleAddJob} 
              setAddJob={setAddJob}
            />
          }
          <section>
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
                setAddJob={setAddJob}
              />
            ))}
          </section>
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