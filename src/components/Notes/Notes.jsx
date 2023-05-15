// components
import NoteCard from '../NoteCard/NoteCard'
import NewNote from '../NewNote/NewNote'

// css
import styles from './Notes.module.css'

const Notes = ({selectedJob, notesCategory, handleAddNote, handleDeleteNote}) => {
  
  if (!selectedJob) return <p>Select a job to see your notes</p>

  const notesToDisplay = selectedJob.notes.filter(n => n.category === notesCategory)

  return (
    <>
      <h2>{notesCategory} Notes ({notesToDisplay.length})</h2>
      <NewNote 
        selectedJob={selectedJob}
        handleAddNote={handleAddNote}
        notesCategory={notesCategory}
      />
      <div className={styles.container}>
        {notesToDisplay.map(note => (
          <NoteCard 
            key={note._id}
            note={note}
            handleDeleteNote={handleDeleteNote}
            selectedJob={selectedJob}
          > 
          </NoteCard>
        ))}
      </div>
    </>
  )
}
 
export default Notes