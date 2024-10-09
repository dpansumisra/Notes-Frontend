import NodeList from './component/NoteList'
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Search from './component/search';
import Header from './component/Header';

import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([]);
  const [SearchText, setSearchText] = useState('');
  const [DarkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
      axios.get('https://notes-backend-9poj.onrender.com/get')
      .then(result => setNotes(result.data))
      .catch(err=> console.log(err))
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id)=>{
    const newNotes = notes.filter((note)=> note.id != id);
    setNotes(newNotes);
  }

  return (
    <div className={`${DarkMode && 'dark-mode'}`}>
      <div className='container'>
      <Header handleDarkMode={setDarkMode}/>
      <Search handleSearchNote = {setSearchText}/>
      <NodeList notes={notes.filter((note)=>
       note.task.toLowerCase().includes(SearchText))} 
      handleAddNote={addNote} 
      handleDeleteNote = {deleteNote}
      />
    </div>
    </div>
  );
}

export default App;