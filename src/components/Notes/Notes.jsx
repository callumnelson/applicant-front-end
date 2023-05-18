// components
import NoteCard from '../NoteCard/NoteCard'
import NewNote from '../NewNote/NewNote'

// css
import styles from './Notes.module.css'

const Notes = ({selectedJob, notesCategory, handleAddNote, handleDeleteNote}) => {

  const notesToDisplay = selectedJob ? selectedJob.notes.filter(n => n.category === notesCategory) : []

  return (
    <div className={styles.container}>
      {
        !selectedJob ?
        <nav>
          <h1>Notes</h1>
        </nav>
        :
      <>
        <nav>
          <h2>{notesCategory} Notes ({notesToDisplay.length})</h2>
        </nav>
        <NewNote 
        selectedJob={selectedJob}
        handleAddNote={handleAddNote}
        notesCategory={notesCategory}
        />
        <div>
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
      }
    </div>
  )
}
 
export default Notes