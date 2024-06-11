import Hero from "../assets/images/about-hero.jpg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm({ name, email, password, role });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formData = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        formData
      );

      console.log("Data sent successfully");
      navigate("/");
      localStorage.setItem("token", response.data.token);

      console.log("Data sent successfully");
      setErrorResponse(""); 
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setErrors({});
    } catch (error) {
      console.log("Error:", error.message);
      setErrorResponse(JSON.stringify(error.response.data)); 
    }
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setRole(value);
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.role.trim()) {
      errors.role = "Role is required";
    }
    if (!values.name.trim()) {
      errors.name = "Name is required";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else {
      if (!/(?=.*[a-z])/.test(values.password)) {
        errors.password = "Password must include at least one lowercase letter";
      }
      if (!/(?=.*[A-Z])/.test(values.password)) {
        errors.password = "Password must include at least one uppercase letter";
      }
      if (!/(?=.*\d)/.test(values.password)) {
        errors.password = "Password must include at least one digit";
      }
      if (!/(?=.*\W)/.test(values.password)) {
        errors.password =
          "Password must include at least one special character";
      }
      if (values.password.length < 9) {
        errors.password = "Password must be at least 9 characters long";
      }
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    } else if (
      !/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email domain";
    }

    return errors;
  };

  return (
    <>
      <div className="flex z-100 bg-white">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <button
              className="flex items-center mb-5 text-left text-gray-500 font-bold justify-start"
              onClick={() => navigate('/')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </button>
            <p className="text-left text-3xl font-bold">
              Create an account now
            </p>
            <p className="mt-5 text-left text-base text-gray-500">
              Already have an account ?
              <Link
                to="/login"
                className="ml-2 text-base font-bold text-purple-600 cursor-pointer hover:text-purple-800"
              >
                Login
              </Link>
            </p>

            {errorResponse && (
              <div className="relative m-2 my-8 max-w-sm rounded-lg border border-gray-100 bg-white px-12 py-6 shadow-md">
                <button className="absolute top-0 right-0 p-4 text-gray-400"></button>
                <p className="relative mb-1 text-sm font-medium">
                  <span className="absolute -left-7 flex h-5 w-5 items-center justify-center rounded-xl bg-red-400 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <p className="text-sm text-red-600">{errorResponse}.</p>
                </p>
              </div>
            )}

            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-40 ml-[-25px]">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="radio-button hover:cursor-pointer"
                    type="radio"
                    checked={role === "student"}
                    value="student"
                    onChange={handleCheckboxChange}
                    id="student-role-radio"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="student-role-radio"
                  >
                    Student
                  </label>
                </div>
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="radio-button hover:cursor-pointer"
                    type="radio"
                    checked={role === "teacher"}
                    value="teacher"
                    onChange={handleCheckboxChange}
                    id="teacher-role-radio"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="teacher-role-radio"
                  >
                    Teacher
                  </label>
                </div>
              </div>
              {errors.role && (
                <p style={{ color: "red", fontSize: "13px" }}>{errors.role}</p>
              )}

              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <div className="mt-3">
                    <svg
                      viewBox="0 0 1024 1024"
                      className="h-5 w-5 b"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#7831ed"
                        d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="login-name"
                    className="w-full flex-1 appearance-none border-gray-300 border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {errors.name && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <div className="mt-3">
                    <svg
                      viewBox="0 0 8 6"
                      className="h-5 w-5 b"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#7831ed"
                        d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z"
                      />
                    </svg>
                  </div>
                  <input
                    id="login-email"
                    className="w-full flex-1 appearance-none border-gray-300 border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col pt-4 mb-10">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <div className="mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#7831ed"
                        d="M17,9V7c0-2.8-2.2-5-5-5S7,4.2,7,7v2c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-7C20,10.3,18.7,9,17,9z M9,7c0-1.7,1.3-3,3-3s3,1.3,3,3v2H9V7z M13,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3c0-0.6,0.4-1,1-1s1,0.4,1,1V17z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="login-password"
                    className="w-full flex-1 appearance-none border-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="relative px-5 py-2 font-medium text-white group"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-600 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-600 group-hover:-skew-x-12"></span>
                <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                <span className="relative">Sign up</span>
              </button>
            </form>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
          <div>
            <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            </div>
            <img
              className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
              src={Hero}
              alt="Background"
            />
          </div>
        </div>
      </div>
    </>
  );
}
