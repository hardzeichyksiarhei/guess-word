import { Route, Routes } from "react-router-dom";

import EmptyLayout from "./layouts/EmptyLayout";
import Welcome from "./pages/Welcome";

function App() {
  return <div className="app">
    <Routes>
      <Route path="/" element={<EmptyLayout />}>
        <Route index element={<Welcome />} />
      </Route>
    </Routes>
  </div>;
}

export default App;
