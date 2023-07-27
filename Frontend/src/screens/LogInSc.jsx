import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Center,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Divider,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import SignUpCompo from "../components/SignUpCompo";
import axios from "axios";
import PropTypes from "prop-types";
import KanbanDash from "./KanbanDash";

function LogInSc({ setToken }) {
  // This takes the path '/' as the main screen when user opens our website

  const navigate = useNavigate();
  const [error, setError] = useState();
  const [users, setUsers] = useState({}); // useState hook for user api call
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal props to talk to modal

  const verified = async (e) => {
    if (users.status === 200) {
      //const token = [users.data.empname, user.data.empid];
      // Statement checks
      setToken({
        user_name: users.data.empname,
        empid: users.data.empid,
      });
      //navigate("/");
      window.location.reload(true);
    } else {
      // Will throw error on failure
    }
  };

  useEffect(() => {
    // The fucntion which triggers fetchData upon refresh or any action
    verified(), [];
  });

  const [formData, setformData] = useState({
    // useState hook variable with pre determined to null values
    emailid: "",
    password: "",
  });

  const handleChange = (e) => {
    // Handle changer will handle recieve value from below form and apply it to formData
    const { name, value } = e.target;
    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    // Will handle submit from form and validates
    e.preventDefault();

    const response = await axios.put(
      "http://127.0.0.1:8000/kanban/auth/",
      formData
    );
    setUsers(response);

    if (response.status == 400 || 401) {
      setError("Invalid Credentials");
    }
  };

  return (
    <Center h="100vh" backgroundColor={"gray.900"}>
      <Box w="300px" p={4} borderWidth="1px" borderRadius="md" shadow="md">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <Center display={"flex"}>
              <Image
                onClick={() => {
                  window.location.reload(true);
                }}
                width={"30%"}
                src="src\assets\icooo.ico"
                _hover={{ transform: "Scale(1.03)" }}
              />
            </Center>
            <Divider
              marginTop={"5%"}
              borderWidth={"2px"}
              borderStyle={"solid"}
              borderColor={"gray"}
              borderRadius={10}
            />
            <FormLabel marginTop={"3%"} textColor={"whatsapp.100"}>
              Email
            </FormLabel>
            <Input
              onChange={handleChange}
              type="email"
              textColor={"whiteAlpha.800"}
              placeholder="Enter your email"
              boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
              name={"emailid"}
              vaue={formData.email}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel textColor={"whatsapp.100"}>Password</FormLabel>
            <Input
              onChange={handleChange}
              type="password"
              textColor={"whiteAlpha.800"}
              placeholder="Enter your password"
              boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
              name={"password"}
              value={formData.password}
            />
          </FormControl>
          <Text mt={"3%"} marginLeft={"22%"} textColor={"red"}>
            {error}
          </Text>
          <Button
            mt={4}
            background="#2A4ECB"
            color={"white"}
            _hover={{ bg: "#2a4fff", transform: "Scale(1.02)" }}
            boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
            width="full"
            marginRight={"2%"}
            type="submit"
          >
            Log In
          </Button>
        </form>
        <Text
          marginTop={"3%"}
          textColor={"white"}
          cursor={"pointer"}
          marginLeft={"20%"}
          _hover={{ color: "#2a4fff", textDecoration: "Underline" }}
          onClick={onOpen}
        >
          Don't have an account?
        </Text>
        <SignUpCompo isOpen={isOpen} onClose={onClose} users={users} />
      </Box>
    </Center>
  );
}

LogInSc.propTypes = {
  setToken: PropTypes.func.isRequired,
};
export default LogInSc;
