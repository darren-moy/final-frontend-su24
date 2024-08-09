//REDUCER
const initialState = [];

export function tasksReducer(state = initialState, action) {
    switch (action.type) {
      case 'tasks/tasksLoaded':
        return action.payload;
        case 'tasks/taskDeleted':
          return state.filter(task => task.id!==action.payload);
      default:
        return state;
    }
}

//API calls go here
import axios from "axios";
//PATH (should be where your server is running)
const PATH = "http://localhost:5001/api";

//Thunk: getting all tasks 
export const fetchTasks = () => async (dispatch) => {
  try {
    let res = await axios.get(`${PATH}/tasks`);
    dispatch({type: 'tasks/tasksLoaded', payload: res.data});
  } catch(err) {
    console.error(err);
  }
};

export const deleteTask = taskId => async dispatch => {
  try {
    await axios.delete(`${PATH}/${taskId}`);
    //delete succesful so change state with dispatch
    dispatch({type: 'tasks/taskDeleted', payload: taskId});
  } catch(err) {
    console.error(err);
  }
};

