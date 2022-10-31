import React from 'react'
import { Card } from 'react-bootstrap';
import { User } from "../types";

type appProps = Pick<User, 'username' | 'phone' | 'email' | 'github' | 'twitter'> 

const PersonalDetailsComponent: React.FC<appProps> = ({ username, email, phone, github, twitter }) => {
  return (
    <Card className="my-4">
      <Card.Header>
        <h4>Personal Details</h4>
      </Card.Header>
      <Card.Body>
        <div className="py-4">
          <p className="clearfix">
            <span className="float-left">
              Username
            </span>
            <span className="float-right text-muted">
              {username}
            </span>
          </p>
          <p className="clearfix">
            <span className="float-left">
              Phone
            </span>
            <span className="float-right text-muted">
              {phone}
            </span>
          </p>
          <p className="clearfix">
            <span className="float-left">
              Mail
            </span>
            <span className="float-right text-muted" style={{ fontSize: '.8rem' }}>
              {email}
            </span>
          </p>
          <p className="clearfix">
            <span className="float-left">
              Github
            </span>
            <span className="float-right text-muted">
              <a href={`https://github.com/${github}`}>{github}</a>
            </span>
          </p>
          <p className="clearfix">
            <span className="float-left">
              Twitter
            </span>
            <span className="float-right text-muted">
              <a href={`https://twitter.com/${twitter}`}>{twitter}</a>
            </span>
          </p>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PersonalDetailsComponent;