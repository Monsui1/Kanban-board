import React from "react"
import User from "./User"
import styles from './Header.module.css';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.heading}>Awesome Kanban Board</h1>
            <User />
        </header>
    )
}

export default AppHeader