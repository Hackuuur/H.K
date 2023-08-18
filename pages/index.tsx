import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Container,
  Image,
  useBreakpointValue,
  SimpleGrid,
  StatLabel,
  StatNumber,
  Stat,
  ScaleFade,
} from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import NextLink from "next/link";
import {
  useContract,
  useTotalCirculatingSupply,
  useTotalCount,
} from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Adjust the image size based on the screen size
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const imageSize = useBreakpointValue({ base: "100%", md: "50%" });
  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useTotalCount(contract);
  const { data: totalClaimed, isLoading: isTotalClaimedLoading } =
    useTotalCirculatingSupply(contract);
  let totalClaime: number | undefined = totalClaimed?.toNumber();
  let totalSupplyed: number | undefined = totalSupply?.toNumber();
  let difference = (totalSupplyed ?? 0) - (totalClaime ?? 0);
  return (
    <>
      <Box py={20}>
        <Container maxW="container.xl">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
          >
            {/* Hero Text */}
            <Box
              flex="1"
              p={useBreakpointValue({ base: 0, md: 8 })}
              textAlign={{ base: "center", md: "left" }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
                  Discover Unique NFTs
                </Heading>
              </motion.div>
              <Text fontSize="lg">
                Explore a world of unique digital collectibles and blockchain
                art. Buy, sell, and collect NFTs from various artists and
                creators.
              </Text>
              <NextLink href="/buy" passHref>
                <Button colorScheme="blue" mt={4}>
                  Discover
                </Button>
              </NextLink>
            </Box>

            {/* Hero Image */}

            <Image
              src="https://media.tenor.com/ex0ssYC5xdEAAAAd/metakongz-nft.gif"
              alt="NFT Hero"
              objectFit="cover"
              borderRadius="md"
              boxSize={imageSize}
              mt={{ base: 8, md: 0 }}
            />
          </Flex>
        </Container>
      </Box>

      <Box p={4} borderRadius="md">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mb={10}>
          <Stat textAlign="center">
            <StatLabel>Claimed</StatLabel>
            {!isTotalClaimedLoading ? (
              <StatNumber py={3}>{totalClaimed?.toNumber()}</StatNumber>
            ) : (
              <CircularProgress py={3} isIndeterminate color="black" />
            )}
          </Stat>
          <Stat textAlign="center">
            <StatLabel>Unclaimed</StatLabel>
            {!isTotalSupplyLoading ? (
              <StatNumber py={3}>{difference}</StatNumber>
            ) : (
              <CircularProgress py={3} isIndeterminate color="black" />
            )}
          </Stat>
          <Stat textAlign="center">
            <StatLabel>NFTs</StatLabel>
            {!isTotalSupplyLoading ? (
              <StatNumber py={3}>{totalSupply?.toNumber()}</StatNumber>
            ) : (
              <CircularProgress py={3} isIndeterminate color="black" />
            )}
          </Stat>
          {/* Add more Stat components for additional statistics */}
        </SimpleGrid>
      </Box>
      <Box py={20}>
        <Container maxW="container.xl">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
          >
            {/* About Text */}
            <Box flex="1" p={useBreakpointValue({ base: 0, md: 8 })}>
              <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
                About Us
              </Heading>
              <Text fontSize="lg">
                At MIranZO, we are passionate about revolutionizing the way art,
                creativity, and collectibles are experienced in the digital age.
                Our platform serves as a cutting-edge NFT marketplace,
                connecting artists, collectors, and enthusiasts from around the
                world. With an unwavering commitment to authenticity,
                transparency, and innovation, we provide a seamless environment
                for creators to showcase their unique digital artworks and for
                collectors to discover and acquire exceptional NFTs.
              </Text>
              <br />
              <Text>
                In addition to our NFT marketplace, we proudly introduce an
                exhilarating raffle experience. Our Raffle Zone brings a touch
                of excitement to the world of NFTs, offering participants the
                chance to win coveted digital treasures through a fair and
                engaging raffle system. Whether you are an artist looking to
                showcase your masterpieces or an enthusiast seeking exclusive
                NFTs, H.K is your gateway to an immersive digital art ecosystem.
              </Text>
              <br />
              <Text fontSize={"xl"} fontWeight={"Bold"}>
                Join us on this thrilling journey as we bridge the gap between
                creativity, technology, and community, bringing the future of
                digital art and collectibles to your fingertips.
              </Text>
            </Box>

            {/* About Image */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, type: "spring" }}
            >
              <ScaleFade initialScale={0.9} in>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRAmCedJ09ylWr8jxb3rjAk82KngGeHH7-Og&usqp=CAU"
                  alt="About Image"
                  objectFit="cover"
                  borderRadius="md"
                  boxSize={{ base: "100%", md: "80%" }} // Adjust the box size for different screen sizes
                  mt={{ base: 8, md: 0 }}
                />
              </ScaleFade>
            </motion.div>
          </Flex>
        </Container>
      </Box>
      <Box py={20}>
        <Container maxW="container.xl">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
          >
            {/* Feature Image */}
            <Image
              src="data:image/png;base64,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"
              alt="Feature Image"
              objectFit="cover"
              borderRadius="md"
              boxSize="300px"
              mb={{ base: 8, md: 0 }}
            />

            {/* Feature Text */}
            <Box flex="1" p={useBreakpointValue({ base: 0, md: 8 })}>
              <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
                Our Features
              </Heading>
              <br />
              <Text fontSize={"25px"} fontWeight={"Bold"}>Seamless Experience:</Text>
<Text fontSize="lg">
  <Text as="u">User-Friendly Interface&rsquo;s:</Text> Our intuitive and sleek interface ensures that you have a seamless browsing, buying, and participating experience. Effortlessly navigate between NFTs and raffles, and enjoy a platform designed with your convenience in mind.
</Text>
<br/>
<Text fontSize={"lg"}>
  <Text as="u">Secure Transactions:</Text> Your security is our top priority. Our platform employs cutting-edge encryption and blockchain technology to safeguard your transactions, ensuring that your NFT purchases and raffle entries are conducted with utmost security.
</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
