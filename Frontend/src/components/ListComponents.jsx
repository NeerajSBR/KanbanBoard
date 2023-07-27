import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import CardViewer from "./CardViewer";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

function ListComponents({ search, reporter }) {
  // List component will Display list (Progress bar) and all its components
  const [asords, setasords] = useState(false);
  const [lists, setlists] = useState([]); // List useState variable
  const [count, setCount] = useState([]); // This api is specifically called to show count in each list

  const fetchData = async () => {
    // FetchData fucntion calls 2 apis
    const response = await fetch(`http://127.0.0.1:8000/kanban/lists`); // Api from lists table backend django
    const responder = await fetch(`http://127.0.0.1:8000/kanban/cards`); //  Api from cards table
    const resultJson = await response.json();
    const resulterJson = await responder.json();
    setlists(resultJson);
    setCount(resulterJson);
  };
  useEffect(() => {
    // useEffect triggers fetchData fucntion on relaod
    fetchData();
  }, []);

  const onDes = () => {
    setasords(false);
  };

  const onAsc = () => {
    setasords(true);
  };

  return (
    <SimpleGrid display={"flex"} marginTop={"2%"} spacing={"3%"}>
      {lists.map(
        (
          list,
          index // Mapsfrom the lists useState variable
        ) => (
          <div key={index}>
            <Text fontSize={"xl"}>
              {list.list_name} (
              {
                count.filter((card) => card.progress === list.list_id).length //Is used to map counts of each list
              }
              )
            </Text>

            <Box
              marginTop={"20px"}
              width={"103%"}
              height={"200%"}
              background={"#eeeeee"}
              _hover={{
                boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.1)",
              }}
              borderRadius={"2%"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <ChevronDownIcon
                  width={8}
                  height={8}
                  onClick={onDes}
                  cursor={"pointer"}
                  borderRadius={"30%"}
                  margin={"0.5%"}
                  _hover={{ transform: "Scale(1.1)", bg: "gray.200" }}
                />
                <ChevronUpIcon
                  width={8}
                  height={8}
                  onClick={onAsc}
                  cursor={"pointer"}
                  borderRadius={"30%"}
                  margin={"0.5%"}
                  _hover={{ transform: "Scale(1.1)", bg: "gray.200" }}
                />
              </Box>
              <CardViewer // Calls CardViewer component with proprs
                progresser={list.list_id}
                search={search}
                reporter={reporter}
                asords={asords}
              />
            </Box>
          </div>
        )
      )}
    </SimpleGrid>
  );
}

export default ListComponents;
