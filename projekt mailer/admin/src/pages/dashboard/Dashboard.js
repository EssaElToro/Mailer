import React, { useEffect } from "react";
import "./Dashboard.scss";
import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const nameRef = React.createRef();
  const surnameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const [users, setUsers] = useState([]);

  const _isIncorrectEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      return false;

    return true;
  };

  const addEmailHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value,
      surname = surnameRef.current.value,
      email = emailRef.current.value,
      password = passwordRef.current.value;

    if (
      name.length < 5 ||
      surname.length < 5 ||
      password.length < 5 ||
      _isIncorrectEmail(email)
    ) {
      alert("Twoje dane nie spełniają wymagań");
      return;
    }

    const data = { name, surname, email, password };
    try {
      const response = await axios.post("/api/users", data, {});

      if (response.data.success) {
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }

    alert("Udało się utworzyć użytkownika");
  };

  const getUsers = async () => {
    const response = await axios.get("/api/users");

    if (response.data.success) {
      const users = response.data.users;
      setUsers(users);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (e, id) => {
    e.preventDefault();

    const response = await axios.post("/api/delete-user", { id });
    if (response.data.success) {
      getUsers();
      alert("Udało się usunąć użytkownika");
    }
    if (response.data.admin) {
      alert("Nie udało się usunąć użytkownika, ponieważ jest on adminem");
    }
  };

  return (
    <div className="Dashboard-container">
      <h1>Welcome in admin panel</h1>

      <form>
        <input ref={nameRef} type="text" placeholder="Name" />
        <input ref={surnameRef} type="text" placeholder="Surname" />
        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={passwordRef} type="text" placeholder="Password" />
        <button onClick={addEmailHandler}>Add</button>
        <div>
          <br></br>
          <div className="users">
            <h1>Emails</h1>
            {users.map((user) => (
              <div key={user._id} className="user">
                <p>{user.email}</p>
                <button onClick={(e) => deleteUser(e, user._id)}>
                  Delete User
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
