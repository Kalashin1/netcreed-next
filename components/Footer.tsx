import { NextComponentType } from "next"

const Footer: NextComponentType = () =>{
  return (
    <div className="container mt-5">
      <footer className="bg-white border-top p-3 text-muted small">
        <div className="row align-items-center justify-content-between">
          <div>
            <span className="navbar-brand mr-2"><strong>Mundana</strong></span> Copyright &copy;
            { new Date().getFullYear() }
            . All rights reserved.
          </div>
          <div> 
            Made with <a target="_blank" rel="noreferrer" className="text-secondary font-weight-bold" href="https://www.wowthemes.net/mundana-free-html-bootstrap-template/">Mundana Theme</a> by WowThemes.net.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;