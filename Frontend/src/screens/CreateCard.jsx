import {
  Text,
  Box,
  FormControl,
  Input,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  //VStack,
} from "@chakra-ui/react";
import axios from "axios"; // Axios is a react library which is used to make api calls with response and request
import React, { useEffect, useState } from "react";

function CreateCard({ onClose, reporter }) {
  const status = ["Unattended", "Attending", "Closed"]; // A pre determined list of elements to map from during select
  const priority = ["1-High", "2-Medium", "3-Low"];
  const points = [1, 2, 3, 4, 5];

  const [formData, setformData] = useState({
    // A useState variable where all it's values are initially pre determined to null
    card_id: "",
    card_name: "",
    assignee: "",
    priority: "",
    task_desc: "",
    start_date: "2023-07-23",
    due_date: "",
    updated_at: "",
    story_point: "",
    progress: "",
    reporter: reporter,
  });

  const [formData2, setformData2] = useState({
    committ_id: "",
    committ_msg: "Task Created",
    updated_at: "",
    card: "",
    user: "",
  });

  // const handleCommit = async (e) => {
  //   const response2 = await axios.get(`http://127.0.0.1:8000/kanban/cards/`);

  //   const ress2 = response2.data.filter(
  //     (card) => card.card_name === formData.card_name
  //   );
  //   setformData2({
  //     card: ress2[0].card_id,
  //     user: reporter,
  //   });
  //   const response = await axios.post(
  //     "http://127.0.0.1:8000/kanban/commits/", // Will make a post requst to cards table
  //     {card: ress2[0].card_id, user: reporter}
  //   );
  //   console.log(formData2);
  //   //window.location.reload(true);
  // };

  const handleChanger = async (e) => {
    // Handle Changer function will get form data from below input and assign it to respective name:value
    const { name, value } = e.target;
    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    // Upon form submission will be triggere and will make response
    e.preventDefault();
    const response = await axios.post(
      "http://127.0.0.1:8000/kanban/cards/", // Will make a post requst to cards table
      formData
    );

    window.location.reload(true);
  };

  return (
    <>
      <ModalOverlay backdropFilter="blur(6px)" />

      <ModalContent>
        <ModalHeader>Create a Card</ModalHeader>
        <ModalCloseButton size={"lg"} />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <Input
                placeholder="Give Title"
                onChange={handleChanger}
                name={"card_name"}
                value={formData.card_name}
              />
              <Box display={"flex"}>
                <Box marginTop={"2%"}>
                  Description
                  <Textarea
                    marginTop={"5%"}
                    placeholder={"Give a Description"}
                    height={"150px"}
                    onChange={handleChanger}
                    name={"task_desc"}
                    value={formData.task_desc}
                  />
                </Box>
                <Box marginLeft={"5%"} marginTop={"2%"}>
                  <Text>Status</Text>
                  <Select
                    marginTop={"5%"}
                    width={"100%"}
                    onChange={handleChanger}
                    placeholder="Click"
                    name={"progress"}
                    value={formData.progress}
                  >
                    {status.map((e, i) => (
                      <option key={i} value={++i}>
                        {e}
                      </option>
                    ))}
                  </Select>
                  <Text>Priority</Text>
                  <Select
                    marginTop={"5%"}
                    width={"100%"}
                    placeholder={"Click"}
                    onChange={handleChanger}
                    name={"priority"}
                    value={formData.priority}
                  >
                    {priority.map((e, i) => (
                      <option key={i} value={i + 1}>
                        {e}
                      </option>
                    ))}
                  </Select>
                  <Text>Story Points</Text>
                  <Select
                    marginTop={"5%"}
                    width={"100%"}
                    placeholder={"Click"}
                    onChange={handleChanger}
                    name={"story_point"}
                    value={formData.story_point}
                  >
                    {points.map((e, i) => (
                      <option key={i} value={i + 1}>
                        {e}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box display={"flex"} marginTop={"2%"}>
                <Box>
                  Assignee
                  <Input
                    type="number"
                    width={"50%"}
                    marginLeft={"3%"}
                    placeholder="2001"
                    onChange={handleChanger}
                    name={"assignee"}
                    value={formData.assignee}
                  />
                </Box>
                <Text>
                  Reporter
                  <Input
                    type="number"
                    marginLeft={"3%"}
                    placeholder={2002}
                    width={"50%"}
                  />
                </Text>
                <Text>
                  Due-Date
                  <Input
                    type="date"
                    marginLeft={"3%"}
                    placeholder="00-00-00"
                    width={"60%"}
                    onChange={handleChanger}
                    name={"due_date"}
                    value={formData.due_date}
                  />
                </Text>
              </Box>
              <Box
                marginTop={"5%"}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                <Button
                  background="#2A4ECB"
                  color={"white"}
                  _hover={{ bg: "#2a4fff", transform: "Scale(1.1)" }}
                  boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
                  mr={3}
                  type={"submit"}
                  size={"lg"}
                  onClick={onClose}
                >
                  Save
                </Button>
                <Button
                  onClick={onClose}
                  _hover={{ transform: "Scale(1.1)" }}
                  boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
                  size={"lg"}
                >
                  Cancel
                </Button>
              </Box>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </>
  );
}

export default CreateCard;
