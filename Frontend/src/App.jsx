import { useState } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LogInSc from "./screens/LogInSc";
import KanbanDash from "./screens/KanbanDash";
import PageNA from "./screens/PageNA";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {
  const token = getToken();
  console.log(token);
  const router = createBrowserRouter([
    {
      path: "/",
      element: !token ? <LogInSc setToken={setToken} /> : <KanbanDash />,
    },
    // {
    //   path: "/kanban",
    //   element: <KanbanDash />,
    // },
    {
      path: "/*",
      element: <PageNA />,
    },
  ]);
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
