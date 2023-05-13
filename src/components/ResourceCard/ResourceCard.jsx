
//css
import styles from './ResourceCard.module.css'

const ResourceCard = ({setSelectedResource, selectedResource, resource}) => {

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
      </div>
      {selected && 
        <div className={styles.details}>
          <div className={styles.instructions}>
          Instructions: {resource.instructions}
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