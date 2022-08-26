import { MultiSelect } from "react-multi-select-component";
import { useState, FC } from "react";
import { Article } from "../types";
import { Button } from 'react-bootstrap';

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

type PostPayload = {
  posts: Article[]
}

const PostTable: FC<PostPayload> = ({ posts }) => {

  const [selected, setSelected] = useState([]);

  return (
    <div className="card">
      <div className="card-header">
        <h4>All Posts</h4>
      </div>
      <div className="card-body">
        <div style={{ width: '50vw' }} className="my-4">

          <label>Add To</label>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
        </div>
        <div>
          <form style={{ width: '50vw' }}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" />
              <div className="input-group-append">
                <button className="btn btn-primary"><i className="fas fa-search"></i></button>
              </div>
            </div>
          </form>
        </div>
        <div className="clearfix mb-3"></div>
        <div className="table-responsive">
          <table className="table table-striped">
            <tbody><tr>
              <th className="pt-2">
                <div className="custom-checkbox custom-checkbox-table custom-control">
                  <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" className="custom-control-input" id="checkbox-all" />
                  <label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
                </div>
              </th>
              <th>Author</th>
              <th>Title</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Views</th>
            </tr>
              {
                posts && posts.map((post, index) => (
                  <tr key={index}>
                    <td>
                      <div className="custom-checkbox custom-control">
                        <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-2" />
                        <label htmlFor="checkbox-2" className="custom-control-label">&nbsp;</label>
                      </div>
                    </td>
                    <td>
                      <a href="#">
                        <span className="d-inline-block ml-1">{post.author.username}</span>
                      </a>
                    </td>
                    <td>
                      {post.title}
                    </td>
                    <td>
                      <a href="#">{post.status}</a>
                    </td>
                    <td>{new Date(post.createdAt).toDateString()}</td>
                    <td>{post.views}</td>
                  </tr>
                ))
              }
            </tbody></table>
        </div>
        <div className="float-right">
          <nav>
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
};

export default PostTable;