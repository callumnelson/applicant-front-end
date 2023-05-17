import styles from './ProfileResourceCard.module.css'

const ProfileResourceCard = ({resource}) => {

  const dateCreated = new Date(resource.createdAt).toLocaleDateString()

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
          <p>{resource.category}</p>
        </div>
        <div className={styles.link}>
          <p>{resource.link}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileResourceCard