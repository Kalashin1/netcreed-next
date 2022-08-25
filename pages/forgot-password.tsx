import Layout from './Layout';
import { NextPage } from 'next';
import ForgotPasswordForm from '../components/Forgot-Password';

const ForgotPassword: NextPage = ()=>{
  return (
    <Layout>
      <div className='text-center my-4'>
        <h3>Enter your email</h3>
      </div>
      <div className='container my-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='container'>
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default ForgotPassword;