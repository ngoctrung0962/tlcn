import React from "react";

export default function NotiOfTeacherTab() {
  const notiFake = [
    {
      id: 1,
      content:
        '<p><br></p><h1><span style="color: rgb(152, 0, 0);">Javascript cho người mới bắt đầu 2021</span></h1><p><span style="font-size: 19px;">Hỗ trợ các bạn bước đầu vào ngành lập trình một cách đơn giản và dễ hiểu nhất</span></p><p>Được tạo bởi:&nbsp;<a href="https://www.youtube.com/watch?v=NZJmLBap_0c" alt="Nguyễn Trung" target="_blank" class="on">Nguyễn Trung</a></p><div class="se-component se-image-container __se__float-none" contenteditable="false"><figure style="margin: 0px;"><img src="https://resource-course.s3.us-west-2.amazonaws.com/screenshot%20%281%29.jpg" alt="" data-rotate="" data-proportion="true" data-rotatex="" data-rotatey="" data-size="," data-align="none" data-percentage="auto,auto" data-index="2" data-file-name="screenshot (1).jpg" data-file-size="967715" data-origin="," style=""></figure></div><p>​</p>',
    },
    {
      id: 2,
      content:
        '<p><br></p><h1><span style="color: rgb(152, 0, 0);">Javascript cho người mới bắt đầu 2021</span></h1><p><span style="font-size: 19px;">Hỗ trợ các bạn bước đầu vào ngành lập trình một cách đơn giản và dễ hiểu nhất</span></p><p>Được tạo bởi:&nbsp;<a href="https://www.youtube.com/watch?v=NZJmLBap_0c" alt="Nguyễn Trung" target="_blank" class="on">Nguyễn Trung</a></p><div class="se-component se-image-container __se__float-none" contenteditable="false"><figure style="margin: 0px;"><img src="https://resource-course.s3.us-west-2.amazonaws.com/screenshot%20%281%29.jpg" alt="" data-rotate="" data-proportion="true" data-rotatex="" data-rotatey="" data-size="," data-align="none" data-percentage="auto,auto" data-index="2" data-file-name="screenshot (1).jpg" data-file-size="967715" data-origin="," style=""></figure></div><p>​</p>',
    },
  ];
  return (
    <div className="question__container">
      <h3
        style={{
          fontWeight: 500,
          fontSize: "14px",
          color: "#3c3e41",
          textTransform: "uppercase",
        }}
        className="mb-2"
      >
        Thông báo của giảng viên
      </h3>

      <div className="noti__list">
        {notiFake.map((noti) => (
          <div className="noti__item" key={noti.id}>
            <div dangerouslySetInnerHTML={{ __html: noti.content }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
