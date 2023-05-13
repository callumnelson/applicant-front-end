
//css
import styles from './ResourceCard.module.css'

const ResourceCard = ({selectedResource, resource}) => {

  return (   
    <div className={styles.resource}>
      <div>
        <h4>{resource.name}</h4>
      </div>
      <div>
        <h4>{resource.category}</h4>
      </div>
      <div>
        <h4>{resource.averageRating}</h4>
      </div>
      <div>
        <h4>{resource.link}</h4>
      </div>
    </div>
  )
}

export default ResourceCard