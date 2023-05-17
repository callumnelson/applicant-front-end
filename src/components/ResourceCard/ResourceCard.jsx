
//css
import styles from './ResourceCard.module.css'

const ResourceCard = ({setSelectedResource, selectedResource, resource, setEditedResource, handleDeleteResource, profile, setProfile, handleAddStarredResource, user, handleRemoveStarredResource}) => {

  const selected = selectedResource && selectedResource._id === resource._id 

  const alreadyStarred = profile.starredResources?.some(r => r === resource._id)

  const handleSelect = () => {
    if (selected) {
      setSelectedResource(null)
    }
    else {
      setSelectedResource(resource)
    }
  }

  const handleChangeToEditResource = () => {
    setEditedResource(resource)
    setSelectedResource(null)
  }

  const handleStarredResourceClick = () => {
    if (alreadyStarred) {
      handleRemoveStarredResource(user, resource)
      setProfile({...profile, starredResources: profile.starredResources.filter(r => r !== resource._id)})
    } else {
      handleAddStarredResource(user, resource)
      setProfile({...profile, starredResources: [...profile.starredResources, resource]})
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
          className={styles.dropdown}
          onClick={() => handleSelect()}
          >
            {selected ? '⬆️' : '⬇️' }</p>
        </span>
        <div className={styles.date}>
          <p>{new Date(resource.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className={styles.name}>
          <p>{resource.name}</p>
        </div>
        <div className={styles.category}>
          <p
            id={styles[resource.category.toLowerCase().replaceAll(' ','-')]}
          >{resource.category}</p>
        </div>
        <div className={styles.rating}>
          <p>{resource.averageRating?.toFixed(1)}</p>
        </div>
        <div className={styles.link}>
          <p>{resource.link}</p>
        </div>
          {(profile._id === resource.owner || profile?.role > 200) &&
            <>
              <span
                onClick={() => handleChangeToEditResource()}
              ><p>✎</p></span>
              <span
                onClick={() => handleDeleteResource(resource)}
              ><p>🗑️</p></span>
            </>
          }
          <span
            onClick={() => handleStarredResourceClick()}
          >
            <p>
              {alreadyStarred ? '★' : '☆' }
            </p>
          </span>
      </div>
      <div className={`${styles.details} ${selected ? styles.show : ''}`}>
        <div className={styles.dropdown}>
          <div className={styles.label}>
            <h4>Instructions:</h4> 
          </div>
          <div className={styles.instructions}>
            {resource.instructions}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResourceCard