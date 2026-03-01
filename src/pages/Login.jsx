import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setError("");
    loginUser(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
          
          {error && <p className="text-error text-sm text-center">{error}</p>}

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
            {errors.email && <span className="text-error text-sm mt-1">Email is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
            {errors.password && <span className="text-error text-sm mt-1">Password is required</span>}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>

        <div className="px-8 pb-8">
          <div className="divider">OR</div>
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
            Continue with Google
          </button>
          <p className="text-center mt-4">
            Don't have an account? <Link to="/register" className="text-primary font-bold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;