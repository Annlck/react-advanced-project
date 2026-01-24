import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

export default function EventCardSkeleton() {
  return (
    <Box
      maxW="sm"
      overflow="hidden"
      shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Skeleton height="12rem" />

      <Stack py={4} px={6}>
        <Stack minH="180px" py={4}>
          <SkeletonText mb={2} noOfLines={3} />
        </Stack>
        <Skeleton mb={3} height="20px" width="60px" borderRadius="sm" />
      </Stack>
    </Box>
  );
}

// json-server events.json --delay 3000
