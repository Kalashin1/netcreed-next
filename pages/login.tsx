import Layout from './Layout';
import { NextPage } from 'next';
import LoginForm from '../components/Login-Form';

const LoginPage: NextPage = ()=>{
  return (
    //@ts-ignore
    <Layout>
      <div className='text-center my-4'>
        <h3>Login To your account</h3>
      </div>
      <div className='container my-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='container'>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default LoginPage;