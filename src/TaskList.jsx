import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './taskitem';
import './Tasklist.scss';

const TaskList = () => {
  const { userTasks,activeView} = useSelector(state => state.tasks);
  const [userEmail, setUserEmail] = useState('');
//component lods
  useEffect(() => {
     // 1. Get current user from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) setUserEmail(user.email);//user email will be sammeena@.com
  }, []);
 
//  const email = useSelector((state) => state.auth.email);
/*const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
const tasks = userTasks[userEmail] || [];
const deletedTasks = (userTasks.deletedTasks?.[userEmail]) || [];
*/
  const tasks = userTasks[userEmail] ||[];//y chek it -------
 const deletedTasks = (userTasks.deletedTasks?.[userEmail]) || [];
 /*let deletedTasks = [];

if (
  userTasks &&
  userTasks.deletedTasks &&
  userTasks.deletedTasks[currentUserEmail]
) {
  deletedTasks = userTasks.deletedTasks[currentUserEmail];
}
*/
  let filteredTasks = [];

  if (activeView === 'trash') {
    filteredTasks = deletedTasks;
  } else if (activeView === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (activeView === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else {
    filteredTasks = tasks; // default to 'all'
  }

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p>No tasks to display</p>
      ) : (
        filteredTasks.map(t => <TaskItem key={t.id} task={t} />)
      )}
    </div>
  );
};

export default TaskList;
