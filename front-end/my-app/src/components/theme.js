import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        unstyledButton: {
          bg: "none",
          _hover: {
            bg: "none",
            color: "grey"
          },
          _active: {
            bg: "none",
          },
          _focus: {
            boxShadow: "none",
          },
          color: "white",
        },
      },
    },
  },
});

export default theme;
