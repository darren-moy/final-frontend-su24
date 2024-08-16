import './styles/NewTaskView.css';  
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NewTaskView({ handleSubmit, employees, prefilledEmployeeId }) {
  const [taskContent, setTaskContent] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [employeeId, setEmployeeId] = useState(prefilledEmployeeId || "null");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);  

  useEffect(() => {
    if (prefilledEmployeeId) {
      setEmployeeId(prefilledEmployeeId);
    }
  }, [prefilledEmployeeId]);

  const validateForm = () => {
    const newErrors = {};
    if (!taskContent.trim()) newErrors.taskContent = "Task description is required and cannot be empty.";
    if (!taskPriority) newErrors.taskPriority = "Task priority level is required.";
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      handleSubmit({
        content: taskContent.trim(),
        priority: parseInt(taskPriority),
        employeeId: employeeId !== "null" ? parseInt(employeeId) : null,
        completed,
      });
      setTaskContent("");
      setTaskPriority("");
      setEmployeeId("null");
      setCompleted(false);
      setErrors({});
      setShowPopup(true);  // Show the popup
      setTimeout(() => setShowPopup(false), 2000);  // Hide the popup after 2 seconds
    }
  };

  return (
    <section className="new-task-view">
      <div className="new-task-view-background"></div>
      <div className="new-task-form-container">
        <h2>Add a New Task</h2>
        <form onSubmit={onSubmit} id="newtaskform">
          <label>
            Description: 
            <input 
              name="taskContent" 
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)} 
            />
            {errors.taskContent && <p className="validation-error">{errors.taskContent}</p>}
          </label>
          <p> Priority level:
            <label>
              <input 
                type="radio" 
                name="taskPriority" 
                value="1" 
                checked={taskPriority === "1"}
                onChange={(e) => setTaskPriority(e.target.value)}
              /> Low
            </label>
            <label>
              <input 
                type="radio" 
                name="taskPriority" 
                value="2"
                checked={taskPriority === "2"}
                onChange={(e) => setTaskPriority(e.target.value)}
              /> Medium
            </label>
            <label>
              <input 
                type="radio" 
                name="taskPriority" 
                value="3"
                checked={taskPriority === "3"}
                onChange={(e) => setTaskPriority(e.target.value)}
              /> High
            </label>
            {errors.taskPriority && <p className="validation-error">{errors.taskPriority}</p>}
          </p>
          <label> Assign employee (optional):
            <select 
              name="employeeId" 
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="null">None</option>
              {employees.map(emp => {
                let name = emp.firstname + " " + emp.lastname;
                return <option key={emp.id} value={emp.id}>{name}</option>;
              })}
            </select>
          </label>
          <br />
          <label>
            Completion Status:
            <select
              value={completed ? "completed" : "incomplete"}
              onChange={(e) => setCompleted(e.target.value === "completed")}
            >
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <br />
          <button type="submit">Save Task</button>
        </form>
        <br />
        <Link to={`/tasks`}><button className="back-button">Back to All Tasks</button></Link>
      </div>

      {showPopup && (
        <div className="popup">
          Task has been created successfully!
        </div>
      )}
    </section>
  );
}

NewTaskView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired
    })
  ).isRequired,
  prefilledEmployeeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default NewTaskView;
