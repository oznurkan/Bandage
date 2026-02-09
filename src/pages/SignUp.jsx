import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../store/actions/clientActions";
import { signupUser, signupReset } from "../store/actions/authActions";
import { toast } from "react-toastify";

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.client.roles);
  const { signupLoading, signupError, signupSuccess } = useSelector((state) => state.auth);

  const [selectedRole, setSelectedRole] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_id: "",
    },
  });

   const formValues = watch();


  const password = formValues.password;
  const roleId = formValues.role_id;

  useEffect(() => {
    dispatch(fetchRoles());

    return () => {
      dispatch(signupReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (roleId && roles.length > 0) {
      const role = roles.find((r) => r.id === Number(roleId));

      console.log("roleId:", roleId, "type:", typeof roleId);
      console.log("Found role:", role);

      setSelectedRole(role?.code || "");
    }
  }, [roleId, roles]);

  useEffect(() => {
    if (signupSuccess) {
      toast.success(
        "You need to click link in email to activate your account!",
      );

      setTimeout(() => {
        dispatch(signupReset());
        navigate(-1);
      }, 2000);
    }
  }, [signupSuccess, navigate, dispatch]);

  useEffect(() => {
    if (signupError) {
      toast.error(signupError);
    }
  }, [signupError]);

  const onSubmit = async (formData) => {
    let payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: Number(formData.role_id), 
    };

    if (selectedRole === "store") {
      payload.store = {
        name: formData.store_name,
        phone: formData.store_phone,
        tax_no: formData.store_tax_no,
        bank_account: formData.store_bank_account,
      };
    }

    console.log("Sending payload:", payload);

    dispatch(signupUser(payload));
  };

  return (
    <main className="min-h-screen w-full bg-white py-25 flex items-center justify-center">
      <section className="flex flex-col xl:flex-row mx-auto w-[90%] max-w-md xl:max-w-5xl font-montserrat bg-white shadow-2xl rounded-2xl overflow-hidden">
        <article className="w-full p-8 md:p-12 xl:flex-1">
          <h2 className="font-bold text-center text-3xl leading-10 text-text-color mb-10">
            Sign Up
          </h2>
          <form
            className="flex w-full flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-text-color"
              >
                Name *
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                id="name"
                type="text"
                className="block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-color outline-none transition-all"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-xs text-danger-color">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-color"
              >
                Email *
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                className="block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-color outline-none transition-all"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-xs text-danger-color">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-text-color"
                >
                  Password *
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: {
                      minLength: (v) =>
                        v.length >= 8 ||
                        "Password must be at least 8 characters",
                      uppercase: (v) =>
                        /[A-Z]/.test(v) || "Password must include uppercase,",
                      lowercase: (v) =>
                        /[a-z]/.test(v) || "Password must include lowercase",
                      number: (v) =>
                        /\d/.test(v) || "Password must include number",
                      specialChar: (v) =>
                        /[@$!%*?&]/.test(v) ||
                        "Password must include special character",
                    },
                  })}
                  id="password"
                  type="password"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
                />
                {errors.password && (
                  <p className="text-xs text-danger-color">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-text-color"
                >
                  Confirm *
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  id="confirmPassword"
                  type="password"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-danger-color">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="role_id"
                className="block text-sm font-semibold text-text-color"
              >
                Role *
              </label>
              <select
                {...register("role_id", { required: "Role is required" })}
                id="role_id"
                className="block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-primary-color outline-none transition-all"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && (
                <p className="text-xs text-danger-color">
                  {errors.role_id.message}
                </p>
              )}
            </div>

            {selectedRole === "store" && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-bold text-sm text-primary-color">
                  Store Information
                </h3>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="store_name"
                    className="block text-sm font-semibold text-text-color"
                  >
                    Store Name *
                  </label>
                  <input
                    {...register("store_name", {
                      required:
                        selectedRole === "store" && "Store name is required",
                      minLength: {
                        value: 3,
                        message: "Store name must be at least 3 characters",
                      },
                    })}
                    id="store_name"
                    placeholder="My Store"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
                  />
                  {errors.store_name && (
                    <p className="text-xs text-danger-color">
                      {errors.store_name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="store_phone"
                    className="block text-sm font-semibold text-text-color"
                  >
                    Store Phone *
                  </label>
                  <input
                    {...register("store_phone", {
                      required:
                        selectedRole === "store" && "Store phone is required",
                      pattern: {
                        value: /^(\+90|0)?[1-9]\d{9}$/,
                        message: "Invalid Turkish phone number",
                      },
                    })}
                    id="store_phone"
                    placeholder="+905551234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
                  />
                  {errors.store_phone && (
                    <p className="text-xs text-danger-color">
                      {errors.store_phone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="store_tax_no"
                    className="block text-sm font-semibold text-text-color"
                  >
                    Store Tax ID *
                  </label>
                  <input
                    {...register("store_tax_no", {
                      required:
                        selectedRole === "store" && "Store tax ID is required",
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: "Tax ID must match pattern TXXXXVXXXXXX",
                      },
                    })}
                    id="store_tax_no"
                    placeholder="T1234V567890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
                  />
                  {errors.store_tax_no && (
                    <p className="text-xs text-danger-color">
                      {errors.store_tax_no.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="store_bank_account"
                    className="block text-sm font-semibold text-text-color"
                  >
                    Store IBAN *
                  </label>
                  <input
                    {...register("store_bank_account", {
                      required:
                        selectedRole === "store" && "Store IBAN is required",
                      pattern: {
                        value: /^TR\d{24}$/,
                        message: "Invalid IBAN (TR + 24 digits)",
                      },
                    })}
                    id="store_bank_account"
                    placeholder="TR000000000000000000000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
                  />
                  {errors.store_bank_account && (
                    <p className="text-xs text-danger-color">
                      {errors.store_bank_account.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={signupLoading}
              className="w-full py-4 px-4 cursor-pointer bg-[#283747] text-white font-bold rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-lg active:scale-95"
            >
              {signupLoading ? "Creating account..." : "Sign up"}
            </button>

            <div className="xl:hidden text-center mt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-primary-color cursor-pointer font-bold hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </article>

        <article className="hidden xl:flex xl:flex-1 bg-[#283747] text-white p-12 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div className="relative z-10 flex flex-col justify-center mx-auto items-center text-center gap-7">
            <h2 className="text-4xl font-bold">Welcome Back!</h2>
            <p className="text-gray-300 max-w-xs">
              To keep connected with us please login with your personal info
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-bold text-sm uppercase cursor-pointer tracking-wider py-4 px-10 rounded-full border-2 border-white hover:bg-white hover:text-[#283747] transition-all duration-300 hover:scale-105"
            >
              Log in
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default SignUp;
