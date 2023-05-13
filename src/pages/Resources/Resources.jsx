// npm modules
import { useState, useEffect } from "react"

// services
import * as resourceService from '../../services/resourcesService'

// styles
import styles from './Resources.module.css'

// components
import ResourceCard from "../../components/ResourceCard/ResourceCard"


const Resources = ({user, }) => {

  const [resources, setResources] = useState(null)
  const [selectedResource, setSelectedResource] = useState(null)
  const [search, setSearch] = useState('')

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
  
  if (!resources) return <h1>Loading...</h1>

  return ( 
    <main className={styles.container}>
      <section className={styles.resources}>

        <nav>
          <h1>Resources</h1>
          <div>
            <button>
              Add Resource
            </button>
            <input 
              type="text" 
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder='search' />
            <button>Add Resource</button>
          </div>
        </nav>

        <div className={styles.table}>
          <header>
            <div>
              <h3>Name</h3>
            </div>
            <div>
              <h3>Category</h3>
            </div>
            <div>
              <h3>Average Rating</h3>
            </div>
            <div>
              <h3>Link</h3>
            </div>
          </header>
          
          {resources.map(resource => (
            <ResourceCard key={resource._id} resource={resource} selectedResource={selectedResource}/>
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