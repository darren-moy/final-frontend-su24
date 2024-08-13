import { useState } from "react";
import { Link } from "react-router-dom";

function NewTaskView({ handleSubmit, employees }) {
  const [taskContent, setTaskContent] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [employeeId, setEmployeeId] = useState("null");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!taskContent) newErrors.taskContent = "Task description is required.";
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
        content: taskContent,
        taskPriority: parseInt(taskPriority),
        employeeId: employeeId !== "null" ? parseInt(employeeId) : null,
      });
      setTaskContent("");
      setTaskPriority("");
      setEmployeeId("null");
      setErrors({});
    }
  };

  return (
    <section>
      <h2>Add a New Task</h2>
      <form onSubmit={onSubmit} id="newtaskform">
        <label>
          Description: 
          <input 
            name="taskContent" 
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)} 
          />
          {errors.taskContent && <p style={{color: 'red'}}>{errors.taskContent}</p>}
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
          {errors.taskPriority && <p style={{color: 'red'}}>{errors.taskPriority}</p>}
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
        <button type="submit">Save Task</button>
      </form>
      <br />
      <Link to={`/tasks`}><button style={{ margin: "8px" }}>Back to All Tasks</button></Link>
    </section>
  );
}

export default NewTaskView;
