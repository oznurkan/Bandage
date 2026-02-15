import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/clientActions";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.client);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rememberMe: true,
    },
  });

  useEffect(() => {
    if (user && user.email) {
      toast.success("Login successful!");

      const from = location.state?.from?.pathname || "/";

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    }
  }, [user, navigate, location]);

  const onSubmit = async (formData) => {
    try {
      const credentials = {
        email: formData.email,
        password: formData.password,
      };

      await dispatch(loginUser(credentials, formData.rememberMe));
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";

      toast.error(errorMessage);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white py-25 flex items-center justify-center">
      <section className="flex flex-col xl:flex-row mx-auto w-[90%] max-w-md xl:max-w-5xl font-montserrat bg-white shadow-2xl rounded-2xl overflow-hidden">
        <article className="hidden xl:flex xl:flex-1 bg-[#283747]  text-white flex-col justify-center items-center p-12 text-center gap-6 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>

          <div className="relative z-10 flex flex-col justify-center mx-auto items-center text-center gap-7">
            <h2 className="text-4xl font-bold ">Hello, Friend!</h2>
            <p className="text-gray-300 max-w-xs">
              Enter your personal details and start your journey with us
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="font-bold text-sm uppercase cursor-pointer tracking-wider py-4 px-10 rounded-full border-2 border-white hover:bg-white hover:text-[#283747] transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </article>

        <article className="w-full py-30 px-8 md:px-12 xl:flex-1">
          <h2 className="font-bold text-center text-3xl leading-10 text-text-color mb-10">
            Login
          </h2>

          <form
            className="flex w-full flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-color"
              >
                Email Address *
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                autoComplete="email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-color outline-none transition-all"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text-color"
              >
                Password *
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                autoComplete="current-password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-color outline-none transition-all"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register("rememberMe")}
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer hover:text-primary-color transition-colors"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="font-medium text-primary-color hover:text-primary-color-dark transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 cursor-pointer bg-[#283747] text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              Log In
            </button>

            <div className="xl:hidden text-center mt-4">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-primary-color font-bold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Login;
