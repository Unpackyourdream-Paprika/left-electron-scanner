import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./Page/Main/Main";

const App = () => {
  // console.log(speed, "speed?");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
