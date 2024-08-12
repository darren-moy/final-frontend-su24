import NewTaskView from "../views/NewTaskView";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/tasksSlice";

function NewTaskContainer() {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        // Prevent server submission
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        const { elements } = e.currentTarget
        const userInput = elements.taskContent.value

        // Create the task object and dispatch the `addTask` thunk
        const newTask = {
            content: formJson.taskContent,
            priority: parseInt(formJson, taskPriority),
        };
        console.log(newTask);
        dispatch(addTask(newTask));

        e.currentTarget.reset();
    }

    return (
        <NewTaskView handleSubmit={handleSubmit}/>
    );

}

export default NewTaskContainer;