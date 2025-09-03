import { Box, Typography } from "@mui/material";
import { FAQItem } from "../../../../Common/FAQ/FAQItem";
import FaqData from "./FAQ";
import CollectorSplash from "./Splash";

const ForCollectors = () => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        For Collectors
      </Typography>

      <CollectorSplash />

      <Typography
        variant="h3"
        fontWeight={"light"}
        textAlign="center"
        sx={{ fontSize: "2.5rem", mt: 30 }}
      >
        Frequently Asked Questions
      </Typography>
      <Box sx={{ mt: 8 }}>
        {FaqData.map((row, i) => (
          <FAQItem
            id={i}
            key={row.title}
            question={row.title}
            answer={row.content}
            renderMarkdown={true}
          />
        ))}
      </Box>
    </>
  );
};

export default ForCollectors;
