import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Center,
  Text,
  Separator,
  HStack,
  Tag,
  Card,
  Icon,
} from "@chakra-ui/react";
import {
  LuChevronLeft,
  LuTrash2,
  LuPencil,
  LuMapPin,
  LuClock,
} from "react-icons/lu";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { EventsContext } from "../EventsContext";
import { getTime } from "../components/getTime";
import { Toaster } from "../components/ui/toaster";
import { DeleteEventDialog } from "../components/DeleteEventDialog";
import EditEventForm from "../components/EditEventForm";

export const loader = async ({ params }) => {
  const eventResponse = await fetch(
    `http://localhost:3000/events/${params.eventId}`,
  );
  return { event: await eventResponse.json() };
};

export const EventPage = () => {
  scrollTo(top);
  const { event } = useLoaderData();
  const { matchCategories } = useContext(EventsContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Center>
        <Card.Root
          flexDirection={{ base: "column", md: "row" }}
          overflow="hidden"
          maxWidth="90vw"
          m={{ base: "4", md: "10" }}
          size={{ md: "xl" }}
        >
          <IconButton
            aria-label="Back to overview"
            position="absolute"
            top="10px"
            left="10px"
            variant="surface"
            size={{ base: "xs", md: "sm" }}
            onClick={() => navigate("/")}
          >
            <LuChevronLeft />
          </IconButton>

          <Image
            objectFit="cover"
            baseToMd={{ height: "12rem" }}
            md={{ maxW: "250px" }}
            src={event.image}
            alt="Event Image"
          />
          <Box m="6">
            <Card.Body>
              <Card.Title mb="2" fontSize="xl">
                {event.title}
              </Card.Title>
              <Card.Description>{event.description}</Card.Description>

              <Separator my={{ base: "4", lg: "6" }} />

              <HStack mb="2">
                <Icon size="sm">
                  <LuClock />
                </Icon>
                <Text> {getTime(event.startTime)} </Text>
                <Text> - </Text>
                <Text> {getTime(event.endTime)} </Text>
              </HStack>

              <HStack>
                <Icon size="sm">
                  <LuMapPin />
                </Icon>
                <Text>{event.location}</Text>
              </HStack>

              <HStack mt="4">
                {event.categoryIds.map((id) => (
                  <Tag.Root key={id} size="lg" mr="1" my="1">
                    <Tag.Label>{matchCategories(id)}</Tag.Label>
                  </Tag.Root>
                ))}
              </HStack>
            </Card.Body>

            <Card.Footer mt="6">
              <ButtonGroup size="sm" variant="subtle">
                <Button
                  colorPalette="blue"
                  onClick={() => {
                    setEditModalOpen(true);
                  }}
                >
                  <LuPencil />
                  Edit
                </Button>
                <Button
                  colorPalette="red"
                  onClick={() => {
                    setDeleteModalOpen(true);
                  }}
                >
                  <LuTrash2 />
                  Delete
                </Button>
              </ButtonGroup>
            </Card.Footer>
          </Box>
        </Card.Root>
      </Center>

      <EditEventForm
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
        finish={() => {
          setEditModalOpen(false);
        }}
        eventToEdit={event}
      />

      <DeleteEventDialog
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        finish={() => {
          setDeleteModalOpen(false);
        }}
        eventToDelete={event}
      />

      <Toaster />
    </>
  );
};
