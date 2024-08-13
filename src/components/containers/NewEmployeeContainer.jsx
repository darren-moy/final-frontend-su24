import NewEmployeeView from "../views/NewEmployeeView";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employeesSlice";

function NewEmployeeContainer() {
  const dispatch = useDispatch();

  const handleSubmit = (employee) => {
    dispatch(addEmployee(employee));
  };

  return <NewEmployeeView handleSubmit={handleSubmit} />;
}

export default NewEmployeeContainer;
