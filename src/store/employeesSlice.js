//REDUCER
const initialState = [];

export function employeesReducer(state = initialState, action) {
    switch (action.type) {
      case 'employees/employeesLoaded':
        return action.payload.sort((a, b) => a.id - b.id);
      case 'employees/employeeAdded':
        return [...state, action.payload];
      case 'employees/employeeDeleted':
        return state.filter(employee => employee.id !== action.payload);
      case 'employees/employeeUpdated':
        return state.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        );
      default:
        return state;
    }
}

//API calls go here
import axios from "axios";
const PATH = "http://localhost:5001/api";

//Thunks

// fetchEmployees 
export const fetchEmployees = () => async (dispatch) => {
  try {
    let res = await axios.get(`${PATH}/employees`);
    dispatch({type: 'employees/employeesLoaded', payload: res.data});
  } catch(err) {
    console.error(err);
  }
};

// addEmployee 
export const addEmployee = (employee) => async (dispatch) => {
  try {
    let res = await axios.post(`${PATH}/employees`, employee);
    dispatch({type: 'employees/employeeAdded', payload: res.data});
  } catch(err) {
    console.error(err);
  }
};

// deleteEmployee 
export const deleteEmployee = (employeeId) => async (dispatch) => {
  try {
    await axios.delete(`${PATH}/employees/${employeeId}`);
    dispatch({type: 'employees/employeeDeleted', payload: employeeId});
  } catch(err) {
    console.error(err);
  }
};

// updateEmployee 
export const updateEmployee = (employee) => async (dispatch) => {
  try {
    let res = await axios.put(`${PATH}/employees/${employee.id}`, employee);
    dispatch({type: 'employees/employeeUpdated', payload: res.data});
  } catch(err) {
    console.error(err);
  }
};
