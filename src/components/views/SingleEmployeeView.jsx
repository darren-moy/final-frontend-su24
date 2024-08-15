import { Link } from "react-router-dom";
import { useState } from "react";

function SingleEmployeeView({ employee, tasks, handleSubmit, errors, deleteTask }) {
  if (!employee) {
    return (
      <section>
        <h2>Employee not found!</h2>
        <Link to="/employees">
          <button>Back to All Employees</button>
        </Link>
      </section>
    );
  }

  const [editMode, setEditMode] = useState(false);
  const [firstname, setFirstname] = useState(employee.firstname);
  const [lastname, setLastname] = useState(employee.lastname);
  const [department, setDepartment] = useState(employee.department);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = "First name is required and cannot be empty.";
    if (!lastname.trim()) newErrors.lastname = "Last name is required and cannot be empty.";
    if (!department.trim()) newErrors.department = "Department is required and cannot be empty.";
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setValidationErrors(formErrors);
    } else {
      handleSubmit({ firstname, lastname, department });
      setEditMode(false);
    }
  };

  return (
    <section>
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
          <p>Department: {employee.department}</p>
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

      <Link to={`/tasks/new?employeeId=${employee.id}`}>
        <button style={{ marginTop: "16px" }}>Add Task for This Employee</button>
      </Link>

      <Link to="/employees">
        <button style={{ marginTop: "16px" }}>Back to All Employees</button>
      </Link>
    </section>
  );
}

export default SingleEmployeeView;
