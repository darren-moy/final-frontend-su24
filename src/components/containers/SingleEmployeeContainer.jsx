import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SingleEmployeeView from '../views/SingleEmployeeView';
import { updateEmployee } from "../../store/employeesSlice";
import { deleteTask } from "../../store/tasksSlice";

function SingleEmployeeContainer() {
  const { employeeId } = useParams(); 
  const dispatch = useDispatch();

  const employee = useSelector(state =>
    state.employees.find(emp => emp.id === parseInt(employeeId))
  );
  
  const tasks = useSelector(state => 
    state.tasks.filter(task => task.employeeId === parseInt(employeeId))
  );

  const [errors, setErrors] = useState({});

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
  };

  return (
    <SingleEmployeeView 
      employee={employee} 
      tasks={tasks} 
      handleSubmit={handleSubmit} 
      errors={errors} 
      deleteTask={handleDeleteTask}
    />
  );
}

export default SingleEmployeeContainer;
