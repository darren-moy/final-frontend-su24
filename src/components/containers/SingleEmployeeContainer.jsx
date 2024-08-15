import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SingleEmployeeView from '../views/SingleEmployeeView';
import { updateEmployee, fetchEmployees } from "../../store/employeesSlice";
import { deleteTask, fetchTasks } from "../../store/tasksSlice";

function SingleEmployeeContainer() {
  const { employeeId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector(state => state.employees);
  const tasks = useSelector(state => state.tasks);
  const employee = employees.find(emp => emp.id === parseInt(employeeId));

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (employees.length === 0) {
        await dispatch(fetchEmployees());
      }
      if (tasks.length === 0) {
        await dispatch(fetchTasks());
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch, employees.length, tasks.length]);

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.firstname) newErrors.firstname = "First name is required.";
    if (!data.lastname) newErrors.lastname = "Last name is required.";
    if (!data.department) newErrors.department = "Department is required.";
    return newErrors;
  };

  const handleSubmit = (data) => {
    const formErrors = validateForm(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      dispatch(updateEmployee({ id: employee.id, ...data }));
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    navigate(`/employees/${employeeId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!employee) {
    return <p>Employee not found!</p>;
  }

  const employeeTasks = tasks.filter(task => task.employeeId === parseInt(employeeId));

  return (
    <SingleEmployeeView 
      employee={employee} 
      tasks={employeeTasks} 
      handleSubmit={handleSubmit} 
      errors={errors} 
      deleteTask={handleDeleteTask}
    />
  );
}

export default SingleEmployeeContainer;
