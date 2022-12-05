import { Progress } from "antd";
const ProgressComponent = ({ value }) => (
  <Progress
    type="line"
    percent={value}
    strokeColor={"#005fb7"}
    strokeWidth={6}
    style={{ transition: "all 0.5s ease-in-out", maxWidth: "50%" }}
    format={(percent) => `Đã học được ${percent}%`}
  />
);
export default ProgressComponent;
