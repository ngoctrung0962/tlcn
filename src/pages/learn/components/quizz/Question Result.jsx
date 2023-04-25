import React from "react";
import { useState } from "react";

const QuestionResult = ({
  question,
  dataAnswer,
  setDataAnswer,
  handleChoose,
  checkedQuestion,
}) => {
  return (
    <div className="question__container">
      <div className="question__title">
        <h3>{checkedQuestion?.content}</h3>
      </div>
      <div className="question__content">
        {question?.options.map((choose, index) => {
          return (
            <div
              key={index}
              className={
                dataAnswer?.user_chooses
                  ?.find((item) => item.questionId === question?.id)
                  ?.choose?.find((item) => item === choose?.id)
                  ? "question__choose active "
                  : "question__choose"
              }
              onClick={() => {
                handleChoose(question?.id, choose?.id);
              }}
            >
              <p key={index}>
                {index + 1}: {choose?.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionResult;
