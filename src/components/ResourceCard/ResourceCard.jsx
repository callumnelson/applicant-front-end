
//css
import styles from './ResourceCard.module.css'

const ResourceCard = ({setSelectedResource, selectedResource, resource, setEditedResource, handleDeleteResource}) => {

  const selected = selectedResource && selectedResource._id === resource._id 

  const handleSelect = () => {
    if (selected) {
      setSelectedResource(null)
    }
    else {
      setSelectedResource(resource)
    }
  }
  

  return (  
    <>
      <div className={
        `${styles.resource} 
        ${selected? styles.selected : ''}`
        }>
        <span>
          <p
          onClick={() => handleSelect()}
          >
            {selected ? '⬆️' : '⬇️' }</p>
        </span>
        <div className={styles.name}>
          <p>{resource.name}</p>
        </div>
        <div className={styles.category}>
          <p>{resource.category}</p>
        </div>
        <div className={styles.rating}>
          <p>{resource.averageRating}</p>
        </div>
        <div className={styles.link}>
          <p>{resource.link}</p>
        </div>
          <span
            onClick={() => setEditedResource(resource)}
          >✎</span>
          <span
            onClick={() => handleDeleteResource(resource)}
          >🗑️</span>
      </div>
      {selected && 
        <div className={styles.details}>
          <div className={styles.instructions}>
            <div>
              Instructions: 
            </div>
            <div>
              {resource.instructions}
            </div>
          </div>
          <div>
            {resource.reviews.length} Reviews
          </div>
        </div>
      }
    </>
  )
}

export default ResourceCard