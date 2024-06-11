import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [users, setUsers] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [posts, setPosts] = useState([]);

  //   useEffect(() => {
  //     fetchUsers();
  //     fetchPaintings();
  //     fetchPosts();
  //   }, []);

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3500/api/userDataa");
  //       setUsers(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   const fetchPaintings = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3500/Paintings/getPaintings");
  //       setPaintings(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching paintings:", error);
  //     }
  //   };

  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3500/post/getAllPosts");
  //       setPosts(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  return (
    <div>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="header py-4 dark:bg-gray-700 bg-white">
            <h1 className="text-center text-xl md:text-2xl font-bold text-purple-600">
              Stats
            </h1>
            <p className="text-center text-2xl md:text-3xl text-gray-700 dark:text-white font-extrabold">
              Academic Portal Stats
            </p>
            <p className="max-w-2xl text-gray-500 dark:text-white text-center md:mx-auto mx-4 mt-4 text-sm md:text-lg">
              Those are some stats from our Academic Portal website.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 px-6 mt-8 sm:px-0 lg:mt-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-fuchsia-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">6+</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      months in business
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-fuchsia-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">0</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Users
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-fuchsia-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">0</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-fuchsia-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">0</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      POSTS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
