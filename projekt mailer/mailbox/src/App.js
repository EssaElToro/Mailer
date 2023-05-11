import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Mailbox from "./components/mailbox/mailbox";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="mailbox" element={<Mailbox />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
