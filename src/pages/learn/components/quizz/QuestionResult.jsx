import React from "react";
import { useState } from "react";

const QuestionResult = ({ questionResult, key }) => {
  return (
    <div key={key} className="question__container">
      <div className="question__title">
        <h3>{questionResult?.content}</h3>
      </div>
      <div className="question__content">
        {questionResult?.byTeacher?.map((choose, index) => {
          return (
            <div
              key={index}
              className={
                choose?.correct === true
                  ? "question__result question__choose__correct"
                  : "question__result question__choose__wrong"
              }
            >
              <p key={index}>
                {index + 1}: {choose?.content}
              </p>

              <div className="icon__result">
                {choose?.correct === true ? (
                  <i className="bi bi-check-circle-fill"></i>
                ) : (
                  <i className="bi bi-x-circle-fill"></i>
                )}
              </div>
            </div>
          );
        })}
        <div className="d-flex gap-2">
          Lựa chọn của bạn :
          {questionResult?.byTeacher?.map((choose, index) => {
            return (
              <div key={index}>
                {questionResult?.byUser?.map((chooseUser, indexUser) => {
                  return (
                    <div key={indexUser} className="d-flex gap-2">
                      {chooseUser?.optionId === choose?.optionId && (
                        <div>{index + 1} </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionResult;
