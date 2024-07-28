import React, { useEffect, useMemo, useState } from 'react';
import styles from './Header.module.css';

const User = () => {
    const [click, setClick] = useState('notClicked')
    const userClick = () => {
        if (click == 'notClicked') {
            setClick('clicked')
        } else {
            setClick('notClicked')
        }

    }

    return (
        <div className={styles.user}>
            <div className={click == 'notClicked' ? styles.notClicked : styles.clicked} onClick={userClick}>
                <div className={styles.userImage} style={{
                    backgroundImage: "url(/imgs/user-avatar.svg)"
                }}
                ></div>
                <div className={click == 'notClicked' ? styles.arrow : `${styles.arrow} ${styles.arrowUp}`} style={{
                    backgroundImage: "url(/imgs/arrow-down.svg)"
                }}></div>
            </div>
            <div className={styles.dropDown} style={click == 'notClicked' ? {
                display: 'none'
            } : {
                display: 'block'
            }}>
                <a className={styles.link} href="">Profile</a>
                <a className={styles.link} href="">Log Out</a>
                <div className={styles.romb} style={{
                    backgroundImage: 'url(/imgs/romb.svg)'
                }}></div>
            </div>
        </div>
    )
}

export default User;