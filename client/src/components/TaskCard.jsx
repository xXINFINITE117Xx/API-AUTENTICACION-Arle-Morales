import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="w-full max-w-md p-10 rounded-md bg-zinc-800">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex items-center gap-x-2">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            edit
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}

export default TaskCard;
