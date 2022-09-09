import SignupForm from "../components/Signup-Form"
import { NextPage } from "next";
import Layout from "./Layout";

const Register: NextPage = () => {
  return (
    //@ts-ignore
    <Layout>
      <div className='text-center my-4'>
        <h3 className='my-4'>Create a new account</h3>
      </div>
      <div className='container my-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='container'>
              <SignupForm creator={true} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register;