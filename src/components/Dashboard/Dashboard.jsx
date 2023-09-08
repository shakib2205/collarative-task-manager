

const Dashboard = () => {
  const tasks = localStorage.getItem("createdTasks");
  const allTask = JSON.parse(tasks) || []; // Initialize with an empty array if null

  // Function to count tasks with a specific status
  const countTasksByStatus = (status) => {
    return allTask.filter((task) => task.status === status).length;
  };

  // Function to count tasks with a specific priority
  const countTasksByPriority = (priority) => {
    return allTask.filter((task) => task.priority === priority).length;
  };

  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 mt-5">
      <div className="flex flex-col items-center bg-gray-900 rounded-lg h-16">
        <h3 className="mt-1 mb-2 font-bold text-sm">All Task</h3>
        <p className="font-bold text-red-400">{allTask.length}</p>
      </div>
      <div className="flex flex-col items-center bg-gray-900 rounded-lg h-16">
        <h3 className="mt-1 mb-2 font-bold text-sm">Pending</h3>
        <p className="font-bold text-red-400">{countTasksByStatus("Pending")}</p>
      </div>
      <div className="flex flex-col items-center bg-gray-900 rounded-lg h-16">
        <h3 className="mt-1 mb-2 font-bold text-sm">In Progress</h3>
        <p className="font-bold text-red-400">{countTasksByStatus("In Progress")}</p>
      </div>
      <div className="flex flex-col items-center bg-gray-900 rounded-lg h-16">
        <h3 className="mt-1 mb-2 font-bold text-sm">Completed</h3>
        <p className="font-bold text-red-400">{countTasksByStatus("Completed")}</p>
      </div>
      <div className="flex flex-col items-center bg-gray-900 rounded-lg h-16">
        <h3 className="mt-1 mb-2 font-bold text-sm">High Priority</h3>
        <p className="font-bold text-red-400">{countTasksByPriority("high")}</p>
      </div>
      <div className="flex flex-col items-center bg-gray-900 rounded-lg h-16">
        <h3 className="mt-1 mb-2 font-bold text-sm">Medium Priority</h3>
        <p className="font-bold text-red-400">{countTasksByPriority("medium")}</p>
      </div>
      <div className="flex flex-col items-center bg-gray-900 rounded-lg h-16">
        <h3 className="mt-1 mb-2 font-bold text-sm">Low Priority</h3>
        <p className="font-bold text-red-400">{countTasksByPriority("low")}</p>
      </div>
     
    </div>
  );
};

export default Dashboard;
