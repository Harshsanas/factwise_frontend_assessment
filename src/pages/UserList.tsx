import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./userList.css";


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
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search User"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="user-list">
        {filteredUserList.map((user) => (
          <li
            key={user.id}
            className={`user-item ${
              expandedUser === user.id ? "expanded" : ""
            }`}
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
                    <label>Age</label>
                    <span>{calculateAge(user?.dob)} years</span>
                  </div>
                  <div>
                    <label>Gender</label>
                    <span>{user?.gender}</span>
                  </div>
                  <div>
                    <label>Country</label>
                    <span>{user?.country}</span>
                  </div>
                </div>
                <div className="descriptionSec">
                  <label>Description</label>
                  <span>{user?.description}</span>
                </div>

                <div className="user-actions">
                  <OverlayTrigger
                    key="edit"
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-edit-${user.id}`}>Edit</Tooltip>
                    }
                  >
                    <Button variant="outline-primary" className="edit-button">
                      Edit
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    key="delete"
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-delete-${user.id}`}>Delete</Tooltip>
                    }
                  >
                    <Button variant="outline-danger" className="delete-button">
                      Delete
                    </Button>
                  </OverlayTrigger>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
