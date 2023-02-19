import { FC, useContext } from 'react';
import { ThemeContext } from '../pages/_app';

type Props = {
  courseId: string;
};

const BillingInfo: FC<Props> = ({}) => {
  const { theme } = useContext(ThemeContext);
  const color = theme === 'dark' ? 'light' : 'dark';
  return (
    <>
      <h4 className={`mb-3 text-${color}`}>Promo Code</h4>
      <form className={`card p-2 bg-${theme}`}>
        <div className="input-group">
          <input
            type="text"
            className={`form-control bg-${theme} text-${color}`}
            placeholder="Promo code"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">
              Redeem
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BillingInfo;
