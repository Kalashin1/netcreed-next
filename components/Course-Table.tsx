import { Pagination, Card, Table } from 'react-bootstrap';
import { FC } from 'react';
import { Search, Reload, DeleteIcon, EditIcon } from './svg/icons';

type Props = {
  theme: string;
};

const CourseTable: FC<Props> = ({ theme }) => {
  let active = 1;
  let items = [];

  for (let num = 1; num <= 2; num++) {
    items.push(
      <Pagination.Item key={num} active={num == active}>
        {num}
      </Pagination.Item>
    );
  }

  return (
    <Card bg={theme} className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>
      <Card.Header>
        <Card.Title>All Posts</Card.Title>
      </Card.Header>
      <Card.Body>
        {/* <div style={{ width: '50vw' }} className="my-4">

          <label>Add To</label>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
        </div> */}
        <div className="d-flex flex-row justify-content-between">
          <form style={{ width: '50vw' }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  {' '}
                  <Search />
                </button>
              </div>
            </div>
          </form>
          <button title="reload list of posts" className="btn btn-primary">
            <Reload />
          </button>
        </div>
        <div className="clearfix mb-3"></div>
        <div className="table-responsive">
          <Table className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>
            <tbody>
              <tr>
                <th className="pt-2">
                  <div className="custom-checkbox custom-checkbox-table custom-control">
                    <input
                      type="checkbox"
                      data-checkboxes="mygroup"
                      data-checkbox-role="dad"
                      className="custom-control-input"
                      id="checkbox-all"
                    />
                    <label
                      htmlFor="checkbox-all"
                      className="custom-control-label"
                    >
                      &nbsp;
                    </label>
                  </div>
                </th>
                <th>Title</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Views</th>
                <th>Saves</th>
                <th>Likes</th>
                <th>Action</th>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="float-right">
          <Pagination>{items}</Pagination>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseTable;
