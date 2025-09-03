import { Link } from "@mui/material";
import React from "react";
import FAQContent from "../../../../Common/FAQ/FAQContent";

const FaqData = [
  {
    title: "What is Mintoria?",
    content: (
      <>
        <FAQContent
          key={"a11"}
          text={`
          Mintoria is a generative art community hosted on the blockchain that
          helps in building the next iteration of art. Our focus is on storing
          immutably and generating on-demand generative content.`}
        />
        <FAQContent
          key={"a12"}
          text={`
          The artist's and collectors' journeys are forever intertwined, as the
          generating of the content is a partnership: the artist establishes the
          styles and rules of the content, while the collector introduces
          entropy through minting. Each output is different, wrapped in an
          ERC721 token and sent to your ETH account.`}
        />
      </>
    ),
  },
  {
    title: "What is Mintoria Selected?",
    content: (
      <>
        <FAQContent
          key={"a21"}
          text={`Selected is Mintoria's gallery of curated projects. The projects represent our vision and our participation in the evolution of generative art.`}
        />
        <FAQContent
          key={"a22"}
          text={`Projects are grouped in series that are released quartlerly.`}
        />
      </>
    ),
  },
  {
    title: "What is Mintoria Open World",
    content: (
      <>
        <FAQContent
          key={"a31"}
          text={`Open World was designed for artists that do not want to submit their project through the curation process.
      This allows artists to release their art to the world as quickly as possible and be part of our community.`}
        />
        <FAQContent
          key={"a32"}
          text={`Requirements are very relaxed compared to the curated projects, and focus more on the integrity and correctness of the work.`}
        />
      </>
    ),
  },

  {
    title: "How does project submission work?",
    content: (
      <>
        <FAQContent
          key={"a41"}
          text={`Any artist can add a project on the platform at any time, by creating a project template,
      and when the project is ready to be moved to the testnet, the artist can submit a transfer request.
      Depending on the gallery, our staff will review the project and decide if it can move forward or if changes are required from the artist.
      If the project is accepted, the transfer request will be approved and the project will be deployed to the Rinkeby testnet.
      The artist will have to update the on-chain project and fill in all the info from the template and mint 30-50 tokens to ensure all outputs are correct.
      Once the artist confirms the testnet project is producing the expected outputs, he'll need to submit a request for transfer to mainnet.
      The artist will have to update the info on the main net through transactions, and when the project is activated and unpaused, collectors can start minting. 
      `}
        />
      </>
    ),
  },

  {
    title: "Are there any fees?",
    content: (
      <>
        <FAQContent
          key={"a50"}
          text={
            <b>
              The first 15 projects published on the platform in each gallery
              will be exempt from paying any fees.
            </b>
          }
        />
        <FAQContent
          key={"a51"}
          text={`The Mintoria platform charges a variable fee for each project. The fee structure depends on the gallery, and fees decrease with each completed project by an artist.`}
        />

        <FAQContent
          key={"a52"}
          text={`Fees for Selected range from 10% to 8%, while for Open World it's between 12% and 10%.`}
        />
      </>
    ),
  },
  {
    title: "What are project licenses?",
    content: (
      <>
        <FAQContent
          key={"a61"}
          text={`A license allows an artist to set up rules on how outputs can be used by the collectors.
      It stricly refers to the outputs, and not the code stored on the chain. Please refer to our documentation for the license types accepted on the platform. `}
        />
      </>
    ),
  },
  {
    title: "What are the supported wallets?",
    content: (
      <>
        <FAQContent
          key={"a71"}
          text={`Mintoria is in essence a decentralised, web3.0 platform so all wallets can interact with our platform.`}
        />
        <FAQContent
          key={"a72"}
          text={`However our front-end only supports Metamask at the moment. We will release further integrations with other wallets like WalletConnect in the near future`}
        />
      </>
    ),
  },
  {
    title: "How is rarity calculated?",
    content: (
      <>
        <FAQContent
          key={"a81"}
          text={`The rarity score for a token is calculated using the following formula:`}
        />
        <FAQContent
          key={"a82"}
          text={
            <i>
              [rarity score for a trait] = 1 / ([number of tokens that have the
              trait] / [total number of tokens from the project])
            </i>
          }
        />
        <FAQContent
          key={"a83"}
          text={`So the rarity score for a token equals the sum of the rarity score of its traits. The higher the score, the rarer the token.`}
        />
        <FAQContent
          key={"a84"}
          text={
            <i>Note: rarity is computed only for completed mainnet projects.</i>
          }
        />
      </>
    ),
  },
  {
    title: "How do I get more information?",
    content: (
      <>
        <FAQContent
          key={"a91"}
          text={
            <>
              <span>We have prepared extensive documentation for artists:</span>{" "}
              <Link
                href="https://docs.mintoria.io/"
                target="_blank"
                rel="noreferrer"
              >
                Mintoria Docs
              </Link>
            </>
          }
        />
        <FAQContent
          key={"a92"}
          text={
            <>
              <span>
                You can also join our Discord community of artists and
                collectors. Here you'll b able to reach out for help, but also
                have conversations over generative art and other topics. It's
                the place to be!
              </span>{" "}
              <br /> <br />
              <Link
                href="https://discord.gg/SudxZYSzKK"
                target="_blank"
                rel="noreferrer"
              >
                Join our Discord server
              </Link>
            </>
          }
        />
      </>
    ),
  },
];

export default FaqData;
