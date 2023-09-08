import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // Retrieve the array of user objects from localStorage
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Find a user with the matching email and password
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            // Authentication successful, update user status
            user.loggedIn = true;
            localStorage.setItem('loggedInUser',JSON.stringify(user))
            // Update the user object in the array
            const updatedUsers = users.map((u) => (u.email === user.email ? user : u));
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            console.log("Authentication successful");

            // Redirect to a dashboard or another page upon successful login
            navigate("/dashboard");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-1/2 flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="Your email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Enter password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className="my-4 text-center">
                            Do not have an account? <Link className="text-orange-600 font-bold" to="/signup">Sign Up</Link>
                        </p>
                        <p className="text-error">{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
