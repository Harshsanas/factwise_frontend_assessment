import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./userList.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function calculateAge(dob: string | undefined): number | string {
  if (!dob) return "N/A";
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

const UserList: React.FC = () => {
  const [search, setNewSearch] = useState<string>("");
  const [closeIcon, setCloseIcon] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserData[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<UserData[]>([]);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const toggleAccordion = (userId: string) => {
    setExpandedUser((prev) => (prev === userId ? null : userId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await import("../data/celebrities.json");
        setUserList(data.default);
        setFilteredUserList(data.default);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setNewSearch(searchTerm);
    if (searchTerm.length !== 0) {
      setCloseIcon(true);
      const filteredUsers = userList.filter((user) =>
        user.first.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUserList(filteredUsers);
    } else {
      setFilteredUserList(userList);
    }
  };

  return (
    <div className="user-list-container">
      <InputGroup className="mb-3 search-icon">
        <Form.Control
          placeholder="Search User"
          aria-label="Search User"
          aria-describedby="basic-addon1"
          value={search}
          onChange={handleSearchChange}
        />
        <InputGroup.Text id="basic-addon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </InputGroup.Text>
      </InputGroup>
      {filteredUserList.map((user) => (
        <div
          key={user.id}
          className={`user-item ${expandedUser === user.id ? "expanded" : ""}`}
        >
          <div className="nameTag" onClick={() => toggleAccordion(user.id)}>
            <img src={user?.picture} alt="profile" />
            <h3>
              {user?.first} {user?.last}
            </h3>
            <span className="accordion-icon">
              {expandedUser === user.id ? "-" : "+"}
            </span>
          </div>
          {expandedUser === user.id && (
            <>
              <div className="subHead">
                <div>
                  <label>Age</label> <br />
                  <span>{calculateAge(user?.dob)} years</span>
                </div>
                <div>
                  <label>Gender</label>
                  <br />
                  <span>{user?.gender}</span>
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <span>{user?.country}</span>
                </div>
              </div>
              <div className="descriptionSec">
                <label>Description</label>
                <br />
                <span>{user?.description}</span>
              </div>

              <div className="user-actions">
                <Button variant="outline-danger" className="delete-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </Button>
                <Button variant="outline-primary" className="edit-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
