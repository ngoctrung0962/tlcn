import React, { useState } from "react";
import Question from "./Question";
import axios from "axios";
import quizApi from "../../../../api/quizApi";
import Swal from "sweetalert2";
import QuestionResult from "./QuestionResult";

const Quiz = ({ lectureId }) => {
  const [listQuestions, setListQuestions] = useState();
  const [refStat, setRefStat] = useState();

  const [dataAnswer, setDataAnswer] = useState({
    lectureId: lectureId,
    user_chooses: [],
  });

  const [dataResult, setDataResult] = useState();

  const handleChoose = (questionId, chooseId, typeQuestion) => {
    if (typeQuestion === "CHOICE_ONE") {
      dataAnswer.user_chooses = dataAnswer.user_chooses.filter(
        (item) => item.questionId !== questionId
      );
      dataAnswer.user_chooses.push({
        questionId: questionId,
        choose: [chooseId],
      });
      setDataAnswer({ ...dataAnswer });
      return;
    } else {
      const chooseData = dataAnswer.user_chooses.find(
        (choose) => choose.questionId === questionId
      );
      // Nếu có rồi thì bỏ chọn
      if (chooseData?.choose.includes(chooseId)) {
        chooseData.choose = chooseData.choose.filter(
          (item) => item !== chooseId
        );
        if (chooseData.choose.length === 0) {
          // Xóa user_choose nếu không có lựa chọn nào
          dataAnswer.user_chooses = dataAnswer.user_chooses.filter(
            (item) => item.questionId !== questionId
          );
        }
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
    }
  };

  const [activeQuestion, setActiveQuestion] = useState(1);

  const handleNextOrPrev = (type) => {
    if (type === "next") {
      if (activeQuestion === listQuestions?.length) return;
      setActiveQuestion(activeQuestion + 1);
    } else {
      if (activeQuestion === 1) return;
      setActiveQuestion(activeQuestion - 1);
    }
  };

  const [quizStatus, setQuizStatus] = useState("not-started");

  const handleStartQuiz = async () => {
    setQuizStatus("started");
    try {
      const res = await quizApi.startQuiz(lectureId);
      if (res.errorCode === "") {
        setListQuestions(res.data.questions);
        setRefStat(res.data.refStat);
      }
    } catch (error) {}
  };
  console.log("dataAnswer", dataAnswer);
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
          const res = await quizApi.submitQuiz(lectureId, dataSubmit);
          if (res.errorCode === "") {
            Swal.fire("Nộp bài thành công!", "", "success");
            setQuizStatus("submitted");
            setDataResult(res.data);
          }
        } catch (error) {}
      }
    });
  };

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
                  className="d-flex justify-content-center align-items-center flex-column"
                  style={{
                    width: "80%",
                  }}
                >
                  <div className="d-flex justify-content-between w-100 mb-3">
                    <div>
                      <span
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#054a49",
                        }}
                      >
                        {activeQuestion}/{listQuestions.length} Câu hỏi
                      </span>
                    </div>

                    <button
                      className="btn__next__quiz"
                      onClick={() => {
                        handleSubmitQuiz();
                      }}
                      style={{
                        display:
                          dataAnswer.user_chooses.length ===
                          listQuestions.length
                            ? "block"
                            : "none",
                      }}
                    >
                      Nộp bài
                    </button>
                    <div
                      className="t mb-3"
                      style={{
                        display: listQuestions ? "flex" : "none",
                      }}
                    >
                      <button
                        className="btn__next__quiz"
                        onClick={() => {
                          handleNextOrPrev("prev");
                        }}
                        disabled={activeQuestion === 1 ? true : false}
                      >
                        Prev
                      </button>

                      <button
                        className="btn__next__quiz"
                        onClick={() => {
                          handleNextOrPrev("next");
                        }}
                        disabled={
                          activeQuestion === listQuestions?.length
                            ? true
                            : false
                        }
                      >
                        Next
                      </button>
                    </div>
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
        </div>
      ) : (
        <div className="form__quiz__result d-flex justify-content-center  flex-column mb-4">
          <h1>Đã nộp bài</h1>
          <div className="result__quiz">
            <div className="result__quiz__item">
              <span className="result__quiz__text">Bạn đã trả lời đúng </span>
              <span>
                {dataResult?.numCorrect}/ {listQuestions.length}{" "}
              </span>
              <span className="result__quiz__text">câu hỏi </span>
            </div>
            {/* <div className="result__quiz__item">
              <span className="result__quiz__text">Số câu sai: </span>
              <span>{dataResult?.numWrong}</span>
            </div> */}
            <div className="result__quiz__item">
              <p className="result__quiz__text m-0">
                {dataResult?.passed
                  ? "Bạn đã vượt qua bài kiểm tra"
                  : "Bạn chưa vượt qua bài kiểm tra"}
              </p>
            </div>
          </div>
          <div className="result__quiz__ite">
            <span
              className="result__quiz__text"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Kết quả chi tiết
            </span>
            <div className="d-flex flex-column flex-md-row  row">
              {dataResult?.resultDetail?.map((item, index) => (
                <div key={index} className="col-12">
                  <QuestionResult key={item.questionId} questionResult={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
