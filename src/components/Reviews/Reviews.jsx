import { useState, useEffect } from 'react'

import styles from './Reviews.module.css'

import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

const Reviews = ({selectedResource, user, handleAddReview, handleUpdateReview}) => {
  const [reviewFormVisible, setReviewFormVisible] = useState(false)
  const [showButton, setShowButton] = useState(true)


  const userReview = selectedResource?.reviews.find(review => review.author._id === user.profile)

  const handleReviewButtonClick = () => {
    setReviewFormVisible(true)
    setShowButton(false)
  }

  if (!selectedResource) return <p>Select a resource to see it's reviews</p>


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
        {showButton && (
          userReview ? (
            <button onClick={() => handleReviewButtonClick()}>✎</button>
          ) : (
            <button onClick={() => handleReviewButtonClick()}>+</button>
          )
        )}
      </div>
      {reviewFormVisible && 
        <div>
          <ReviewForm 
          setReviewFormVisible={setReviewFormVisible} setShowButton={setShowButton} 
          handleAddReview={handleAddReview} 
          selectedResource={selectedResource}
          handleUpdateReview={handleUpdateReview}
          userReview={userReview}
          />
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