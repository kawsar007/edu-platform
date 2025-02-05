"use client";

import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(null);

  return (
    <QuizContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};