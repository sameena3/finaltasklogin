import React from 'react';
import Sidebar from './sidebar';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import './App.scss';

function App() {
  return (
    <div className="app">
      <div className="container">
     
        <Sidebar />

        <div className="main-content">
          <div className="dashboard-header">
            <h1>Task Manager</h1>
            <p>The mind clears when the task list shrinks 🎌</p>
          </div>
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;
