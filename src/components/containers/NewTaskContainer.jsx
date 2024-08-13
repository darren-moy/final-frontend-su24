import NewTaskView from "../views/NewTaskView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { addTask } from "../../store/tasksSlice";
import { fetchEmployees } from '../../store/employeesSlice'

function NewTaskContainer() {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

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
    <NewTaskView handleSubmit={handleSubmit} employees={employees} />
  );
}

export default NewTaskContainer;
