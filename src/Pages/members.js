import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/members.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Members() {
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    AOS.init({
      // Options go here
    });
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("https://za-rvqp.onrender.com/api/get-all-members"); // Replace with your API URL
      const data = await response.json();

      // Filter members based on the searchText (case-insensitive)
      const filteredMembers = data.filter((member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase())
      );

      // Determine the sorting criteria based on sortBy
      if (sortBy === "id") {
        filteredMembers.sort((a, b) => a.id - b.id);
      } else if (sortBy === "name") {
        filteredMembers.sort((a, b) => a.name.localeCompare(b.name));
      }

      // Update the state with the fetched, filtered, and sorted member data
      setMembers(filteredMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    // Check if the sortBy value or searchText has changed
    // Fetch and update the members based on the new sortBy value and searchText
    fetchMembers();
  }, [sortBy, searchText]);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <div>
        <div id="sortAndSearchm">
          <div className="dropDown">
            <label style={{ fontSize: "1rem" }} htmlFor="sort">
              Sort by:
            </label>
            <select
              style={{ fontSize: "1rem" }}
              id="sort"
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
              value={sortBy}
            >
              <option value="id">ID</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              flexGrow: ".3",
              margin: "5px 0",
              alignItems: "center",
              boxSizing: "border-box",
            }}
            id="search"
          >
            <input
              id="sil"
              type="text"
              onChange={handleSearchInputChange}
              value={searchText}
            />
            <FontAwesomeIcon className="fab" id="searchbar" icon={faSearch} />
          </div>
        </div>
        <ol id="oListm">
          {members.map((member) => (
            <a href={`members/${member.id}`} key={member.id}>
              <li>
                <div className="liImage">
                  <img
                    className="mimg"
                    width="100%"
                    height="100%"
                    src={member.image}
                    alt=""
                  />
                </div>
                <div
                  className="infom"
                  style={{ padding: "2%", alignSelf: "self-start" }}
                >
                  <h4>ID: {member.id}</h4>
                  <h4>Name: {member.name}</h4>
                  <h4>Department: {member.dept}</h4>
                  <h4>Mail: {member.email}</h4>
                  <h4>Phone: {member.phone}</h4>
                  <h4>About: {member.about}</h4>
                </div>
              </li>
            </a>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Members;
