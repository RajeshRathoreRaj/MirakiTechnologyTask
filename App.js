import "./App.css";
import Login from "./Login";
import TaskItem from "./DisplayTask";
import TaskForm from "./TaskForm";
import ListOfTask from "./ListOfTask";
import DisplayTask from "./DisplayTask";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            element={<DisplayTask />}
            path="displaytask"
            history={props.history}
          />
          <Route element={<ListOfTask />} path="list" history={props.history} />
          <Route
            element={<TaskForm />}
            path="taskform"
            history={props.history}
          />
          <Route
            element={<TaskItem />}
            path="taskitem"
            history={props.history}
          />
          <Route element={<Login />} path="login" history={props.history} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
