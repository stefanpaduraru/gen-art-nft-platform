import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Collapsible from "react-collapsible";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Themes } from "../../../context/ThemeContext";

export interface FAQEntry {
  id: number;
  question: string;
  answer: string | JSX.Element;
  renderMarkdown?: boolean;
}

interface Props extends FAQEntry {
  onRevealAnswer?: (faqEntry: FAQEntry) => void;
  onHideAnswer?: (faqEntry: FAQEntry) => void;
}

export const FAQItem = ({
  id,
  question,
  answer,
  onRevealAnswer = () => {},
  onHideAnswer = () => {},
  renderMarkdown = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  return (
    <Box
      paddingLeft={"1rem"}
      sx={{
        borderBottom: (theme) =>
          theme.palette.mode === Themes.LIGHT
            ? "1px solid #00000030"
            : "1px solid #ffffff30",
      }}
    >
      <Box
        sx={{ cursor: "pointer" }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        minHeight={"3.2rem"}
        data-analytics-id={`question-${id}`}
        onClick={() => {
          if (isOpen === opened) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <Typography variant="h6" fontWeight="normal">
          {question}
        </Typography>
        {opened && <ArrowDropUpIcon />}
        {!opened && <ArrowDropDownIcon />}
      </Box>
      <Collapsible
        trigger=""
        transitionTime={100}
        onOpen={() => {
          onRevealAnswer({
            id,
            question,
            answer,
          });

          setOpened(true);
        }}
        onClose={() => {
          onHideAnswer({
            id,
            question,
            answer,
          });

          setOpened(false);
        }}
        open={isOpen}
      >
        <Box marginTop={"1.3rem"} marginBottom="2.6rem" paddingRight={"7.2rem"}>
          {!renderMarkdown && (
            <Typography variant="body1" fontWeight={"light"}>
              {answer}
            </Typography>
          )}
          {renderMarkdown && <Box>{answer}</Box>}
        </Box>
      </Collapsible>
    </Box>
  );
};
