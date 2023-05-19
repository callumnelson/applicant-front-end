// npm modules
import { useState, useEffect } from "react"

// services
import * as resourceService from '../../services/resourcesService'

// styles
import styles from './Resources.module.css'

// components
import ResourceCard from "../../components/ResourceCard/ResourceCard"
import ResourceForm from "../../components/ResourceForm/ResourceForm"
import Reviews from "../../components/Reviews/Reviews"

//page
import Loading from "../Loading/Loading"


const Resources = ({user, profile, setProfile, handleAddStarredResource, handleRemoveStarredResource }) => {
  const [resources, setResources] = useState(null)
  const [displayedResources, setDisplayedResources] = useState([])
  const [selectedResource, setSelectedResource] = useState(null)
  const [search, setSearch] = useState('')
  const [addResource, setAddResource] = useState(false)
  const [editedResource, setEditedResource] = useState(null)
  const [catergoryFilter, setCategoryFilter] = useState('')
  const [nameSort, setNameSort] = useState('none')
  const [ratingSort, setRatingSort] = useState('none')
  const [dateSort, setDateSort] = useState(false)

  useEffect(() => {
    const fetchResources = async () => {
      const data = await resourceService.index()
      const sortedByDateData = data.sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
      )
      setResources(sortedByDateData)
      setDisplayedResources(sortedByDateData)
    }
    fetchResources()
  }, [])

  const handleSearchChange = (e) => {
    setNameSort('none')
    setRatingSort('none')
    setDateSort(false)
    setSelectedResource(null)
    setSearch(e.target.value)
    const searchFilteredResources = resources.filter(resource => resource.name.toLowerCase().includes(e.target.value.toLowerCase()))
    if (catergoryFilter === '') {
      setDisplayedResources(searchFilteredResources)
    } else {
      const categoryFilteredResources = searchFilteredResources.filter(resource => resource.category === catergoryFilter)
      setDisplayedResources(categoryFilteredResources)
    }
  }

  const handleClickAddResource = () => {
    setAddResource(true)
    setSelectedResource(null)
    setEditedResource(null)
  }

  const handleAddResource = async (newResourceFormData) => {
    const newResource = await resourceService.create(newResourceFormData)
    setDisplayedResources([newResource, ...resources])
    setResources([newResource, ...resources])
    setAddResource(false)
    resetFilters()
  }

  const handleUpdateResource = async (updatedResourceFormData) => {
    const updatedResource = await resourceService.update(updatedResourceFormData)
    setDisplayedResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
    setSelectedResource(updatedResource)
    setEditedResource(null)
    resetFilters()
  }

  const handleDeleteResource = async (resource, resourcesDisplayed = displayedResources) => {
    const deletedResource = await resourceService.deleteResource(resource._id)
    setDisplayedResources(resourcesDisplayed.filter(r => r._id !== deletedResource._id))
    setResources(resources.filter(r => r._id !== deletedResource._id))
    setSelectedResource(null)
  }

  const resetFilters = () => {
    setNameSort('none')
    setRatingSort('none')
    setDateSort(false)
    setCategoryFilter('')
    setSearch('')
  }

  const handleAddReview = async (selectedResource, reviewFormData) => {
    const updatedResource = await resourceService.createReview(selectedResource._id, reviewFormData)
    setSelectedResource(updatedResource)
    setDisplayedResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
  }

  const handleUpdateReview = async (selectedResource, review, updatedReviewFormData) => {
    const updatedResource = await resourceService.updateReview(selectedResource._id, review._id, updatedReviewFormData)
    setSelectedResource(updatedResource)
    setDisplayedResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
  }

  const handleDeleteReview = async (selectedResource, review) => {
    const updatedResource = await resourceService.deleteReview(selectedResource._id, review._id)
    setSelectedResource(updatedResource)
    setDisplayedResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
  }

  const handleCategoryFilterChange = (e) => {
    setNameSort('none')
    setRatingSort('none')
    setDateSort(false)
    setCategoryFilter(e.target.value)
    if (e.target.value === '') {
      const searchFilteredResources = resources.filter(resource => resource.name.toLowerCase().includes(search.toLowerCase()))
      setDisplayedResources(searchFilteredResources)
    } else {
      const categoryFilteredResources = resources.filter(resource => resource.category === e.target.value)
      const searchFilteredResources = categoryFilteredResources.filter(resource => resource.name.toLowerCase().includes(search.toLowerCase()))
      setDisplayedResources(searchFilteredResources)
    }
  }

  const handleSortByName = () => {
    setDateSort('none')
    setRatingSort('none')
    if (setNameSort === 'none') setNameSort(false)
    setNameSort(!nameSort)
    if (nameSort) {
      const sortedResources = [...displayedResources].sort((a, b) => 
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      )
      setDisplayedResources(sortedResources)
    } else {
      const sortedResources = [...displayedResources].sort((a, b) => 
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      )
      setDisplayedResources(sortedResources)
    }
  }

  const handleSortByRating = () => {
    setDateSort('none')
    setNameSort('none')
    if (setRatingSort === 'none') setRatingSort(false);
    setRatingSort(!ratingSort)
    if (ratingSort) {
      const sortedResources = [...displayedResources].sort((a, b) => {
        if (!a.averageRating && b.averageRating) return 1
        if (a.averageRating && !b.averageRating) return -1
        return a.averageRating < b.averageRating ? 1 : -1
      })
      setDisplayedResources(sortedResources);
    } else {
      const sortedResources = [...displayedResources].sort((a, b) => {
        if (!a.averageRating && b.averageRating) return 1
        if (a.averageRating && !b.averageRating) return -1
        return a.averageRating > b.averageRating ? 1 : -1
      })
      setDisplayedResources(sortedResources);
    }
  }

  const handleSortByDate = () => {
    setNameSort('none')
    setRatingSort('none')
    if (setDateSort === 'none') {
      setDateSort(true)
    } else {
      setDateSort(!dateSort)
    }      
    if (dateSort) {
      const sortedResources = [...displayedResources].sort((a, b) => 
        new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1
      )
      setDisplayedResources(sortedResources)
    } else {
      const sortedResources = [...displayedResources].sort((a, b) => 
        new Date(a.updatedAt) > new Date(b.updatedAt) ? 1 : -1
      )
      setDisplayedResources(sortedResources)
    }
  }

  const handleClearFilters = () => {
    resetFilters()
    const resourcesByDate = [...resources].sort((a, b) =>
      new Date(b.updatedAt) - new Date(a.updatedAt)
    )
    setDisplayedResources(resourcesByDate)
  }


  if (!displayedResources || !resources || !profile) return <Loading />

  return ( 
    <main className={styles.container}>
      <section className={styles.resources}>
        <nav className={styles.nav}>
          <h1>Resources ({displayedResources?.length} of {resources.length})</h1>
          <div>
            {profile.role > 100 &&
              <button
              onClick={() => handleClickAddResource()}
              >
              Add Resource
              </button>
            }
              <button
              onClick={() => handleClearFilters()}
              >
              Clear Filters
              </button>
            <input 
              type="text" 
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder='Search...' />
          </div>
        </nav>
        <div className={styles.table}>
          <header>
            <div className={styles.date}>
              <h4
                onClick={() => handleSortByDate()}
              >Last Updated 
                {dateSort === 'none' ? '' : dateSort ? ' ↑' : ' ↓'}
              </h4>
            </div>
            <div className={styles.name}>
              <h4
                onClick={() => handleSortByName()}
              >Name
                {nameSort === 'none' ? '' : nameSort ? ' ↑' : ' ↓'}
              </h4>
            </div>
            <div className={styles.category}>
              <select 
                value={catergoryFilter}
                onChange={handleCategoryFilterChange}
              >
                <option value="">All</option>
                <option value="Networking">Networking</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Job Search">Job Search</option>
                <option value="Resumes">Resumes</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.link}>
              <h4>Link</h4>
            </div>
            <div className={styles.rating}>
              <h4
                value='rating'
                onClick={() => handleSortByRating()}
              >Average Rating
                {ratingSort === 'none' ? '' : ratingSort ? ' ↑' : ' ↓'}
              </h4>
            </div>
          </header>
          {addResource &&  
            <ResourceForm 
              handleAddResource={handleAddResource} setAddResource={setAddResource}
              setSearch={setSearch}
            />
          }
          <section className={styles.rows}>
            {displayedResources.map(resource => (
              editedResource && editedResource._id === resource._id ?
                <ResourceForm 
                  key={resource._id} 
                  editedResource={editedResource}
                  setEditedResource={setEditedResource}
                  handleUpdateResource={handleUpdateResource}
                /> : 
                <ResourceCard 
                  key={resource._id} 
                  resource={resource} 
                  selectedResource={selectedResource} 
                  setSelectedResource={setSelectedResource}
                  setEditedResource={setEditedResource}
                  handleDeleteResource={handleDeleteResource}
                  profile={profile}
                  setProfile={setProfile}
                  handleAddStarredResource={handleAddStarredResource}
                  user={user}
                  handleRemoveStarredResource={handleRemoveStarredResource}
                  setAddResource={setAddResource}
              />   
            ))}
          </section>
        </div>
      </section>
      <section className={styles.reviews}>
        <Reviews 
          selectedResource={selectedResource}
          user={user}
          handleAddReview={handleAddReview}
          handleUpdateReview={handleUpdateReview}
          handleDeleteReview={handleDeleteReview}
          setSelectedResource={setSelectedResource}
        />
      </section>
    </main>
  )
}

export default Resources