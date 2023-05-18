// components
import Icon from '../Icon/Icon'

//css
import styles from './ResourceCard.module.css'

const ResourceCard = ({setSelectedResource, selectedResource, resource, setEditedResource, handleDeleteResource, profile, handleAddStarredResource, user, handleRemoveStarredResource, setAddResource}) => {

  const selected = !selectedResource ? 0 : selectedResource && selectedResource._id === resource._id ? 1 : 2

  const alreadyStarred = profile.starredResources?.some(r => r._id === resource._id)

  const handleSelect = () => {
    if (selected === 1) {
      setSelectedResource(null)
    }
    else {
      setSelectedResource(resource)
    }
  }

  const handleChangeToEditResource = () => {
    setEditedResource(resource)
    setAddResource(false)
    if (resource._id !== selectedResource._id) setSelectedResource(null)
  }

  const handleStarredResourceClick = async () => {
    if (alreadyStarred) {
      await handleRemoveStarredResource(resource, user)
    } else {
      await handleAddStarredResource(resource, user)
    }
  }

  return (  
    <>
      <div className={
        `${styles.resource} 
        ${!selected ? '' : selected === 1 ? styles.selected : styles.notselected}`
        }>
        <span>
          <p
          className={styles.dropdown}
          onClick={() => handleSelect()}
          >
            {selected === 1 ? 
              <Icon category={'UpArrow'}/> 
              : 
              <Icon category={'DownArrow'}/>
            }  
          </p>
        </span>
        <div className={styles.date}>
          <p>{new Date(resource.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className={styles.name}>
          <p>{resource.name.slice(0, 60) + (resource.name.length > 60 ? '...' : '')}</p>
        </div>
        <div className={styles.category}>
          <p
            id={styles[resource.category.toLowerCase().replaceAll(' ','-')]}
          >{resource.category}</p>
        </div>
        <div className={styles.link}>
          <a href={resource.link} target='blank'><Icon category={'Link'}/></a>
        </div>
        <div className={styles.rating}>
          <p>
            {resource.averageRating?.toFixed(1)}
            {' '}
            {resource.averageRating < 2 && resource.averageRating >= 1 && '★'}
            {resource.averageRating < 3.0 && resource.averageRating >= 2.0 && '★★'}
            {resource.averageRating < 4.0 && resource.averageRating >= 3.0 && '★★★'}
            {resource.averageRating < 5.0 && resource.averageRating >= 4.0 && '★★★★'}
            {resource.averageRating === 5 && '★★★★★'}
          </p>
        </div>
          {(profile._id === resource.owner || profile?.role > 200) ?
            <>
              <span
                onClick={() => handleChangeToEditResource()}
              >
                <p>
                  <Icon category={'Edit'}/>
                </p>
              </span>
              <span
                onClick={() => handleDeleteResource(resource)}
              >
                <p>
                  <Icon category={'Trash'}/>
                </p>
              </span>
            </>
            :
            // Placeholders to maintain spacing when user is not an admin
            <>
              <span></span>
              <span></span>
            </>
          }
          <span
            onClick={() => handleStarredResourceClick()}
          >
            <p>
              {alreadyStarred ? 
                <Icon category={'FilledStar'}/> 
                : 
                <Icon category={'Star'}/>
              }
            </p>
          </span>
      </div>
      <div className={`${styles.details} ${selected === 1 ? styles.show : ''}`}>
        <div className={styles.dropdown}>
          <div className={styles.label}>
            <h4>Instructions:</h4> 
          </div>
          <div className={styles.instructions}>
            <p>{resource.instructions}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResourceCard