import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListChecks, CheckCircle, Clock, Trash2 } from 'lucide-react';
import './sidebar.scss';
import { setActiveView, clearTrash } from './features/tasks/tasksSlice';
import { logout } from './features/auth/authSlice'; // make sure this is correct

const Sidebar = () => {
  const dispatch = useDispatch();
  const { activeView, userTasks } = useSelector((state) => state.tasks);

  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) setCurrentUserEmail(user.email);
  }, []);

  const tasks = userTasks[currentUserEmail] || [];
  const deletedTasks = (userTasks.deletedTasks?.[currentUserEmail]) || [];

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const deletedCount = deletedTasks.length;

  const handleLogout = () => {
    dispatch(logout()); // or navigate to login
  };

  return (
    <aside className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo"></div>
        <div className="brand-text">
          <p className="brand-subtitle">Stay organized</p>
        </div>
      </div>

      <div className="navbar-nav">
        <div className="nav-header">
          <p className="nav-title">Views</p>
        </div>

        <div className="nav-items">
          <button
            className="nav-item gray"
            onClick={() => dispatch(setActiveView('all'))}
          >
            <div className="nav-item-content">
              <ListChecks size={16} />
              <span className="nav-label">All Tasks</span>
            </div>
            <span className="nav-count">{totalCount}</span>
          </button>

          <button
            className="nav-item blue"
            onClick={() => dispatch(setActiveView('pending'))}
          >
            <div className="nav-item-content">
              <Clock size={16} />
              <span className="nav-label">Pending</span>
            </div>
            <span className="nav-count">{pendingCount}</span>
          </button>

          <button
            className="nav-item green"
            onClick={() => dispatch(setActiveView('completed'))}
          >
            <div className="nav-item-content">
              <CheckCircle size={16} />
              <span className="nav-label">Completed</span>
            </div>
            <span className="nav-count">{completedCount}</span>
          </button>

          <button
            className="nav-item red"
            onClick={() => dispatch(setActiveView('trash'))}
          >
            <div className="nav-item-content">
              <Trash2 size={16} />
              <span className="nav-label">Trash</span>
            </div>
            <span className="nav-count">{deletedCount}</span>
          </button>
        </div>
      </div>

      <div className="clear-btn-wrapper">
        <button className="clear-btn" onClick={() => dispatch(clearTrash(currentUserEmail))}>
          <Trash2 size={16} />
          Clear Trash
        </button>
      </div>

      <div className="stats-section">
        <p className="stats-title">Total: {totalCount}</p>
        <p className="stats-text">Completed: {completedCount}</p>
        <p className="stats-text">Pending: {pendingCount}</p>
        <p className="stats-text">Deleted: {deletedCount}</p>
      </div>

      <div className="user-footer">
        <p style={{ fontSize: '14px', color: '#ccc' }}>{currentUserEmail}</p>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
