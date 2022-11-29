import { NextPage } from 'next';
import EngagementComponent from '../../../components/Engagement-Component';
import { getUserEngagements } from '../../../helper';
import { Author } from '../../../types';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../Layout';

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const { following } = await getUserEngagements(id as string);
  return {
    props: { following },
  };
};

//@ts-ignore
const UserFollowingComponent: NextPage = ({ following }) => {
  return (
    <Layout>
      <div className="section">
        <Container className="section-body">
          <Row className="mt-sm-4">
            <Col md={12} lg={4}>
              {following &&
                following.map((user: Author) => (
                  <EngagementComponent user={user} key={user.id} />
                ))}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default UserFollowingComponent;
