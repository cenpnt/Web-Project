import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "white";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
      <Menu isLazy>
        <MenuButton as={Button} mt={4} bg="" color="hsl(0, 0%, 66%)" _hover={{}} _active={{}}>{language}</MenuButton>
        <hr style={{ width: "100%", border: "1px solid #a8a8a8" }} />
        <MenuList bg="#333333" color="white">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              onClick={() => onSelect(lang)}
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "hsl(0, 0%, 30%)" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "hsl(0, 0%, 30%)",
              }}
            >
              {lang}
              &nbsp;
              <Text as="span" color="white" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
