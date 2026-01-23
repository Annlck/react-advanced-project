import { Card, Image, Text, HStack, Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { getTime } from "./getTime";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";

export const EventCard = ({ event }) => {
  const { matchCategories } = useContext(EventsContext);
  const navigate = useNavigate();

  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      // shadow="2xl"
      cursor="pointer"
      _hover={{ transform: "scale(1.02)" }}
      transition="transform 0.15s ease"
      onClick={() => navigate(`events/${event.id}`)}
    >
      <Image src={event.image} height="12rem" />
      <Card.Body gap="2">
        <Card.Title fontSize="xl">{event.title}</Card.Title>

        <Card.Description>{event.description}</Card.Description>

        <HStack>
          <Text> {getTime(event.startTime)} </Text>
          <Text> - </Text>
          <Text> {getTime(event.endTime)} </Text>
        </HStack>
      </Card.Body>
      <Card.Footer>
        {event.categoryIds.map((id) => (
          <Tag.Root key={id} size="lg" mr="1" colorPalette="blue">
            <Tag.Label>{matchCategories(id)}</Tag.Label>
          </Tag.Root>
        ))}
      </Card.Footer>
    </Card.Root>
  );
};
