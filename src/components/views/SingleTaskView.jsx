import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SingleTaskView({ task, handleSubmit, employees, errors }) {
    const [editMode, setEditMode] = useState(false);
    const [taskContent, setTaskContent] = useState(task?.content || "");
    const [taskPriority, setTaskPriority] = useState(task?.priority?.toString() || "1");
    const [employeeId, setEmployeeId] = useState(task?.employeeId ? task.employeeId.toString() : "null");
    const [completed, setCompleted] = useState(task?.completed || false);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ 
            id: task.id, 
            content: taskContent, 
            priority: parseInt(taskPriority), 
            employeeId: employeeId !== "null" ? parseInt(employeeId) : null,
            completed
        });
        setEditMode(false);
    };

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
                            {errors.taskContent && <p style={{ color: 'red' }}>{errors.taskContent}</p>}
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
                            {errors.taskPriority && <p style={{ color: 'red' }}>{errors.taskPriority}</p>}
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
                            {task.employee ? (
                                <Link to={`/employees/${task.employee.id}`}>
                                    {task.employee.firstname} {task.employee.lastname}
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
            <Link to="/tasks">
                <button>Go Back to All Tasks</button>
            </Link>
        </section>
    );
}

export default SingleTaskView;
