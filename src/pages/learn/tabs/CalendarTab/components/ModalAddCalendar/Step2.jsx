import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CustomDateTimePicker from "../../../../../../components/DatePicker/DateTimePicker.component";
import SelectRemind from "../selectRemind";

export const StepTwo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const [currentFrequencyOption, setCurrentFrequencyOption] = useState("ONCE");
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="p-1">
      <p
        style={{
          color: "#6a6f73",
          marginBottom: "2rem",
        }}
      >
        Bước 2/3
      </p>
      <div
        className="over__view__calendar p-4"
        style={{
          position: "relative",
          background: "#f7f9fa",
          border: "1px solid #d1d7dc",
          padding: " 1.6rem",
          marginBottom: " 1.6rem",
        }}
      >
        <div className="icon__calendar">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <div className="calendar__name">Đã đến giờ học rồi</div>
        <div className="calendar__time">22/02/2023</div>
        <div className="calendar__time__remind">
          Thông báo nhắc 30 phút trước
        </div>
      </div>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tên </Form.Label>
              <Form.Control
                type="text"
                placeholder="Đã đến giờ học rồi"
                {...register("title", { required: true, maxLength: 3 })}
              />
              {errors.title && (
                <Form.Text className="text-danger">
                  {errors.title.type === "required" && "Vui lòng nhập tên"}
                  {errors.title.type === "maxLength" &&
                    "Tên không được quá 3 ký tự"}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tần xuất </Form.Label>
              <Form.Control
                as="select"
                {...register("frequency", { required: true })}
                onChange={(e) => {
                  if (e.target.value === "ONCE") {
                    setIsEnd(false);
                  }
                  setCurrentFrequencyOption(e.target.value);
                  setValue("frequency", e.target.value);
                  setValue("date", "");
                }}
              >
                <option value={"ONCE"}>Chỉ một lần</option>
                <option value={"DAILY"}>Hàng ngày</option>
                <option value={"WEEKLY"}>Hàng tuần</option>
                <option value={"MONTHLY"}>Hàng tháng</option>
              </Form.Control>
            </Form.Group>
            {currentFrequencyOption === "ONCE" ||
            currentFrequencyOption === "MONTHLY" ? (
              <Form.Group className="mb-3">
                <Form.Label>Ngày nhắc </Form.Label>
                <Form.Control
                  type="date"
                  {...register("startTime", { required: true })}
                />

                <CustomDateTimePicker control={control} field="startTime" />
              </Form.Group>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>
                Thời lượng
                <span
                  style={{
                    textTransform: "lowercase",
                  }}
                >
                  (phút)
                </span>
              </Form.Label>
              <Form.Control
                type="number"
                {...register("notificationDuration", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thời gian</Form.Label>
              <Form.Control
                type="time"
                {...register("time", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lời nhắc trước</Form.Label>
              <SelectRemind />
            </Form.Group>
            {currentFrequencyOption !== "1" && (
              <Form.Group className="mb-3">
                <Form.Label>Kết thúc lịch</Form.Label>
                <Form.Check
                  type="switch"
                  onChange={() => {
                    setIsEnd(!isEnd);
                    setValue("end_date", "");
                  }}
                ></Form.Check>
              </Form.Group>
            )}

            {isEnd && currentFrequencyOption !== "1" && (
              <Form.Group className="mb-3">
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Switch>
                  <Form.Control
                    type="date"
                    {...register("until", { required: true })}
                  />
                </Form.Switch>
              </Form.Group>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};
