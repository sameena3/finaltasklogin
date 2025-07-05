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
      </div>

      <button className="delete-btn" onClick={handleDelete}>
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TaskItem;
