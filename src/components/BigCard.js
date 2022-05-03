import React from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'

function BigCard({post}) {
  const previewLength = 45;
  const text = post.fields.content.split(" ");
  let previewText = "";
  for(let i = 0; i < previewLength; i ++)
  {
    previewText = previewText + " " + text[i];
    console.log("preview: " + previewText);

  }
  console.log(text);
  return (

    <>

  
{/* <Card style={{ marginTop:"1rem", marginLeft:"auto", alignItems:'start' }}>
<Image className="cardStyle-BIG-pic" src={post.fields.picture.fields.file.url} />
        <Card.Body className="cardStyle-BIG-body">
          <Card.Title>{post.fields.title}</Card.Title>
          <Card.Text>{sampleText}</Card.Text>
          <Link to={post.sys.id}>
            <Button variant="secondary">Zum Artikel</Button>
            </Link>
        </Card.Body>
      </Card> */}


     
      <Card  style={{ marginTop:"1rem", marginLeft:"auto" }}>
      <Row xs={1} md={2} className="g-4" >
        <Col >
        <Image fluid src={post.fields.picture.fields.file.url}npms
        />
        </Col>
        
        <Col className="big-card-body">
          <h3>{post.fields.title}</h3>

        <p>{previewText}</p>
            <Link to={post.sys.id}><Button variant="secondary">Zum Artikel</Button></Link>
        </Col>
      </Row>
      </Card>
    </>
  );
}

export default BigCard;
