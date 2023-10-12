import React from "react";
import axios from "axios";


import 'aos/dist/aos.css';
import '../css/home.css';


class aLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            author: "",
            edition: "",
            image: "",
            total: "",
            available: "",
            books: [],
        };
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount() {
        this.fetchBooks();
    }

    // Function to fetch all books from the API
    fetchBooks = async () => {
        try {
            const response = await axios.get("https://za-rvqp.onrender.com/api/get-all-books");
            const books = response.data; // Assuming the response contains an array of books
            //this.state.books = books
            this.setState({ books });
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    handleImageChange(event) {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'bzaimage'); // Replace with your Cloudinary upload preset

            axios.post(`https://api.cloudinary.com/v1_1/dapnfbeyi/image/upload`, formData)
                .then((response) => {
                    if (response.status === 200) {
                        const imageURL = response.data.secure_url;
                        this.setState({ image: imageURL })
                        console.log(this.state.image)
                    }
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        }
    }


    // Function to handle form submission for adding a book
    handleAddBook = async (event) => {
        event.preventDefault();
        const newBook = {
            id: parseInt(this.state.id),
            name: this.state.name,
            author: this.state.author,
            edition: parseInt(this.state.edition),
            image: this.state.image,
            total: parseInt(this.state.total),
            available: parseInt(this.state.available),
        };
        console.log(newBook)
        try {
            // Make an API request to create a new book
            await axios.post("https://za-rvqp.onrender.com/api/add-book", newBook); // Use the correct API endpoint URL
            // Clear form fields after successful creation
            this.setState({
                id: "",
                name: "",
                author: "",
                edition: "",
                image: "",
                total: "",
                available: "",
            });
            alert("Book added successfully!");
        } catch (error) {
            alert("Failed to add book. Please try again.");
        }
    };

    // In your component where you want to delete a book
    handleDeleteBook = async (event) => {
        event.preventDefault();
        const idToDelete = this.state.id; // Get the ID from the state
        try {
            // Make an API request to delete the book by ID
            await axios.delete(`https://za-rvqp.onrender.com/api/delete-book/${idToDelete}`);
            // Fetch the updated list of books after deletion
            this.fetchBooks();
            alert("Book deleted successfully!");
        } catch (error) {
            alert("Book does not exist.");
        }
    };



    // Inside your class component
    accept = async (b_id, m_id) => {
        try {
            const response = await axios.post(`https://za-rvqp.onrender.com/api/accept-requested/${b_id}/${m_id}`);

            if (response.status === 200) {
                console.log('User removed from requested list and added to borrowed list successfully');
            } else {
                console.error('Failed to accept book request');
            }
        } catch (error) {
            console.error('Error accepting book request:', error);
        }
        this.fetchBooks()
    };


    decline = async (b_id, m_id) => {
        try {
            // Make a POST request to the API endpoint to remove the user ID from the requested array
            const response = await axios.post(`https://za-rvqp.onrender.com/api/remove-requested/${b_id}/${m_id}`);

            if (response.status === 200) {
                console.log('User removed from the requested list successfully');
                // You can also update your component's state or perform any other necessary actions here
            } else {
                console.error('Failed to remove user from the requested list');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        this.fetchBooks()
    };

    release = async (b_id, m_id) => {
        try {
            // Make a POST request to the API endpoint to remove the user ID from the requested array
            const response = await axios.post(`https://za-rvqp.onrender.com/api/release-requested/${b_id}/${m_id}`);

            if (response.status === 200) {
                console.log('User removed from the requested list successfully');
                // You can also update your component's state or perform any other necessary actions here
            } else {
                console.error('Failed to remove user from the requested list');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        this.fetchBooks()
    }



    render() {

        return (
            <div id="acss">
                <div>
                    <h2>Number of Books: {this.state.books.length}</h2>
                </div>
                <div>
                    <h2>Add Book Info:</h2>
                    <form onSubmit={this.handleAddBook}>
                        <div>
                            <label>Book ID:</label>
                            <input
                                type="number"
                                name="id"
                                value={this.state.id}
                                onChange={(e) => this.setState({ id: e.target.value })}

                            />
                        </div>
                        <div>
                            <label>Book Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Authors:</label>
                            <input
                                type="text"
                                name="author"
                                value={this.state.author}
                                onChange={(e) => this.setState({ author: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Eddition:</label>
                            <input
                                type="number"
                                name="eddition"
                                value={this.state.edition}
                                onChange={(e) => this.setState({ edition: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Book Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={this.handleImageChange}
                            />
                        </div>
                        <div>
                            <label>Total Book:</label>
                            <input
                                type="number"
                                name="total"
                                value={this.state.total}
                                onChange={(e) => this.setState({ total: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Avialable Book:</label>
                            <input
                                type="number"
                                name="available"
                                value={this.state.available}
                                onChange={(e) => this.setState({ available: e.target.value })}
                            />
                        </div>
                        <div>
                            <input type="submit" value={"Insert"}></input>
                        </div>
                    </form>
                </div>
                <div>
                    <h2>Remove a book:</h2>
                    <form onSubmit={this.handleDeleteBook}>
                        <div>
                            <label>Book ID:</label>
                            <input
                                type="number"
                                name="id"
                                value={this.state.id}  // Add this line
                                onChange={(e) => this.setState({ id: e.target.value })}  // Add this line
                            />
                        </div>
                        <div>
                            <input type="submit" value="Delete" />
                        </div>
                    </form>
                </div>

                <div>
                    <h2>Books:</h2>
                    {this.state.books ? (
                        <ul>
                            {this.state.books.map((book) => (
                                <li key={book.id}>
                                    ID: {book.id}, Name: {book.name}, Author: {book.author}, Available: {book.available}
                                    <h2>Requested:</h2>
                                    <ul>
                                        {book.requested.map((req) => {
                                            return (
                                                <div key={req.id}>
                                                    <li>
                                                        ID: <a href={`/members/${req.id}`} target="_blank" rel="noreferrer">{req.id}</a>
                                                    </li>
                                                    <input type="submit" onClick={() => this.accept(book.id, req.id)} value="accept" />
                                                    <input type="submit" onClick={() => this.decline(book.id, req.id)} value="decline" />
                                                </div>
                                            );
                                        })}

                                    </ul>
                                    <h2>Borrowed:</h2>
                                    <ul>
                                        {book.borrowed.map((br) => {
                                            return (
                                                <div>
                                                    <li key={br.id}>
                                                    ID: <a href={`/members/${br.id}`} target="_blank" rel="noreferrer">{br.id}</a>
                                                    </li>
                                                    <input type="submit" onClick={() => this.release(book.id, br.id)} value="release"></input>
                                                </div>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ))}
                        </ul>

                    ) : (
                        <p>No request</p>
                    )}
                </div>
            </div>);
    }
}

export default aLibrary;
