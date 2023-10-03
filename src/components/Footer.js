import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <p><Link to='/about'>About</Link></p>

      <p><Link to='/completed'>Completed Tasks</Link></p>
      
    </footer>
  )
}

export default Footer
