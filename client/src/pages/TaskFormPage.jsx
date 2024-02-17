import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY/MM/DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="w-full max-w-md p-10 rounded-md bg-zinc-800">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
            autoFocus
          />

          <label htmlFor="description">description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            {...register("description")}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
          ></textarea>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
          />
          <button className="px-3 py-2 bg-indigo-500 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
