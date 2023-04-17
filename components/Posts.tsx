// import { MultiSelect } from "react-multi-select-component";
import { useState, FC, SetStateAction, Dispatch, FormEvent } from 'react';
import { Article } from '../types';
import { Pagination, Card, Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Search, Reload, DeleteIcon, EditIcon } from './svg/icons';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase-settings';
import {deleteArticle} from '../helper';

type PostPayload = {
  posts: Article[];
  theme: string;
  setPosts: Dispatch<SetStateAction<Article[]>>;
};

const PostTable: FC<PostPayload> = ({ posts, theme, setPosts }) => {
  const router = useRouter();
  const [initialPosts, setInitialPosts] = useState(posts);

  function navigate(route: string) {
    router.push(route);
  }

  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const search = (e: FormEvent, title: string) => {
    e.preventDefault();
    const filteredPosts = posts.filter((post) => post.title.includes(title));
    setPosts(filteredPosts);
  };

  const reload = async () => {
    const q = query(
      collection(db, 'articles'),
      where('author.id', '==', `${localStorage.getItem('userId')!}`)
    );
    const docRes = await getDocs(q);
    const articles = docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Article[];
    setPosts(articles);
  };

  const deletePost = async (id: string) => {
    await deleteArticle(id);
    await reload();
  }

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
          <form
            style={{ width: '50vw' }}
            onSubmit={(e) => search(e, searchTerm)}
          >
            <div className="input-group">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                defaultValue={searchTerm}
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
          <button
            onClick={reload}
            title="reload list of posts"
            className="btn btn-primary"
          >
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
              {posts &&
                posts.map((post, index) => (
                  <tr key={index} style={{ cursor: 'pointer' }}>
                    <td>
                      <div className="custom-checkbox custom-control">
                        <input
                          type="checkbox"
                          data-checkboxes="mygroup"
                          className="custom-control-input"
                          id="checkbox-2"
                        />
                        <label
                          htmlFor="checkbox-2"
                          className="custom-control-label"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </td>
                    <td onClick={(e) => navigate(`/post/edit-post/${post.id}`)}>
                      {post.title}
                    </td>
                    <td onClick={(e) => navigate(`/post/edit-post/${post.id}`)}>
                      <p>{post.status}</p>
                    </td>
                    <td onClick={(e) => navigate(`/post/edit-post/${post.id}`)}>
                      {new Date(post.createdAt).toDateString()}
                    </td>
                    <td>{post.views.length}</td>
                    <td>{post.saves.length}</td>
                    <td>{post.likes.length}</td>
                    <td>
                      <span 
                        style={{ 'cursor': 'pointer' }}
                        onClick={e => deletePost(post.id)}
                      >
                        <DeleteIcon />
                      </span>
                      <span 
                        style={{ 'cursor': 'pointer' }} 
                        className="mx-2" 
                        onClick={e => router.push(`/post/edit-post/${post.id}`)}
                      >
                        <EditIcon />
                      </span>
                      </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div className="float-right">
          <Pagination>{items}</Pagination>
          {/* <nav>
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
          </nav> */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostTable;
