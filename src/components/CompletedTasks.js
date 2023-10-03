import CompleteTask from './CompletedTask';
import { Link } from 'react-router-dom'

const CompletedTasks = ({ tasks, onDelete, onToggle, onUndo }) => {


  return (
    <>
      <Link to='/'>Go Back</Link>
      {tasks.map((task, index) => (
        <CompleteTask key={index} task={task} onDelete={onDelete} onToggle={onToggle} onUndo={onUndo}/>
      ))}
    </>
  );
};

export default CompletedTasks;

