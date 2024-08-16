import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/NewEmployeeView.css"; 

function NewEmployeeView({ handleSubmit }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

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
      setShowPopup(true); // Show the popup after submission
      setTimeout(() => setShowPopup(false), 2000); // Hide the popup after 2 seconds
    }
  };

  return (
    <section className="new-employee-view">
      <h2>Add a New Employee</h2>
      <form onSubmit={onSubmit}>
        <label>
          First Name:
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors.firstname && <p className="error-text">{errors.firstname}</p>}
        </label>
        <br />
        <label>
          Last Name:
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {errors.lastname && <p className="error-text">{errors.lastname}</p>}
        </label>
        <br />
        <label>
          Department:
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          {errors.department && <p className="error-text">{errors.department}</p>}
        </label>
        <br />
        <button type="submit">Add Employee</button>
      </form>
      <br />
      <Link to="/employees">
        <button className="back-button">Back to All Employees</button>
      </Link>

      {/* Popup notification */}
      {showPopup && (
        <div className="popup-notification">
          New employee has been added successfully!
        </div>
      )}
    </section>
  );
}

// Define prop types
NewEmployeeView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewEmployeeView;
