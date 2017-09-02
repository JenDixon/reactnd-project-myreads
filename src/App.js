import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import Search from "./Search";

class BooksApp extends React.Component {
  static propTypes = {
    updateShelf: PropTypes.func,
    getBooks: PropTypes.func
  };

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      this.getBooks();
    });
  };

  getBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  render() {
    const BOOK_TITLE_MAP = {
      "Currently Reading": "currentlyReading",
      "Want to Read": "wantToRead",
      Read: "read",
      None: "none"
    };

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              onMoveBook={this.updateShelf}
              shelvedBooks={this.state.books}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelf
                    books={this.state.books}
                    title="Currently Reading"
                    bookTitleMap={BOOK_TITLE_MAP}
                    onMoveBook={this.updateShelf}
                  />

                  <Shelf
                    books={this.state.books}
                    title="Want to Read"
                    bookTitleMap={BOOK_TITLE_MAP}
                    onMoveBook={this.updateShelf}
                  />

                  <Shelf
                    books={this.state.books}
                    title="Read"
                    bookTitleMap={BOOK_TITLE_MAP}
                    onMoveBook={this.updateShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
