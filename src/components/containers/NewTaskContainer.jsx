import NewTaskView from "../views/NewTaskView";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/tasksSlice";

function NewTaskContainer() {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        // Prevent server submission
        e.preventDefault()

        const { elements } = e.currentTarget
        const userInput = elements.taskContent.value

        // Create the task object and dispatch the `addTask` thunk
        const newTask = {
            content: userInput,
        };
        dispatch(addTask(newTask));

        e.currentTarget.reset();
    }

    return (
        <NewTaskView handleSubmit={handleSubmit}/>
    );

}

export default NewTaskContainer;