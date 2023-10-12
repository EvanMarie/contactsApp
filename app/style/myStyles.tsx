export const ButtonStyles = {
  h: "40px",
  w: "fit-content",
  minW: "150px",
  px: 4,
  bg: "cyan.400",
  color: "gray.900",
  fontWeight: "bold",
  fontSize: { base: "md", md: "lg" },
  borderRadius: "md",
  _hover: {
    bg: "purple.200",
    shadow: "2px 2px 5px rgba(0,0,0,0.7)",
  },
};

export const BadgeStyles = {
  bg: "purple.200",
  color: "cyan.900",
  display: "flex",
  justify: "center",
  align: "center",
  shadow: "xl",
  minW: "150px",
  fontWeight: "bold",
  borderRadius: "md",
  h: "35px",
  w: "fit-content",
  px: 2,
  fontSize: "md",
  whiteSpace: "nowrap" as const,
  border: "1.5px solid",
  _hover: {
    bg: "gray.600",
    color: "cyan.400",
  },
};

export const ActiveBadgeStyles = {
  bg: "cyan.400",
  color: "gray.900",
};

export const scrollBarStyles = {
  // For Chrome, Safari, and newer versions of Edge
  "&::-webkit-scrollbar": {
    width: "7px",
    height: "7px",
    backgroundColor: "gray.700",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "purple.200",
    borderRadius: "7px",
    minHeight: "50px",
    maxHeight: "150px",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "purple.300",
    transition: "all 0.3s ease-in-out",
  },
};

export const InputStyles = {
  bg: "gray.700",
  w: "375px",
  color: "gray.50",
  border: "1px solid",
  shadow: "2xl",
  borderColor: "gray.600",
  borderRadius: "md",
  _hover: {
    bg: "gray.600",
    borderColor: "gray.600",
  },
  _focus: {
    bg: "gray.600",
    borderColor: "gray.600",
  },
};
