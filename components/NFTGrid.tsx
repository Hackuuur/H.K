import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import {
  Box,
  Image,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import NFT from "./NFT";
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText: string;
};

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found",
}: Props) {
  return (
    <SimpleGrid columns={3} spacing={3}  padding={1} my={3} >
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <Skeleton key={index} height={"312px"} width={"100%"} />
        ))
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
              key={nft.metadata.id}
            >
              <NFT nft={nft} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFT nft={nft} />
            </div>
          )
        )
      ) : (
        <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontFamily="Arial, sans-serif"
          textAlign="center"
          flexDirection="column"
         >
          <Image
            src="https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
            borderRadius={"lg"}
            alt="404 Image"
            mb={8}
            mt={9}
            px={10}
          />
          <Box>
            <Heading as="h1" size="2xl" mb={4} fontWeight="bold">
              Oops!
            </Heading>
            <Text fontSize="lg" fontWeight="medium" mb={6}>
              We are sorry, {emptyText}
            </Text>
            <Text fontSize="sm">
              Please check the Sell section or Reload the Page
              <br />
              <Link href={`/buy`}>homepage</Link>
            </Text>
          </Box>
        </Box> 
        </>
      )}
    </SimpleGrid>
  );
}
