import { FC, useContext } from "react";
import { ThemeContext } from "../../pages/_app";

const EclipseVeritical: FC = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={5} viewBox="0 0 192 512" fill={`${theme === 'dark' ? '#fff': '#000'}`}><path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" /></svg>
  )
}

export default EclipseVeritical;