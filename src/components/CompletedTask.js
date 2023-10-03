import {FaTimes, FaUndo, FaCheck, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const CompletedTask = ({task, onDelete, onToggle, onUndo}) => {
    return (
        <div
            className={`task ${task.reminder && 'reminder'}`}
            onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}{' '}
                <div >
                    <FaCheck
                        style={{
                        color: 'black'
                    }}/>
                    <FaUndo
                        style={{
                        color: 'green',
                        cursor: 'pointer',
                        marginRight: '5px',
                        marginLeft: '5px'
                    }}
                        onClick={() => onUndo(task.id)}/>
                    <FaTrash
                        style={{
                        color: 'red',
                        cursor: 'pointer'
                    }}
                        onClick={() => onDelete(task.id)}/>
                </div>
            </h3>
            <p>{task.day}</p>
            <p>
                <Link to={`/task/${task.id}`}>View Details</Link>
            </p>
        </div>
    )
}

export default CompletedTask
