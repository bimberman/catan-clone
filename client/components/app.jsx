import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Room from "./room";
import Chat from "./chat/chat";

function App() {

  const [roomId, setRoomId] = React.useState("");
  const [username, setUsername] = React.useState("");

  const roomProps = {
    setRoomId: setRoomId,
    setUsername: setUsername
  }

  const chatProps = {
    roomId: roomId,
    username: username
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Room {...roomProps} />
        </Route>
        <Route exact path="/:roomId">
          <Chat {...chatProps}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
