import React, { Component } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

class SingleBook extends Component {
  state = {
    selected: false,
  };

  render() {
    const { selected } = this.state;
    const { book } = this.props;

    return (
      <Card
        onClick={() => this.setState({ selected: !selected })}
        style={{
          border: selected ? '3px solid red' : 'none',
          height: '100%', // Imposta altezza del contenitore della carta al 100%
        }}
        className="bg-secondary text-center"
      >
        <Card.Img src={book.img} className="h-50" style={{ objectFit: 'cover' }} />
        <Card.Body style={{ height: '50%' }}> {/* Imposta altezza del corpo della carta al 50% */}
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
    );
  }
}

export default SingleBook;
