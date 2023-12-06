import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const GoToTop = () => {
  const [isVisible, setIsvisible] = useState();
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsvisible(true);
    } else {
      setIsvisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  return (
    <Wrapper>
      {isVisible && (
        <div className="top-btn cursor-pointer text-white" onClick={goToBtn}>
          <ArrowUpwardIcon className="icon" size={20} />
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  .top-btn {
    cursor: pointer;
    font-size: 2.4rem;
    width: 3rem;
    height: 3rem;
    color: #fff;
    background-color: #dc3545;
    box-shadow: 10px 1px 19px #dc3545;
    border-radius: 10%;
    position: fixed;
    bottom: 5rem;
    right: 1rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ponter;

    @keyframes gototop {
      0% {
        transform: translateY(-0.5rem);
      }
      100% {
        transform: translateY(0);
      }
    }
    .icon {
      animation: gototop 1.2s linear infinite alternate-reverse;
    }
  }
`;
export default GoToTop;
