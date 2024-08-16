import './styles/YouWon.css';
import { Link } from "react-router-dom";

function YouWon() {
  return (
    <div className="you-won-container">
      <h1>Congratulations!</h1>
      <p>I just wanted to say thank you for the wonderful semester Professor Lynch, despite it being a summer class,
        you made it enjoyable and I really had fun with this class. Good luck in the Fall semester!
      </p>
      <p>Please take it easy on my styling haha</p>

      <div className="video-container">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default YouWon;
