import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Search from "./Search";
import BookList from "./BookList";

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
            <BookList
              bookTitleMap={BOOK_TITLE_MAP}
              books={this.state.books}
              updateShelf={this.updateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
