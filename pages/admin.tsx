import {
  Heading,
  Container,
  Flex,
  Card,
  Stack,
  Divider,
} from "@chakra-ui/react";
import AdminRaffle from "../components/adminraffle";
import AdminTicket from "../components/TicketPrice";
import WithdrawBalance from "../components/WithdrawBalance";
import React from "react";

export default function Admin() {
  return (
    <Container maxW={"1440px"} py={8}>
      <Heading textAlign={"center"}>Admin Dashboard</Heading>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        marginRight={4}
        alignItems="stretch" // Adjust alignment for different screen sizes
        justifyContent={"center"}
      >
        <AdminRaffle />
        <Card
          p={4}
          mt={{ base: 4, md: 0 }} // Adjust margin-top for different screen sizes
          w={{ base: "100%", md: "25%" }} // Adjust width for different screen sizes
        >
          <Stack spacing={4}>
            <AdminTicket />
            <Divider />
            <WithdrawBalance />
          </Stack>
        </Card>
      </Flex>
    </Container>
  );
}
