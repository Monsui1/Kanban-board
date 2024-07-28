import React from 'react';
import styles from './Main.module.css';
import Block from './Block/Block';
import { useState, useEffect } from 'react';

const AppMain = (props) => {

    return (
        <main className={styles.main}>
            <ul className={styles.blockList}>
                <Block boardData={props.boardData} setBoardData={props.setBoardData} blockName='Backlog' />
                <Block boardData={props.boardData} setBoardData={props.setBoardData} blockName='Ready' />
                <Block boardData={props.boardData} setBoardData={props.setBoardData} blockName='In Progress' />
                <Block boardData={props.boardData} setBoardData={props.setBoardData} blockName='Finished' />
            </ul>
        </main >
    )
}

export default AppMain;