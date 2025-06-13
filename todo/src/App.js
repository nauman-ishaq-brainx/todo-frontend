import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { authRoutes, todoRoutes } from "./route";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {

  const renderAuthRoutes = () =>{
    return authRoutes.map((route)=>{
      const newRoute = <Route path={`/auth/${route.path}`} element={route.protected ? <ProtectedRoute> {route.element} </ProtectedRoute> : route.element }/>
     return newRoute
    })
  }


    const renderTodoRoutes = () =>{
    return todoRoutes.map((route)=>{
      const newRoute = <Route path={`/${route.path}`} element={route.protected ? <ProtectedRoute> {route.element} </ProtectedRoute> : route.element }/>
     return newRoute
    })
  }

  return (
    <Router>
       <Routes>
        {renderAuthRoutes()}
        {renderTodoRoutes()}
      </Routes>
    </Router>
  );
};

export default App;
