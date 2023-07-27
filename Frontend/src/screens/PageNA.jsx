import React from "react";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const PageNa = () => {
  // When users uses our domain or website name wih unattianable path they will be lead to this
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
      color="white"
      flexDirection="column"
    >
      <Heading size="4xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={6}>
        Page not found
      </Text>
      <Link
        as={RouterLink}
        to="/"
        color="blue.300"
        _hover={{ color: "blue.500" }}
      >
        Go back to Home
      </Link>
    </Flex>
  );
};

export default PageNa;
