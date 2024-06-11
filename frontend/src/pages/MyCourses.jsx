import { FaGraduationCap } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from "axios";
import EditCourseModal from "../Components/EditCourseModal";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddCourseModal from "../Components/AddCourseModal";
export default function MyCourses() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:4000/course/get-teacher-courses",
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

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setCourseToEdit(course);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCourseToEdit(null);
  };

  const handleSaveCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(course => 
      course._id === updatedCourse._id ? updatedCourse : course
    ));
    handleCloseEditModal();
  };

  const handleDelete = (courseId) => {
    setCourseToDelete(courseId);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.delete(`http://localhost:4000/course/delete-course/${courseToDelete}`, config);
      setCourses(courses => courses.filter(course => course._id !== courseToDelete));
      setOpen(false);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
        <div className="header py-4 dark:bg-gray-700 bg-white mt-5">
          <h1 className="text-center text-xl md:text-2xl font-bold text-purple-600">
          Add Your Course
             </h1>
          <p className="text-center text-2xl md:text-3xl text-gray-700 dark:text-white font-extrabold">
          Tell Us About Your Courses
          </p>
          <p className="max-w-3xl text-gray-500 dark:text-white text-center md:mx-auto mx-4 mt-4 text-sm md:text-lg">
          Share your expertise and contribute to our diverse course offerings. 
          Teachers like you are helping students explore various subjects and disciplines.

          </p>
        </div>
        <div className="flex justify-end mb-4">
          {" "}
          <button
            onClick={handleOpenAddModal}
            className="flex items-center px-3 py-2 bg-purple-600 text-white rounded text-sm md:text-base hover:bg-purple-700 transition-colors duration-300"
          >
            <FaPlus size={20} color="white" className="mr-1" />{" "}
            Add Course
          </button>
        </div>
        <div className="-mx-4 flex flex-wrap p-8">
  {courses.map((course) => (
    <div key={course._id} className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
        <div className="mx-auto mb-7 inline-block">
          <FaGraduationCap size={80} color="#7831ed" />
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
            {course.name}
          </h3>
          <p className="text-base font-medium text-body-color">
            {course.description}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>
              Start Date: {new Date(course.start).toLocaleDateString()}
            </p>
            <p>
              End Date: {new Date(course.end).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="text-gray-500 hover:text-blue-500 focus:outline-none"
            onClick={() => handleOpenEditModal(course)}
          >
            <FaEdit size={20} />
          </button>
          <button
            className="text-gray-500 hover:text-red-500 focus:outline-none"
            onClick={() => handleDelete(course._id)}
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  ))}
        <Dialog open={open} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this course?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">No</Button>
          <Button onClick={handleConfirmDelete} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
</div>

        <AddCourseModal
          isOpen={isAddModalOpen}
          onRequestClose={handleCloseAddModal}
          onSave={handleSaveCourse}
        />
         {courseToEdit && (
          <EditCourseModal
            isOpen={isEditModalOpen}
            onRequestClose={handleCloseEditModal}
            course={courseToEdit}
            onSave={handleUpdateCourse}
          />
        )}
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
