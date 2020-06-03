import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

    return (
      <div className="lander">
        <h1>Ajay's Space</h1>
        <p>Reservation need no login just click reserve button to book our facility</p>
        <p>We will reach out to you with booked facility asap</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
          <Link to="/Reservation" className="btn btn-success btn-lg reserve-btn">
            Reserve
          </Link>
        </div>
      </div>
    );
}
