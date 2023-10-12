import React from "react";
import axios from "axios";
import AOS from 'aos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import 'aos/dist/aos.css';
import '../css/library.css';

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      sortBy: "name",
      searchText: "", // New state variable for search text
    };
  }

  componentDidMount() {
    AOS.init({
      // Options go here
    });

    // Fetch book data when the component mounts
    this.fetchBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the sortBy value or searchText has changed
    if (this.state.sortBy !== prevState.sortBy || this.state.searchText !== prevState.searchText) {
      // Fetch and update the books based on the new sortBy value and searchText
      this.fetchBooks();
    }
  }

  fetchBooks = async () => {
    try {
      const response = await axios.get("https://za-rvqp.onrender.com/api/get-all-books");
      let books = response.data;

      // Filter books based on the searchText (case-insensitive)
      books = books.filter(book => 
        book.name.toLowerCase().includes(this.state.searchText.toLowerCase())
      );

      // Determine the sorting criteria based on this.state.sortBy
      if (this.state.sortBy === "name") {
        books.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.state.sortBy === "author") {
        books.sort((a, b) => a.author.localeCompare(b.author));
      }

      // Clear the existing books array before updating it with filtered and sorted data
      this.setState({ books: [] }, () => {
        // Update the state with the fetched, filtered, and sorted book data
        this.setState({ books });
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Event handler for updating searchText
  handleSearchInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  addBook = async (bookId, userId) => {
    try {
      const response = await axios.post(`https://za-rvqp.onrender.com/api/add-requested/${bookId}/${userId}`);
      // Check if the request was successful
      alert(response.data.message);
      if (response.status === 200) {
        console.log('User added to the requested list successfully');
      } else {
        console.error('Failed to add user to the requested list');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <div>
        <div id="sortAndSearchl">
          <div className="dropDown">
            <label style={{ fontSize: '1rem' }} htmlFor="sort">Sort by: </label>
            <select style={{ fontSize: '1rem' }} id="sort" onChange={(e) => this.setState({ sortBy: e.target.value })}>
              <option value="name">Book Name</option>
              <option value="author">Writers Name</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end", flexGrow: ".3", margin: "5px 0", alignItems: 'center', boxSizing: "border-box" }} id="search">
            <input id="sil" type="text" onChange={this.handleSearchInputChange} value={this.state.searchText} />
            <FontAwesomeIcon className="fab" id="searchbar" icon={faSearch} />
          </div>
        </div>

        <ol id="oListL">
          {this.state.books.map((book) => (
            <li key={book.id}>
              <div style={{ aspectRatio: '1/1', height: '60%' }}>
                <img
                  style={{ width: '100%', height: '100%', borderRadius: '5%' }}
                  src={book.image}
                  alt=""
                />
              </div>
              <div style={{ padding: '3%', textAlign: 'left' }}>
                <h3 style={{ textAlign: 'left' }}>Name: {book.name}</h3>
                <h4>Writer: {book.author}</h4>
                <h4>Available: {book.available}</h4>
                <button  
                onClick={() => localStorage.getItem("id") ? this.addBook(book.id, localStorage.getItem("id")) :null}>
                Order
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Library;
