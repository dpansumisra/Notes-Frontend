import React, { useState } from 'react';
import { MdDeleteForever, MdCreate } from 'react-icons/md';
import { FaStackExchange } from 'react-icons/fa';
import axios from 'axios';

const Note = ({ id, text, date, handleDeleteNote }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [editText, setEditText] = useState(text);   

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveClick = () => {
    axios.put(`https://notes-backend-9poj.onrender.com/update/${id}`, { text: editText })
      .then(() => {
        location.reload(); 
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = () => {
    axios.delete(`https://notes-backend-9poj.onrender.com/delete/${id}`)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='note'>
      {isEditing ? (
        <textarea 
          value={editText}
          onChange={handleTextChange}
        />
      ) : (
        <span>{text}</span>
      )}

      <div className='note-footer'>
        <small>{date}</small>
        <div>
          {isEditing ? (
            <MdCreate  onClick={handleSaveClick}>Save</MdCreate>
          ) : (
            <FaStackExchange className='create-icon' size='1.1em' onClick={handleEditClick} />
          )}
          <MdDeleteForever onClick={handleDeleteClick} className='delete-icon' size='1.3em' />
        </div>
      </div>
    </div>
  );
};

export default Note;
