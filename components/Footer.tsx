import { NextComponentType } from "next"
import Image from "next/image";

const Footer: NextComponentType = () =>{
  return (
    <div className="container mt-5">
      <footer className="bg-white border-top p-3 text-muted small">
        <div className="row align-items-center justify-content-between">
          <div>
            <span className="navbar-brand mr-2" style={{ position: 'relative', top: '1rem'}}>
              <Image src="/logo.png" width={50} height={60} alt="Netcreed" />  
            </span> Copyright &copy;
            { new Date().getFullYear() } All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;