const Notification = ({
  message,
  success,
}: {
  message: string;
  success: boolean;
}) => {
  if (!message) return null;
  return <p style={{ color: success ? "green" : "red" }}>{message}</p>;
};

export default Notification;
