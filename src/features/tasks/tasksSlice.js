import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: 1,
      text: 'Complete project proposal',
      completed: false,
      dueDate:null,
      hasReminder: true,
    },
    {
      id: 2,
      text: 'Review team feedback',
      completed: true,
      dueDate: '2025-06-30T16:00:00',
      hasReminder: false,
    },
    {
      id: 3,
      text: 'Schedule client meeting',
      completed: false,
      dueDate: null,
      hasReminder: false,
    },
  ],
  deletedTasks: [],
  activeView: 'all',
};
/*state → entire store

state.tasks → the slice of state managed by your tasksSlice (from createSlice())*/
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
   addTask: (state, action) => {
  const currentUser = action.payload.email; // passed from component
  const newTask = {
    id: Date.now(),
    text: action.payload.text,
    completed: false,
    dueDate: action.payload.dueDate || null,
    hasReminder: action.payload.hasReminder || false,
  };

  // Save to localStorage per user
  const userTasks = JSON.parse(localStorage.getItem(currentUser + '_tasks')) || [];
  const updatedTasks = [...userTasks, newTask];
  localStorage.setItem(currentUser + '_tasks', JSON.stringify(updatedTasks));

  // Update Redux state
  state.tasks.push(newTask);
}
,
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;//Immer detects the change, and creates a new copy of state.tasks with that update
      }
    },
   deleteTask: (state, action) => {
  const task = state.tasks.find(t => t.id === action.payload);
  if (task) {
    state.tasks = state.tasks.filter(t => t.id !== action.payload); // remove from tasks
    state.deletedTasks.push(task); // add to trash
  }
}
,
    clearTrash: (state) => {
      state.deletedTasks = [];
    },
    setActiveView: (state, action) => {
  state.activeView = action.payload;
},


  }
});

export const { addTask, toggleTask, deleteTask, clearTrash,setActiveView } = tasksSlice.actions;
export default tasksSlice.reducer;
