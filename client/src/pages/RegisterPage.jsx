import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="max-w-md p-10 rounded-md bg-zinc-800">
        {registerErrors.map((error, i) => (
          <div className="p-2 text-white bg-red-500" key={i}>
            {error}
          </div>
        ))}
        <h1 className="my-2 text-3xl font-bold">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}

          <button
            type="submit"
            className="px-4 py-2 my-2 text-white rounded-md bg-sky-500"
          >
            Register
          </button>
        </form>
        <p className="flex justify-between gap-x-2">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
