import "./mailbox.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const Mailbox = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [sendMessageForm, setSendMessageForm] = useState(false);
  const [sendMessageEmail, setSendMessageEmail] = useState("");

  const getUsers = async () => {
    const response = await axios.get("/api/users");

    if (response.data.success) {
      const users = response.data.users;
      setUsers(users);
    }
  };

  const getMessages = async (email) => {
    setSendMessageEmail("");
    const response = await axios.post("/api/messages", { email }, {});

    if (response.data.success) {
      const message = response.data.messages;
      console.log(message);
      setMessages(message);
    }
  };

  const checkEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return email;

    return "nie znane";
  };
  const sendMessage = (email) => {
    setMessages([]);
    setSendMessageEmail(email);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="main">
      <div className="users">
        <h1>Users</h1>
        {users.map((user) => (
          <div key={user._id} className="user">
            <p>{user.email}</p>
            <button
              onClick={() => {
                getMessages(user.email);
              }}
            >
              show chat
            </button>
            <button
              onClick={() => {
                sendMessage(user.email);
              }}
            >
              send message
            </button>
          </div>
        ))}
      </div>
      <div className="chat">
        <h1>Chat</h1>
        {!sendMessageEmail &&
          messages.map((message) => (
            <div key={message._id}>
              <h2>Title: {message.title}</h2>
              <p>From: {checkEmail(message.sender)}</p>
              <p>Content: {message.content}</p>
            </div>
          ))}
        {sendMessageEmail && (
          <div className="sender">
            <p>Do: {sendMessageEmail}</p>
            <form>
              <p>Wpisz wiadomość:</p>
              <input type="text"></input>
            </form>
            <button className="send" onClick={sendMessage}>
              Send message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Mailbox;
