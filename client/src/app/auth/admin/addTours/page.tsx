"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Doctor {
  _id: string;
  title: string;
  description: string;
  // location: string;
  duration: string;
  price: number;
  image: string;
  education: string[];
}

const DoctorPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [newEducation, setNewEducation] = useState("");
  // const [maxPeople, setMaxPeople] = useState<number>(1);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
      toast.error("Could not fetch tour list");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleAddEducation = () => {
    if (newEducation.trim()) {
      setEducation([...education, newEducation.trim()]);
      setNewEducation("");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    // setLocation("");
    setDuration("");
    setPrice(0);
    setEducation([]);
    setImage(null);
    setNewEducation("");
    setEditingDoctorId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !editingDoctorId)
      return toast.error("Please upload an image.");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      // formData.append("location", location);
      formData.append("duration", duration);
      formData.append("price", price.toString());
      education.forEach((edu) => formData.append("education", edu));
      if (image) formData.append("imageFile", image);

      if (editingDoctorId) {
        const res = await axios.put(
          `http://localhost:5000/api/doctors/${editingDoctorId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setDoctors((prev) =>
          prev.map((doc) => (doc._id === editingDoctorId ? res.data : doc))
        );
        toast.success("Tour updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/doctors",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setDoctors((prev) => [...prev, res.data]);
        toast.success("Tour added successfully!");
      }

      resetForm();
    } catch (err) {
      console.error("Error submitting form", err);
      toast.error("Failed to submit tour");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      setDoctors(doctors.filter((doc) => doc._id !== id));
      toast.success("Tour deleted successfully!");
    } catch (err) {
      console.error("Failed to delete tour", err);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctorId(doctor._id);
    setTitle(doctor.title);
    setDescription(doctor.description);
    // setLocation(doctor.location);
    setDuration(doctor.duration);
    setPrice(doctor.price);
    setEducation(doctor.education);
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-center" />
      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-800">
          {editingDoctorId ? "Edit Tour" : "Add New Tour"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <input
            type="text"
            placeholder="Tour Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="text"
            placeholder="Duration (e.g., 3 days)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (in NPR)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-150 ease-in-out"
              required
            />
          </div>

          {/* <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          /> */}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 border border-gray-300 rounded-lg bg-white"
            required={!editingDoctorId}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 col-span-1 md:col-span-2"
            required
          />

          <div className="col-span-1 md:col-span-2">
            <label className="block font-semibold mb-2 text-gray-700">
              Offer / Highlights
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter offer"
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Button
                type="button"
                onClick={handleAddEducation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 m-2 rounded"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {education.map((edu, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {edu}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 col-span-1 md:col-span-2">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded font-semibold"
            >
              {editingDoctorId ? "Update Tour" : "Submit Tour"}
            </Button>
            {editingDoctorId && (
              <Button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded font-semibold"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center m-4">
          📋 Tour List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-[85%]">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border-2"
            >
              <img
                src={`http://localhost:5000${doc.image}`}
                alt={doc.title}
                className="w-full h-48 object-cover p-1 rounded-2xl"
              />
              <div className="gap-2 mt-0">
                  {doc.education.map((edu, index) => (
                    <div
                      key={`edu-${doc._id}-${index}`}
                      className="text-red-500 font-bold"
                    >
                      {edu}
                    </div>
                  ))}
                </div>
              <div className="p-2 flex flex-col flex-grow ">
                <h3 className="text-xl font-semibold text-gray-900 m-0">
                  {doc.title}
                </h3>
                {/* <span className="text-blue-600 font-medium">
                  {doc.location}
                </span> */}
                <span className="text-sm text-gray-500">{doc.duration}</span>
                <p className="text-green-600 font-bold mt-1">NPR {doc.price}</p>

                <p className="text-sm text-gray-700 mt-1 line-clamp-3 m-1">
                  {doc.description}
                </p>

                

                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="mt-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 text-sm rounded transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="mt-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 text-sm rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorPage;
