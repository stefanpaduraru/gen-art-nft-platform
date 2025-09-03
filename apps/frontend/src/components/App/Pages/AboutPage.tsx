import { Box, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        About Us
      </Typography>

      <Box>
        <Typography
          variant="body1"
          component="div"
          sx={{ mt: 5 }}
          fontWeight="light"
        >
          Mintoria is a platform dedicated to artists, galleries and collectors
          of generative arts. We are thankful for the pioneers that started this
          motion and truly believe in its inherent value and in the exciting
          future of the way arts translate to this new century. We understand a
          cultural duty in pushing the movement even further and helping to
          design this world as accessible as possible for everyone. That's why
          we present
          <b> Mintoria Open World</b> for artists to publish their work
          professionally.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ mt: 2 }}
          fontWeight="light"
        >
          Our platform understands itself as a community based chart of
          generative arts. The community and what it appreciates the most is the
          base of the success that certain artworks will have to build a class
          of range in time, which later on will be known as an epoch. Together
          we will discover the most precious, and fascinating artworks. This is
          what we would like to name our mission. The artists creating those
          pieces will have the opportunity to grow out of the Open World
          programm and publish their upcoming projects with{" "}
          <b>Mintoria Selected</b> - a curated program presenting the
          community's choices right next to projects chosen by Mintoria's
          creative team itself.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ mt: 2 }}
          fontWeight="light"
        >
          Our platform is designed to give galleries and creative collectives
          the opportunity to participate as partners. Our <b>Mintoria Collab</b>{" "}
          program is designed for you to easily curate your own artistic ideas
          with multiple members on board and even discover new artists to team
          up with. To support existing and new forming collaborations of any
          kind, Mintoria is offering individual, specific contracts that fit
          your needs and vision.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ mt: 2 }}
          fontWeight="light"
        >
          The 21st century is the cradle of tomorrow's world. With the creation
          of Mintoria we are laying the groundwork for the arts to have a safe
          place in this world. We, as the initiators, do not have a written in
          stone vision of the potential this platform holds. Therefore we want
          to encourage each and everyone, artists and art enthusiasts, to be a
          part of our growing community. It is on us to explore and shape the
          future of arts. Let's open up to new frontiers!
        </Typography>
      </Box>
    </>
  );
};

export default AboutPage;
