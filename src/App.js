import { useSelector } from 'react-redux';
import TaskInput from './TaskInput';
import Sidebar from './sidebar';
import TaskList from './TaskList';
import AuthForm from './RegisterForm';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !currentUser ? <AuthForm /> : <Navigate to="/dashboard" replace />
        }
      />
      <Route
        path="/dashboard"
        element={
          currentUser ? (
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
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
