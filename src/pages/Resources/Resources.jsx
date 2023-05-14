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


const Resources = ({user, }) => {

  const [resources, setResources] = useState(null)
  const [selectedResource, setSelectedResource] = useState(null)
  const [search, setSearch] = useState('')
  const [addResource, setAddResource] = useState(false)
  const [editedResource, setEditedResource] = useState(null)

  useEffect(() => {
    const fetchResources = async () => {
      const data = await resourceService.index()
      setResources(data)
    }
    fetchResources()
  }, [])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClickAddResource = () => {
    setAddResource(true)
    setSelectedResource(null)
  }

  const handleAddResource = async (newResourceFormData) => {
    const newResource = await resourceService.create(newResourceFormData)
    setResources([newResource, ...resources])
    setAddResource(false)
  }

  const handleUpdateResource = async (updatedResourceFormData) => {
    const updatedResource = await resourceService.update(updatedResourceFormData)
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r))
    setEditedResource(null)
  }

  const handleDeleteResource = async (resource) => {
    const deletedResource = await resourceService.deleteResource(resource._id)
    setResources(resources.filter(r => r._id !== deletedResource._id))
  }

  if (!resources) return <h1>Loading...</h1>

  return ( 
    <main className={styles.container}>
      <section className={styles.resources}>

        <nav>
          <h1>Resources</h1>
          <div>
            <button
              onClick={() => handleClickAddResource()}
            >
              Add Resource
            </button>
            <input 
              type="text" 
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder='search' />
          </div>
        </nav>

        <div className={styles.table}>
          <header>
            <div className={styles.name}>
              <h4>Name</h4>
            </div>
            <div className={styles.category}>
              <h4>Category</h4>
            </div>
            <div className={styles.rating}>
              <h4>Average Rating</h4>
            </div>
            <div className={styles.link}>
              <h4>Link</h4>
            </div>
          </header>

          {addResource &&  
            <ResourceForm 
              handleAddResource={handleAddResource} setAddResource={setAddResource}
            />
          }

          {resources.map(resource => (

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
            />   
          ))}

        </div>
      </section>
      <section className={styles.notes}>
        <Reviews 
          selectedResource={selectedResource}
          user={user}
        />
      </section>
    </main>
  )
}

export default Resources