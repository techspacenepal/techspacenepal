"use client";

import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ClassSchedule {
  secondDate: string;
  secondTime: string;
}

interface ClassData {
  _id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  imageUrl?: string;
  secondSchedules?: ClassSchedule[];
}

interface FormState {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  image: File | null;
}

interface SecondFormState {
  secondDate: string;
  secondStartTime: string;
  secondEndTime: string;
}

export default function UpcomingClassesAdmin() {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [form, setForm] = useState<FormState>({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    image: null,
  });

  const [secondForm, setSecondForm] = useState<SecondFormState>({
    secondDate: "",
    secondStartTime: "",
    secondEndTime: "",
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState<string | null>(null);

  const [editingSchedule, setEditingSchedule] = useState<number | null>(null);
  const [editScheduleData, setEditScheduleData] = useState<SecondFormState>({
    secondDate: "",
    secondStartTime: "",
    secondEndTime: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    setTimeout(() => {
      if (!token) {
        router.push("/auth/adminLogin");
      } else {
        fetchClasses();
        setPageLoading(false);
      }
    }, 800);
  }, [router]);

  const fetchClasses = () => {
    axios
      .get<ClassData[]>("http://localhost:5000/api/classes")
      .then((res) => setClasses(res.data))
      .catch(() => toast.error("Failed to fetch classes!"));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSecondChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondForm({ ...secondForm, [e.target.name]: e.target.value });
  };

  const handleEditScheduleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditScheduleData({ ...editScheduleData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  };

  const to24Hour = (t: string) => {
    if (!t) return "";
    const [time, ampm] = t.split(" ");
    let [hour, minute] = time.split(":");
    let h = parseInt(hour);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${minute}`;
  };

  const handleEditClick = (cls: ClassData) => {
    if (showEditForm === cls._id) {
      setShowEditForm(null);
      setEditId(null);
    } else {
      const [startTime, endTime] = cls.time?.split(" - ").map(to24Hour) || ["", ""];
      setForm({
        title: cls.title,
        date: cls.date,
        startTime,
        endTime,
        duration: cls.duration,
        image: null,
      });
      setSecondForm({ secondDate: "", secondStartTime: "", secondEndTime: "" });
      setEditId(cls._id);
      setShowEditForm(cls._id);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const timeRange = `${formatTime(form.startTime)} - ${formatTime(form.endTime)}`;
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("time", timeRange);
    formData.append("duration", form.duration);
    if (form.image) formData.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/classes/${editId}`, formData);
        toast.success("Class updated");
      } else {
        await axios.post("http://localhost:5000/api/classes", formData);
        toast.success("Class created");
      }
      fetchClasses();
      setShowEditForm(null);
      setEditId(null);
      setForm({ title: "", date: "", startTime: "", endTime: "", duration: "", image: null });
    } catch {
      toast.error("Failed to save class");
    }
  };

  const handleSecondSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const secondTimeRange = `${formatTime(secondForm.secondStartTime)} - ${formatTime(secondForm.secondEndTime)}`;
    try {
      await axios.patch(`http://localhost:5000/api/classes/${editId}/second-time`, {
        secondDate: secondForm.secondDate,
        secondTime: secondTimeRange,
      });
      toast.success("Second time/date added");
      fetchClasses();
      setSecondForm({ secondDate: "", secondStartTime: "", secondEndTime: "" });
    } catch {
      toast.error("Failed to add second time/date");
    }
  };

  const handleUpdateSchedule = async (clsId: string, scheduleIndex: number) => {
    const secondTimeRange = `${formatTime(editScheduleData.secondStartTime)} - ${formatTime(editScheduleData.secondEndTime)}`;
    try {
      await axios.patch(`http://localhost:5000/api/classes/${clsId}/second-time/${scheduleIndex}`, {
        secondDate: editScheduleData.secondDate,
        secondTime: secondTimeRange,
      });
      toast.success("Schedule updated");
      setEditingSchedule(null);
      fetchClasses();
    } catch {
      toast.error("Failed to update schedule");
    }
  };

  const handleDeleteSchedule = async (clsId: string, scheduleIndex: number) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/classes/${clsId}/second-time/${scheduleIndex}`);
      toast.success("Schedule deleted");
      fetchClasses();
    } catch {
      toast.error("Failed to delete schedule");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/api/classes/${id}`);
        toast.success("Class deleted");
        fetchClasses();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  if (pageLoading) return <div>Loading...</div>;

  return (
    <>
     <section className="py-5">
      <div className="container py-4">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Main class form */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          ref={formRef}
          className="card shadow-sm border rounded p-4 mb-5"
        >
          <h4 className="fw-bold text-primary mb-4 mx-auto">
            {editId ? "Update Class" : "Add New Class"}
          </h4>
          <div className="row g-4">
            <div className="col-12 col-md-4 col-lg-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter class title"
                value={form.title}
                onChange={handleChange}
                className="form-control rounded"
                required
              />
            </div>
            <div className="col-12 col-md-4 col-lg-2">
              <label className="form-label fw-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="form-control rounded"
                required
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label fw-semibold">Time</label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className="form-control rounded"
                  required
                />
                <span className="fw-semibold text-muted">to</span>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className="form-control rounded"
                  required
                />
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-2">
              <label className="form-label fw-semibold">Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 1hr 30min"
                value={form.duration}
                onChange={handleChange}
                className="form-control rounded"
                required
              />
            </div>
            <div className="col-12 col-md-6 col-lg-2">
              <label className="form-label fw-semibold">Upload Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control rounded"
              />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-primary px-4 rounded">
                {editId ? "Update Class" : "Add Class"}
              </button>
            </div>
          </div>
        </form>

        {/* Classes list */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="fw-bold text-dark">Upcoming Classes ({classes.length})</h4>
        </div>
        <div className="row">
          {classes.map((data) => (
            <div key={data._id} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
                <img
                  src={`http://localhost:5000${data.imageUrl || "/uploads/default.jpg"}`}
                  alt={data.title}
                  className="w-100"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="p-3">
                  <h5 className="fw-bold mb-1 text-primary">{data.title}</h5>
                  <p className="mb-2 text-uppercase small text-muted">
                    Upcoming Class
                  </p>

                  <div className="d-flex justify-content-between small mb-2 text-muted">
                    <span>
                      <i className="bi bi-calendar-event me-1"></i>
                      {new Date(data.date).toLocaleDateString()}
                    </span>
                    <span>
                      <i className="bi bi-clock me-1"></i>
                      {data.time}
                    </span>
                    <span>
                      <i className="bi bi-people me-1"></i>
                      {(data.secondSchedules?.length ?? 0) + 1} classes
                    </span>
                  </div>

                  {/* Render schedules */}
                  {data.secondSchedules?.map((schedule, index) => (
                    <div key={index} className="mt-2 border-top pt-2 small">
                      {editingSchedule === index ? (
                        <div>
                          <input
                            type="date"
                            name="secondDate"
                            value={editScheduleData.secondDate}
                            onChange={handleEditScheduleChange}
                            className="form-control mb-1 rounded-pill"
                          />
                          <div className="d-flex gap-2 mb-2">
                            <input
                              type="time"
                              name="secondStartTime"
                              value={editScheduleData.secondStartTime}
                              onChange={handleEditScheduleChange}
                              className="form-control rounded-pill"
                            />
                            <input
                              type="time"
                              name="secondEndTime"
                              value={editScheduleData.secondEndTime}
                              onChange={handleEditScheduleChange}
                              className="form-control rounded-pill"
                            />
                          </div>
                          <button
                            className="btn btn-sm btn-success w-100 mb-1 rounded-pill"
                            onClick={() => handleUpdateSchedule(data._id, index)}
                            type="button"
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary w-100 rounded-pill"
                            onClick={() => setEditingSchedule(null)}
                            type="button"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <i className="bi bi-calendar-check me-1"></i>
                            {new Date(schedule.secondDate).toLocaleDateString()}
                            <span className="ms-2">
                              <i className="bi bi-clock me-1"></i>
                              {schedule.secondTime}
                            </span>
                          </div>
                          <div>
                            <button
                              className="btn btn-sm btn-outline-primary me-2 rounded-pill"
                              onClick={() => {
                                setEditingSchedule(index);
                                setEditScheduleData({
                                  secondDate: schedule.secondDate,
                                  secondStartTime: to24Hour(schedule.secondTime.split(" - ")[0]),
                                  secondEndTime: to24Hour(schedule.secondTime.split(" - ")[1]),
                                });
                              }}
                              type="button"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger rounded-pill"
                              onClick={() => handleDeleteSchedule(data._id, index)}
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Edit/Delete main class */}
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-warning rounded-pill px-3"
                      onClick={() => handleEditClick(data)}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger rounded-pill px-3"
                      onClick={() => handleDelete(data._id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Add second schedule form */}
                  {showEditForm === data._id && (
                    <div className="mt-3 border-top pt-3">
                      <form onSubmit={handleSecondSubmit}>
                        <label className="form-label small fw-semibold">
                          Add Another Schedule
                        </label>
                        <input
                          type="date"
                          name="secondDate"
                          value={secondForm.secondDate}
                          onChange={handleSecondChange}
                          className="form-control mb-2 rounded-pill"
                          required
                        />
                        <div className="d-flex gap-2 mb-2">
                          <input
                            type="time"
                            name="secondStartTime"
                            value={secondForm.secondStartTime}
                            onChange={handleSecondChange}
                            className="form-control rounded-pill"
                            required
                          />
                          <input
                            type="time"
                            name="secondEndTime"
                            value={secondForm.secondEndTime}
                            onChange={handleSecondChange}
                            className="form-control rounded-pill"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-secondary w-100 rounded-pill"
                        >
                          Add Time & Date
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>


    </>

  );
}