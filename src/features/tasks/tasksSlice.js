import { createSlice } from '@reduxjs/toolkit';

const initialUserTasks = JSON.parse(localStorage.getItem('userTasks')) || {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    userTasks: initialUserTasks,
    activeView: 'all',
  },
  reducers: {
    setTasks: (state, action) => {
      const { email, tasks } = action.payload;
      state.userTasks[email] = tasks;
      localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
    },

    addTask: (state, action) => {
      const { email, task } = action.payload;
     /* const newTask = {
        id: Date.now(),
        text: task.text,
        completed: false,
        dueDate: task.dueDate || null,
        hasReminder: task.hasReminder || false,
      };*/

      if (!state.userTasks[email]) {
        state.userTasks[email] = [];}//  is checking whether the user with the given email has any tasks saved in the userTasks
        /*{
  "sameena@gmail.com": []
}
*/
//It updates Redux state → state.userTasks[email]
      state.userTasks[email].push(task);
      /*{
  "sameena@gmail.com": [ The value is an array of tasks
    { title: "Learn Redux", completed: false, ... }
  ]
}
*/
      localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
    },

    toggleTask: (state, action) => {
      const { email, taskId } = action.payload;
     // const taskList = state.userTasks[email] || [];
      const task = state.userTasks[email].find(t => t.id === taskId);

      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
      }
    },

    deleteTask: (state, action) => {
      const { email, taskId } = action.payload;
   //   const taskList = state.userTasks[email] || [];
      const taskToDelete = state.userTasks[email].find(t => t.id === taskId);
      /*{
  "userTasks": {
    "sameena@gmail.com": [
      { id: 1, title: "Buy Milk", reminder: false },
      { id: 2, title: "Study React", reminder: true }
    ],
    "deletedTasks": {
      "sameena@gmail.com": [
        { id: 3, title: "Old Task", reminder: false }
      ]
    }
  }
}
*/

      state.userTasks[email] = state.userTasks[email].filter(t => t.id !== taskId);
      if (!state.userTasks.deletedTasks) state.userTasks.deletedTasks = {};//"If this particular user (email) doesn’t have a trash bin, create an empty one."
      if (!state.userTasks.deletedTasks[email]) state.userTasks.deletedTasks[email] = [];

      state.userTasks.deletedTasks[email].push(taskToDelete);
      localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
    },

    clearTrash: (state, action) => {
      const email = action.payload;
      if (state.userTasks.deletedTasks && state.userTasks.deletedTasks[email]) {
        state.userTasks.deletedTasks[email] = [];
        localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
      }
    },

    setActiveView: (state, action) => {
      state.activeView = action.payload;
    },

    addSubtask: (state, action) => {
      const { email, taskId, subtask } = action.payload;
      const task = state.userTasks[email]?.find(t => t.id === taskId);
      if (task) {
        if (!task.subtasks) task.subtasks = [];
        task.subtasks.push({ ...subtask, id: Date.now() });
        localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
      }
    },
    toggleSubtask: (state, action) => {
      const { email, taskId, subtaskId } = action.payload;
      const task = state.userTasks[email]?.find(t => t.id === taskId);
      if (task) {
        const sub = task.subtasks.find(s => s.id === subtaskId);
        if (sub) sub.completed = !sub.completed;
        // If all subtasks complete, set task.completed = true
        if (task.subtasks.length && task.subtasks.every(s => s.completed)) {
          task.completed = true;
        } else {
          task.completed = false;
        }
        // XP logic: partial XP for each subtask
        if (task.xp) {
          const completedCount = task.subtasks.filter(s => s.completed).length;
          task.xpEarned = Math.floor((completedCount / task.subtasks.length) * task.xp);
        }
        localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
      }
    },
    bulkCompleteSubtasks: (state, action) => {
      const { email, taskId, completed } = action.payload;
      const task = state.userTasks[email]?.find(t => t.id === taskId);
      if (task && Array.isArray(task.subtasks)) {
        task.subtasks.forEach(s => { s.completed = completed; });
        task.completed = completed;
        // XP logic
        if (task.xp) {
          task.xpEarned = completed ? task.xp : 0;
        }
        localStorage.setItem('userTasks', JSON.stringify(state.userTasks));
      }
    },
  }
});

export const {
  setTasks,
  addTask,
  toggleTask,
  deleteTask,
  clearTrash,
  setActiveView,
  addSubtask,
  toggleSubtask,
  bulkCompleteSubtasks
} = tasksSlice.actions;

export default tasksSlice.reducer;
