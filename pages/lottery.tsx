import React, { useState } from "react"; // Import React and useState
import {
  IconButton,
  Flex,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { LOTTERY } from "../const/addresses";
import LotteryStatus from "../components/raffleStatus";
import { ethers } from "ethers";
import PrizeNFT from "../components/PrizeNFT";
import CurrentEntries from "../components/CurrentEntries";

const Lottery = () => {
  const address = useAddress();
  const { contract } = useContract(LOTTERY);
  const { data: lotteryStatus } = useContractRead(contract, "lotteryStatus");
  const { data: ticketCost, isLoading: ticketCostLoading } = useContractRead(
    contract,
    "ticketCost"
  );
  const ticketCostInEther = ticketCost
    ? ethers.utils.formatEther(ticketCost)
    : "0";

  const { data: totalEntries, isLoading: totalEntriesLoading } = useContractRead(
    contract,
    "totalEntries"
  );
  const [count, setCount] = useState(1); // Use useState correctly
  const ticketCostSubmit = parseFloat(ticketCostInEther) * count;

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };




  return (
    <Container maxW={"1440px"} p={["4px", "20px"]}>
      <SimpleGrid columns={[1, 2]} spacing={4} minH={"60vh"}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          {lotteryStatus ? (
            <PrizeNFT />
          ) : (
            <MediaRenderer
              src={
                "https://t4.ftcdn.net/jpg/05/98/25/29/360_F_598252904_8pmtIbgRSw5EO2BE4HxTPSxbnoY7mU4B.jpg"
              }
              width="100%"
              height="100%"
            />
          )}
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} p={"5%"}>
          <Stack spacing={10}>
            <Box>
              <Text fontSize={"xl"}>Raffle App</Text>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                Buy a ticket to win the NFT Prize!
              </Text>
            </Box>

            <Text fontSize={"xl"}>
              Buy entries for a chance to win the NFT! Winner will be selected
              and transferred the NFT. The more entries the higher chance you
              have of winning the prize.
            </Text>

            <LotteryStatus lotteryStatus={lotteryStatus} />
            {!ticketCostLoading && (
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Cost Per Ticket: {ticketCostInEther} MATIC
              </Text>
            )}
            {address ? (
              <Flex flexDirection={["column", "row"]}>
                <Flex flexDirection={"row"} w={["100%", "25%"]} mr={"40px"} alignItems="center">
                  <IconButton
                    icon={<MinusIcon />}
                    aria-label="Decrease"
                    onClick={decreaseCount}
                    size="sm"
                    isDisabled={count === 0}
                    colorScheme="teal"
                  />
                  <span style={{ padding: "0 10px" }}>{count}</span>
                  <IconButton
                    icon={<AddIcon />}
                    aria-label="Increase"
                    onClick={increaseCount}
                    size="sm"
                    colorScheme="teal"
                  />
                </Flex>

                <Web3Button
                  contractAddress={LOTTERY}
                  action={(contract) =>
                    contract.call("buyTicket", [count], {
                      value: ethers.utils.parseEther(
                        ticketCostSubmit.toString()
                      ),
                    })
                  }
                  isDisabled={!lotteryStatus}
                  
                >{`Buy Ticket(s)`}</Web3Button>
              </Flex>
            ) : (
              <Text>Connect wallet to buy ticket.</Text>
            )}
            {!totalEntriesLoading && (
              <Text>Total Entries: {totalEntries.toString()}</Text>
            )}
          </Stack>
        </Flex>
      </SimpleGrid>
      <Stack mt={"40px"} textAlign={"center"}>
        <Text fontSize={"xl"}>Current Raffle Participants:</Text>
        <CurrentEntries />
      </Stack>
    </Container>
  );
};

export default Lottery;
