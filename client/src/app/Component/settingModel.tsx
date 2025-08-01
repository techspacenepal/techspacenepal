import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";

interface User {
  username: string;
  email: string;
  number?: string;
}

interface SettingsModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<User>({ ...user });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // यदि field नाम number हो भने मात्र validate गर
  if (name === "number") {
    // केवल अंक मात्र राख्ने, अधिकतम 10 अङ्क
    const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

 
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = Cookies.get("studentToken");

    if (!token) {
      alert("Unauthorized. Please login again.");
      return;
    }

    const { data } = await axios.put(
      "http://localhost:5000/api/students/profile", // ✅ Backend route (adjust if different)
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onUpdate(data); // ✅ update frontend with new data
    onClose();
  } catch (error: any) {
    console.error("Profile update failed:", error.response?.data);
    alert(error.response?.data?.message || "Failed to update profile");
  }
};

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
               type="tel" 
              name="number"
              value={formData.number || ""}
              onChange={handleChange}
              placeholder="Enter 10-digit Nepali number"
              pattern="^9[6-8][0-9]{8}$"
              required
              maxLength={10}
              title="Please enter a valid 10-digit Nepali number starting with 98, 97, or 96"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SettingsModal;
