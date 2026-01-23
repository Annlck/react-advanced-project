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
          <Box>
            <Card.Body>
              <Card.Title mb="2">{event.title}</Card.Title>
              <Card.Description>{event.description}</Card.Description>

              <Separator my={{ base: "4", lg: "6" }} />
              <HStack>
                <LuMapPin />
                <Text>{event.location}</Text>
              </HStack>
              <HStack>
                <LuClock />
                <Text> {getTime(event.startTime)} </Text>
                <Text> - </Text>
                <Text> {getTime(event.endTime)} </Text>
              </HStack>

              <HStack mt="4">
                {event.categoryIds.map((id) => (
                  <Tag.Root key={id} size="lg" mr="1" my="1">
                    <Tag.Label>{matchCategories(id)}</Tag.Label>
                  </Tag.Root>
                ))}
              </HStack>
            </Card.Body>

            <Card.Footer>
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

      {/* <Center>
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

            <Button
              onClick={() => {
                setDeleteModalOpen(true);
              }}
            >
              Delete Event
            </Button>
            <Button
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              Edit Event
            </Button>
          </Box>
        </Box>
      </Center> */}

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
