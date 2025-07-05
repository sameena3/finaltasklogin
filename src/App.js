import { useSelector } from 'react-redux';
import TaskInput from './TaskInput';
import Sidebar from './sidebar';
import TaskList from './TaskList';
import AuthForm from './RegisterForm';
import './App.scss';

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  if (!currentUser) return <AuthForm />;

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
