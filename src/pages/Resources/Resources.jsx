// npm modules
import { useState, useEffect } from "react"

// services
import * as resourceService from '../../services/resourcesService'

// styles
import styles from './Resources.module.css'

// components


const Resources = ({user, }) => {

  const [resources, setResources] = useState(null)

  useEffect(() => {
    const fetchResources = async () => {
      const data = await resourceService.index()
      setResources(data)
    }
    fetchResources()
  }, [])
  
  if (!resources) return <h1>Loading...</h1>

  return ( 
    <main className={styles.container}>
      <section>
        <h1>Resources List</h1>
        {resources.map(resource => (
          <div key={resource._id}>
            <h2>{resource.name}</h2>
          </div>
        ) )}

      </section>
      <section>
        <h1>Notes</h1>
      </section>
    </main>
  )
}

export default Resources