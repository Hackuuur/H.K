import { Text, Image, Box, Flex, Badge, theme, Skeleton, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { NFT } from "@thirdweb-dev/sdk";
import { 
  MARKETPLACE_ADDRESS, 
  NFT_COLLECTION_ADDRESS 
} from "../const/addresses";
import { ThirdwebNftMedia, useContract, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { Spinner } from '@chakra-ui/react'
type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const {contract: marketplace,isLoading:loadingMarketplace} = useContract(MARKETPLACE_ADDRESS,"marketplace-v3");
  const cardWidth = useBreakpointValue({ base: "100%", md: "200px" });
  const titleFontSize = useBreakpointValue({ base: "sm", md: "sm" });
  
  const { data: directListing,isLoading: loadingDirectListing} = useValidDirectListings(marketplace, {tokenContract: NFT_COLLECTION_ADDRESS,tokenId:nft.metadata.id});
  return (
    <Box
      w={cardWidth}
      borderRadius="md"
      borderWidth="1px"
      overflow="hidden"
      boxShadow="lg"
      bg="white.500"
      my="9"
      // display={["none", "none", "flex", "flex"]}
   
     
      _hover={{ boxShadow: `0px 6px 25px ${theme.colors.gray[400]}` }}
    >
     {isSmallScreen ? (
      <>
        <ThirdwebNftMedia metadata={nft.metadata} width={cardWidth} height="150px" />
        <Box p="6">
        <Text fontSize={titleFontSize} color={"darkgray"}>
              Token ID #{nft.metadata.id}
            </Text>
        </Box>
        </>
      ) : (
        <>
          <ThirdwebNftMedia metadata={nft.metadata} width={cardWidth} height="150px" />
          <Box p="6">
            <Text fontSize={titleFontSize} color={"darkgray"}>
              Token ID #{nft.metadata.id}
            </Text>
            <Text fontWeight={"bold"}>{nft.metadata.name}</Text>
            <Flex justify="space-between" alignItems="center">
              {loadingMarketplace || loadingDirectListing ? (
                <Skeleton></Skeleton>
              ) : directListing && directListing[0] ? (
                <Badge colorScheme="green" variant="outline">
                  {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
                </Badge>
              ) : (
                <Badge colorScheme="green" fontSize={titleFontSize} variant="outline">
                  Not Listed
                </Badge>
              )}
              <Text pl={2} fontSize="sm">
                Owner : {nft.owner.slice(0, 6)}...{nft.owner.slice(-3)}
              </Text>
            </Flex>
            </Box>
            </>
       )}
    </Box>
  );
}





