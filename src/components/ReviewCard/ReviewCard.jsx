import { useState } from 'react'

import styles from './ReviewCard.module.css'

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded)
  };

  return (  
    <div className={styles.container}>
      <div className={styles.author}>
        <img src={review.author.photo} alt="Review Author Profile Image" />
        {' '}
        <span className={styles.name}>
          {review.author.name}
        </span>
      </div>
      <div>
        {' '}
        {Array.from({ length: review.rating }, (_, index) => (
          <span key={index}>⭐️</span>
        ))}
        {' '}
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
      <div className={styles.content}>
        <div>
          <p>
            {expanded ? review.content : review.content.slice(0, 75)}
          </p>
        </div>
        {review.content.length > 75 && 
          <div>
            <p
              onClick={toggleExpand} 
              className={styles.toggle}
            >
              {expanded ? 'less' : 'more'}
            </p>
          </div>
        }
      </div>
    </div>
  )
}

export default ReviewCard