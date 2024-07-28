import { Routes, Route, useLocation } from "react-router-dom"
import { React, useEffect, useState } from "react"
import AppStart from './AppStart'
import TaskPage from "./components/Main/Block/TaskPage"

const App = () => {
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;

    const [boardData, setBoardData] = useState([])

    useEffect(() => {
        const storedData = localStorage.getItem('kanbanBoardData')
        if (storedData) {
            setBoardData(JSON.parse(storedData))
        } else {
            const initialData = [
                { title: 'Backlog', issues: [] },
                { title: 'Ready', issues: [] },
                { title: 'In Progress', issues: [] },
                { title: 'Finished', issues: [] }
            ];
            setBoardData(initialData);
            localStorage.setItem('kanbanBoardData', JSON.stringify(initialData));
        }
    }, []);

    return (
        <div>
            <Routes location={previousLocation || location}>
                <Route path="/" element={<AppStart boardData={boardData} setBoardData={setBoardData} />} />
            </Routes>
            {previousLocation && (
                <Routes>
                    <Route path="/tasks/:blockName/:id" element={<TaskPage boardData={boardData} setBoardData={setBoardData} />} />
                </Routes>
            )}
        </div>

    )
}

export default App;