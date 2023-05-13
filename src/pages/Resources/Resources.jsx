// npm modules
import { useState, useEffect } from "react"

// services
import * as resourceService from '../../services/resourcesService'

// styles
import styles from './Resources.module.css'

// components


const Jobs = ({user, }) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      const data = await resourceService.getAll()
      setResources(data.resources)
    }
    fetchResources()
  }, [])
  
  return ( 
    <main className={styles.container}>
      <section>
        <h1>Jobs List</h1>
        {resources.map(resource => (
          <div key={resource._id}>
            <h2>{resource.title}</h2>
          </div>
        ) )}

      </section>
      <section>
        <h1>Notes</h1>
      </section>
    </main>
  )
}
 
export default Jobs