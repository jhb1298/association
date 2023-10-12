import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home";
import Library from "./Pages/library";
import Events from "./Pages/events";
import Members from "./Pages/members";
import Fund from "./Pages/fund";
import Register from "./Pages/register";
import LogIn from "./Pages/logIn";
import Footer from "./Pages/footer";
import Nav from "./Pages/nav";
import Admin from "./Pages/admin";
import TestP from "./Pages/textP";
import AMember from "./Pages/aMember";
import AEvent from "./Pages/aEvent";
import AFund from "./Pages/aFund";
import ALibrary from "./Pages/aLibrary";
import AManager from "./Pages/aManager";
import ANotice from "./Pages/aNotice";
import Profile from "./Pages/profile";
import OwnProfile from './Pages/ownProfile'

function AppContent() {
  const location = useLocation();
  //const home = location.pathname === "/home";
  const home=location.pathname === "/";
  const library = location.pathname === "/library";
  const events = location.pathname === "/events";
  const members = location.pathname === "/members";
  const fund = location.pathname === "/fund";
  

  console.log(location.pathname);
  return (
    <div>
        {(home || library || events || members || fund) ? <Nav /> : null}
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/*<Route exact path="/home" element={<Home />} />*/}
          <Route exact path="/library" element={<Library />} />
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/members" element={<Members />} />
          <Route exact path="/members/:id" element={<Profile />} />
          <Route exact path="/fund" element={<Fund />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/profile" element={<OwnProfile />} />
          <Route exact path="/admin" element={<Admin />} >
            <Route exact path="/admin/" element={<AMember />} />
            <Route exact path="/admin/testP" element={<TestP />} />
            <Route exact path="/admin/amember" element={<AMember />} />
            <Route exact path="/admin/alibrary" element={<ALibrary />} />
            <Route exact path="/admin/aevents" element={<AEvent />} />
            <Route exact path="/admin/afund" element={<AFund />} />
            <Route exact path="/admin/amanager" element={<AManager />} />
            <Route exact path="/admin/anotice" element={<ANotice />} />
          </Route>
        </Routes>
        {(home || library || events || members || fund) ? <Footer /> : null}
    </div>
  );
}

function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;
