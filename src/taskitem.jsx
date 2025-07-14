import React, { useEffect, useState } from "react";
import './taskitem.scss';
import { Calendar, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, clearTrash} from "./features/tasks/tasksSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) setEmail(user.email);
  }, []);//Isko useEffect ke andar rakho — taaki sirf component load hone par chale:

  const handleToggle = () => {
    dispatch(toggleTask({ email, taskId: task.id }));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ email, taskId: task.id }));
  };
  const clearTrash = ()=>{
    dispatch(clearTrash({email, taskId: task.id }));
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />

      <div className="task-text">
        <span>{task.text}</span>

        {task.hasReminder && task.dueDate && (
          <div className="reminder-badge">
            <Calendar size={14} />
            <span>
              {new Date(task.dueDate).toLocaleString('en-IN', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}

        {Array.isArray(task.subtasks) && task.subtasks.length > 0 && (
          <div className="subtasks-list" style={{ marginTop: 8, paddingLeft: 16 }}>
            <strong>Subtasks:</strong>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {task.subtasks.map((sub) => (
                <li key={sub.id} style={{ marginBottom: 6, background: '#f3f3f3', borderRadius: 4, padding: 6 }}>
                  <div><strong>Title:</strong> {sub.title}</div>
                  <div><strong>Description:</strong> {sub.description}</div>
                  <div><strong>Category:</strong> {sub.category}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button className="delete-btn" onClick={handleDelete}>
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TaskItem;
