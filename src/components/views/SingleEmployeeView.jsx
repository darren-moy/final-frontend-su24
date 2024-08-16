import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import './styles/SingleEmployeeView.css'

function SingleEmployeeView({ employee, tasks, handleSubmit, errors, deleteTask }) {

  // Handles the case when the employee is not found
  if (!employee) {
    return (
      <section className="single-employee-view">
        <div className="employee-details">
          <h2>Employee not found!</h2>
          <Link to="/employees">
            <button>Back to All Employees</button>
          </Link>
        </div>
      </section>
    );
  }

  const [editMode, setEditMode] = useState(false);  // Controls whether the employee's details are being edited
  const [firstname, setFirstname] = useState(employee.firstname);  // Employee's first name input
  const [lastname, setLastname] = useState(employee.lastname);  // Employee's last name input
  const [department, setDepartment] = useState(employee.department);  // Employee's department input
  const [validationErrors, setValidationErrors] = useState({});  // Validation errors for form fields
  const [showPopup, setShowPopup] = useState(false);  // Controls the visibility of the update popup

  // Validation function to check if the first name, last name, and department fields are not empty or just spaces
  const validateForm = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = "First name is required and cannot be empty.";
    if (!lastname.trim()) newErrors.lastname = "Last name is required and cannot be empty.";
    if (!department.trim()) newErrors.department = "Department is required and cannot be empty.";
    return newErrors;
  };

  // Handles form submission for editing the employee's details
  const onSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setValidationErrors(formErrors);  // Set validation errors if the form is invalid
    } else {
      handleSubmit({ firstname, lastname, department });  // Submit the updated employee details
      setEditMode(false);  // Exit edit mode after saving
      setShowPopup(true);  // Show the update popup
      setTimeout(() => setShowPopup(false), 2000);  // Hide the popup after 2 seconds
    }
  };

  return (
    <section className="single-employee-view">
      <div className="single-employee-view-background"></div>
      <div className="employee-details">
        <h2>Employee Details</h2>
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel Edit" : "Edit Employee"}
        </button>
        {editMode ? (
          <form onSubmit={onSubmit}>
            <label>
              First Name:
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {validationErrors.firstname && <p style={{ color: "red" }}>{validationErrors.firstname}</p>}
            </label>
            <br />
            <label>
              Last Name:
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {validationErrors.lastname && <p style={{ color: "red" }}>{validationErrors.lastname}</p>}
            </label>
            <br />
            <label>
              Department:
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              {validationErrors.department && <p style={{ color: "red" }}>{validationErrors.department}</p>}
            </label>
            <br />
            <button type="submit">Update Employee</button>
          </form>
        ) : (
          <>
            <p>First Name: {employee.firstname}</p>
            <p>Last Name: {employee.lastname}</p>
            <p>Department: {department || "No department :("}</p> {/* Show "No department" if empty */}
          </>
        )}

        <h3>Assigned Tasks</h3>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <Link to={`/tasks/${task.id}`}>
                  {task.content}
                </Link>
                <button onClick={() => deleteTask(task.id)}>Delete Task</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks assigned to this employee.</p>
        )}

        <div className="bottom-buttons">

        {/* Link to Add Task page, pre-filling the employeeId */}
        <Link to={`/tasks/new?employeeId=${employee.id}`}>
          <button style={{ marginTop: "16px" }}>Add Task for This Employee</button>
        </Link>

        <Link to="/employees">
          <button style={{ marginTop: "16px" }}>Back to All Employees</button>
        </Link>
        </div>

        {/* Popup notification for employee update */}
        {showPopup && (
          <div className="popup-notification">
            Employee details have been updated successfully!
          </div>
        )}
      </div>
    </section>
  );
}

// PropTypes validation
SingleEmployeeView.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    department: PropTypes.string,
  }),
  deleteTask: PropTypes.func.isRequired,
};

export default SingleEmployeeView;
