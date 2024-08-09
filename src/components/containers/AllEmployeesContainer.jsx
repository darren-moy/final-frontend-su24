import AllEmployeesView from "../views/AllEmployeesView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/employeesSlice";

function AllEmployeesContainer() {
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
      }, [dispatch]);
    
    return (
       <AllEmployeesView employees={employees} />
    );

}

export default AllEmployeesContainer;