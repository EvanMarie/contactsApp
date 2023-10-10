import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const CustomTheme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "cyan",
  }),
  {
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },

    breakpoints: {
      base: "0em", // 0px
      sm: "37em", // ~600px
      md: "53em", // 848px
      lg: "75em", // 1200px
      xl: "80em", // 1280px);
    },
    styles: {
      global: {
        html: {
          scrollBehavior: "smooth",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          overflowY: "hidden",
        },
        body: {
          overflowX: "hidden",
          overflowY: "hidden",
          fontFamily: "'Onest', sans-serif;",
        },
      },
    },

    components: {
      Input: {
        variants: {
          filled: {
            field: {
              bg: "gray.900",
              color: "white",
              shadow: "0px 0px 10px rgba(0,0,0,0.7)",
              fontWeight: "500",
              _focus: {
                borderColor: "aiArt.400",
                bg: "aiArt.900",
                color: "aiArt.100",
              },
              _hover: {
                borderColor: "aiArt.400",
                bg: "aiArt.900",
                color: "aiArt.1 00",
              },
            },
          },
        },
      },
    },
  }
);

export default CustomTheme;
