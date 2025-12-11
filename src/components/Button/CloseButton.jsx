import Button from "./Button";
import { FaTimes } from "react-icons/fa";

const CloseButton = ({ onClick }) => {
  return <Button icon={<FaTimes />} variant="icon" onClick={onClick} />;
};

export default CloseButton;