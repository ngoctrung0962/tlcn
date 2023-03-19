import React from "react";
import { Form } from "react-bootstrap";

const SelectRemind = () => {
  return (
    <div className="d-flex">
      <Form.Select>
        <option value="annouce">Thông báo</option>
        <option value="email">Email</option>
      </Form.Select>
      <Form.Control type="number" />
      <Form.Select>
        <option value="minute">Phút</option>
        <option value="hour">Giờ</option>
      </Form.Select>
    </div>
  );
};

export default SelectRemind;
