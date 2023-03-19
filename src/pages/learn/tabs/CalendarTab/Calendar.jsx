import { Col, Form, Modal, Row } from "react-bootstrap";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectRemind from "./components/selectRemind";
import { FcGoogle } from "react-icons/fc";
import LinaerStepper from "./components/ModalAddCalendar/ModalAddCalendar2";

export default function Calendar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <Row>
      <Col>
        <div className="calendar__container p-2">
          {show ? (
            <LinaerStepper show={show} handleClose={handleClose} />
          ) : null}
          <h3
            style={{
              fontWeight: 500,
              fontSize: "14px",
              color: "#3c3e41",
              textTransform: "uppercase",
            }}
            className="mb-2"
          >
            Lời nhắc học tập
          </h3>
          <button
            className="btn__addCalendar"
            onClick={() => {
              setShow(true);
            }}
          >
            Thêm lịch học
            <i className="fas fa-plus ps-2"></i>
          </button>
        </div>
      </Col>
    </Row>
  );
}
