import { Box, Typography } from "@mui/material";
import { FAQItem } from "../../../../Common/FAQ/FAQItem";
import FaqData from "./FAQ";
import ProjectSubmission from "./ProjectSubmission";
import ArtistSplash from "./Splash";

const ForArtists = () => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        For Artists
      </Typography>

      {/* <Box
        sx={{
          backgroundImage: "url(/images/reflection.png)",
          backgroundSize: "cover",
          position: "absolute",
          width: "100%",
          height: "50vw",
          top: "150px",
        }}
      ></Box> */}

      <ArtistSplash />

      <ProjectSubmission />

      <Typography
        variant="h3"
        fontWeight={"light"}
        textAlign="center"
        sx={{ fontSize: "2.5rem", mt: 20 }}
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

export default ForArtists;
