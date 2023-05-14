
import styles from './Reviews.module.css'

import ReviewCard from '../ReviewCard/ReviewCard'

const Reviews = ({selectedResource}) => {

  if (!selectedResource) return <p>Selected a resource to see it's reviews</p>

  console.log(selectedResource)

  return (  
    <div className={styles.reviews}>
      <div>
        {selectedResource.reviews.length} Reviews
        {selectedResource.averageRating} average rating
      </div>
      {selectedResource.reviews.map(review =>
        <div key={review._id}>
          <ReviewCard review={review} />
        </div>
        )}
    </div>
  )
}

export default Reviews