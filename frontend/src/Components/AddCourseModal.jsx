// src/components/AddCourseModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AddCourseModal.css";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const AddCourseModal = ({ isOpen, onRequestClose, onSave }) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseStart, setCourseStart] = useState("");
  const [courseEnd, setCourseEnd] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const handleSave = () => {
    if (!courseName || !courseDescription || !courseStart || !courseEnd) {
      setResponseMessage("All fields are required");
      return;
    }

    const newCourse = {
      name: courseName,
      description: courseDescription,
      start: courseStart,
      end: courseEnd,
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:4000/course/create-course", newCourse, config)
      .then((response) => {
        console.log("Course saved successfully:", response.data);
        const newCourse = response.data;
        onSave(newCourse);
        // Clear input fields after saving
        setCourseDescription("");
        setCourseName("");
        setCourseEnd("");
        setCourseStart("");
        setResponseMessage("");
        onRequestClose();
      })
      .catch((error) => {
        console.error("Error saving course:", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Course Modal"
      className="form"
      overlayClassName="overlay"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-4">Add New Course</h2>
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

AddCourseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddCourseModal;
