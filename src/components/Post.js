import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { Row, Container, Col, Image } from "react-bootstrap";
import CreateComment from "./CreateComment";
import axios from "axios";

function Post() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState();
  const api = process.env.REACT_APP_API;

  useEffect(() => {
    //Fetch from blog backend
    axios
      .get(`${api}/api/posts/${id}`)
      .then((response) => setSinglePost(response.data))
      .catch(console.error);
  }, []);

  /*Get the whished date format DD-MM-YYYY*/
  const getDateFormat = (articleDate) => {
    const myDateArray = articleDate.slice(0, 10);
    const newDateFormat = myDateArray.split("-").reverse().join("-");
    return newDateFormat;
  };

  /*Slice the Content in two parts*/
  const sliceContent = (content) => {
    const firstPartOfContent = content.slice(0, content.length / 2);
    const secondPartOfContent = content.slice(firstPartOfContent.length);
    return [firstPartOfContent, secondPartOfContent];
  };

  const handleLike = (e) => {
    axios
    .put(`${api}/api/posts/${id}/likes`)
    .then((response) => console.log(response))
    .catch(console.error);

    e.target.disabled = true;
  }

  return (
    <div>
      {singlePost ? (
        <>
          {console.log(singlePost)}
          <Container className="postBox">
            <Row className="rowdesign">
              <Col>
                <h2>{singlePost.post.title}</h2>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={12}>
                <Image
                  className="img-fluid imageRow"
                  align="start"
                  src={singlePost.post.url}
                  alt={singlePost.post.description}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="info">
                  {singlePost.post.first_name + " " + singlePost.post.last_name}
                </p>
                <p className="info">{getDateFormat(singlePost.post.date)}</p>
              </Col>
            </Row>
            <Row className="rowdesign">
              <Col xs={12} lg={6}>
                <p className="text" style={{ textAlign: "justify" }}>
                  {sliceContent(singlePost.post.content)[0]}
                </p>
              </Col>
              <Col>
                <p className="text" style={{ textAlign: "justify" }}>
                  {sliceContent(singlePost.post.content)[1]}
                </p>
              </Col>
            </Row>
            <Row className="likes">
              <Col>Likes: {singlePost.post.likes}</Col>
              <Col><button onClick={handleLike} className="like-button">I Like</button></Col>
            </Row>
          </Container>
          <Container className="postBox comment-container">
            <Row className="comments-heading">
              <h3>Comments</h3>
            </Row>
            {singlePost.comments.map((post) => (
              <Row>
                <Comment comment={post} />
              </Row>
            ))}
            <Row>
              <CreateComment />
            </Row>
          </Container>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default Post;
