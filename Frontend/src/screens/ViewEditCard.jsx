import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Button,
  Input,
  Box,
  Divider,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import {
  DeleteIcon,
  EditIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

function ViewEditCard({
  onClose,
  isOpen,
  card_name,
  task_desc,
  card_id,
  sdate,
  ddate,
  story,
  status,
  reporter,
  assignee,
  priority,
}) {
  const statuss = ["Unattended", "Attending", "Closed"]; // Hard coded list for select options
  const priorityy = ["High", "Medium", "Low"];
  const points = [1, 2, 3, 4, 5];
  const cardURL = `http://127.0.0.1:8000/kanban/cards/${card_id}/`; // Url used for GET and POST so made it a variable

  const handleChanger = async (e) => {
    // Handle changer will take input from form below and append to formData
    const { name, value } = e.target;
    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();
    const response = await axios.put(cardURL, formData);
    console.log(response); // Handle the response as needed
    window.location.reload(true);
  };

  const [formData, setformData] = useState({
    // Pre determining formData to make POST easier instead of PATCH
    card_id: card_id,
    card_name: card_name,
    assignee: assignee,
    priority: priority,
    task_desc: task_desc,
    start_date: sdate,
    due_date: ddate,
    updated_at: "",
    story_point: story,
    progress: status,
    reporter: reporter,
  });

  const [isEditable, setIsEditable] = useState(false); // A useful state manager which shows modal based on user requirements

  const handleEdit = (closed) => {
    // Handle Edit will switch the is editable variable between button clicks
    if (closed == "closed") {
      setIsEditable(false);
    } else {
      setIsEditable(!isEditable);
    }
  };

  const handleDelete = async () => {
    // Handle Delete will only delete a card if it's status (progressID) is closed
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      const reponse = await axios.delete(cardURL);
      window.location.reload(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        handleEdit("closed");
      }}
      size={"2xl"}
    >
      <ModalOverlay backdropFilter="blur(6px)" />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {!isEditable ? (
            <Box>
              <Text marginTop={"3%"} fontSize={"2xl"} as={"b"}>
                {card_name}
              </Text>
              <Text marginTop={"2%"} fontSize={"xl"}>
                {task_desc}
              </Text>
              <Divider
                marginTop={"5%"}
                borderWidth={"2px"}
                borderStyle={"solid"}
                borderColor={"gray"}
                borderRadius={10}
              />
              <Box
                marginTop={"5%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Text>Reporter : {reporter}</Text>

                <Text>Assingee : {assignee}</Text>
              </Box>
              <Box
                marginTop={"2%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Text>Priority : {priorityy[--priority]}</Text>
                <Text marginLeft={"3%"}>Status : {statuss[--status]}</Text>
              </Box>
              <Box
                marginTop={"2%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Text>start date : {sdate}</Text>
                <Text marginLeft={"3%"}>due_date : {ddate}</Text>
              </Box>
              <Box marginTop={"3%"} display={"flex"} justifyContent={"center"}>
                <Text>Story point : {story}</Text>
              </Box>
              <Box
                marginTop={"3%"}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                {status === 2 ? (
                  <Button
                    bg={"red"}
                    color={"white"}
                    boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
                    _hover={{ bg: "red.600", transform: "Scale(1.1)" }}
                    onClick={handleDelete}
                    size={"lg"}
                  >
                    <DeleteIcon />
                  </Button>
                ) : (
                  <Button
                    justifyContent={"space-between"}
                    background="#2A4ECB"
                    color={"white"}
                    _hover={{ bg: "#2a4fff", transform: "Scale(1.1)" }}
                    boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
                    mr={3}
                    onClick={handleEdit}
                    size={"lg"}
                  >
                    <ArrowRightIcon />
                  </Button>
                )}
              </Box>
            </Box>
          ) : (
            <form onSubmit={handleSubmitt}>
              <Text marginTop={"2%"} fontSize={"2xl"} as={"b"}>
                {card_name}
              </Text>
              <Box display={"flex"}>
                <Box marginTop={"2%"}>
                  Description
                  <Input
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
                    placeholder="Click"
                    onChange={handleChanger}
                    name={"progress"}
                    value={formData.progress}
                  >
                    {statuss.map((e, i) => (
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
                    {priorityy.map((e, i) => (
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
                <Text>
                  Assignee
                  <Input
                    type="number"
                    marginLeft={"3%"}
                    placeholder={2001}
                    width={"50%"}
                    onChange={handleChanger}
                    name={"assignee"}
                    value={formData.assignee}
                  />
                </Text>
                <Text>
                  Reporter
                  <Input
                    type="number"
                    marginLeft={"3%"}
                    placeholder={2002}
                    width={"50%"}
                    value={formData.reporter}
                  />
                </Text>
                <Text>
                  Due-Date
                  <Input
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
                marginTop={"3%"}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                <Button
                  background="#2A4ECB"
                  color={"white"}
                  mr={3}
                  onClick={handleEdit}
                  _hover={{ bg: "#2a4fff", transform: "Scale(1.1)" }}
                  boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
                  size={"lg"}
                >
                  <ArrowLeftIcon />
                </Button>
                <Button
                  background="gray.200"
                  _hover={{ bg: "gray.300", transform: "Scale(1.1)" }}
                  boxShadow={"7px 7px 10px rgba(0, 0, 255, 0.1)"}
                  mr={3}
                  type="submit"
                  size={"lg"}
                >
                  <EditIcon />
                </Button>
              </Box>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ViewEditCard;
