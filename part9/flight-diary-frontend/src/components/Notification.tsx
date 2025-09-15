const Notification = ({ message }: { message: string }) => {
  if (!message) return null;
  return <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>;
};

export default Notification;
