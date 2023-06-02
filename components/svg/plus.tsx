import { useContext, FC } from 'react';
import { ThemeContext } from '../../pages/_app';


type Props = {
  width?: number,
  fill?: string
}

const Plus: FC<Props> = ({
  width = 15,
  fill
}) => {
  const theme = useContext(ThemeContext).theme;
  fill = fill || `${theme === 'dark' ? '#fff' : '#000'}`;
  return (
    <svg
      width={width}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  );
};

export default Plus;
