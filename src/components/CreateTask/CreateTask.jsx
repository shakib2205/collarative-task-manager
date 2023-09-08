import { useState, useEffect } from "react";

const CreateTask = () => {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [priority, setPriority] = useState("");
    const [taskList, setTaskList] = useState([]);

    // Load tasks from local storage on component mount
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("createdTasks"));
        if (storedTasks) {
            setTaskList(storedTasks);
        }
    }, []);

    const handleCreateTask = (e) => {
        e.preventDefault();

        if (title && des && priority && date) {
            const newTask = {
                title: title,
                description: des,
                priority: priority,
                dueDate: date,
                status:"Pending",
                id:Math.floor(Math.random() * 100),
            };

            const updatedTaskList = [...taskList, newTask];
            setTaskList(updatedTaskList);

            // Store the updated task list in local storage
            localStorage.setItem("createdTasks", JSON.stringify(updatedTaskList));

            // Reset input fields
            setDate("");
            setDes("");
            setTitle("");
            setPriority("");
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex-col lg:flex-row border-2 rounded-2xl shadow-2xl mt-24">
                <h2 className="text-3xl text-center font-bold mt-6">Create Task</h2>
                <form className="pl-6 pr-6 mt-10">
                    {/* ... (Input fields and select) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder="title" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Date</span>
                        </label>
                        <input value={date} onChange={e=>{setDate(e.target.value);}}  type="date" name="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input value={des} onChange={(e)=>setDes(e.target.value)} type="text" name="description" placeholder="Minimum 50 words" className="input input-bordered" />
                    </div>
                </div>
                <div className="mt-6 pl-3">
                    <label>Priority Level : </label>
                    <select onChange={(e)=>setPriority(e.target.value)}>
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                    <div className="mt-6 flex justify-center w-full mb-3">
                        <button onClick={handleCreateTask} className="btn btn-primary">
                            Create Task
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default CreateTask;
