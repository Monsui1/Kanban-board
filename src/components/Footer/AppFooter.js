import styles from './Footer.module.css'

const AppFooter = (props) => {
    let name = 'Shcherbakov P'
    let year = 2024
    return (
        <footer className={styles.footer}>
            <div className={styles.tasks}>
                <h3 className={styles.activeTasks}>
                    Active tasks: {props.active}
                </h3>
                <h3 className={styles.finishedTasks}>
                    Finished tasks: {props.finished}
                </h3>
            </div>
            <h3 className={styles.boardInfo}>
                Kanban board by {name}, {year}
            </h3>
        </footer>
    )
}

export default AppFooter;