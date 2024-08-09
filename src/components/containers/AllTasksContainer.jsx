import AllTasksView from "../views/AllTasksView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../store/tasksSlice";

function AllTasksContainer() {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const deleteDispatch = (taskId) => dispatch(deleteTask(taskId))

    useEffect(() => {
        dispatch(fetchTasks());
      }, [dispatch]);
    
    return (
       <AllTasksView tasks={tasks} deleteTask={deleteDispatch}/>
    );

}

export default AllTasksContainer;