import Note from './Note'
import AddNote from './AddNote';
const NoteList = ({notes, handleAddNote, handleDeleteNote}) => {
  return (
    <div className='note-list'>
        {notes.map((note)=> (
        <Note
        id={note._id}
        text={note.task}
        handleDeleteNote = {handleDeleteNote}
    />
        ))}
        <AddNote handleAddNote={handleAddNote}/>
    </div>
  )
}

export default NoteList;