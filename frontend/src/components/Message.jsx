import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert variant={variant} className="mt-5">
      {children}
    </Alert>
  );
}

Message.defaultProps = {
  variant: "info",
};

export default Message;
