import { FC, useContext, FormEvent, useState } from 'react';
import { db } from '../Firebase-settings';
import { addDoc, collection } from '@firebase/firestore';
import { Spinner } from 'react-bootstrap';
import { ThemeContext } from '../pages/_app';

const NewsLetter: FC = () => {
  let theme: string = useContext(ThemeContext).theme;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSpinner, setShowSpiner] = useState(false);

  const regForNewsLetter = async (e: FormEvent<HTMLFormElement>) => {
    setShowSpiner(true);
    e.preventDefault();
    await addDoc(collection(db, 'newsletter'), {
      name,
      email,
    });
    alert('Newsletter registration successfull!');
    setShowSpiner(false);
  };
  return (
    <div className="container pt-4 pb-4">
      <div className="border p-5">
        <div className="row justify-content-between">
          <div
            className={`col-md-6 text-${theme === 'light' ? 'dark' : 'light'}`}
          >
            <h5 className={`font-weight-bold secondfont `}>Become a member</h5>
            Get the latest news right in your inbox. Its free and you can
            unsubscribe at any time. We hate spam as much as we do, so we never
            spam!
          </div>
          <form className="col-md-6" onSubmit={regForNewsLetter}>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Your Email"
                />
              </div>
              <div className="col-md-12 mt-3">
                <button type="submit" className="btn btn-success btn-block">
                  {!showSpinner && 'Subscribe'}
                  {showSpinner && (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
