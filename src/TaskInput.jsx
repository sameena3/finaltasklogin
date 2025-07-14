import React, { useState } from 'react';
import './taskinput.scss';
import { useDispatch } from 'react-redux';
import { addTask } from './features/tasks/tasksSlice';
import { addSubtask } from './features/tasks/tasksSlice';

function TaskInput() {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  const [hasReminder, setHasReminder] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [subtask, setSubtask] = useState({ title: '', description: '', category: '' });
  const [lastTaskId, setLastTaskId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText === "") return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      dueDate: dueDate || null,
      hasReminder: hasReminder || false,
      subtasks: [],
    };
    dispatch(addTask({ email: currentUser.email, task: newTask }));
    setTaskText('');
    setHasReminder(false);
    setDueDate('');
    setLastTaskId(newTask.id);
    setShowSubtaskForm(true);
  };

  const handleSubtaskChange = (e) => {
    const { name, value } = e.target;
    setSubtask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubtaskSubmit = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    dispatch(addSubtask({
      email: currentUser.email,
      taskId: lastTaskId,
      subtask,
    }));
    setSubtask({ title: '', description: '', category: '' });
    setShowSubtaskForm(false);
    setLastTaskId(null);
  };

  return (
    <>
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
      {showSubtaskForm && (
        <form className="subtask-form" onSubmit={handleSubtaskSubmit} style={{ marginTop: 16, background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
          <h3>Add a Subtask</h3>
          <input
            type="text"
            name="title"
            value={subtask.title}
            onChange={handleSubtaskChange}
            placeholder="Subtask Title"
            required
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          />
          <textarea
            name="description"
            value={subtask.description}
            onChange={handleSubtaskChange}
            placeholder="Subtask Description"
            required
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          />
          <input
            type="text"
            name="category"
            value={subtask.category}
            onChange={handleSubtaskChange}
            placeholder="Category"
            required
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Add Subtask</button>
        </form>
      )}
    </>
  );
}

export default TaskInput;
