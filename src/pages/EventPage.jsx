import {
  Box,
  Heading,
  Button,
  Image,
  Center,
  Text,
  Separator,
  HStack,
} from "@chakra-ui/react";
import { LuChevronLeft } from "react-icons/lu";
import { useLoaderData, Link } from "react-router-dom";
import { Time } from "../components/Time";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return { event: await event.json() };
};

export const EventPage = () => {
  scrollTo(top);
  const { event } = useLoaderData();

  return (
    <Center>
      <Box
        w={{ md: "80vw" }}
        borderWidth="1px"
        m={{ base: "4", md: "10" }}
        rounded="xl"
        overflow="hidden"
        shadow="xl"
        position="relative"
      >
        <Link to="/">
          <Button
            position="absolute"
            top="10px"
            left="10px"
            variant="subtle"
            rounded="full"
            size={{ base: "xs", md: "md" }}
          >
            <LuChevronLeft />
            Go Back
          </Button>
        </Link>

        <Image src={event.image} w="full" h="16rem" objectFit="cover" />

        <Box p={{ base: "8", md: "16" }}>
          <Heading>{event.title}</Heading>
          <Text>{event.description}</Text>

          <Separator my={{ base: "4", lg: "6" }} />
          <HStack>
            <Text>Start </Text>
            <Time timestamp={event.startTime} />
          </HStack>
          <HStack>
            <Text>End </Text>
            <Time timestamp={event.endTime} />
          </HStack>
        </Box>
      </Box>
    </Center>
  );
};
