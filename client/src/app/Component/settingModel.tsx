"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

interface Props {
  user: {
    username: string;
    email: string;
  };
  onClose: () => void;
  onUpdate: (updatedUser: { username: string; email: string }) => void;
}

export default function SettingsModal({ user, onClose, onUpdate }: Props) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("adminToken");
      if (!token) return;

      await axios.put(
        "http://localhost:5000/api/students/update", // आफ्नो backend update endpoint अनुसार परिवर्तन गर्नुहोस्
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update frontend state immediately
      onUpdate({ username, email });

      alert("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Settings</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="modal-footer">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
