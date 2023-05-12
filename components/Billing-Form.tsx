/* eslint-disable react-hooks/exhaustive-deps */
import { FC, FormEvent, useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../pages/_app';
import CheckoutButton from './Checkout-Button';
// import { Container, Form, Button } from 'react-bootstrap'
import { BillingFormSchema } from '../helper/schemas/forms';
import { handleSubmit } from '../helper/formHandler';
import {
  getCurrentUser,
  getUser,
  MoneyFormatter,
  registerCourse,
} from '../helper';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { Author } from '../types';

type InputProps = {
  label: string;
  id?: string;
  placeholder?: string;
  name: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
};

type SelectProps = InputProps & {
  data: any[];
};

const billingObject = z.object(BillingFormSchema);
type BillingObjectSchemaType = typeof BillingFormSchema;
type BillingObject = z.infer<typeof billingObject>;
type billingObjectSchemaKeys = [keyof BillingObjectSchemaType];

const getKeys = (obj: BillingObjectSchemaType): billingObjectSchemaKeys => {
  return Object.keys(obj) as billingObjectSchemaKeys;
};

type Props = {
  price: number;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
};

const BillingForm: FC<Props> = ({
  price,
  courseId,
  courseTitle,
  courseDescription,
}) => {
  const { theme } = useContext(ThemeContext);
  const color = theme === 'dark' ? 'light' : 'dark';
  const [showPayButton, setShowPayButton] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<boolean | Author>(false);

  useEffect(() => {
    const setup = async () => {
      const [currentUser, currentUserErr] = await getCurrentUser();
      console.log(currentUser);
      if (currentUserErr) router.push('/login');
      setUser(await getUser(currentUser!));
      console.log(user);
    };

    setup();
  }, []);

  const registerBilling = (e: FormEvent) => {
    const [data, error] = handleSubmit(
      e,
      billingObject,
      getKeys(BillingFormSchema)
    );
    if (!error) {
      setShowPayButton(true);
      console.log(data);
    } else {
      setShowPayButton(false);
    }
  };

  const RegisterCourse = async () => {
    await registerCourse(courseId);
    router.push('/course/' + courseId);
  };

  const Input: FC<InputProps> = ({
    label,
    type,
    placeholder,
    error = false,
    name,
    errorMessage,
    required = false,
  }) => (
    <div className="col-md-6 mb-3">
      <label htmlFor="firstName" className={`text-${color}`}>
        {label}{' '}
        {!required ? (
          <span className="text-muted">(Optional)</span>
        ) : (
          <span> </span>
        )}
      </label>
      <input
        type={type}
        className={`form-control bg-${theme} text-${color}`}
        placeholder={placeholder}
        name={name}
        required={required}
      />
      {error && <small className="text-danger">{errorMessage}</small>}
    </div>
  );

  const Select: FC<SelectProps> = ({
    data,
    label,
    name,
    error = false,
    errorMessage,
    required = true,
  }) => (
    <div className="col-md-4 mb-3">
      <label htmlFor="state" className={`text-${color}`}>
        {label}
      </label>
      <select
        className={`custom-select d-block w-100 bg-${theme}`}
        name={name}
        required={required}
      >
        <option value="">Choose...</option>
        {data.map((d, i) => (
          <option key={i} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
      {error && <small className="text-danger">{errorMessage}</small>}
    </div>
  );

  return (
    <>
      <h4 className={`mb-3 text-${color}`}>
        <span className={`text-${color}`}>Courses</span>
      </h4>
      <div className="needs-validation">
        <ul className="list-group mb-3">
          <li
            className={`list-group-item bg-${theme} d-flex justify-content-between lh-condensed`}
          >
            <div>
              <h6 className={`my-0 text-${color}`}>{courseTitle}</h6>
              <small className={`text-muted text-${color}`}>
                {courseDescription}...
              </small>
            </div>
            <span className={`text-${color}`}>
              {MoneyFormatter.format(price)}
            </span>
          </li>
        </ul>
        <hr className="mb-4" />

        <hr className="mb-4" />
        {user && (
          <CheckoutButton
            amount={(price * 100) * 470}
            // @ts-ignore
            email={user?.email!}
            onClose={() => {
              router.push('/course/' + courseId);
            }}
            onSuccess={RegisterCourse}
            // @ts-ignore
            metadata={{ name: user?.name!, phone: user?.phone! }}
            text="Pay Now"
            showPayButton={showPayButton}
            publicKey={'pk_live_14948b934d2e2e5243170514e9d5e1e72ac29fb1'}
            // pk_test_16cd6b42be34091ff4fb964827bb5184395fe204
            // pk_live_14948b934d2e2e5243170514e9d5e1e72ac29fb1
          />
        )}
      </div>
    </>
  );
};

export default BillingForm;
