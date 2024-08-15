import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function SingleTaskView({ task, handleSubmit, employees, errors }) {
    const [editMode, setEditMode] = useState(false);
    const [taskContent, setTaskContent] = useState(task?.content || "");
    const [taskPriority, setTaskPriority] = useState(task?.priority?.toString() || "1");
    const [employeeId, setEmployeeId] = useState(task?.employeeId ? task.employeeId.toString() : "null");
    const [completed, setCompleted] = useState(task?.completed || false);
    const [currentEmployee, setCurrentEmployee] = useState(task?.employee || null);
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const fromEmployee = location.state?.fromEmployee;

    const validateForm = () => {
        const newErrors = {};
        if (!taskContent.trim()) {
            newErrors.taskContent = "Task description is required and cannot be empty.";
        }
        return newErrors;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setValidationErrors(formErrors);
        } else {
            const updatedTask = {
                id: task.id,
                content: taskContent.trim(),
                priority: parseInt(taskPriority),
                employeeId: employeeId !== "null" ? parseInt(employeeId) : null,
                completed
            };
            handleSubmit(updatedTask);
            const assignedEmployee = employees.find(emp => emp.id === updatedTask.employeeId);
            setCurrentEmployee(assignedEmployee || null);
            setEditMode(false);
        }
    };

    useEffect(() => {
        if (task?.employeeId) {
            const assignedEmployee = employees.find(emp => emp.id === task.employeeId);
            if (assignedEmployee) {
                setEmployeeId(task.employeeId.toString());
                setCurrentEmployee(assignedEmployee);
            }
        }
    }, [task, employees]);

    if (!task) {
        return (
            <section>
                <h2>Task not found!</h2>
                <Link to="/tasks">
                    <button>Go Back to All Tasks</button>
                </Link>
            </section>
        );
    }

    let priorities = ["Low", "Medium", "High"];

    return (
        <section>
            <article className="task">
                {editMode ? (
                    <form onSubmit={onSubmit}>
                        <label>
                            Description: 
                            <input 
                                value={taskContent}
                                onChange={(e) => setTaskContent(e.target.value)} 
                            />
                            {validationErrors.taskContent && <p style={{ color: 'red' }}>{validationErrors.taskContent}</p>}
                        </label>
                        <p> Priority level:
                            {priorities.map((priority, index) => (
                                <label key={index}>
                                    <input 
                                        type="radio" 
                                        value={index + 1} 
                                        checked={taskPriority === (index + 1).toString()}
                                        onChange={(e) => setTaskPriority(e.target.value)}
                                    /> {priority}
                                </label>
                            ))}
                            {validationErrors.taskPriority && <p style={{ color: 'red' }}>{validationErrors.taskPriority}</p>}
                        </p>
                        <label> Assign employee (optional):
                            <select 
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                            >
                                <option value="null">Unassigned</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id.toString()}>{emp.firstname} {emp.lastname}</option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Completion Status:
                            <select
                                value={completed ? "completed" : "incomplete"}
                                onChange={(e) => setCompleted(e.target.value === "completed")}
                            >
                                <option value="completed">Completed</option>
                                <option value="incomplete">Incomplete</option>
                            </select>
                        </label>
                        <br />
                        <button type="submit">Save Task</button>
                    </form>
                ) : (
                    <>
                        <h2>{task.content}</h2>
                        <p>Priority: {priorities[task.priority - 1]}</p>
                        <p>Assigned to: 
                            {currentEmployee ? (
                                <Link to={`/employees/${currentEmployee.id}`}>
                                    {currentEmployee.firstname} {currentEmployee.lastname}
                                </Link>
                            ) : (
                                " Unassigned"
                            )}
                        </p>
                        <p>Completion Status: {task.completed ? "Completed" : "Incomplete"}</p>
                    </>
                )}
            </article>
            <button onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel Edit" : "Edit Task"}</button>
            {fromEmployee ? (
                <Link to={`/employees/${fromEmployee}`}>
                    <button>Back to Employee</button>
                </Link>
            ) : (
                <Link to="/tasks">
                    <button>Go Back to All Tasks</button>
                </Link>
            )}
        </section>
    );
}

export default SingleTaskView;
