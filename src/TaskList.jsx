import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './taskitem';
import './Tasklist.scss';

const TaskList = () => {
  const { tasks, deletedTasks, activeView } = useSelector(state => state.tasks);
/*const taskState = useSelector(state => state.tasks);

const tasks = taskState.tasks;
const deletedTasks = taskState.deletedTasks;
const activeView = taskState.activeView;
*/
let filteredTasks = [];

if (activeView === 'trash') {
  filteredTasks = deletedTasks;
} else if (activeView === 'pending') {
  filteredTasks = tasks.filter(task => !task.completed);
} else if (activeView === 'completed') {
  filteredTasks = tasks.filter(task => task.completed);
} else {
  filteredTasks = tasks; // default is 'all'
}



  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p>No tasks to display</p>
      ) : (
        filteredTasks.map(t => <TaskItem key={t.id} task={t}/>) 
      )}
    </div>
  );
};

export default TaskList;
