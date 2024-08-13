import AllEmployeesView from "../views/AllEmployeesView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../store/employeesSlice";

function AllEmployeesContainer() {
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
      }, [dispatch]);

    const handleDelete = (employeeId) => {
        dispatch(deleteEmployee(employeeId));
    };

    return (
       <AllEmployeesView employees={employees} deleteEmployee={handleDelete} />
    );
}

export default AllEmployeesContainer;
