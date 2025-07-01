import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListChecks, CheckCircle, Clock, Trash2 } from 'lucide-react';
import './sidebar.scss';
import { setActiveView, clearTrash } from './features/tasks/tasksSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { activeView, tasks, deletedTasks } = useSelector((state) => state.tasks);
/*const taskState = useSelector(state => state.tasks);

const tasks = taskState.tasks;
const deletedTasks = taskState.deletedTasks;
const activeView = taskState.activeView;
*/
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const deletedCount = deletedTasks.length;

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
            className="nav-item gray "
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
  <button className="clear-btn" onClick={() => dispatch(clearTrash())}>
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

    </aside>
  );
};

export default Sidebar;
