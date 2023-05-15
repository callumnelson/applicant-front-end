import { useState, useEffect } from 'react'

import styles from './Reviews.module.css'

import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

const Reviews = ({selectedResource, user, handleAddReview}) => {
  const [buttonState, setButtonState] = useState('new')
  const [reviewFormVisible, setReviewFormVisible] = useState(false)
  const [userReview, setUserReview] = useState(null)
  const [showButton, setShowButton] = useState(true)

  console.log(handleAddReview, 'handleAddReview')

  useEffect(() => {
    const userReviewCheck = selectedResource?.reviews.some(review => review.author === user._id)
    if (userReviewCheck) {
      setUserReview(userReviewCheck)
      setButtonState('edit')
    } else {
      setUserReview(null)
      setButtonState('new')
    }
  }, [user])

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
          <ReviewForm setReviewFormVisible={setReviewFormVisible} setShowButton={setShowButton} handleAddReview={handleAddReview} selectedResource={selectedResource} />
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