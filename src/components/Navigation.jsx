import { Flex, Link, HStack } from "@chakra-ui/react";
import { useState } from "react";
import AddEventForm from "./AddEventForm";
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
          bgColor="blue.800"
          paddingX={{ base: "2", sm: "10" }}
          paddingY="2"
          justify={{ base: "space-evenly", sm: "space-between" }}
        >
          <HStack
            justify={{ base: "space-between", sm: "flex-start" }}
            gap={{ base: "6", sm: "10" }}
          >
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
