import React, { Component } from 'react';
import { Modal, ListGroup, Form, Button } from 'react-bootstrap';

class CommentArea extends Component {
  state = {
    comments: [],
    newComment: '',
    newRate: 1,
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    const { book } = this.props;
    const elementId = book.asin;

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${elementId}/comments`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0NWQ1MGI1MjViYjAwMThlZDA4YWUiLCJpYXQiOjE3MDMxNzM0NTYsImV4cCI6MTcwNDM4MzA1Nn0.jPKQLpyP7hbbQgazwWDYtkJXwgnb8MKuX7l6g_hij9w',
        },
      });

      if (response.ok) {
        const comments = await response.json();
        this.setState({ comments });
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitReview = async (e) => {
    e.preventDefault();
    const { newComment, newRate } = this.state;
    const { book } = this.props;

    const elementId = book.asin;
    const apiUrl = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0NTRkMWI1MjViYjAwMThlZDA4NzEiLCJpYXQiOjE3MDMxNzEyODIsImV4cCI6MTcwNDM4MDg4Mn0.jeuXATAwYkvRjWRndps77rRPCribzQsbp58ys0Khy0A',
        },
        body: JSON.stringify({
          comment: newComment,
          rate: newRate,
          elementId,
        }),
      });

      if (response.ok) {
        console.log('Recensione inviata con successo!');
        this.fetchComments();
      } else {
        console.error('Errore nell\'invio della recensione');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }

    this.setState({ newComment: '', newRate: 1 });
  };

  render() {
    const { comments, newComment, newRate } = this.state;
    const { show, handleClose } = this.props;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recensioni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment._id}>
                <p>{comment.comment}</p>
                <p>Rating: {comment.rate}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          
          <Form onSubmit={this.handleSubmitReview}>
            <Form.Group controlId="newComment">
              <Form.Label>Aggiungi una recensione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="newComment"
                value={newComment}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="newRate">
              <Form.Label>Vota da 1 a 5</Form.Label>
              <Form.Control
                type="number"
                name="newRate"
                value={newRate}
                onChange={this.handleInputChange}
                min={1}
                max={5}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Invia recensione
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CommentArea;
