import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:4000/course/get-courses",
        config
      );
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }
  return (
    <>
      <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
        <div className="header py-4 dark:bg-gray-700 bg-white mt-5">
          <h1 className="text-center text-xl md:text-2xl font-bold text-purple-600">
            Course Offerings
          </h1>
          <p className="text-center text-2xl md:text-3xl text-gray-700 dark:text-white font-extrabold">
            Explore Our Diverse Courses
          </p>
          <p className="max-w-3xl text-gray-500 dark:text-white text-center md:mx-auto mx-4 mt-4 text-sm md:text-lg">
            Discover a wide range of courses offered by esteemed educators and
            experts covering various subjects and disciplines.
          </p>
        </div>

        <div className="box pt-6">
          <div className="box-wrapper">
            <div className="bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
              <button className="outline-none focus:outline-none">
                <svg
                  className="w-5 text-gray-600 h-5 cursor-pointer"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                type="search"
                name=""
                id=""
                placeholder="search for courses"
                className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
                style={{ border: "none" }}
                onChange={handleSearch}
              />
            </div>
          </div>
          <br /> <br />
          <div className="-mx-4 flex flex-wrap p-8">
            {filteredCourses.map((course) => (
              <div key={course._id} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                  <div className="mx-auto mb-7 inline-block">
                    <FaGraduationCap size={80} color="#7831ed" />{" "}
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                      {course.name}
                    </h3>
                    <p className="text-base font-medium text-body-color">
                      {course.description}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <p>
                        Start Date:{" "}
                        {new Date(course.start).toLocaleDateString()}
                      </p>
                      <p>
                        End Date: {new Date(course.end).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
