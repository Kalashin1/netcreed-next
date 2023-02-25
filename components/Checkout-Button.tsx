import { FC } from 'react';
import { PaystackButton } from 'react-paystack';
import * as PaystackButtonStyle from '../styles/Paystack.module.css';

type ComponentProps = {
  email: string;
  amount: number;
  metadata: {
    name: string;
    phone: string;
  };
  publicKey: string;
  text: 'Pay Now';
  onSuccess: (...args: any[]) => void;
  onClose: (...args: any[]) => void;
  showPayButton: boolean;
};

const CheckoutButton: FC<ComponentProps> = (props) => {
  if (props.showPayButton) {
    return (
      // @ts-ignore
      <PaystackButton
        //@ts-ignore
        className={PaystackButtonStyle.paystackButton}
        {...props}
      />
    );
  } else {
    return (
      <button className="btn btn-primary btn-lg btn-block" type="submit">
        Continue to checkout
      </button>
    );
  }
};

export default CheckoutButton;
