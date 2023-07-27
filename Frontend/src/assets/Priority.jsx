import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

function Priority({ priorityvar }) {
  //priority jsx will return Chevron chakra component based on priority
  if (priorityvar == 3) {
    return (
      <>
        <ChevronDownIcon width={6} height={6} color={"#30ad53"} />
        <Text>Low</Text>
      </>
    );
  } else if (priorityvar == 2) {
    return (
      <>
        <ChevronUpIcon width={6} height={6} color={"blue"} />
        <Text>Med</Text>
      </>
    );
  } else if (priorityvar < 2) {
    return (
      <>
        <ChevronUpIcon width={6} height={6} color={"red"} />
        <Text>High</Text>
      </>
    );
  }
}

export default Priority;
