import { FC, useRef, MutableRefObject, FormEvent, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { updateBio } from "../helper";
import { useRouter } from 'next/router';

type Props = {
  userID: string
}

const UserBio: FC<Props> = ({ userID }) => {
  const bioForm: MutableRefObject<null | HTMLFormElement> = useRef(null);
  const [showSpinner2, setShowSpinner2] = useState(false);

  const router = useRouter();

  const _updateBio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner2(true)
    const [res, err] = await updateBio(bioForm.current!, userID)
    setShowSpinner2(false)
    if (!err) {
      alert(res);
      router.reload();
    } else {
      console.log(err);
    }
  }


  return (
    <Form name="bioForm" ref={bioForm} onSubmit={_updateBio}>
      <Form.Group className="mb-3" controlId="text-area">
        <Form.Label>Update Your Bio</Form.Label>
        <Form.Control name="bio" as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ width: '100%' }}>
        {showSpinner2 && (<Spinner animation="border" role="status">
        </Spinner>)}
        {!showSpinner2 && 'Save Bio'}
      </Button>
    </Form>
  )
};

export default UserBio;