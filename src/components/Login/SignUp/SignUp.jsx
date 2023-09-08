import { useState } from "react";
import { Link } from "react-router-dom";



const SignUp = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    

    const imageStorageKey = "1dcd284c1ef7e7ada10cce8419573643";

    const handleSignUp = (event) => {
        event.preventDefault();
        

        const form = event.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        const url = form.image.files[0];
        const bio = form.bio.value;
        console.log(url);
        // file.image[0]
        const image = url;
        const formData = new FormData();
        formData.append("image", image);
        
        fetch(`https://api.imgbb.com/1/upload?key=${imageStorageKey}`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((result)=>{
            if (password !== confirm) {
                setError("Password did not match");
                return;
            } else if (password.length < 6) {
                setError("Password must be at least six characters");
                return;
            }

            const newUser = {
                username,
                email,
                password,
                url:result.data.url,
                bio,
            };
            // Retrieve the existing user array from localStorage
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Push the new user object to the array
        users.push(newUser);

        // Save the updated user array back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Reset the form and show a success message
        form.reset();
        setSuccess(true);
        setError("");
            console.log(newUser);
          })

      



        
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-1/2 flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                        <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" name="username" placeholder="Your name" className="input input-bordered" />
                            </div>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name="confirm" placeholder="Confirm password" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                
                                <input
                               
                                
              type="file"
              name="image"
            
            />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bio</span>
                                </label>
                                <input type="text" name="bio" placeholder="Bio" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="my-4 text-center">
                            Already have an account? <Link className="text-orange-600 font-bold" to="/login">Login</Link>
                        </p>
                        <p className="text-error">{error}</p>
                        {success && <p className="text-success">Registration successful! You can now log in.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
