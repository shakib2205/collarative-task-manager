
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({children }) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();

    if (user && user.loggedIn) {
        return children;
    } else {
        navigate("/");
        return null;
    }
};

export default PrivateRoute;
