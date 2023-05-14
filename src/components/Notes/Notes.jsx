// components


// css
import styles from './Notes.module.css'

const Notes = ({selectedJob, notesCategory}) => {
  
  if (!selectedJob) return <p>Select a job to see your notes :)</p>

  const notesToDisplay = notesCategory === "All" ? selectedJob.notes : selectedJob.notes.filter(n => n.category === notesCategory)

  return (
    <>
      <h1>Notes ({notesToDisplay.length})</h1>
      <div className={styles.notes}>
        {notesToDisplay.map(note => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </>
  )
}
 
export default Notes