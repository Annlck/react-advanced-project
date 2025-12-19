import {
  // Box,
  Flex,
  Link,
} from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <Flex
        position="sticky"
        top={0}
        zIndex="sticky"
        background="#073855ff"
        paddingX={{ base: "6", md: "12" }}
        paddingY="2"
        gap="8"
      >
        <Link href="/">Events</Link>
        <Link>Add Event</Link>
        <Link href="/contact">Contact us</Link>
      </Flex>
    </nav>
  );
};
