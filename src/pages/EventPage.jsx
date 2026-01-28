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
  LuCalendar,
  LuCalendarCheck2,
  LuCalendarX2,
} from "react-icons/lu";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { EventsContext } from "../EventsContext";
import { Toaster, toaster } from "../components/ui/toaster";
import { DeleteEventDialog } from "../components/DeleteEventDialog";
import EventForm from "../components/EventForm";

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

  // handleChange checkboxes
  const [checked, setChecked] = useState([]);
  const handleChange = (e) => {
    const value = Number(e.target.value);
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // editEvent function
  const editEvent = async (data) => {
    const editedEvent = {
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: checked,
      location: data.location,
      startTime: `${data.startDate}T${data.startHHMM}:00.000`,
      endTime: `${data.endDate}T${data.endHHMM}:00.000`,
    };

    const result = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedEvent),
    });

    setEditModalOpen(false);

    if (result.ok) {
      toaster.create({
        title: "Success",
        description: "Event has been edited",
        type: "success",
      });
      navigate(`/events/${event.id}`);
      return;
    } else {
      toaster.create({
        title: "Error",
        description: "Could not edit event",
        type: "error",
      });
      return;
    }
  };

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
          <Box m="6" minWidth={{ md: "400px" }}>
            <Card.Body>
              <Card.Title mb="2" fontSize="xl">
                {event.title}
              </Card.Title>
              <Card.Description>{event.description}</Card.Description>

              <Separator my={{ base: "4", lg: "6" }} />

              {event.startTime.substring(0, 10) ===
              event.endTime.substring(0, 10) ? (
                <>
                  <HStack mb="2">
                    <Icon size="sm">
                      <LuCalendar />
                    </Icon>
                    <Text> {event.startTime.substring(0, 10)} </Text>
                  </HStack>

                  <HStack mb="2">
                    <Icon size="sm">
                      <LuClock />
                    </Icon>
                    <Text> {event.startTime.substring(11, 16)} </Text>
                    <Text> - </Text>
                    <Text> {event.endTime.substring(11, 16)} </Text>
                  </HStack>
                </>
              ) : (
                <>
                  <HStack mb="2">
                    <Icon size="sm">
                      <LuCalendarCheck2 />
                    </Icon>
                    <Text>
                      {event.startTime.substring(0, 10)}{" "}
                      {event.startTime.substring(11, 16)}
                    </Text>
                  </HStack>
                  <HStack mb="2">
                    <Icon size="sm">
                      <LuCalendarX2 />
                    </Icon>
                    <Text>
                      {event.endTime.substring(0, 10)}{" "}
                      {event.endTime.substring(11, 16)}
                    </Text>
                  </HStack>
                </>
              )}

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

      <EventForm
        formTitle="Edit event"
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
        onCheckboxChange={(e) => handleChange(e)}
        changeFn={editEvent}
        submitButtonText="Edit event"
        placeholderEvent={event}
        defaultValues={{
          title: event.title,
          description: event.description,
          image: event.image,
          categoryIds: event.categoryIds,
          location: event.location,
          startDate: event.startTime.substring(0, 10),
          startHHMM: event.startTime.substring(11, 16),
          endDate: event.endTime.substring(0, 10),
          endHHMM: event.endTime.substring(11, 16),
        }}
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
