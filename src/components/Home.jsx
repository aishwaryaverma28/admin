import React from "react";
import "./styles/Home.css";
import dollar from "../assets/image/dollar-circle.svg";
import call from "../assets/image/call.svg";
import profile from "../assets/image/profile-circle.svg";
const Home = () => {
  return (
    <>
      <header className="homeHeader">
        <section className="homeSecOne">
          <div className="greyHead">
            <img src={dollar} alt="$" />
            <p className="home">My Open Deals</p>
          </div>
          <div className="greyHead">
            <p className="homeNum">25</p>
            <p className="colorOval">
              <i class="fa-sharp fa-solid fa-arrow-up"></i> 0.08%
            </p>
          </div>
          <div className="greyHead">
            <p className="home">Last Month : 31</p>
          </div>
        </section>
        <section className="homeSecOne">
          <div className="greyHead">
            <i className="fa-sharp fa-regular fa-calendar"></i>
            <p className="home">My Untouched Deals</p>
          </div>
          <div className="greyHead">
            <p className="homeNum">35</p>
            <p className="colorRedOval">
              <i class="fa-sharp fa-solid fa-arrow-down"></i> 0.08%
            </p>
          </div>
          <div className="greyHead">
            <p className="home">Last Month : 31</p>
          </div>
        </section>
        <section className="homeSecOne">
          <div className="greyHead">
            <img src={call} alt="$" />
            <p className="home">My Calls Today</p>
          </div>
          <div className="greyHead">
            <p className="homeNum">35</p>
            <p className="colorOval">
              <i class="fa-sharp fa-solid fa-arrow-up"></i> 0.08%
            </p>
          </div>
          <div className="greyHead">
            <p className="home">Last Month : 10</p>
          </div>
        </section>
        <section className="homeSecOne">
          <div className="greyHead">
            <img src={profile} alt="$" />
            <p className="home">Leads</p>
          </div>
          <div className="greyHead">
            <p className="homeNum">159</p>
            <p className="colorOval">
              <i class="fa-sharp fa-solid fa-arrow-up"></i> 0.08%
            </p>
          </div>
          <div className="greyHead">
            <p className="home">Last Month : 166</p>
          </div>
        </section>
      </header>
    </>
  );
};

export default Home;
