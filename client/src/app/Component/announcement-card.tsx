'use client'

import type { Announcement } from "@/lib/types";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white border-bottom-0">
          <h5 className="card-title mb-1">{announcement.title}</h5>
          <div className="d-flex gap-3 text-muted small">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar3 me-1" />
              {formattedDate}
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-person me-1" />
              {announcement.author}
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text text-muted text-truncate" style={{ maxHeight: '3em' }}>
            {announcement.content}
          </p>
        </div>
        <div className="card-footer bg-white border-top-0">
          <Button variant="outline-primary" className="w-100" onClick={handleShow}>
            Read More
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{announcement.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-3 text-muted mb-3 small">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar3 me-1" />
              {formattedDate}
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-person me-1" />
              By {announcement.author}
            </div>
          </div>
          {announcement.content.split("\\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
