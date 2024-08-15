// SingleTaskContainer.jsx
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SingleTaskView from '../views/SingleTaskView';
import { editTask, fetchTasks } from "../../store/tasksSlice";
import { fetchEmployees } from '../../store/employeesSlice';
import { useEffect } from 'react';

function SingleTaskContainer() {
  const { taskId } = useParams(); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTasks());
  }, [dispatch]);

  const task = useSelector(state =>
    state.tasks.find(task => task.id === parseInt(taskId))
  );
  
  const employees = useSelector(state => state.employees);

  const handleSubmit = (data) => {
    dispatch(editTask(data));
  };

  return (
    <SingleTaskView 
      task={task} 
      handleSubmit={handleSubmit} 
      employees={employees}
      errors={{}}
    />
  );
}

export default SingleTaskContainer;
