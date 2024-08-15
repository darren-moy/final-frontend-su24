import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

function NewEmployeeView({ handleSubmit }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!firstname) newErrors.firstname = "First name is required.";
    if (!lastname) newErrors.lastname = "Last name is required.";
    if (!department) newErrors.department = "Department is required.";
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      handleSubmit({ firstname, lastname, department });
      setFirstname("");
      setLastname("");
      setDepartment("");
      setErrors({});
    }
  };

  return (
    <section>
      <h2>Add a New Employee</h2>
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
        <button type="submit">Add Employee</button>
      </form>
      <br />
      <Link to="/employees">
        <button style={{ margin: "8px" }}>Back to All Employees</button>
      </Link>
    </section>
  );
}

// Define prop types
NewEmployeeView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewEmployeeView;
