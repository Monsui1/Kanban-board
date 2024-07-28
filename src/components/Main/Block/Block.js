import React, { useEffect, useState } from 'react';
import styles from '../Main.module.css';
import { Link, useLocation } from "react-router-dom"

const Block = (props) => {
    const [state, setState] = useState('Add card')
    const [name, setName] = useState('')
    const [movedIssue, setMovedIssue] = useState()
    const [clearInput, setClearInput] = useState()
    const [disabled, setDisabled] = useState()

    const location = useLocation();
    const previousLocation = location.state?.previousLocation;

    const boardData = props.boardData
    const setBoardData = props.setBoardData

    let currentBlock

    boardData.map(block => {
        if (block.title == props.blockName) {
            currentBlock = block
        }
    })

    // checks the previous block
    const validateBlocks = block => {
        const result = boardData.indexOf(currentBlock) - boardData.indexOf(block) == 1
        return result
    }

    useEffect(() => {
        boardData.map(block => {
            if (validateBlocks(block) && block.issues.length === 0) {
                setDisabled(true)
            } else if (validateBlocks(block) && block.issues.length !== 0) {
                setDisabled()
            }
        })
    }, [boardData])

    const handleAddCard = () => {
        setState('Submit')
        setClearInput()
    }

    useEffect(() => {
        boardData.map(block => {
            if (validateBlocks(block)) {
                block.issues.map(issue => {
                    if (issue.name == movedIssue) {
                        setMovedIssue(issue)
                    }
                })
            }
        })
    }, [movedIssue])


    //creates a new card
    const handleSubmitCard = () => {
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        if (name) {
            const newCard = {
                id: randomNumber,
                name: name,
                description: ''
            };

            const updatedData = boardData.map(block => {
                if (block.title === props.blockName) {
                    const thisBlock = { ...block, issues: [...block.issues, newCard] }
                    return thisBlock;
                }
                return block;
            })


            setBoardData(updatedData);
            localStorage.setItem('kanbanBoardData', JSON.stringify(updatedData))
        }
        else if (movedIssue) {
            setBoardData(boardData.map((block, index, blocks) => {
                validateBlocks(block)
                if (block.issues.includes(movedIssue) && validateBlocks(block)) {
                    blocks[index + 1].issues.push(movedIssue)
                    block.issues.splice(block.issues.indexOf(movedIssue), 1)
                    const thisBlock = { ...block }
                    return thisBlock
                }
                return block
            }))
            localStorage.setItem('kanbanBoardData', JSON.stringify(boardData))
        }
        setState('Add card')
        setClearInput(' ')
    }

    const handleSelect = () => {
        return (<select value={movedIssue} onChange={e => setMovedIssue(e.target.value)} className={styles.select} style={state == 'Add card' ? {
            display: 'none'
        } : {
            display: 'block'
        }}> {boardData.map(block => {
            if (validateBlocks(block)) {
                return (<optgroup label=''>
                    <option value="">{movedIssue ? movedIssue.name : 'Please select a value...'}</option>
                    {
                        block.issues.map(issue => {
                            return (
                                <option key={issue.id} value={issue.name}>{issue.name}</option>
                            )
                        })
                    }
                </optgroup>
                )
            }
        })}
        </select>)
    }

    return (
        <li key={props.blockName} className={styles.block}>
            <h4 className={styles.blockName}>{props.blockName}</h4>
            {boardData.map((block) => {
                if (block.title == props.blockName) {
                    return (
                        <ul className={styles.list}>
                            {block.issues.map((issue) => (
                                <li key={issue.id} className={styles.item}>
                                    <Link state={{ previousLocation: location }} className={styles.itemLink} to={`/tasks/${block.title}/${issue.id}`}>{issue.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )
                }
            })}

            <div>
                {props.blockName == 'Backlog' ?
                    (<input className={styles.input}
                        type="text"
                        value={clearInput}
                        placeholder='New task title...'
                        style={state == 'Add card' ? {
                            display: 'none'
                        } : {
                            display: 'block'
                        }}
                        onInput={e => {
                            setName(e.target.value)
                        }}
                    />) : handleSelect()
                }
                <button onClick={state == 'Add card' ? handleAddCard : handleSubmitCard}
                    className={state == 'Add card' ? styles.btnAdd : styles.btnSubmit}
                    style={state == 'Add card' ? {
                        backgroundImage: "url(/imgs/plus.svg)"
                    } : {
                        backgroundImage: "none"
                    }
                    }
                    disabled={disabled}

                >{state}
                </button>
            </div>

        </li>
    )
}

export default Block;