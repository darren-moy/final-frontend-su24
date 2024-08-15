import NewTaskView from "../views/NewTaskView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { addTask } from "../../store/tasksSlice";
import { fetchEmployees } from '../../store/employeesSlice';
import { useLocation } from 'react-router-dom';

function NewTaskContainer() {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prefilledEmployeeId = params.get('employeeId'); // Get the employeeId from query parameters

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSubmit = async (task) => {
    try {
      await dispatch(addTask(task));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <NewTaskView 
      handleSubmit={handleSubmit} 
      employees={employees} 
      prefilledEmployeeId={prefilledEmployeeId ? parseInt(prefilledEmployeeId) : null} 
    />
  );
}

export default NewTaskContainer;
