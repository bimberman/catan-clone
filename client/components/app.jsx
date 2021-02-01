import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Room from "./room";
import Chat from "./chat/chat";
import Board from './board/board';

const App = () => {

  const [roomId, setRoomId] = React.useState("");
  const [username, setUsername] = React.useState("");

  const boardProps = {

  }

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
          <Board {...boardProps} />
        </Route>
        <Route exact path="/room">
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
