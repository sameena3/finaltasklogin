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
  }
});

export const {
  setTasks,
  addTask,
  toggleTask,
  deleteTask,
  clearTrash,
  setActiveView
} = tasksSlice.actions;

export default tasksSlice.reducer;
