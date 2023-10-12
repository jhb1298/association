import React from "react";
import axios from "axios";

class aEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      date: "",
      location: "",
      image: "",
      details: "",
      organizer: "",
      events: [],
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    this.fetchEvents(); // Fetch events when the component mounts
  }

  // Function to fetch all events from the API
  fetchEvents = async () => {
    try {
      const response = await axios.get("https://za-rvqp.onrender.com/api/get-all-events");
      const events = response.data; // Assuming the response contains an array of events
      this.state.events = events
      this.setState({ events });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  handleImageChange(event) {
    const file = event.target.files[0];
    console.log("Inside handle image")

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'bzaimage'); // Replace with your Cloudinary upload preset

      axios.post(`https://api.cloudinary.com/v1_1/dapnfbeyi/image/upload`, formData)
        .then((response) => {
          if (response.status === 200) {
            const imageURL = response.data.secure_url;
            console.log("Response:"+imageURL)
            this.state.image=imageURL
            console.log("Inside state:"+this.state.image)
          }
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  }

  // Function to handle form submission for adding an event
  handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      id: parseInt(this.state.id),
      name: this.state.name,
      date: this.state.date,
      location: this.state.location,
      image: this.state.image,
      details: this.state.details,
      organizer: this.state.organizer,
    };
    try {
      // Make an API request to create a new event
      await axios.post("https://za-rvqp.onrender.com/api/add-event", newEvent);
      // Clear form fields after successful creation
      this.setState({
        id: "",
        name: "",
        date: "",
        location: "",
        image: "",
        details: "",
        organizer: "",
      });
      alert("Event added successfully!");
    } catch (error) {
      alert("Failed to add event. Please try again.");
    }
  };

  // Function to handle deleting an event by ID
  handleDeleteEvent = async (event) => {
    event.preventDefault();
    try {
      // Make an API request to delete the event by ID
      await axios.delete(`https://za-rvqp.onrender.com/api/delete-event/${this.state.id}`);
      // Fetch the updated list of events after deletion
      this.fetchEvents();
      alert("Event deleted successfully!");
    } catch (error) {
      alert("Failed to delete event. Please try again.");
    }
  };

  render() {
    return (
      <div id="acss">
        <div>
          <h2>Number of Books: {this.state.events.length}</h2>
        </div>
        <div>
          <h2>Add an Event:</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Event ID:</label>
              <input
                type="number"
                name="id"
                value={this.state.id}
                onChange={(e) => this.setState({ id: e.target.value })}
              />
            </div>
            <div>
              <label>Event Name:</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <label>Event Date:</label>
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={(e) => this.setState({ date: e.target.value })}
              />
            </div>
            <div>
              <label>Event Location:</label>
              <input
                type="text"
                name="location"
                value={this.state.location}
                onChange={(e) => this.setState({ location: e.target.value })}
              />
            </div>
            <div>
              <label>Event Images:</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={this.handleImageChange}
              />
            </div>
            <div>
              <label>Event Details:</label>
              <input
                type="text"
                name="details"
                value={this.state.details}
                onChange={(e) => this.setState({ details: e.target.value })}
              />
            </div>
            <div>
              <label>Chief Organizer:</label>
              <input
                type="text"
                name="organizer"
                value={this.state.organizer}
                onChange={(e) => this.setState({ organizer: e.target.value })}
              />
            </div>
            <div>
              <input type="submit" value={"Insert"}></input>
            </div>
          </form>
        </div>
        <div>
          <h2>Remove an Event:</h2>
          <form onSubmit={this.handleDeleteEvent}>
            <div>
              <label>Event ID:</label>
              <input
                type="number"
                name="id"
                value={this.state.id}
                onChange={(e) => this.setState({ id: e.target.value })}
              />
            </div>
            <div>
              <input type="submit" value="Delete" />
            </div>
          </form>
        </div>
        <div>
          <h2>Events:</h2>
          {this.state.events ? (
            <ul>
              {this.state.events.map((event) => (
                <li key={event.id}>
                  ID: {event.id}, Name: {event.name}, Date: {event.date}, Location: {event.location}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading events...</p>
          )}
        </div>
      </div>
    );
  }
}

export default aEvent;
