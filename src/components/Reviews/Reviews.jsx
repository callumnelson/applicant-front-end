import { useState, useEffect } from 'react'

import styles from './Reviews.module.css'

import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

const Reviews = ({selectedResource, user}) => {
  const [buttonState, setButtonState] = useState('')


  useEffect(() => {
    

    if (selectedResource.reviews.author === user._id) {
      setButtonState('edit')
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
        <button
          onClick={() => setButtonState('new')}
        >New Review</button>
      </div>
      <div>
        <ReviewForm />
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