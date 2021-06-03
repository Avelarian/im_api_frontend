import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import logo from "../../assets/logo_transparent.png";
import notify from "../../utils";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  async function handleSearch(e) {
    e.preventDefault();

    try {
      localStorage.setItem("searchTerm", searchTerm);

      history.push("/doctors");
    } catch (err) {
      notify.error("We could not load the results. Please, retry later.");
    }
  }

  return (
    <div className="home-container">
      <section className="form">
        <form onSubmit={handleSearch}>
          <h1>Search for your doctor here.</h1>

          <input
            placeholder="Location, speciality, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </section>

      <img src={logo} alt="Remed" />
    </div>
  );
}
