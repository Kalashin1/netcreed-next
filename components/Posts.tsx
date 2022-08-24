import { NextComponentType } from "next"
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const PostTable: NextComponentType = () => {

  const [selected, setSelected] = useState([]);

  return (
    <div className="card">
      <div className="card-header">
        <h4>All Posts</h4>
      </div>
      <div className="card-body">
        <div style={{ width: '50%' }} className="my-4">

          <label>Add To</label>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
        </div>
        <div>
          <form>
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
              <th>Status</th>
            </tr>
              <tr>
                <td>
                  <div className="custom-checkbox custom-control">
                    <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-2" />
                    <label htmlFor="checkbox-2" className="custom-control-label">&nbsp;</label>
                  </div>
                </td>
                <td>
                  <a href="#">
                    <span className="d-inline-block ml-1">Cara Stevens</span>
                  </a>
                </td>
                <td>Post Title 1

                </td>
                <td>
                  <a href="#">Science</a>
                </td>
                <td>10-02-2019</td>
                <td>3,587</td>
                <td>
                  <div className="badge badge-warning">Pending</div>
                </td>
              </tr>

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