import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useOwnedNFTs,
    usePaperWalletUserEmail,
  } from "@thirdweb-dev/react";
  import React, { useState } from "react";
  import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
  import type { NFT as NFTType } from "@thirdweb-dev/sdk";
  import NFTGrid from "../components/NFTGrid";
  import SaleInfo from "../components/SaleInfo";

  export default function Sell() {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const address = useAddress();
    const email = usePaperWalletUserEmail();
    const {data,isLoading} = useOwnedNFTs(contract,address);
    const [selectedNFT, setSelectedNFT] = useState<NFTType>();
    
    return (
      <Container maxW={"1200px"} p={5}>
        <Heading textAlign={"center"}>Sell NFT</Heading>
        <Text textAlign={"center"} > Select NFT From Below which You want to Sell </Text>
        {!selectedNFT ? (
          <NFTGrid 
          data={data}
          isLoading={isLoading}
          overrideOnclickBehavior={(nft) => {
            setSelectedNFT(nft);

          }}
          emptyText={"You don't have Any NFTs yet From this collection"}
          />
        ):(
          <Flex justifyContent={"center"} my={10}>
            <Card w={"75%"}>
              <SimpleGrid columns={2} spacing={10} p={5}>
                <ThirdwebNftMedia
                  metadata={selectedNFT.metadata}
                  width="100%"
                  height="100%"
                />
                <Stack>
                  <Flex justifyContent={"right"}>
                    <Button
                      onClick={()=>{
                        setSelectedNFT(undefined);
                      }}
                    >x</Button>
                  </Flex>
                  <Heading>{selectedNFT.metadata.name}</Heading>
                  <SaleInfo nft={selectedNFT}></SaleInfo>
                </Stack>
              </SimpleGrid>
            </Card>

          </Flex>
        )}
      </Container>
    )
    
  }