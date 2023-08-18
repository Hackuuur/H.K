import { Card,Text} from '@chakra-ui/react';
import React from 'react'
type Props={
  lotteryStatus:boolean;
  }

function RaffleStatus({lotteryStatus}:Props) {
    let backgroundColor = lotteryStatus ? "green.200":"red.200";
    let borderCOlor = lotteryStatus? "green.200":"red"; 
    let textCOlor = lotteryStatus? "green.200":"red"; 
  return (
    <Card mx={3} py={3}  textAlign={"center"} backgroundColor={backgroundColor} border={"1px solid"} borderColor={borderCOlor}>
        <Text fontSize={"sm"} color={textCOlor}>
            Raffle {lotteryStatus ? "open" : "closed"}
        </Text>
    </Card>
  )
}

export default RaffleStatus