"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Service {
  _id: string;
  image: string;
  title: string;
  description: string;
}

const AddServicesPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services/all");
      setServicesList(res.data);
    } catch (err) {
      console.error("Fetch services error", err);
      toast.error("Could not load services");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !editingId) return toast.error("Image is required!");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      if (editingId) {
        const res = await axios.put(
          `http://localhost:5000/api/services/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setServicesList((prev) =>
          prev.map((item) => (item._id === editingId ? res.data : item))
        );
        toast.success("Service updated!");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/services",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setServicesList((prev) => [...prev, res.data]);
        toast.success("Service added!");
      }

      resetForm();
    } catch (err) {
      console.error("Submit error", err);
      toast.error("Submit failed");
    }
  };

  const handleEdit = (item: Service) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditingId(item._id);
    setImage(null);
    // Scroll to the top smoothly when editing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServicesList(servicesList.filter((item) => item._id !== id));
      toast.success("Service deleted!");
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col   to-white">
      <Toaster position="top-center" />

      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-12 text-center text-blue-500">
           {editingId ? "Edit Service" : "Add Service"}
        </h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-10 space-y-6 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-4 border border-gray-300 rounded-lg bg-white"
              required={!editingId}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-4 border border-gray-300 rounded-lg col-span-1 md:col-span-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
            >
              {editingId ? "Update Service" : "Submit Service"}
            </Button>
            {editingId && (
              <Button
                type="button"
                onClick={resetForm}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
           Premium Land Cruiser Service & Maintenance
        </h2>
        <p>
          Experience exceptional care for your Land Cruiser with our dedicated,
          expert-level service. Engineered for precision and reliability, our
          maintenance approach is tailored specifically to meet the demands of
          your vehicle. From the moment you arrive, our certified technicians
          take a meticulous approach—utilizing advanced diagnostics and only
          genuine Toyota parts—to ensure that every component performs exactly
          as it should. Whether you're conquering rugged terrains or cruising
          through city streets, we maintain the legendary power, comfort, and
          durability that define the Land Cruiser legacy. Trust us to preserve
          your vehicle’s excellence, mile after mile.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
          {servicesList.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl  border-1 shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover p-1 rounded-2xl"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="mt-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 text-sm rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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

export default AddServicesPage;
