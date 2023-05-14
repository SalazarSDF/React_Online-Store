import { CopyButton, Button } from "@mantine/core";
export default function CopyUrlButton() {
  return (
    <CopyButton value={window.location.href}>
      {({ copied, copy }) => (
        <Button color={copied ? "teal" : "blue"} onClick={copy}>
          {copied ? "Copied url" : "Copy url"}
        </Button>
      )}
    </CopyButton>
  );
}
