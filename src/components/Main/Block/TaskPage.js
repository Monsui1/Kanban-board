import React, { useEffect, useState, useRef } from 'react';
import styles from '../Main.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const TaskPage = (props) => {
    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [text, setText] = useState()
    const [btn, setBtn] = useState('edit')
    const navigate = useNavigate();

    const boardData = props.boardData
    const setBoardData = props.setBoardData

    const { id } = useParams()
    const { blockName } = useParams()
    useEffect(() => {
        boardData.map(block => {
            if (block.title == blockName) {
                block.issues.map(issue => {
                    if (issue.id == id) {
                        setName(issue.name)
                        setDesc(issue.description)
                    }
                })
            }
        })
    }, [boardData])

    const handleEdit = () => {
        if (btn == 'edit') {
            setBtn('submit')
        } else {
            setDesc(text)
            setBtn('edit')
        }
    }

    const handleText = event => {
        setText(event.target.value)
    }

    useEffect(() => {
        if (desc) {
            setBoardData(boardData.map(block => {
                if (block.title == blockName) {
                    block.issues.map(issue => {
                        if (issue.id == id) {
                            issue.description = desc
                            const thisIssue = { ...issue }
                            return thisIssue
                        }
                        const newIssues = { ...block.issues }
                        return newIssues
                    })
                    const newBlock = { ...block }
                    return newBlock
                }
                const finalBlock = { ...block }
                return finalBlock
            }))

            localStorage.setItem('kanbanBoardData', JSON.stringify(boardData))
        }

    }, [desc])

    return (
        <div className={styles.modalWrapper}
            onClick={() => navigate('/')}>
            <div className={styles.modal}
                onClick={e => e.stopPropagation()}
            >
                <div onClick={() => navigate('/')}
                    className={styles.cross}
                    style={{
                        backgroundImage: "url(/imgs/cross.svg)"
                    }}></div>
                <h2 className={styles.taskName}>{name}</h2>
                <p style={btn == 'edit' ? {
                    display: 'block'
                } : {
                    display: 'none'
                }} className={styles.taskDescription}>{desc ? desc : 'This task has no description...'}</p>
                <textarea
                    id='text'
                    name='text'
                    value={text}
                    onChange={handleText}
                    className={styles.textArea} style={btn == 'edit' ? {
                        display: 'none'
                    } : {
                        display: 'block'
                    }} cols="100" rows="10">{desc}</textarea>
                <button onClick={handleEdit} className={btn == 'edit' ? styles.editBtn : styles.btnSubmit}>{btn == 'edit' ? 'Edit description' : 'Submit'}</button>
            </div>
        </div>
    )
}

export default TaskPage;