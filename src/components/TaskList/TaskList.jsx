import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "10px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TaskList = () => {
  const text = localStorage.getItem("createdTasks");
  const allUser = localStorage.getItem("users");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [taskList, setTaskList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Store the selected task
  // const [assignedUser, setAssignedUser] = useState(null); // Store the assigned user

  function openModal(task) {
    setSelectedTask(task);
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const loggedIn = JSON.parse(loggedInUser);
  const userList = JSON.parse(allUser).filter(
    (user) => user.email !== loggedIn.email
  );

  const isToday = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    return dueDate === today;
  };

  const isTomorrow = (dueDate) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dueDate === tomorrow.toISOString().split("T")[0];
  };

  const isNext7Days = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    const next7Days = new Date(today);
    next7Days.setDate(next7Days.getDate() + 7);

    return dueDate >= today && dueDate <= next7Days.toISOString().split("T")[0];
  };

  const loadData = () => {
    try {
      const initialTaskList = JSON.parse(text) || [];
      setTaskList(initialTaskList);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTasks = taskList.filter((task) => {
    const statusMatch = statusFilter === "all" || task.status === statusFilter;

    const dateMatch =
      dateFilter === "all" ||
      (dateFilter === "today" && isToday(task.dueDate)) ||
      (dateFilter === "tomorrow" && isTomorrow(task.dueDate)) ||
      (dateFilter === "next7days" && isNext7Days(task.dueDate));

    const priorityMatch =
      priorityFilter === "all" || task.priority === priorityFilter;

    return statusMatch && dateMatch && priorityMatch;
  });

  const handleCompleteTask = (task) => {
    const updatedTaskList = taskList.map((t) => {
      if (t.id === task.id) {
        // Update the status of the clicked task to "Completed"
        t.status = "Completed";
      }
      return t;
    });

    setTaskList(updatedTaskList);
    setCompletedTasks([...completedTasks, task.id]);

    // Update the task list in local storage
    localStorage.setItem("createdTasks", JSON.stringify(updatedTaskList));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  };

  const handleAssignTask = (user) => {
    if (selectedTask) {
      // Update the selected task with the assigned user's ID
      selectedTask.assignedUser = user.email;
      selectedTask.status = "In Progress"

      // Update the task list in state
      setTaskList([...taskList]);

      // Update the task list in local storage
      localStorage.setItem("createdTasks", JSON.stringify(taskList));

      closeModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex pl-4 py-6">
        <div>
          {/* Status filter */}
          <label className="font-bold">Status: </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {/* ... (options) */}
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>

          </select>
        </div>
        <div className="pl-6">
          {/* Due date filter */}
          <label className="font-bold">Due Date: </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            {/* ... (options) */}
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="next7days">Next 7 Days</option>

          </select>
        </div>
        <div className="pl-6">
          {/* Priority filter */}
          <label className="font-bold">Priority: </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            {/* ... (options) */}
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>

          </select>
        </div>
      </div>

      <table className="table table-zebra">
        {/* Table contents */}
        <thead>
          <tr>
            <th>S/N</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task?.title}</td>
              <td>{task?.description}</td>
              <td>{task?.dueDate}</td>
              <td>{task?.priority}</td>
              <td>{task?.status}</td>
              <td>
                {task.status !== "Completed" && (!task.assignedUser && (
                  <button
                    onClick={() => openModal(task)}
                    className="btn btn-xs btn-outline"
                  >
                    Assign
                  </button>
                ))}

                {task.status !== "Completed" ? (
                  <button
                    onClick={() => handleCompleteTask(task)}
                    className="btn btn-xs btn-outline"
                  >
                    Completed
                  </button>
                ) : (
                  "Already Completed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between w-full">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Choose User to Assign Task
          </h2>
          <button onClick={closeModal}>X</button>
        </div>
        <table className="table table-zebra">
          {/* Table contents */}
          <thead>
            <tr>
              <th>S/N</th>
              <th>Profile</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {/* <img className="w-5 h-5" src={user?.url} alt="" /> */}
                </td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>
                  <button
                    onClick={() => {
                      handleAssignTask(user);
                    }}
                    className="btn btn-xs btn-outline"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default TaskList;
