import { Modal, Card } from "react-bootstrap";
import SignupForm from "./Signup-Form";
import { FC, useContext } from "react";
import { ThemeContext } from '../pages/_app';

type Props = {
  show: boolean;
  handleClose: (...args: any[]) => void;

}

const SignInModal: FC<Props> = ({
  show,
  handleClose
}) => {
  const { theme, textColor } = useContext(ThemeContext)
  return (
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
    >
      <Card className={`bg-${theme}`}>
        <Modal.Header>
          <Modal.Title className="text-primary">Create a free account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm creator={true} isModal={true} closeModal={handleClose} />
        </Modal.Body>
      </Card>
    </Modal>
  )
};

export default SignInModal