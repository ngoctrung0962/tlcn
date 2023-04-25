import React, { useState } from "react";
import Question from "./Question";
import axios from "axios";
import quizApi from "../../../../api/quizApi";
import Swal from "sweetalert2";

const Quiz = ({ lectureId }) => {
  const fakeData = {
    refStat: "963476eb-2c56-4314-b406-bc8256473c65",
    questions: [
      {
        createDate: "2023-03-30T00:00:00.000+00:00",
        updateDate: null,
        id: 1,
        quizId: 29,
        offset: 1,
        content: "What is docker image",
        questionType: "CHOOSE_ONE",
        options: [
          {
            createDate: null,
            updateDate: null,
            id: 1,
            questionId: 1,
            content: "the image divide into multi layer",
          },
          {
            createDate: null,
            updateDate: null,
            id: 2,
            questionId: 1,
            content: "the image has only one layer",
          },
        ],
      },
      {
        createDate: "0023-03-30T00:00:00.000+00:00",
        updateDate: null,
        id: 2,
        quizId: 29,
        offset: 2,
        content: "What is volume in docker",
        questionType: "MULTI_CHOISE",
        options: [
          {
            createDate: null,
            updateDate: null,
            id: 3,
            questionId: 2,
            content: "the volume is correct",
          },
          {
            createDate: null,
            updateDate: null,
            id: 4,
            questionId: 2,
            content: "the volume is super correct",
          },
        ],
      },
    ],
  };

  const [listQuestions, setListQuestions] = useState();
  const [refStat, setRefStat] = useState();

  const [listAnwser, setListAnwser] = useState();

  const [dataAnswer, setDataAnswer] = useState({
    lectureId: lectureId,
    user_chooses: [],
  });

  const handleChoose = (questionId, chooseId) => {
    const chooseData = dataAnswer.user_chooses.find(
      (choose) => choose.questionId === questionId
    );
    // Nếu có rồi thì bỏ chọn
    if (chooseData?.choose.includes(chooseId)) {
      chooseData.choose = chooseData.choose.filter((item) => item !== chooseId);
      setDataAnswer({ ...dataAnswer });
      return;
    }

    if (chooseData) {
      chooseData.choose = [...chooseData.choose, chooseId];
    } else {
      dataAnswer.user_chooses.push({
        questionId: questionId,
        choose: [chooseId],
      });
    }
    setDataAnswer({ ...dataAnswer });
  };

  console.log(dataAnswer);
  const [activeQuestion, setActiveQuestion] = useState(1);

  const handleNextOrPrev = (type) => {
    if (type === "next") {
      if (activeQuestion === fakeData.questions.length) return;
      setActiveQuestion(activeQuestion + 1);
    } else {
      if (activeQuestion === 1) return;
      setActiveQuestion(activeQuestion - 1);
    }
  };

  const [quizStatus, setQuizStatus] = useState("not-started");

  const handleStartQuiz = async () => {
    setQuizStatus("started");
    console.log(lectureId);
    try {
      const res = await quizApi.startQuiz(lectureId);
      if (res.errorCode === "") {
        console.log(res);
        setListQuestions(res.data.questions);
        setRefStat(res.data.refStat);
      }
    } catch (error) {}
  };

  const handleSubmitQuiz = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn nộp bài?",
      showDenyButton: true,
      confirmButtonText: `Nộp bài`,
      denyButtonText: `Không`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let dataSubmit = {
            ref: refStat,
            userAnswers: dataAnswer.user_chooses,
          };
          console.log(dataSubmit);
          const res = await quizApi.submitQuiz(lectureId, dataSubmit);
          if (res.errorCode === "") {
            Swal.fire("Nộp bài thành công!", "", "success");
            setQuizStatus("submitted");
          }
        } catch (error) {}
        console.log(dataAnswer);
      }
    });
  };
  console.log(listQuestions);

  return (
    <div className="containerrr">
      {quizStatus === "not-started" ? (
        <div
          style={{
            height: "60vh",
            background:
              "url(https://x2mint.vercel.app/assets/images/contest.svg) no-repeat center",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <button className="main__btn" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : quizStatus === "started" ? (
        <div className="d-flex flex-column justify-content-between align-items-center">
          {listQuestions?.map((question, index) => {
            if (activeQuestion === index + 1)
              return (
                <div
                  key={question.id}
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "80%",
                    height: "60vh",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "-10px",

                      zIndex: "1",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#00693e",
                      }}
                    >
                      {activeQuestion}/{listQuestions.length}
                    </span>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "-10px",

                      zIndex: "1",
                    }}
                  >
                    <button
                      className="btn__next__quiz"
                      onClick={() => {
                        handleSubmitQuiz();
                      }}
                    >
                      Nộp bài
                    </button>
                  </div>
                  <Question
                    question={question}
                    dataAnswer={dataAnswer}
                    setDataAnswer={setDataAnswer}
                    handleChoose={handleChoose}
                  />
                </div>
              );
          })}
          <div className="t">
            <button
              className="btn__next__quiz"
              onClick={() => {
                handleNextOrPrev("prev");
              }}
            >
              Prev
            </button>

            <button
              className="btn__next__quiz"
              onClick={() => {
                handleNextOrPrev("next");
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Đã nộp bài</h1>
        </div>
      )}
    </div>
  );
};

export default Quiz;
