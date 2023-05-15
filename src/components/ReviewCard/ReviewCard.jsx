
import styles from './ReviewCard.module.css';

const ReviewCard = ({review}) => {
  return (  
    <div className={styles.container}>
      <img src={review.author.photo} alt="Review Author Profile Image" />
      {new Date(review.createdAt).toLocaleDateString()}
      <p>
        {review.rating}
      </p>
      <p>
        {review.content}
      </p>  
    </div>
  )
}

export default ReviewCard