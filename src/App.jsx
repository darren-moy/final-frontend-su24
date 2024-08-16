import './App.css';
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function App() {
  const runawayButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const button = runawayButtonRef.current;
    const rect = button.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const deltaX = mouseX - buttonCenterX;
    const deltaY = mouseY - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 200) {  
      const offsetX = deltaX > 0 ? -100 : 100;
      const offsetY = deltaY > 0 ? -100 : 100;

      let newLeft = button.offsetLeft + offsetX * Math.random() * 2;
      let newTop = button.offsetTop + offsetY * Math.random() * 2;

      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - rect.width));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - rect.height));

      button.style.left = `${newLeft}px`;
      button.style.top = `${newTop}px`;
    }
  };

  const handleClick = () => {
    navigate('/you-won');  
  };

  return (
    <div className="landing-page-container" onMouseMove={handleMouseMove}>
      <h1 className="landing-page-h1">WELCOME TO Darren's POORLY DESIGNED EMPLOYEE SITE</h1>
      <Link className="landing-page-all-employees" to={`employees`}>
        <button>All Employees</button>
      </Link>
      <Link className="landing-page-all-tasks" to={`tasks`}>
        <button>All Tasks</button>
      </Link>
      <button 
        ref={runawayButtonRef} 
        className="runaway-button"
        onClick={handleClick}  
      >
        Click for secret message for Professor Lynch 
      </button>
    </div>
  );
}

export default App;
