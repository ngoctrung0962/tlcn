import React from "react";
import { useState } from "react";

const Question = ({ question, dataAnswer, setDataAnswer, handleChoose }) => {
  return (
    <div className="question__container mb-3">
      <div className="question__title">
        <h3>
          {question?.questionType === "CHOICE_ONE"
            ? "(Chọn 1 đáp án) "
            : "(Chọn nhiều đáp án) "}
          {question?.content}
        </h3>
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
                handleChoose(question?.id, choose?.id, question?.questionType);
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

export default Question;
