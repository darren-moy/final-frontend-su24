import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

import SingleTaskView from '../views/SingleTaskView';

function SingleTaskContainer() {
  let { taskId } = useParams(); //get id from URL
  taskId = parseInt(taskId); //convert to integer

  //get task from state based on URL parameter
  const task = useSelector(state =>
    state.tasks.find(task => task.id === taskId)
  );

  return <SingleTaskView task={task}/>
}

export default SingleTaskContainer;