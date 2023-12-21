import React, { Component } from 'react';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import SingleBook from './SingleBook';
import FantasyData from '../data/fantasy.json';
import HistoryData from '../data/history.json';
import HorrorData from '../data/horror.json';
import RomanceData from '../data/romance.json';
import ScifiData from '../data/scifi.json';
import "./Home.css";
import Footer from './Footer';
import NavBar from './NavBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      selectedCategory: 'All',
      currentPage: 1,
      itemsPerPage: 20,
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleCategorySelect = (selectedCategory) => {
    this.setState({ selectedCategory, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { searchTerm, selectedCategory, currentPage, itemsPerPage } = this.state;

    const categoriesData = {
      fantasy: FantasyData,
      history: HistoryData,
      horror: HorrorData,
      romance: RomanceData,
      scifi: ScifiData,
    };

    const filteredBooks =
      selectedCategory === 'All' || !selectedCategory
        ? Object.values(categoriesData).flat()
        : categoriesData[selectedCategory.toLowerCase()] || [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

    const filteredAndSearchedBooks = currentItems.filter((libro) =>
      libro.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div id="contenitoreCarte">
        <NavBar
          handleCategorySelect={this.handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        <InputGroup className="my-3 w-50">
          <FormControl
            placeholder="cerca il libro"
            onChange={this.handleSearchChange}
            value={searchTerm}
          />
        </InputGroup>

        <Row className="justify-content-center gap-3 my-5 w-100">
          {filteredAndSearchedBooks.map((libro) => (
            <Col key={libro.id} md={2} className="mb-4">
              <SingleBook book={libro} /> {/* Utilizza il componente SingleBook */}
            </Col>
          ))}
        </Row>

        <Footer
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredBooks.length}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Home;
