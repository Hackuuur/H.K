import {
  Avatar,
  Box,
  Flex,
  Heading,
  Link,
  Text,
  Container,
  IconButton,
  useDisclosure,
  VStack,
  CloseButton,
} from "@chakra-ui/react";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { LOTTERY } from "../const/addresses";
import NextLink from "next/link";
import { useColorMode } from "@chakra-ui/react";

import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";
export function Navbar() {
  const address = useAddress();
  const { contract } = useContract(LOTTERY);
  const { data: admin, isLoading: isLoadingOwner } = useContractRead(
    contract,
    "admin"
  );
  const [display, changeDisplay] = useState("none");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container pt={"4px"} maxW={"full"}>
      <Box borderRadius="md" m={"auto"} py={"10px"} px={"40px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Link as={NextLink} href="/">
            <Heading>H.K</Heading>
          </Link>
          <Flex direction={"row"} display={["none", "none", "flex", "flex"]}>
            <Link as={NextLink} href="/buy" mx={2.5}>
              <Text>Buy</Text>
            </Link>
            <Link as={NextLink} href="/sell" mx={2.5}>
              <Text>Sell</Text>
            </Link>
            <Link as={NextLink} href="/Claim" mx={2.5}>
              <Text>Claim</Text>
            </Link>
            <Link as={NextLink} href="/lottery" mx={2.5}>
              <Text>Lottery</Text>
            </Link>
          </Flex>
          <Flex dir={"row"} alignItems={"center"}>
            <Box display={["none", "none", "flex", "flex"]}>
              <ConnectWallet />
              {address && (
                <Link as={NextLink} href={`/profile/${address}`}>
                  <Avatar
                    src="https://cdn.dribbble.com/userupload/6045565/file/original-eb30c1bd543cfa6fa93ee5beabf9a9fd.jpg?resize=752x564"
                    ml={"10px"}
                  />
                </Link>
              )}
            </Box>

            <IconButton
              mr="5"
              w={6}
              ml={3}
              h={6}
              p={5}
              onClick={toggleColorMode}
              aria-label={""}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
            {!isLoadingOwner && admin === address && (
              <Link href="/admin">
                <Text>Admin</Text>
              </Link>
            )}
            <IconButton
              aria-label="Open menu"
              size="lg"
              mr={2}
              icon={<HamburgerIcon />}
              display={["flex", "flex", "none", "none"]}
              onClick={() => changeDisplay("flex")}
            />
          </Flex>
        </Flex>
      </Box>
      <Flex display={["flex", "flex", "none", "none"]}>
      <Flex
        width={"100vw"}
        bgColor={"white"}
        color={"black"}
        zIndex={20}
        height={"100vh"}
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        display={display}
        
       >
        <Flex justify={"flex-end"}>
          <IconButton
            mt="2"
            mr="2"
            color="grey.500"
            size="lg"
            icon={<CloseIcon />}
            aria-label={"Close Button"}
            onClick={() => changeDisplay("none")}
          />
        </Flex>
        <Flex flexDir="column" align="center">
          <Link as={NextLink} href="/buy" mx={2.5} my={5}>
            <Text>Buy</Text>
          </Link>
          <Link as={NextLink} href="/sell" mx={2.5} my={5}>
            <Text>Sell</Text>
          </Link>
          <Link as={NextLink} href="/Claim" mx={2.5} my={5}>
            <Text>Claim</Text>
          </Link>
          <Link as={NextLink} href="/lottery" mx={2.5} my={5}>
            <Text>Lottery</Text>
          </Link>
          <Box><ConnectWallet/>
          {address && (
            <Link as={NextLink} href={`/profile/${address}`}>
              <Avatar
                src="https://cdn.dribbble.com/userupload/6045565/file/original-eb30c1bd543cfa6fa93ee5beabf9a9fd.jpg?resize=752x564"
                ml={"10px"}
              />
            </Link>
          )}</Box>
          
        </Flex>
      </Flex>
      </Flex>
    </Container>
  );
}
