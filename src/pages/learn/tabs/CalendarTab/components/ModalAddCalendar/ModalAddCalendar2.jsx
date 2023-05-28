import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { Form, Modal } from "react-bootstrap";
import SelectRemind from "../selectRemind";
import { FcGoogle } from "react-icons/fc";
import CustomDateTimePicker from "../../../../../../components/DatePicker/DateTimePicker.component";
import moment from "moment/moment";
import MultipleSelectChip from "../MultiSelect/MultiSelect";
import Select from "react-select";
import calendarApi from "../../../../../../api/calendarApi";
import Swal from "sweetalert2";
import { formatDateDisplay } from "../../../../../../utils/MyUtils";
const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Bước 1/3", "Bước 2/3", "Bước 3/3", "Kết quả"];
}
const SecondForm = () => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext({});
  console.log(errors);
  const [currentFrequencyOption, setCurrentFrequencyOption] = useState("ONCE");
  const [isEnd, setIsEnd] = useState(false);

  console.log(currentFrequencyOption);

  const optionDate = [
    {
      label: "Chủ nhật",
      value: "SU",
    },
    {
      label: "Thứ 2",
      value: "MO",
    },
    {
      label: "Thứ 3",
      value: "TU",
    },
    {
      label: "Thứ 4",
      value: "WE",
    },
    {
      label: "Thứ 5",
      value: "TH",
    },
    {
      label: "Thứ 6",
      value: "FR",
    },
    {
      label: "Thứ 7",
      value: "SA",
    },
  ];
  return (
    <>
      <Controller
        control={control}
        name="title"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <Form.Group>
            <Form.Label>Tên </Form.Label>
            <Form.Control
              type="text"
              placeholder="Đã đến giờ học rồi"
              {...field}
            />
            {errors.title && (
              <Form.Text className="text-danger">
                {errors.title.type === "required" && "Vui lòng nhập tên"}
                {errors.title.type === "maxLength" &&
                  "Tên không được quá 3 ký tự"}
              </Form.Text>
            )}
          </Form.Group>
        )}
      />

      <Controller
        control={control}
        name="frequency"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <Form.Group className="mb-3">
            <Form.Label>Tần xuất </Form.Label>
            <Form.Control
              as="select"
              {...field}
              onChange={(e) => {
                console.log(e.target.value);
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
            {errors.frequency && (
              <Form.Text className="text-danger">
                {errors.frequency.type === "required" &&
                  "Vui lòng chọn tần xuất"}
              </Form.Text>
            )}
          </Form.Group>
        )}
      />

      {currentFrequencyOption === "WEEKLY" && (
        <Controller
          control={control}
          name="byDay"
          rules={{ required: "this field is required." }}
          render={({ field }) => (
            <Select
              isMulti
              name="colors"
              options={optionDate}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="startTime"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <Form.Group className="mb-3">
            <Form.Label>Giờ bắt đầu </Form.Label>
            <CustomDateTimePicker control={control} field="startTime" />
            {errors.startTime && (
              <Form.Text className="text-danger">
                {errors.startTime.type === "required" &&
                  "Vui lòng chọn ngày nhắc"}
              </Form.Text>
            )}
          </Form.Group>
        )}
      />

      <Controller
        control={control}
        name="notificationDuration"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
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
            <Form.Control type="number" {...field} />
            {errors.notificationDuration && (
              <Form.Text className="text-danger">
                {errors.notificationDuration.type === "required" &&
                  "Vui lòng nhập thời lượng"}
              </Form.Text>
            )}
          </Form.Group>
        )}
      />
      {/* 
      <Controller
        control={control}
        name="notificationTimeBefore"
        render={({ field }) => (
          <Form.Group className="mb-3">
            <Form.Label>Lời nhắc trước</Form.Label>
            <div className="d-flex">
              <Form.Select>
                <option value="email">Email</option>
              </Form.Select>
              <Form.Control type="number" {...field} />
              <Form.Select {...field}>
                <option value="minute">Phút</option>
                <option value="hour">Giờ</option>
              </Form.Select>
            </div>
            {errors.notificationTimeBefore && (
              <Form.Text className="text-danger">
                {errors.notificationTimeBefore.type === "required" &&
                  "Vui lòng nhập thời gian"}
              </Form.Text>
            )}
          </Form.Group>
        )}
      /> */}
      {currentFrequencyOption !== "ONCE" && (
        <Form.Group className="mb-3">
          <Form.Label>Kết thúc lịch</Form.Label>
          <Form.Check
            type="switch"
            value={isEnd}
            onChange={() => {
              setIsEnd(!isEnd);
              setValue("until", "");
            }}
          ></Form.Check>
        </Form.Group>
      )}

      {/* {currentFrequencyOption !== "ONCE" && (
        <Controller
          control={control}
          name="endTime"
          rules={{ required: "this field is required." }}
          render={({ field }) => (
            <Form.Group className="mb-3">
              <Form.Label>Kết thúc lịch</Form.Label>
              <Form.Check
                type="switch"
                {...field}
                onChange={() => {
                  setIsEnd(!isEnd);
                  setValue("until", "");
                }}
              ></Form.Check>
              {errors.endTime && (
                <Form.Text className="text-danger">
                  {errors.endTime.type === "required" &&
                    "Vui lòng chọn ngày kết thúc"}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
      )} */}

      {isEnd && currentFrequencyOption !== "ONCE" && (
        <Controller
          control={control}
          name="until"
          rules={{ required: "this field is required." }}
          render={({ field }) => (
            <Form.Group className="mb-3">
              <Form.Label>Ngày kết thúc</Form.Label>
              <Form.Switch>
                <Form.Control type="date" {...field} />
              </Form.Switch>
              {errors.until && (
                <Form.Text className="text-danger">
                  {errors.until.type === "required" &&
                    "Vui lòng chọn ngày kết thúc"}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
      )}
    </>
  );
};
const FirstForm = () => {
  const { control } = useFormContext();
  return (
    <div className="p-1">
      <h3
        className="text-center"
        style={{
          color: "#6a6f73",
          marginBottom: "2rem",
          fontSize: "1.5rem",
          letterSpacing: "0.1rem",
        }}
      >
        Bắt đầu lên lịch học tập
      </h3>
      <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_4qkb4ywv.json"
        background="transparent"
        speed="1"
        style={{ width: "100%", height: "300px" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
};
const ThirdForm = () => {
  const [isHasGoogleAccount, setIsHasGoogleAccount] = useState(false);
  console.log(isHasGoogleAccount);
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const google = window.google;
  const client = google.accounts.oauth2.initCodeClient({
    client_id:
      "14798142292-jspm633im26dll1s46sbfa4o2pnjm2pp.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/calendar",
    ux_mode: "popup",
    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
    callback: (response) => {
      if (response.code) {
        setValue("code", response.code);
        setValue("calendarType", "GOOGLE");
        setIsHasGoogleAccount(true);
      }
    },
  });
  const handleLoginWithGG = async () => {
    console.log("clcik");
    console.log(process.env.REACT_APP_GOOGLE_REDIRECT_URL)
    await client.requestCode();
  };

  return (
    <div className="p-1">
      <label
        style={{
          display: "flex",
          alignItems: "center",
          margin: 0,
          paddingBottom: " 0.8rem",
          minHeight: "2.8rem",
        }}
      >
        Đăng nhập
      </label>

      <Controller
        control={control}
        name="calendarType"
        rules={{ required: "Bạn chưa đăng nhập" }}
        render={({ field }) => (
          <Form.Group>
            <Form.Control type="text" {...field} hidden />
            {errors.calendarType && (
              <Form.Text className="text-danger">
                Vui lòng đăng nhập để tiếp tục
              </Form.Text>
            )}
          </Form.Group>
        )}
      />
      {isHasGoogleAccount === false ? (
        <button
          className="login__google d-flex align-items-center "
          style={{
            background: "#fff",
            border: "1px solid #d1d7dc",
            padding: " 0.6rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={(e) => {
            e.preventDefault();
            handleLoginWithGG();
          }}
        >
          <FcGoogle
            style={{
              marginRight: "0.6rem",
            }}
          />
          Đăng nhập với Google
        </button>
      ) : (
        <div>
          <p>Đăng nhập với google thành công</p>
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_hkpzpvwq.json"
            background="transparent"
            speed="0.5"
            autoplay
            style={{ width: "100%", height: "300px" }}
          ></lottie-player>
        </div>
      )}
    </div>
  );
};
const ResultForm = () => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  return (
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
      <div className="calendar__name"> Tên lịch học: {getValues("title")}</div>
      <div className="calendar__name">
        {" "}
        Tần xuất nhắc: {getValues("frequency") === "ONCE" ? "1 lần" : "Nhiều"}
      </div>
      <div className="calendar__name">
        Thông báo qua:{" "}
        {getValues("notificationMethod") === "EMAIL" ? "Email" : "SMS"}
      </div>

      <div className="calendar__time">
        Ngày bắt đầu: {formatDateDisplay(getValues("startTime"))}
      </div>

      <div className="calendar__time">
        Ngày kết thúc: {formatDateDisplay(getValues("endTime"))}
      </div>
      <div className="calendar__time__remind">
        Thời lượng thông báo: {getValues("notificationDuration")} phút
      </div>
    </div>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FirstForm />;
    case 1:
      return <SecondForm />;
    case 2:
      return <ThirdForm />;
    case 3:
      return <ResultForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = ({ show, handleClose }) => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      frequency: "ONCE",
      notificationMethod: "EMAIL",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const isStepOptional = (step) => {
    return;
  };
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };
  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = async (data) => {
    if (data.startTime) {
      data.startTime = data.startTime.toISOString();
    }
    if (data.notificationDuration && data.startTime) {
      // Cộng thêm thời gian nhắc nhở vào thời gian kết thúc
      console.log("Have");
      data.endTime = moment(data.startTime)
        .add(data.notificationDuration, "minutes")
        .toISOString();
    }
    console.log(data);

    if (activeStep === steps.length - 1) {
      try {
        const res = await calendarApi.addCalendar(data);
        if (res.errorCode === "") {
          Swal.fire({
            icon: "success",
            title: "Thêm lịch học tập thành công",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Body style={{ height: "80vh", overflow: "auto" }}>
        <div>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};

              const stepProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography
                    variant="caption"
                    align="center"
                    style={{ display: "block" }}
                  >
                    optional
                  </Typography>
                );
              }
              if (isStepFalied() && activeStep == index) {
                labelProps.error = true;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <Typography variant="h3" align="center">
              Thank You
            </Typography>
          ) : (
            <>
              <FormProvider {...methods}>
                <form
                  id="formAddCalendar"
                  onSubmit={methods.handleSubmit(handleNext)}
                >
                  {getStepContent(activeStep)}
                </form>
              </FormProvider>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={classes.button}
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          back
        </Button>
        {isStepOptional(activeStep) && (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSkip}
          >
            skip
          </Button>
        )}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          // onClick={handleNext}
          type="submit"
          form="formAddCalendar"
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LinaerStepper;
