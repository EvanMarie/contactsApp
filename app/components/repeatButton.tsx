import { Button } from "@chakra-ui/react";
import { ButtonStyles } from "~/style/myStyles";

interface Props {
  onClick: () => void;
}

export default function RepeatButton({ onClick }: Props) {
  return (
    <Button {...ButtonStyles} minW="30px" h="30px" px={0} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width="20px"
        height="20px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
    </Button>
  );
}
