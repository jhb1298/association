import React, { Component } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/events.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            searchText: "", // Store fetched events here,
            sortBy: "desc"
        };
    }

    componentDidMount() {
        AOS.init({
            // Options go here
        });

        // Fetch events data from your API here
        this.fetchEvents();

    }

    componentDidUpdate(prevProps, prevState) {
        // Check if the sortBy value or searchText has changed
        if (this.state.sortBy !== prevState.sortBy || this.state.searchText !== prevState.searchText) {
            // Fetch and update the books based on the new sortBy value and searchText
            this.fetchEvents();
        }
    }

    fetchEvents = async () => {
        try {
            const response = await fetch("https://za-rvqp.onrender.com/api/get-all-events"); // Replace with your API URL
            const data = await response.json();

            // Format the date to "YYYY-MM-DD" for each event
            const formattedEvents = data.map((event) => ({
                ...event,
                date: new Date(event.date).toISOString().split('T')[0], // Format the date
            }));

            // Filter events based on the searchText (case-insensitive)
            const filteredEvents = formattedEvents.filter(event =>
                event.name.toLowerCase().includes(this.state.searchText.toLowerCase())
            );

            // Determine the sorting criteria based on this.state.sortBy
            if (this.state.sortBy === "asc") {
                filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if (this.state.sortBy === "desc") {
                filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            // Update the state with the fetched, filtered, and sorted event data
            this.setState({ events: filteredEvents });
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };


    render() {
        return (
            <div>
                <div id="sortAndSearche">
                    <div className="dropDown">
                        <label style={{ fontSize: '1rem' }} htmlFor="sort">Sort by:</label>
                        <select style={{ fontSize: '1rem' }} id="sort" onChange={(e) => this.setState({ sortBy: e.target.value })}
                        >
                            <option value="desc">Descending Order</option>
                            <option value="asc">Ascending order</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end", flexGrow: ".3", margin: "5px 0", alignItems: 'center', boxSizing: "border-box" }} id="search">
                        <input id="sil" type="text" onChange={(e) => this.setState({ searchText: e.target.value })} value={this.state.searchText} />
                        <FontAwesomeIcon className="fab" id="searchbar" icon={faSearch} />
                    </div>
                </div>
                <ol id="ole">
                    {this.state.events.map((event) => (
                        <li key={event.id}>
                            <img src={event.image} alt="" />
                            <div>
                                <h3>Event Name: {event.name}</h3>
                                <h3>Date: {event.date}</h3>
                                <h3>Location: {event.location}</h3>
                                <h3>Event Details: {event.details}</h3>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default Events;
