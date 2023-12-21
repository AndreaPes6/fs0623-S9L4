import React, { Component } from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import CommentArea from './CommentArea';

class SingleBook extends Component {
  state = {
    selected: false,
    showModal: false,
    comment: '',
    rate: 1,
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitReview = async () => {
    const { comment, rate } = this.state;
    const { book } = this.props;

    const elementId = book.asin;
    const apiUrl = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0NWQ1MGI1MjViYjAwMThlZDA4YWUiLCJpYXQiOjE3MDMxNzM0NTYsImV4cCI6MTcwNDM4MzA1Nn0.jPKQLpyP7hbbQgazwWDYtkJXwgnb8MKuX7l6g_hij9w',
        },
        body: JSON.stringify({
          comment,
          rate,
          elementId,
        }),
      });

      if (response.ok) {
        console.log('Recensione inviata con successo!');
      } else {
        console.error('Errore nell\'invio della recensione');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }

    this.handleCloseModal();
  };

  render() {
    const { selected, showModal, comment, rate } = this.state;
    const { book } = this.props;

    return (
      <>
        <Card
          onClick={() => {
            this.setState({ selected: !selected });
            this.handleShowModal();
          }}
          style={{
            border: selected ? '3px solid red' : 'none',
            height: '100%',
          }}
          className="bg-secondary text-center"
        >
          <Card.Img src={book.img} className="h-50" style={{ objectFit: 'cover' }} />
          <Card.Body style={{ height: '50%' }}>
            <Card.Title style={{ color: 'black' }}>{book.title}</Card.Title>
            <Card.Text>{book.category}</Card.Text>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item className="bg-secondary align-self-center" id="prezzo">
              €{book.price}
            </ListGroup.Item>
            <Button variant="outline-light" className="m-3 w-50 align-self-center">
              Compra
            </Button>
          </ListGroup>
        </Card>

        <CommentArea show={showModal} handleClose={this.handleCloseModal} book={book} />
      </>
    );
  }
}

export default SingleBook;
