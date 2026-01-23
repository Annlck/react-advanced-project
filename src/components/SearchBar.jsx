import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const SearchBar = ({ changeFn, inputValue }) => {
  return (
    <>
      <InputGroup flex="1" maxW="80vw" startElement={<LuSearch />} paddingX="4">
        <Input
          type="text"
          onChange={changeFn}
          value={inputValue}
          placeholder="Search event"
          variant="flushed"
          truncate
        />
      </InputGroup>
    </>
  );
};
