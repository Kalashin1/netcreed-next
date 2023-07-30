import { FC, useContext } from 'react';
import { IconProps } from '.';
import { ThemeContext } from '../../pages/_app';

const Folder: FC<IconProps> = ({
  onClick,
  width=15,
  fill
}) => {

  const theme = useContext(ThemeContext).theme;
  fill = fill || `${theme === 'dark' ? '#fff' : '#000'}`;

  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" width={width} fill={fill} onClick={onClick} height="1em" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" /></svg>
  );
};

export default Folder;