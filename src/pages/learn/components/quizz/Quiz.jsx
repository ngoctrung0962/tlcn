import React, { useState } from "react";
import Question from "./Question";

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
  return (
    <div className="containerrr">
      <div className="d-flex flex-column justify-content-between align-items-center">
        {fakeData.questions.map((question, index) => {
          if (activeQuestion === index + 1)
            return (
              <div
                key={question.id}
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "80%",
                }}
              >
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
    </div>
  );
};

export default Quiz;
