//css
import styles from './ProfileResourceCard.module.css'

//components
import Icon from '../Icon/Icon'

const ProfileResourceCard = ({resource, user, handleRemoveStarredResource}) => {
  const dateCreated = new Date(resource.createdAt).toLocaleDateString()

  const handleStarredResourceClick = async () => {
      await handleRemoveStarredResource(resource, user)
  }

  return (
    <div>
      <div className={`${styles.resource}`}>
        <span>
        </span>
        <div className={styles.date}>
          <p>{dateCreated}</p>
        </div>
        <div className={styles.name}>
          <p>{resource.name}</p>
        </div>
        <div className={styles.category}>
          <p
            id={styles[resource.category.toLowerCase().replaceAll(' ','-')]}
          >{resource.category}</p>
        </div>
        <div className={styles.link}>
          <p><a href={resource.link} target="blank"><Icon category="Link" /></a></p>
        </div>
        <div
          onClick={() => handleStarredResourceClick()}
          id={styles.star}
        >
          <p>
            <Icon category={'FilledStar'}/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileResourceCard