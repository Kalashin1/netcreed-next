import { FC, useContext } from 'react';
import {IconProps} from './index';
import { ThemeContext } from '../../pages/_app';


const BookMark: FC<IconProps> = ({
  width=15,
  fill,
  onClick
}) => {

  const theme = useContext(ThemeContext).theme;
  fill = fill || `${theme === 'dark' ? '#fff' : '#000'}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={fill} width={width} onClick={onClick} height="1em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
  );
};

export default BookMark;