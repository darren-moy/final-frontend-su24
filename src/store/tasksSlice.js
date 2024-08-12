//REDUCER
const initialState = [];

export function tasksReducer(state = initialState, action) {
    switch (action.type) {
      case 'tasks/tasksLoaded':
        return action.payload;
      case 'tasks/taskDeleted':
        return state.filter(task => task.id!==action.payload);
      case 'tasks/taskCreated':
        return [...state, action.payload];
      case 'tasks/taskUpdated':
        return state.map(task => 
          task.id===action.payload.id ? action.payload : task
        );
      default:
        return state;
    }
};

//API calls go here
import axios from "axios";
//PATH (should be where your server is running)
const PATH = "http://localhost:5001/api/tasks";

//Thunks

/* GET ALL TASKS */
export const fetchTasks = () => async (dispatch) => {
  try {
    let res = await axios.get(`${PATH}`);
    dispatch({type: 'tasks/tasksLoaded', payload: res.data});
  } catch(err) {
    console.error(err);
  }
};

/* DELETE TASK */
export const deleteTask = taskId => async dispatch => {
  try {
    await axios.delete(`${PATH}/${taskId}`);
    //delete succesful so change state with dispatch
    dispatch({type: 'tasks/taskDeleted', payload: taskId});
  } catch(err) {
    console.error(err);
  }
};

/* ADD TASK */
export const addTask = task => async (dispatch) => {
  try {
    let res = await axios.post(`${PATH}`, task);
    dispatch({type: 'tasks/taskCreated', payload: res.data});
    return res.data;
  } catch(err) {
    console.error(err);
  }
};

/* EDIT TASK */
export const editTask = task => async dispatch => {
  try {
    let res = await axios.put(`${PATH}/${task.id}`, task);
    //res.data is the updated course
    dispatch({type: 'tasks/taskUpdated', payload: res.data});
  } catch(err) {
    console.error(err);
  }
};