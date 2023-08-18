import { Card, Container, Spinner } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { LOTTERY} from "../const/addresses";
import EntryCard from "./EntryCard";

export default function CurrentEntries() {
    const {
        contract
    } = useContract(LOTTERY);

    const {
        data: entries,
        isLoading: entriesLoading
    } = useContractRead(contract, "getPlayers");

    return (
        <Container py={8}>
            {!entriesLoading ? (
                entries.map((entry: any, index: number) => (
                    <EntryCard
                        key={index}
                        walletAddress={entry}
                    />
                ))
            ) : (
                <Spinner />
            )}
        </Container>
    )
}