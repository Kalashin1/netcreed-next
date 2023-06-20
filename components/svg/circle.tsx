import { ThemeContext } from "../../pages/_app";
import { FC, useContext } from "react";
import { IconProps } from ".";

const Circle: FC<IconProps> = ({
  width,
  fill
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <svg
    width={ width ?? 15}
    fill={fill ?? '#fff'}
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
  );
};

export default Circle;