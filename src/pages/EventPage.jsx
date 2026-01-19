import {
  Box,
  Heading,
  Button,
  Image,
  Center,
  Text,
  Separator,
  HStack,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { LuChevronLeft } from "react-icons/lu";
import { useLoaderData, Link } from "react-router-dom";
import { useContext } from "react";
import { Time } from "../components/Time";
import { EventsContext } from "../EventsContext";
import EditEvent from "../components/EditEvent";
import { useState } from "react";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return { event: await event.json() };
};

export const EventPage = () => {
  scrollTo(top);
  const { event } = useLoaderData();
  const { deleteEvent, matchCategories } = useContext(EventsContext);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <EditEvent
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        finish={() => {
          setModalOpen(false);
        }}
        eventToEdit={event}
      />

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
            <Text>{event.location}</Text>
            <HStack>
              {event.startTime.length > 5 ? (
                <Time timestamp={event.startTime} />
              ) : (
                <Text> {event.startTime} </Text>
              )}
              <Text> - </Text>
              {event.endTime.length > 5 ? (
                <Time timestamp={event.endTime} />
              ) : (
                <Text> {event.endTime} </Text>
              )}
            </HStack>

            <Flex>
              {event.categoryIds.map((id) => (
                <Tag.Root key={id} size="lg" mr="1" my="1" colorPalette="teal">
                  <Tag.Label>{matchCategories(id)}</Tag.Label>
                </Tag.Root>
              ))}
            </Flex>

            <Button onClick={() => deleteEvent(event.id)}>Delete Event</Button>
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Edit Event
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
};
