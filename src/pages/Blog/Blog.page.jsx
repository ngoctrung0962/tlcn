import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const BlogPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="blog__title">Effective Leadership in the Digital Age</h1>
      <div className="blog__info">
        <ul className="list__info d-flex flex-column flex-md-row">
          <li className="info__text">
            By <strong>John Doe</strong>
          </li>
          <li className="info__text">
            Published in <strong>Management</strong>
          </li>

          <li className="info__text">April 16, 2020</li>
          <li className="info__text" style={{ color: "#f56565" }}>
            <strong>1 min read</strong>
          </li>
        </ul>
      </div>
      <Row className="mt-5 d-flex flex-column-reverse flex-lg-row ">
        <Col lg={9} xs={12} md={12}>
          <Card className="blog__card">
            <Card.Img
              variant="top"
              src="https://flexiblog-agency.netlify.app/static/4d23738bd67d4c73520a4479fe04f87c/f47df/image.webp"
              className="img-fluid blog__img"
            />
            <Card.Body>
              <Card.Title className="blog__head">
                Primo in altis pelle alumnae
              </Card.Title>
              <Card.Text className="blog__detail">
                Lorem markdownum obvius in seque opus, est bicorni forte; laeva.
                Iurant patria beatam semel communis et atra qua fugit, solet
                invicti cui inter patulas regibus remolliat volumina sorori?
                Quidem miscentem regna interea natura in adligat, aenum onere
                placere lympha. Sunt tantum intentare exhortatus avidas
                Scythides lacrimis imitatus prohibent terraeque donec ulterius
                thalamosque fero comitantibus. Tela cervicem insiluit locis,
                falsa et umida ulterius digitos excipiunt!
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} xs={12} md={12}>
          <Card>
            <Card.Img
              variant="top"
              src={""}
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogPage;
