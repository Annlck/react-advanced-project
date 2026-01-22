import { Flex, Link } from "@chakra-ui/react";
import AddEventForm from "./AddEventForm";
import { useState } from "react";
import { Toaster } from "./ui/toaster";

export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AddEventForm
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
          justify={{ base: "space-between", md: "flex-start" }}
        >
          {/* events page */}
          <Link href="/">Events</Link>

          {/* add event page */}
          <Link
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Event
          </Link>

          {/* contact page */}
          <Link href="/contact">Contact us</Link>
        </Flex>
      </nav>
      <Toaster />
    </>
  );
};
