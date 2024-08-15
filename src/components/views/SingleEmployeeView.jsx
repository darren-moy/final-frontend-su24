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

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ firstname, lastname, department });
    setEditMode(false);
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
            {errors.firstname && <p style={{ color: "red" }}>{errors.firstname}</p>}
          </label>
          <br />
          <label>
            Last Name:
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && <p style={{ color: "red" }}>{errors.lastname}</p>}
          </label>
          <br />
          <label>
            Department:
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            {errors.department && <p style={{ color: "red" }}>{errors.department}</p>}
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
              {task.content}
              <button onClick={() => deleteTask(task.id)}>Delete Task</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned to this employee.</p>
      )}

      {/* Link to Add Task page, passing the employeeId */}
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
