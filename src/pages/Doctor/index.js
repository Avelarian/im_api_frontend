import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import notify from "../../utils";

import "./styles.css";
import logo from "../../assets/logo_transparent.png";

export default function Doctor() {
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    speciality: "",
    phoneNumber: "",
    mail: "",
  });
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    mail: "",
  });
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({
    date: "",
    hour: "",
  });
  const { id } = useParams();
  const history = useHistory();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  useEffect(() => {
    api.get(`doctors/${id}`).then((response) => {
      const {
        first_name,
        last_name,
        address,
        city,
        zip_code,
        speciality,
        phone_number,
        mail,
      } = response.data;
      setDoctor({
        firstName: first_name,
        lastName: last_name,
        address,
        city,
        zipCode: zip_code,
        speciality,
        phoneNumber: phone_number,
        mail,
      });
    });
    api.get(`doctors/${id}/appointments`).then((response) => {
      setAppointments(response.data);
    });
  }, [id]);

  async function handleContact(e) {
    e.preventDefault();

    const userContact = {
      name: user.name,
      mail: user.mail,
      phone_number: user.phoneNumber,
    };

    try {
      await api.post(`doctors/${id}/appointments`, {
        user: userContact,
        appointment,
      });

      notify.success(
        "The appointment request was successfully sent. Please, wait for the doctor contact."
      );
      history.push("/");
    } catch (err) {
      notify.error(
        "We could not send the appointment request. Please, retry later."
      );
    }
  }

  return (
    <div className="doctor-container">
      <div className="content">
        <section>
          <img src={logo} alt="Remed" />

          <h1>
            DR. {doctor.lastName.toUpperCase()}, {doctor.firstName}
          </h1>
          <strong>{doctor.speciality}</strong>
          <p>
            {doctor.address}, {doctor.zipCode}, {doctor.city}
          </p>

          <div className="contact-box">
            <div className="phone-number">
              <strong>Phone number: </strong>
              <p>{doctor.phoneNumber}</p>
            </div>
            <div className="mail">
              <strong>Mail: </strong>
              <p>{doctor.mail}</p>
            </div>
          </div>

          <Link className="back-link" to="/doctors">
            <FiArrowLeft size={16} color="#00BFFF" />
            Back to doctor's list.
          </Link>
        </section>
        <section>
          <div className="schedule-table">
            <ul>
              {appointments.map(({ id, year, month, day, time }) => (
                <li key={id}>
                  <p>{new Date(`${year}-${month}-${day}`).toDateString()}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setAppointment({
                        date: `${day}/${month}/${year}`,
                        hour: `${time}:00`,
                      });
                    }}
                  >{`${time}:00`}</button>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleContact}>
            <p>
              Choose a time above and complete the information to send an
              appointment request.
            </p>
            <input
              placeholder="Full name"
              value={user.name}
              name="name"
              onChange={handleInputChange}
            />
            <input
              placeholder="Phone number"
              value={user.phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
            />
            <input
              placeholder="Mail"
              value={user.mail}
              name="mail"
              onChange={handleInputChange}
            />
            <input
              placeholder="Date"
              value={
                appointment.date === ""
                  ? ""
                  : `${appointment.date}, ${appointment.hour}`
              }
              name="date"
              disabled
            />

            <button className="button" type="submit">
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
