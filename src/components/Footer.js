import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="Footer">
      <footer>
       
        <div className="icons">
          <a
            href="https://github.com/anthonyamaro15"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
          <a
          href="https://www.anthonyamaro.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsFillPersonFill />
          </a>
        </div>
         <p>
          developed by <span>Anthony Amaro</span> as part of a{" "}
          <span>Computer Science</span> project
        </p>
      </footer>
    </div>
  );
};

export default Footer;
