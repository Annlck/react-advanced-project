import { Flex, Link } from "@chakra-ui/react";
import { useState } from "react";
import EventFormDialog from "./EventFormDialog";

export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <EventFormDialog
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        finish={() => {
          setModalOpen(false);
        }}
      />
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
          <Link
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Event
          </Link>
          <Link href="/contact">Contact us</Link>
        </Flex>
      </nav>
    </>
  );
};
