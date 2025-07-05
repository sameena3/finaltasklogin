import React, { useState } from 'react';
import './taskinput.scss';
import { useDispatch } from 'react-redux';
import { addTask } from './features/tasks/tasksSlice';

function TaskInput() {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  const [hasReminder, setHasReminder] = useState(false);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText==="") return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));//// 2. Get current logged-in user
    /*const email = currentUser?.email;

    if (!email) {
      alert("User not found. Please log in again.");
      return;
    }*/

  /*  const task = {
      text: taskText,
      dueDate,
      hasReminder,
    };*/
  const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        dueDate: dueDate || null,
        hasReminder: hasReminder || false,
      };
dispatch(addTask({ email:currentUser.email, task: newTask }));
//an object with 2 keys
    setTaskText('');
    setHasReminder(false);
    setDueDate('');
  };

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
              onChange={() => setHasReminder(!hasReminder)}
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
