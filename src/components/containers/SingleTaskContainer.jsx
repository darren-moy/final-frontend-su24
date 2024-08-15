import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SingleTaskView from '../views/SingleTaskView';
import { editTask } from "../../store/tasksSlice";
import { fetchEmployees } from '../../store/employeesSlice';
import { useEffect } from 'react';

function SingleTaskContainer() {
  const { taskId } = useParams(); 
  const dispatch = useDispatch();

  const task = useSelector(state =>
    state.tasks.find(task => task.id === parseInt(taskId))
  );
  
  const employees = useSelector(state => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

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
