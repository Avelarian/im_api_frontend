import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo_transparent.png";

import "./styles.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const searchTerm = localStorage.getItem("searchTerm");
    api.post("doctors/search", { searchTerm }).then((response) => {
      setDoctors(response.data);
    });
  }, []);

  return (
    <div className="doctors-container">
      <header>
        <div>
          <img src={logo} alt="Remed" />
          <spam>Welcome to the Remed application.</spam>
        </div>

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#00BFFF" />
          Back to home page.
        </Link>
      </header>

      <h1>Here are the {doctors.length} doctors we found for you.</h1>

      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <strong>NAME: </strong>
            <p>
              {doctor.last_name.toUpperCase()}, {doctor.first_name}{" "}
            </p>

            <strong>SPECIALITY:</strong>
            <p>{doctor.speciality}</p>

            <strong>ADDRESS:</strong>
            <p>
              {doctor.address}, {doctor.zip_code}, {doctor.city}
            </p>

            <button
              type="button"
              onClick={() => {
                history.push(`/doctors/${doctor.id}`);
              }}
            >
              Schedule
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
