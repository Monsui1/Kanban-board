import React from "react";
import { useState, useEffect } from "react";
import AppHeader from "./components/Header/AppHeader";
import AppMain from "./components/Main/AppMain";
import AppFooter from "./components/Footer/AppFooter";

function AppStart(props) {
  const [active, setActive] = useState(0)
  const [finished, setFinished] = useState(0)

  const boardData = props.boardData
  const setBoardData = props.setBoardData

  useEffect(() => {
    setActive(JSON.parse(localStorage.getItem('kanbanBoardData'))[0].issues.length)
    setFinished(JSON.parse(localStorage.getItem('kanbanBoardData'))[3].issues.length)
  }, [boardData])


  return (
    <div className="App">
      <AppHeader />
      <AppMain boardData={boardData} setBoardData={setBoardData} />
      <AppFooter active={active} finished={finished} />
    </div>
  );
}

export default AppStart;
