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
import { useContext, useState } from "react";
import { getTime } from "../components/getTime";
import { EventsContext } from "../EventsContext";
import EditEventForm from "../components/EditEventForm";
import { Toaster, toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return { event: await event.json() };
};

export const EventPage = () => {
  scrollTo(top);
  const { event } = useLoaderData();
  const { matchCategories } = useContext(EventsContext);
  const [modalOpen, setModalOpen] = useState(false);

  // set up useNaviage hook
  const navigate = useNavigate();

  // delete event
  const deleteEvent = async (eventId) => {
    const result = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });

    if (result.ok) {
      toaster.create({
        title: "Success",
        description: "Event has been deleted",
        type: "success",
      });
      navigate("/");
      return;
    } else {
      toaster.create({
        title: "Error",
        description: "Could not delete event",
        type: "error",
      });
      return;
    }
  };

  return (
    <>
      <EditEventForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        finish={() => {
          setModalOpen(false);
          toaster.create({
            title: "Success",
            description: "Your event has been edited",
            type: "success",
          });
        }}
        eventToEdit={event}
      />

      <Toaster />

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
              <Text> {getTime(event.startTime)} </Text>
              <Text> - </Text>
              <Text> {getTime(event.endTime)} </Text>
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
