import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./userList.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";

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

  const [showDialogue, setShowDialogue] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleCloseDialogue = () => {
    setUserToDelete(null);
    setShowDialogue(false);
  };
  const handleShowDialogue = (userId: string) => {
    setUserToDelete(userId);
    setShowDialogue(true);
  };

  const handleUserDelete = () => {
    if (userToDelete) {
      const updatedUserList = userList.filter(
        (user) => user.id !== userToDelete
      );
      setUserList(updatedUserList);
      setFilteredUserList(updatedUserList);
      handleCloseDialogue();
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
            <h5>
              {user?.first} {user?.last}
            </h5>
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
                <Button
                  onClick={() => handleShowDialogue(user?.id)}
                  variant="outline-danger"
                  className="delete-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
      <Modal show={showDialogue} onHide={handleCloseDialogue}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialogue}>
            Close
          </Button>
          <Button variant="danger" onClick={handleUserDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
