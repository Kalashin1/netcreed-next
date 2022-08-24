import { NextComponentType } from "next"

const NewsLetter: NextComponentType = () => {
  return (
    <div className="container pt-4 pb-4">
      <div className="border p-5 bg-lightblue">
        <div className="row justify-content-between">
          <div className="col-md-6">
            <h5 className="font-weight-bold secondfont">Become a member</h5>
            Get the latest news right in your inbox. Its free and you can unsubscribe at any time. We hate spam as much as we do, so we never spam!
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="First name" />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Last name" />
              </div>
              <div className="col-md-12 mt-3">
                <button type="submit" className="btn btn-success btn-block">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter;