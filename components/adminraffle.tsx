import { Box, Card, Input, Stack, Text } from "@chakra-ui/react";
import LotteryStatus from "./raffleStatus";
import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { LOTTERY } from "../const/addresses";
import { useState } from "react";

export default function AdminLotteryStatusCard() {
    const {
        contract
    } = useContract(LOTTERY);

    const {
        data: lotteryStatus
    } = useContractRead(contract, "lotteryStatus");

    const [contractAddress, setContractAddress] = useState("");
    const [tokenId, setTokenId] = useState(0);

    function reset() {
        setContractAddress("");
        setTokenId(0);
    };
    
    return (
        <Box
            paddingX={4}
            mt={4}
            
            // mr={{ base: 0, sm: 2, md: 4 }} // Adjust the margins based on your design
            w={{ base: "100%", sm: "50%", md: "25%" }} // Adjust the widths based on your design
        >
            <Card>
                <Text mx={2} fontWeight="bold" mb={4} fontSize="xl">Raffle Status</Text>
                <LotteryStatus
                    lotteryStatus={lotteryStatus}
                />
                {!lotteryStatus ? (
                    <Stack spacing={4} my={4} mx={2}>
                        <Box>
                            <Text>Prize Contract Address:</Text>
                            <Input
                                placeholder="0x00000"
                                type="text"
                                value={contractAddress}
                                onChange={(e) => setContractAddress(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Text>Prize Token ID:</Text>
                            <Input
                                placeholder="0"
                                type="number"
                                value={tokenId}
                                onChange={(e) => setTokenId(parseInt(e.target.value))}
                            />
                        </Box>
                        <Web3Button
                            contractAddress={LOTTERY}
                            action={(contract) => contract.call(
                                "startLottery",
                                [
                                    contractAddress,
                                    tokenId
                                ]
                            )}
                            onSuccess={reset}
                        >
                            Start Raffle
                        </Web3Button>
                    </Stack>
                ) : (
                    <Stack spacing={4} mt={4}>
                        <Web3Button
                            contractAddress={LOTTERY}
                            action={(contract) => contract.call(
                                "endLottery"
                            )}
                        >
                            End Raffle
                        </Web3Button>
                    </Stack>
                )}
            </Card>
        </Box>
    )
}
