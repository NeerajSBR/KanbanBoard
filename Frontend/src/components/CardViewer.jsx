import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Priority from "../assets/Priority";
import ViewEditCard from "../screens/ViewEditCard";

const CardViewer = ({ progresser, search, reporter, asords }) => {
  //Card viewer component will render all components from card table as a list
  const [selectedcard, setselect] = useState({}); // To pass as a prop to Card modal
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal props
  const [cards, setcards] = useState([]); // Card api initiation

  const fetchData = async () => {
    // Fetching from Backend Django API
    const response = await fetch("http://127.0.0.1:8000/kanban/cards");
    const resultJson = await response.json();
    setcards(resultJson);
  };
  useEffect(() => {
    // Will Trigger fetchData function as a useEffect
    fetchData();
  }, []);

  const filteredData = cards.filter(
    (
      item // This is retrieved to filter and show only relevant cards
    ) => item.card_name.toLowerCase().includes(search.toLowerCase())
  );

  const columner = filteredData // It filters cards based on status (progress_id) in each card
    .filter((card) => card.progress === progresser);
  // This will filter and show cards based on priority

  const column = columner.sort((a, b) => {
    if (asords === false) {
      return a.priority - b.priority;
    } else if (asords === true) {
      return b.priority - a.priority;
    }
  });
  return (
    <Box paddingLeft={"3%"} width={"291px"} paddingTop={"3%"}>
      {column.map(
        (
          card // Map function maps each element in an array
        ) => (
          <Box
            key={card.card_id}
            paddingLeft={"3%"}
            background={"white"}
            borderRadius={"3%"}
            _hover={{ transform: "scale(1.05)" }}
            marginTop={"5%"}
            boxShadow={"0px 4px 10px rgba(0, 0, 255, 0.1)"}
            cursor={"pointer"}
            onClick={() => {
              // This arrow function used to call 2 functions
              setselect(card);
              onOpen();
            }}
          >
            <Text fontSize={"2xl"}>{card.card_name}</Text>
            <Text paddingTop={"2%"}>{card.task_desc}</Text>
            <Box
              paddingBottom={"3%"}
              display={"flex"}
              justifyContent={"flex-end"}
              marginRight={"5%"}
            >
              <Priority
                key={card.card_id}
                priorityvar={card.priority} //Componenet calls priority jsx file
              />

              <Text
                textAlign={"center"}
                marginLeft={"3"}
                width={"15%"}
                backgroundColor={"#eeeeee"}
                borderRadius={"45%"}
              >
                {card.story_point}
              </Text>
            </Box>
          </Box>
        )
      )}
      <ViewEditCard // Componets with props triggers a modal
        key={selectedcard.card_id}
        card_id={selectedcard.card_id}
        card_name={selectedcard.card_name}
        task_desc={selectedcard.task_desc}
        sdate={selectedcard.start_date}
        ddate={selectedcard.due_date}
        updated={selectedcard.updated_at}
        story={selectedcard.story_point}
        status={selectedcard.progress}
        reporter={selectedcard.reporter}
        assignee={selectedcard.assignee}
        priority={selectedcard.priority}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default CardViewer;
