import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setError("");
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            console.log("User registered and profile updated");
            navigate("/");
          });
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
          
          {error && <p className="text-error text-sm text-center">{error}</p>}

          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
            {errors.name && <span className="text-error text-sm mt-1">Name is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Photo URL</span></label>
            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
            {errors.photoURL && <span className="text-error text-sm mt-1">Photo URL is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
            {errors.email && <span className="text-error text-sm mt-1">Email is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" {...register("password", { required: true, minLength: 6 })} placeholder="password" className="input input-bordered" />
            {errors.password && <span className="text-error text-sm mt-1">Password must be at least 6 characters</span>}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
        
        <div className="px-8 pb-8">
          <div className="divider">OR</div>
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
            Continue with Google
          </button>
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;