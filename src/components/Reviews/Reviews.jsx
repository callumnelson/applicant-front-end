import { useState } from 'react'

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

  if (!selectedResource) return (
    <>
      <nav className={styles.nav}>
          <h1>Reviews</h1>
      </nav>
      <header className={styles.header}>
        <div>
          <h2>Select a resource to see reviews</h2>
        </div>
      </header>
    </>
  )

  return (  
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1>Reviews</h1>
      </nav>
      <div>
        {selectedResource.reviews.length ? 
        <>
          <header className={styles.header}>
            <div>
              <h2>
                {selectedResource.averageRating.toFixed(1)}
                {' '}
                {Array.from({ length: Math.floor(selectedResource.averageRating) }, (_, index) => (
                  <span key={index}>⭐️</span>
                ))}
              </h2>
              <div className={styles.sort}>
                <div>
                  <h2>
                    {selectedResource.reviews.length}
                    {' '}
                    {selectedResource.reviews.length === 1 ? "Review" : "Reviews"}
                  </h2>
                </div>
                <div>
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
                </div>
              </div>
            </div>
          </header>
        </> :
        <header className={styles.header}>
          <h2>Be The First To Review!</h2>
        </header>
        }
      </div>
      <div className={styles.buttons}>
        {showButton && (
          userReview ? (
            <button
              className={styles.button}
              onClick={() => handleReviewButtonClick()}>✎</button>
          ) : (
            <button
              className={styles.button} 
              onClick={() => handleReviewButtonClick()}>✅</button>
          )
        )}
      </div>
      {reviewFormVisible && 
        <div>
          <ReviewForm 
            setReviewFormVisible={setReviewFormVisible} 
            setShowButton={setShowButton} 
            handleAddReview={handleAddReview} 
            selectedResource={selectedResource}
            handleUpdateReview={handleUpdateReview}
            userReview={userReview}
            handleDeleteReview={handleDeleteReview}
          />
        </div>
      }
      {selectedResource.reviews.map(review =>
        <div 
          className={styles.review}
          key={review._id}
        >
          <ReviewCard review={review} />
        </div>
      )}
    </div>
  )
}

export default Reviews