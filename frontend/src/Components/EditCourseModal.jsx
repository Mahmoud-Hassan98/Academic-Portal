import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import { format, parseISO } from "date-fns";
Modal.setAppElement("#root");

const EditCourseModal = ({ isOpen, onRequestClose, course, onSave }) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseStart, setCourseStart] = useState("");
  const [courseEnd, setCourseEnd] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    if (course) {
      setCourseName(course.name || "");
      setCourseDescription(course.description || "");
      setCourseStart(
        course.start ? format(parseISO(course.start), "yyyy-MM-dd") : ""
      );
      setCourseEnd(
        course.end ? format(parseISO(course.end), "yyyy-MM-dd") : ""
      );
    }
  }, [course]);

  const handleSave = async () => {
    if (!courseName || !courseDescription || !courseStart || !courseEnd) {
      setResponseMessage("All fields are required");
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const updatedCourse = {
      name: courseName,
      description: courseDescription,
      start: courseStart,
      end: courseEnd,
    };

    try {
      const response = await axios.put(
        `http://localhost:4000/course/update-course/${course._id}`,
        updatedCourse,
        config
      );

      if (response.status === 200) {
        onSave(response.data);
        onRequestClose(); 
      } else {
        console.error("Error updating course:", response);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Course Modal"
      className="form"
      overlayClassName="overlay"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-4">Edit Course</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="courseName" className="text-lg">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="courseDescription" className="text-lg">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="courseStart" className="text-lg">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              id="courseStart"
              type="date"
              value={courseStart}
              onChange={(e) => setCourseStart(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="courseEnd" className="text-lg">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              id="courseEnd"
              type="date"
              value={courseEnd}
              onChange={(e) => setCourseEnd(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <p style={{ color: "red" }}>{responseMessage}</p>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onRequestClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

EditCourseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditCourseModal;
