import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./Page/Main/Main";

const App = () => {
  // console.log(speed, "speed?");

  return (
    <div className="w-screen h-screen drag-area">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
