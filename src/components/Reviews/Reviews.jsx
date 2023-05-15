import { useState, useEffect } from 'react'

import styles from './Reviews.module.css'

import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

const Reviews = ({selectedResource, user, handleAddReview, handleUpdateReview, handleDeleteReview, setSelectedResource}) => {
  const [reviewFormVisible, setReviewFormVisible] = useState(false)
  const [showButton, setShowButton] = useState(true)


  const userReview = selectedResource?.reviews.find(review => review.author._id === user.profile)

  const handleReviewButtonClick = () => {
    setReviewFormVisible(true)
    setShowButton(false)
  }


  const handleReviewSort = (evt) => {
    const sortType = evt.target.value
    const sortedReviews = [...selectedResource.reviews].sort((a, b) => {
      if (sortType === 'newest') {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      } else if (sortType === 'oldest') {
        return new Date(a.updatedAt) - new Date(b.updatedAt)
      } else if (sortType === 'highest') {
        return b.rating - a.rating
      } else if (sortType === 'lowest') {
        return a.rating - b.rating
      }
    })
    setSelectedResource({...selectedResource, reviews: sortedReviews})
  }

  if (!selectedResource) return <p>Select a resource to see it's reviews</p>


  return (  
    <div className={styles.reviews}>
      <div>
        <div>
          {selectedResource.reviews.length} Reviews
        </div>
        {selectedResource.reviews.length ? 
          <div>
          {selectedResource.averageRating.toFixed(1)} average rating
          <label htmlFor="rating-selector"></label>
          <select 
            id='rating-selector'
            name='rating-selector'
            onChange={handleReviewSort}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
          </div> :
          <div>
            Be The First To Review!
          </div>
        }
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
          handleDeleteReview={handleDeleteReview}
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