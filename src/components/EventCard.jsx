import { Card, Image, Text, HStack, Tag, Flex } from "@chakra-ui/react";
import { Time } from "./Time";

export const EventCard = ({ event, categoryNames }) => {
  const matchCategories = (eventCategoryId) => {
    let categoryName;

    categoryNames.forEach((category) => {
      if (eventCategoryId === category.id) {
        categoryName = category.name;
        return categoryName;
      }
    });
    return categoryName;
  };

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
      </Card.Body>
    </Card.Root>
  );
};
