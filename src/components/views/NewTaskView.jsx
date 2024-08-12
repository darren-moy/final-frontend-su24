import { Link } from "react-router-dom";
import { useState } from 'react';

function NewTaskView({ handleSubmit }) {
    const [taskContent, setTaskContent] = useState('');
    const [taskPriority, setTaskPriority] = useState('1');

    let priorityMarkup = (
        <p>Priority level:
        <label>
            <input
                type="radio"
                name="taskPriority"
                value="1"
                checked={taskPriority === '1'}
                onChange={(e) => setTaskPriority(e.target.value)}
            /> Low
        </label>
        <label>
            <input
                type="radio"
                name="taskPriority"
                value="2"
                checked={taskPriority === '2'}
                onChange={(e) => setTaskPriority(e.target.value)}
            /> Medium
        </label>
        <label>
            <input
                type="radio"
                name="taskPriority"
                value="3"
                checked={taskPriority === '3'}
                onChange={(e) => setTaskPriority(e.target.value)}
            /> High
        </label>
        </p>
    );

    return (
        <section>
            <h2>Add a New Task</h2>
            <form onSubmit={handleSubmit} id="newtaskform">
                <label htmlFor="taskContent">Text input:</label>
                <input
                    name="taskContent"
                    id="taskContent"
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                />
                {priorityMarkup}
                <button type="submit">Save Task</button>
            </form>
            <br/>
            <Link to={`/tasks`}><button style={{margin: "8px"}}>Back to All Tasks</button></Link>
        </section>
    );
}

export default NewTaskView;
