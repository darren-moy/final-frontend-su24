import './styles/all-tasks.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function AllTasksView({ tasks, deleteTask }) {

  if (!tasks.length) {
    return (
      <div className="all-tasks-view-container">
        <div className="content-box">
          <Link to={`/`}><button>Back to Home</button></Link>
          <Link to={`/tasks/new`}><button>Add Task</button></Link>
          <div>There are no tasks.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="all-tasks-view-container">
      <div className="content-box">
        <Link to={`/`}><button>Back to Home</button></Link>
        <Link to={`/tasks/new`}><button>Add Task</button></Link>
        <div className="task-list">
          {tasks.map((todo, idx) => (
            <div key={todo.id} className="task-item">
              <h4>Task #{idx + 1}: <Link to={`/tasks/${todo.id}`}>{todo.content}</Link></h4>
              <h5>
                Assigned to: 
                {todo.employee 
                  ? ` ${todo.employee.firstname} ${todo.employee.lastname}` 
                  : " Unassigned "}
              </h5>
              <h5>{todo.completed ? "COMPLETED" : "IN PROGRESS"}</h5>
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

AllTasksView.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      employee: PropTypes.shape({
        id: PropTypes.number,
        firstname: PropTypes.string,
        lastname: PropTypes.string
      })
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default AllTasksView;
