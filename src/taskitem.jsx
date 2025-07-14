import React, { useEffect, useState } from "react";
import './taskitem.scss';
import { Calendar, Trash2, ChevronDown, ChevronRight, BarChart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, clearTrash, toggleSubtask, bulkCompleteSubtasks } from "./features/tasks/tasksSlice";

const ProgressBar = ({ percent }) => (
  <div className="progress-bar-bg" style={{ height: 8, borderRadius: 4, background: '#e5e7eb', margin: '8px 0' }}>
    <div
      className="progress-bar-fill"
      style={{
        width: `${percent}%`,
        height: 8,
        borderRadius: 4,
        background: `linear-gradient(90deg, #4ade80, #2563eb)`,
        transition: 'width 0.4s cubic-bezier(.4,2,.6,1)'
      }}
    />
  </div>
);

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) setEmail(user.email);
  }, []);

  const hasSubtasks = Array.isArray(task.subtasks) && task.subtasks.length > 0;
  const completedCount = hasSubtasks ? task.subtasks.filter(st => st.completed).length : 0;
  const total = hasSubtasks ? task.subtasks.length : 0;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;

  // Auto-complete main task if all subtasks are done
  useEffect(() => {
    if (total && completedCount === total && !task.completed) {
      dispatch(toggleTask({ email, taskId: task.id }));
    }
    if (total && completedCount < total && task.completed) {
      dispatch(toggleTask({ email, taskId: task.id }));
    }
    // eslint-disable-next-line
  }, [completedCount, total]);

  const handleToggle = () => {
    if (hasSubtasks) {
      dispatch(bulkCompleteSubtasks({ email, taskId: task.id, completed: !task.completed }));
    } else {
      dispatch(toggleTask({ email, taskId: task.id }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask({ email, taskId: task.id }));
  };
  const clearTrash = () => {
    dispatch(clearTrash({ email, taskId: task.id }));
  };

  const handleSubtaskToggle = (subId) => {
    dispatch(toggleSubtask({ email, taskId: task.id, subtaskId: subId }));
  };

  return (
    <div className="task-item" style={{ boxShadow: '0 2px 8px #e5e7eb', borderRadius: 8, marginBottom: 16, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {hasSubtasks && (
          <button onClick={() => setExpanded(e => !e)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 8 }}>
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          style={{ marginRight: 8 }}
        />
        <span style={{ fontWeight: 500 }}>{task.text || task.name}</span>
        <BarChart style={{ marginLeft: 'auto', color: '#2563eb' }} />
        <button className="delete-btn" onClick={handleDelete} style={{ marginLeft: 8 }}>
          <Trash2 size={16} />
        </button>
      </div>
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
      {hasSubtasks && (
        <>
          <ProgressBar percent={percent} />
          <div style={{ fontSize: 13, color: '#2563eb', fontWeight: 500, marginBottom: 4 }}>
            {completedCount}/{total} subtasks ({percent}%)
          </div>
          {expanded && (
            <ul className="subtask-list" style={{ margin: 0, padding: 0, listStyle: 'none', borderLeft: '3px solid #2563eb', marginLeft: 16, paddingLeft: 16, transition: 'all 0.3s' }}>
              {task.subtasks.map((sub) => (
                <li key={sub.id} className="subtask-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 6, background: '#f3f3f3', borderRadius: 4, padding: 6 }}>
                  <input
                    type="checkbox"
                    checked={!!sub.completed}
                    onChange={() => handleSubtaskToggle(sub.id)}
                    style={{ marginRight: 8 }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{sub.title}</div>
                    <div style={{ fontSize: 12, color: '#555' }}>{sub.description}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>Category: {sub.category}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
