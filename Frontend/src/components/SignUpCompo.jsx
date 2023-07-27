import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  ModalOverlay,
  Divider,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

function SignUpCompo({ onClose, isOpen, users }) {
  const [formData, setformData] = useState({
    // This useState variable creats and initialize it to null values
    user_name: "",
    emailid: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    // Handle submit fucntion is an asynchronous which validates user input as well as makes a post request to User table
    e.preventDefault();

    const response = await axios.post(
      // Post request to user table from backend database
      "http://127.0.0.1:8000/kanban/auth/",
      formData
    );
    if (response.status === 200) {
      alert("Account created");
      onClose();
    } else {
      alert("user already exists in our system");
    }
  };

  const handleChange = (e) => {
    //  Handlechange fucntion will take input from form and append it toabove useState variable
    const { name, value } = e.target;
    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  return (
    <Modal
      // A modal is a component which appears on screen on any event
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent bg="gray.900" border={"1px solid white"}>
        <ModalHeader marginLeft={"35%"}>
          <Image // Image tag is used to show the company logo or kanban board in this reference
            src="src\assets\icooo.ico"
            width={"40%"}
            _hover={{ transform: "Scale(1.03)" }}
            onClick={() => {
              window.location.reload(true);
            }}
          />
        </ModalHeader>

        <ModalBody pb={6}>
          <Divider
            borderWidth={"2px"}
            borderStyle={"solid"}
            borderColor={"gray"}
            borderRadius={10}
          />
          <form
            onSubmit={handleSubmit} // Passed to handle submit on Submit
          >
            <FormControl marginTop={"3%"} isRequired>
              <FormLabel textColor={"whatsapp.100"}>User Name</FormLabel>
              <Input
                type="text"
                textColor={"whiteAlpha.800"}
                placeholder="Phil Mackensey"
                boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
                onChange={handleChange}
                name={"user_name"}
                vaue={formData.user_name}
              />

              <FormLabel marginTop={"3%"} textColor={"whatsapp.100"}>
                Email Id
              </FormLabel>
              <Input
                type="email"
                textColor={"whiteAlpha.800"}
                placeholder="Email Id"
                boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
                onChange={handleChange}
                name={"emailid"}
                vaue={formData.emailid}
              />

              <FormLabel marginTop={"3%"} textColor={"whatsapp.100"}>
                Password
              </FormLabel>
              <Input
                type="password"
                textColor={"whiteAlpha.800"}
                placeholder="***********"
                boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
                onChange={handleChange}
                name={"password"}
                vaue={formData.password}
              />
              <Button
                mt={4}
                background="#2A4ECB"
                color={"white"}
                _hover={{ bg: "#2a4fff", transform: "Scale(1.02)" }}
                width="full"
                marginRight={"2%"}
                type="submit"
              >
                Sign Up
              </Button>
              <Text
                marginTop={"3%"}
                textColor={"white"}
                onClick={onClose}
                cursor={"pointer"}
                marginLeft={"30%"}
                _hover={{ color: "#2a4fff", textDecoration: "Underline" }}
              >
                Already Have an account?
              </Text>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignUpCompo;
