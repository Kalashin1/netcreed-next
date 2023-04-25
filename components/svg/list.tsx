import { useContext } from 'react';
import { ThemeContext } from '../../pages/_app';

const ListIcon = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <svg
      fill={`${theme === 'dark' ? '#fff' : '#000'}`}
      baseProfile="tiny"
      height="24px"
      id="Layer_1"
      version="1.2"
      viewBox="0 0 24 24"
      width="24px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M19,17h-7c-1.103,0-2,0.897-2,2s0.897,2,2,2h7c1.103,0,2-0.897,2-2S20.103,17,19,17z" />
      <path d="M19,10h-7c-1.103,0-2,0.897-2,2s0.897,2,2,2h7c1.103,0,2-0.897,2-2S20.103,10,19,10z" />
      <path d="M19,3h-7c-1.103,0-2,0.897-2,2s0.897,2,2,2h7c1.103,0,2-0.897,2-2S20.103,3,19,3z" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="5" cy="5" r="2.5" />
    </svg>
  );
};

export default ListIcon;
