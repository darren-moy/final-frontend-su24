import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
            <Link to={`/employees/${user.id}`}>
              Employee #{idx + 1}: {user.firstname} {user.lastname}
            </Link>
            <button onClick={() => deleteEmployee(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to={`/`}><button>Back to Home</button></Link>
      <Link to="/employees/new"><button>Add New Employee</button></Link>
    </>
  );
}

AllEmployeesView.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

export default AllEmployeesView;
