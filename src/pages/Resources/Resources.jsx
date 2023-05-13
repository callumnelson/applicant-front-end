// npm modules
import { useState, useEffect } from "react"

// services
import * as resourceService from '../../services/resourcesService'

// styles
import styles from './Resources.module.css'

// components
import ResourceCard from "../../components/ResourceCard/ResourceCard"
import NewResource from "../../components/NewResource/NewResource"


const Resources = ({user, }) => {

  const [resources, setResources] = useState(null)
  const [selectedResource, setSelectedResource] = useState(null)
  const [search, setSearch] = useState('')
  const [addResource, setAddResource] = useState(false)

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

  const handleAddResource = async (newResourceFormData) => {
    const newResource = await resourceService.create(newResourceFormData)
    setResources([newResource, ...resources])
    setAddResource(false)
  }

  if (!resources) return <h1>Loading...</h1>

  return ( 
    <main className={styles.container}>
      <section className={styles.resources}>

        <nav>
          <h1>Resources</h1>
          <div>
            <button
              onClick={() => setAddResource(true)}
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
            <NewResource 
              handleAddResource={handleAddResource} setAddResource={setAddResource}
            />
          }

          {resources.map(resource => (
            <ResourceCard key={resource._id} 
            resource={resource} 
            selectedResource={selectedResource} 
            setSelectedResource={setSelectedResource}
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

export default Resources