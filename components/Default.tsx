import { Box,Image,Heading,Text,Link} from "@chakra-ui/react"

import React from "react"
type Props={
    emptyText : String;
}
export const Default = ({ emptyText }: Props) => {
    
    return (
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
  )
}
