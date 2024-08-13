import { Link } from "react-router-dom";

function AllEmployeesView({ employees, deleteEmployee }) {
  if (!employees.length) {
    return (
      <div>
        <div>There are no employees.</div>
        <Link to="/employees/new"><button>Add New Employee</button></Link>
      </div>
    );
  }

  return (
    <>
      <ul>
        {employees.map((user, idx) => (
          <li key={user.id}>
            Employee #{idx + 1}: {user.firstname} {user.lastname}
            <button onClick={() => deleteEmployee(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to={`/`}><button>Back to Home</button></Link>
      <Link to="/employees/new"><button>Add New Employee</button></Link>
    </>
  );
}

export default AllEmployeesView;
