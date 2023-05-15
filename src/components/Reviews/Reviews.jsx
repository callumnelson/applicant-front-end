import { useState, useEffect } from 'react'

import styles from './Reviews.module.css'

import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

const Reviews = ({selectedResource, user}) => {
  const [buttonState, setButtonState] = useState('new')
  const [reviewFormVisible, setReviewFormVisible] = useState(true)

  console.log(selectedResource?.reviews)

  useEffect(() => {
    const userReviewCheck = selectedResource?.reviews.some(review => review.author === user._id)
    if (userReviewCheck) {
      setButtonState('edit')
    } else {
      setButtonState('new')
    }
  }, [user])


  if (!selectedResource) return <p>Selected a resource to see it's reviews</p>


  return (  
    <div className={styles.reviews}>
      <div>
        <div>
          {selectedResource.reviews.length} Reviews
        </div>
        <div>
          {selectedResource.averageRating} average rating
        </div>
      </div>
      <div>
        {buttonState === 'new' && <button>New Review</button>}
        {buttonState === 'edit' && <button>Edit Review</button>}
      </div>
      {reviewFormVisible && 
        <div>
          <ReviewForm />
        </div>
      }
      {selectedResource.reviews.map(review =>
        <div key={review._id}>
          <ReviewCard review={review} />
        </div>
        )}
    </div>
  )
}

export default Reviews