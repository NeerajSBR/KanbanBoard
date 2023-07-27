import {
  Box,
  Text,
  Button,
  Modal,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ListComponents from "../components/ListComponents";
import CreateCard from "./CreateCard";
import { SearchIcon, MoonIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

function KanbanDash() {
  // Kanban dash board only appears after sucessful login
  // const { state } = useLocation(); // This state is a react components to send params from previous navigation screens to another
  // const { empname, empid } = state; // From the above state we get empname and empid as a prop
  const navigate = useNavigate(); // useNavigate is another react router function ease navigations
  const [searchQuery, setSearchQuery] = useState(""); // Used to set an state hook for a search on change field

  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal props

  // const logouter = () => {
  //   // Logout button on click will trigger log outer and sucessfully logs out user
  // };

  const [data, setData] = useState({});

  useEffect(() => {
    // Function to retrieve data from sessionStorage
    const getDataFromSessionStorage = () => {
      const storedData = sessionStorage.getItem("token");
      // You can parse the data if it's stored as JSON, etc.
      // JSON.parse(storedData);
      setData(JSON.parse(storedData));
      console.log(data.user_name);
    };

    // Call the function to get data when the component mounts
    getDataFromSessionStorage();
  }, []);
  //const [darkmode, setDarkMode] = useState(false);

  return (
    <Box margin="6%">
      <MoonIcon
        onClick={() => setDarkMode(true)}
        borderRadius={"50%"}
        _hover={{ transform: "Scale(1.1)" }}
        cursor={"pointer"}
      />
      <Box display={"flex"}>
        <Text fontSize={"5xl"}>Kanban Board</Text>
        <Button
          marginTop={"1.5%"}
          marginLeft={"46%"}
          onClick={() => {
            sessionStorage.clear(), window.location.reload(true);
          }}
          fontSize={"18px"}
          _hover={{ bg: "gray.200", transform: "Scale(1.1)" }}
          boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
        >
          Log out
        </Button>
      </Box>
      <Text fontSize={"xl"} marginTop={"-7px"} marginLeft={"2px"}>
        {data.user_name}'s Tasks
      </Text>
      <Button
        marginTop={"5%"}
        background="#2A4ECB"
        color={"white"}
        _hover={{ bg: "#2a4fff", transform: "Scale(1.1)" }}
        onClick={onOpen}
        fontSize={"18px"}
        boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
      >
        Create
      </Button>
      <InputGroup
        mt="2%"
        maxW={"69%"}
        boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
        _hover={{ transform: "Scale(1.01)" }}
      >
        <InputRightElement
          pointerEvents={"none"}
          children={<SearchIcon />}
        ></InputRightElement>
        <Input
          type="text"
          placeholder="Search Cards"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <CreateCard onClose={onClose} />
      </Modal>

      <ListComponents search={searchQuery} reporter={data.empid} />
    </Box>
  );
}

export default KanbanDash;
