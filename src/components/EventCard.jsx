import { Card, Image, Text, HStack } from "@chakra-ui/react";
import { Time } from "./Time";

export const EventCard = ({ event }) => {
  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      shadow="2xl"
      cursor="pointer"
      _hover={{ transform: "scale(1.02)" }}
      transition="transform 0.15s ease"
    >
      <Image src={event.image} height="12rem" />
      <Card.Body gap="2">
        <Card.Title fontSize={{ md: 24 }}>{event.title}</Card.Title>

        <Card.Description>{event.description}</Card.Description>

        <HStack>
          <Time timestamp={event.startTime} />
          <Text> - </Text>
          <Time timestamp={event.startTime} />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
