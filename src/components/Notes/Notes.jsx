// components
import NoteCard from '../NoteCard/NoteCard'

// css
import styles from './Notes.module.css'

const Notes = ({selectedJob, notesCategory}) => {
  
  if (!selectedJob) return <p>Select a job to see your notes :)</p>

  const notesToDisplay = notesCategory === "All" ? selectedJob.notes : selectedJob.notes.filter(n => n.category === notesCategory)

  return (
    <>
      <h2>{notesCategory} Notes ({notesToDisplay.length})</h2>
      <div className={styles.container}>
        {notesToDisplay.map(note => (
          <NoteCard 
            key={note._id}
            note={note}
          > 
          </NoteCard>
        ))}
      </div>
    </>
  )
}
 
export default Notes