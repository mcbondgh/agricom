import logo from './../icons/logo.svg';
import './../styles/homepage.css';
import { Button } from 'flowbite-react';
// import { useNavigate } from 'react-router-dom';

function Homepage() {
  // let navigate = useNavigate();

  // let handleClick = () => {
  //   navigate('/dashboard');
  // };

  return (
    <div className="App">
        <div className="app-body">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Welcome to Agricom System!
          </h1>
          <Button >View Dasboard</Button>
        </div>
    </div>
  );
}

export default Homepage;
