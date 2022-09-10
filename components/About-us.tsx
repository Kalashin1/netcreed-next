import { NextComponentType } from 'next';
import Script from 'next/script';

const About: NextComponentType = () => {
  return (
    <div className="container pt-4 pb-4">
      <div className="row justify-content-center">
        <div className="col-lg-2 pr-4 mb-4 col-md-12 text-center">
          <div className="sticky-top text-center">
            <div className="text-muted">
              Share this
            </div>
            <div className="share d-inline-block">
              <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                <a className="a2a_button_facebook"></a>
                <a className="a2a_button_twitter"></a>
              </div>
              <Script async src="https://static.addtoany.com/menu/page.js"></Script>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-8">
          <article className="article-post">
            <p>
              Welcome to Netcreed, where you can get articles written by Tech professionals to help others in tech find solution to problems, grow and expand their knowledge and network. You will find top notch articles on different topics in IT and Tech space.
            </p>
            
          </article>
          <div className="border p-5 bg-lightblue mt-5">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-8 mb-2 mb-md-0">
                <h5 className="font-weight-bold mb-3">About Kinanee Samson</h5>
                Hi, Im Kinanee Samson, the creator of the Netcreed. I created this platform out of my passion to share what i have learned during the course of my Tech careers with others. I derive passion from using my experience and knowledge to help others grow in the same field. 
              </div>
              {/* <div className="col-md-4">
                <a target="_blank" rel="noreferrer" href="https://www.buymeacoffee.com/sal" className="btn btn-warning btn-block"><i className="fa fa-coffee"></i> Buy me a coffee</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;