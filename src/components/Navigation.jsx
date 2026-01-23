import { Flex, Link, HStack } from "@chakra-ui/react";
import AddEventForm from "./AddEventForm";
import { useState } from "react";
import { Toaster } from "./ui/toaster";
import { ColorModeToggle } from "./ColorModeToggle";

export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav>
        <Flex
          position="sticky"
          top={0}
          zIndex="sticky"
          background="#073855ff"
          paddingX={{ base: "6", md: "12" }}
          paddingY="2"
          justify="space-between"
        >
          <HStack justify={{ base: "space-between", sm: "flex-start" }} gap="8">
            {/* events page */}
            <Link color="white" href="/">
              Events
            </Link>

            {/* add event page */}
            <Link
              color="white"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Event
            </Link>

            {/* contact page */}
            <Link color="white" href="/contact">
              Contact us
            </Link>
          </HStack>

          <ColorModeToggle />
        </Flex>
      </nav>

      <AddEventForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        finish={() => {
          setModalOpen(false);
        }}
      />
      <Toaster />
    </>
  );
};
