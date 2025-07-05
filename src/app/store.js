import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice'; 
import authReducer from '../features/auth/authSlice';
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
   auth: authReducer,
 
  },
});

export default store;
