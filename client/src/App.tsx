import { Route, Routes } from "react-router-dom";

import EmptyLayout from "./layouts/EmptyLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import Connect from "./pages/Connect";
import Profile from "./pages/Profile";

function App() {
  const publicRoutes = (
    <Route path="/" element={<EmptyLayout />}>
      <Route index element={<Welcome />} />
      <Route path="create" element={<Create />} />
      <Route path="connect" element={<Connect />} />
    </Route>
  );

  const privateRoutes = (
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Profile />} />
    </Route>
  );

  return (
    <div className="app">
      <Routes>
        {publicRoutes}
        {privateRoutes}
      </Routes>
    </div>
  );
}

export default App;
