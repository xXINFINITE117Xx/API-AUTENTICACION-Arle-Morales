import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))
      ) : (
        <h1>{Array.isArray(tasks) ? "No tasks" : "Loading tasks..."}</h1>
      )}
    </div>
  );
}

export default TasksPage;

