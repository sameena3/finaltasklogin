import React, { useState } from 'react';
import './taskinput.scss'
import { useDispatch } from 'react-redux';

import { addTask } from './features/tasks/tasksSlice';
function TaskInput( ) {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  const [hasReminder, setHasReminder] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const handleSubmit = (e) => {
      e.preventDefault();// Stop the browser from reloading
    if (taskText==="") return;
    dispatch(addTask({ text: taskText, hasReminder,dueDate}))
    setTaskText('');
    setHasReminder(false);
    setDueDate('');
  };
{/*{
  type: 'tasks/addTask',
  payload: {
    text: 'Finish homework',
    hasReminder: true,
    dueDate: '2025-07-01T14:00'
  }
}
*/}//Click the "Add Task" button
//Press Enter
  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <div className="input-section">
        <input
          type="text"
         value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter your task"
          className="task-input-field"
        />
        <div className="input-row">
          <label>
            <input
              type="checkbox"
              checked={hasReminder}
              onChange={(e) => setHasReminder(!hasReminder)}
            />
            Set Reminder
          </label>
          <input
           type="datetime-local"
           value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="calendar-input"
          />

        <div className="add-task-wrapper">
         <button className="add-task-btn" type="submit">Add Task</button>
         </div>
        </div>
      </div>
    </form>
  );
}

export default TaskInput;
