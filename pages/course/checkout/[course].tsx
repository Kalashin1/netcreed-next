/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import Layout from '../../Layout';
import BillingForm from '../../../components/Billing-Form';
import BillingInfo from '../../../components/Billing-Info';
import { getCourse } from '../../../helper';
import { CourseSchema } from '../../../types';

export const getServerSideProps = async (context: any) => {
  const { course } = context.query;
  const [_course, err] = await getCourse(course);
  // console.log(course)
  if (err) {
    console.log(err);
  }

  return {
    props: { course: _course },
  };
};

type Props = {
  course: CourseSchema;
};

const Checkout: FC<Props> = ({ course }) => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            {course && <BillingInfo courseId={course?.id!} />}
          </div>
          <div className="col-md-8">
            {course && (
              <BillingForm
                price={course.price!}
                courseId={course.id!}
                courseDescription={course.description.slice(0, 20)}
                courseTitle={course.title}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
