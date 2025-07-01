import React from "react";
import './taskitem.scss';
import { Calendar, Trash2 } from 'lucide-react';

import { toggleTask,deleteTask } from "./features/tasks/tasksSlice";
import { useDispatch } from 'react-redux';
const TaskItem = ({ task  }) => {
  //TaskList → does tasks.map(task => <TaskItem task={task} />)

  const dispatch = useDispatch();
  return (
  <div className="task-item">
   
      {/* Toggle checkbox */}
    <input
  type="checkbox"
  checked={task.completed}
  onChange={(e) =>dispatch(toggleTask(task.id))}
  /*type:toggleTask
    payloaf:task.id*/
/>
      {/* Task content */}
      <div className="task-text">
        <span>{task.text}</span>
        
        {/* Due date */}
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

      {/* Delete button */}
      <button className="delete-btn" onClick={(e) =>dispatch(deleteTask(task.id))}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}
export default TaskItem;