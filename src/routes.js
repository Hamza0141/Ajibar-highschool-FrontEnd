// src/routes.js
import Home from "./pages/Home/Home";
import LoginPage from "./pages/login/LoginPage";
import SignUp from "./pages/SignUp/SignUp";
import Que from "./pages/AskQuestion/AskQuestion";
import AnswerQuestion from "./pages/QuestionDetail/QuestionDetail";
import PersonalQuestion from "./pages/PersonalQuestion/PersonalQuestion";

const routes = [
  { path: "/", element: Home, protected: false },
  { path: "/login", element: LoginPage, protected: false },
  { path: "/signup", element: SignUp, protected: false },
  { path: "/ask-question", element: Que, protected: true },
  { path: "/questions/:id", element: AnswerQuestion, protected: true },
  { path: "/YourQuestion", element: PersonalQuestion, protected: true },
  {
    path: "/YourQuestion/questions/:id",
    element: AnswerQuestion,
    protected: true,
  },
];

export default routes;
