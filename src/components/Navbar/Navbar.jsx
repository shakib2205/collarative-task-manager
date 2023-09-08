import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(true); // Set initial value to true
    const navigate = useNavigate();
    const storedUsers = localStorage.getItem("loggedInUser");
    const user =JSON.parse(storedUsers)
    useEffect(() => {
       
       
        if(user){
           setLoggedIn(true)
            
        }else{
            setLoggedIn(false)
        }
    }, [user,loggedIn]);

    const handleLogout = () => {
        // Set loggedIn to false for all users in the array
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const updatedUsers = users.map((user) => ({ ...user, loggedIn: false }));
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            localStorage.removeItem('loggedInUser')
        }

        setLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="flex justify-between h-20 items-center bg-current pl-10 pr-10">
            <h3 className="text-white text-3xl">
                <Link to="/">Collaborative Task Management</Link>
            </h3>
            <div className="text-white space-x-3">
                {loggedIn && <Link to="/dashboard">Dashboard</Link>}
                {loggedIn && <Link to="/createtask">Create Task</Link>}
                {loggedIn && <Link to="/tasklist">Task List</Link>}
                {loggedIn ? (
                    <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn m-1"><img className="w-5 h-5 rounded-full ring-2 ring-success" src={user?.url} alt="" /></label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to="/my-profile">My Profile</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                      
                    </ul>
                  </div>
                   
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
