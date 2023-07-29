import { FC, useContext } from 'react';
import { ThemeContext } from '../../pages/_app';
import { IconProps } from '.';

const SquarePlus: FC<IconProps> = ({
  width=15,
  fill,
  onClick,
}) => {

  const theme = useContext(ThemeContext).theme;
  fill = fill || `${theme === 'dark' ? '#fff' : '#000'}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} fill={fill} onClick={onClick} height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
  );
};

export default SquarePlus