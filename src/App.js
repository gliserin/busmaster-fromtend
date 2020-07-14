import React from "react";
import Home from "./screens/Home";
import Main from "./screens/Main";
import { Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/dashboard" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
};

export default App;
