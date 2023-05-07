import React from "react";
import { useEffect, useRef, useState } from "react";
import avatar from "../../../../assets/img/__avatar_url.png";
import senderAvatar from "../../../../assets/img/senderAvatar.png";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import chatbotApi from "../../../../api/chatbotApi";
import { useSelector } from "react-redux";
import {
  convertDateToUnixTime,
  formatUnixTime,
  generateId,
} from "../../../../utils/MyUtils";
import ReactMarkdown from 'react-markdown'

export default function ChatBotTab() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser", currentUser);


  const [dataConvertation, setdataConvertation] = useState();
  console.log("dataConvertation", dataConvertation);
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const [isTyping, setIsTyping] = useState(false);

  const onSubmit = async (data) => {
    setIsTyping(true);
    data.roomId = chatRoomId;

    const newData = {
      id: generateId(),
      sender: currentUser.username,
      message: data.message,
      timeSent: convertDateToUnixTime(new Date()),
      roomId: chatRoomId,
    };
    setdataConvertation([...dataConvertation, newData]);
    reset();

    try {
      const res = await chatbotApi.sendMessage(data);
      if (res.errorCode === "") {
        setdataConvertation((pre) => [...pre, res.data]);
      }
      setIsTyping(false);
    } catch (error) { }
  };
  const dummy = useRef();
  const [chatRoomId, setChatRoomId] = useState();
  const fetchChatHistory = async () => {
    try {
      const res = await chatbotApi.getRoomHistory();
      if (res.errorCode === "") {
        setChatRoomId(res.data.roomId);
        setdataConvertation(res.data.history);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [dataConvertation]);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="chat__container">
        <div className="chat__room">
          <div className="chat__header">
            <div className="chat__header__left">
              <img
                src={senderAvatar}
                alt="react logo"
                className="sender__avatar"
              />
              <dir>
                <h4>BOT</h4>
                <p className="status__active">active</p>
              </dir>
            </div>

            <div className="chat__header__right">
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
          <div className="chat__content">
            {dataConvertation?.map((message) => (
              <div
                key={message.id}
                className={`chat__message ${message.sender === currentUser.username
                    ? "chat__message__right"
                    : "chat__message__left"
                  }`}
              >
                <div className="chat__message__content">
                  <ReactMarkdown>{message.message}</ReactMarkdown>
                  <span className="chat__timestamp">
                    {formatUnixTime(message?.timeSent)}
                  </span>
                </div>
                <div className="chat__message__avatar">
                  <img
                    src={
                      message.sender === currentUser.username
                        ? currentUser.avatar
                        : senderAvatar
                    }
                    alt="sender avatar"
                    className="chat__message__avatar"
                  />
                </div>
              </div>
            ))}

            {
              // Hiệu ứng loading
              isTyping && (
                <div className="typing__animation">
                  <div className="typing__dot"></div>
                  <div className="typing__dot"></div>
                  <div className="typing__dot"></div>
                </div>
              )
            }

            <span ref={dummy}></span>
          </div>

          <div className="chat__footer">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="input__sendMessage">
                <textarea
                  type="text"
                  placeholder="Hãy nhập nội dung"
                  {...register("message", { required: true })}
                />
                <i onClick={handleSubmit(onSubmit)} className="bi bi-send"></i>
              </div>
              {errors.message && (
                <span className="error__message">Vui lòng nhập nội dung</span>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
