import React from "react";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import {
  MediaRenderer,
  ThirdwebNftMedia,
  Web3Button,
  useActiveClaimConditionForWallet,
  useAddress,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  useTotalCount,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";

export default function NFTComponent() {
  const address = useAddress();
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useContractMetadata(contract);
  const { data: activeClaimPhase, isLoading: isActiveClaimPhaseLoading } =
    useActiveClaimConditionForWallet(contract, address);
  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useTotalCount(contract);
  const { data: totalClaimed, isLoading: isTotalClaimedLoading } =
    useTotalCirculatingSupply(contract);
  const maxClaim = parseInt(activeClaimPhase?.maxClaimablePerWallet || "0");

  return (
    <div className={styles.Container}>
      <div className={styles.main}>
        {!isContractMetadataLoading && contractMetadata && (
          <div className={styles.heroSection}>
            <div className={styles.collectionImage}>
              <MediaRenderer src={contractMetadata.image} />
            </div>
            <div>
              <h1>{contractMetadata.name}</h1>
              <p>{contractMetadata.descriptions}</p>
              {!isActiveClaimPhaseLoading ? (
                <div>
                  <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                  <p>
                    Price: {ethers.utils.formatUnits(activeClaimPhase?.price!)}
                  </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              {!isTotalSupplyLoading && !isTotalClaimedLoading ? (
                <p>
                  Claimed: {totalClaimed?.toNumber()} /{" "}
                  {totalSupply?.toNumber()}
                </p>
              ) : (
                <p>Loading...</p>
              )}
              <br />
              {address ? (
                <Web3Button
                  contractAddress={NFT_COLLECTION_ADDRESS}
                  action={(contract) => contract.erc721.claim(1)}
                >
                  {" "}
                  Claim Nft
                </Web3Button>
              ) : (
                <p> Connect Wallet First </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
