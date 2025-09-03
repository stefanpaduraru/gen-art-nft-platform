import React from "react";
import { Grid } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { InfoOutlined } from "@mui/icons-material";

import { ExtendedProject } from "../../../../../types/project";
import { Web3ProjectDetails } from "../../../../../types/web3Project";
import ContractValueInput from "./ContractValueInput";
import RowTitle from "./RowTitle";
import GridItem from "./GridItem";
import { TOKEN_PRICE_PER_TOKEN_IN_ETH } from "../../../../../constants/text";
import { ethers } from "ethers";

type Props = {
  project: ExtendedProject;
  testnetProjectDetails?: Web3ProjectDetails;
  mainnetProjectDetails?: Web3ProjectDetails;

  updatePricePerTokenInWei?: (value: string | number) => void;
  updateMaxIterations?: (value: string | number) => void;
  updateMaxTokensPerAddress?: (value: string | number) => void;
  updateLicense?: (value: string | number) => void;
  updateBaseURI?: (value: string | number) => void;
};

const ChainProjectEdiTokenDetails = ({
  project,
  testnetProjectDetails,
  mainnetProjectDetails,
  updatePricePerTokenInWei,
  updateMaxIterations,
  updateMaxTokensPerAddress,
  updateLicense,
  updateBaseURI,
}: Props) => {
  const chainProject = mainnetProjectDetails || testnetProjectDetails;
  const prevState = !!mainnetProjectDetails ? project.testnetProject : project;
  const updatePricePerTokenInETH = (priceInETH: number | string) => {
    const priceInWei = ethers.utils
      .parseEther((priceInETH as string) || "0")
      .toString();
    if (updatePricePerTokenInWei) {
      updatePricePerTokenInWei(priceInWei);
    }
  };

  const syncTooltipText = "Sync to contract";
  const infoIcon = (
    <InfoOutlined color="secondary" sx={{ ml: 2, mt: 2, mr: 2.2 }} />
  );
  const pricePerTokenInETH = ethers.utils.formatEther(
    prevState?.pricePerTokenInWei || 0
  );
  const newPricePerTokenInETH = ethers.utils.formatEther(
    chainProject?.pricePerTokenInWei || 0
  );
  const infoText = !chainProject?.locked
    ? project.isMainnet
      ? "Original value from the testnet project"
      : "Original value from the project template"
    : "The project is locked, no further editing is possible.";
  return (
    <>
      {chainProject && (
        <Grid container>
          <RowTitle text={`${TOKEN_PRICE_PER_TOKEN_IN_ETH}: `} />
          <GridItem>
            <ContractValueInput
              placeholder={TOKEN_PRICE_PER_TOKEN_IN_ETH}
              initialValue={pricePerTokenInETH}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="pricePerTokenInETH"
              initialValue={newPricePerTokenInETH}
              callback={updatePricePerTokenInETH}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={"Max Iterations:"} />
          <GridItem>
            <ContractValueInput
              placeholder="Max Iterations"
              initialValue={prevState?.maxIterations || 0}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Max Iterations"
              initialValue={chainProject?.maxIterations || 0}
              callback={updateMaxIterations}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={"Max Tokens Per Address:"} />
          <GridItem>
            <ContractValueInput
              placeholder="Max Tokens Per Address"
              initialValue={prevState?.maxTokensPerAddress || 0}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Max Tokens Per Address"
              initialValue={chainProject?.maxTokensPerAddress || 0}
              callback={updateMaxTokensPerAddress}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={"License:"} />
          <GridItem>
            <ContractValueInput
              placeholder="License"
              initialValue={prevState?.license || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="License"
              initialValue={chainProject?.license || ""}
              callback={updateLicense}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={"Token URI:"} />
          <GridItem>
            <ContractValueInput
              placeholder="Token URI"
              initialValue={prevState?.baseURI || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Token URI"
              initialValue={chainProject?.baseURI || ""}
              callback={updateBaseURI}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default ChainProjectEdiTokenDetails;
