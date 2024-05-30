import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
} from "react-icons/fa";
import { getAuthToken } from "../util/auth";
import { FaMapLocation } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

import { PiXLogoBold } from "react-icons/pi";

import { Link } from "react-router-dom";

function Footer() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetchHalls();
  }, []);

  useEffect(() => {
    console.log(halls[0]);
  }, [halls]);

  async function fetchHalls() {
    let results = [];
    await projectFirestore
      .collection("halls")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
        }
      });
    setHalls(results);
  }

  return (
    <div className="container-fluid p-5 text-center bg-dark">
      <div
        style={{ backgroundColor: "var(--color-secondary)" }}
        className="w-75 border border-secondary rounded p-3 m-auto"
      >
        <div className="container-fluid text-center">
          <Link to={"https://www.facebook.com"} className="text-white mx-3">
            <FaFacebookF />
          </Link>
          <Link to={"https://www.x.com"} className="text-white mx-3">
            <PiXLogoBold />
          </Link>
          <Link to={"https://www.google.com"} className="text-white mx-3">
            <FaGoogle />
          </Link>
          <Link to={"https://www.instagram.com"} className="text-white mx-3">
            <FaInstagram />
          </Link>
          <Link to={"https://www.linkedin.com"} className="text-white mx-3">
            <FaLinkedin />
          </Link>
          <Link
            to={"https://github.com/brankogeorgiev/kinoteka"}
            className="text-white mx-3"
          >
            <FaGithub />
          </Link>
          <hr className="text-white" />
          <div className="row">
            <div className="col-12 col-md-6 text-white my-3">
              <h5 className="fw-bold">KINOTEKA</h5>
              <div>
                Welcome to KINOTEKA. On our website you can browse all available
                and upcoming movies to our cinema and add them to your Favorites
                list. Reserve tickets for your most wanted movie. Browse your
                past reservations and see your upcoming ones, and submit your
                opinion about a movie you watched. Enjoy!
              </div>
            </div>
            <div className="col-12 col-md-3 text-white my-3">
              <h5 className="fw-bold">Our Halls</h5>
              <ul className="list-group">
                {halls &&
                  halls.map((hall) => (
                    <li
                      style={{ backgroundColor: "var(--color-secondary)" }}
                      className="text-white list-group-item"
                    >
                      {hall.name}, Capacity:{" "}
                      {hall.rows.length * hall.rows[0].seats.length}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-12 col-md-3 text-white my-3">
              <h5 className="fw-bold">Contact Us</h5>
              <div className="d-flex justify-content-start m-2">
                <FaMapLocation className="mx-3" />
                Skopje, Macedonia
              </div>
              <div className="d-flex justify-content-start m-2">
                <Link
                  to={"mailto:info@kinoteka.com?subject=Contact Kinoteka"}
                  className="text-decoration-none text-white"
                >
                  <IoIosMail className="mx-3" />
                  info@kinoteka.com
                </Link>
              </div>
              <div className="d-flex justify-content-start m-2">
                <FaPhoneAlt className="mx-3" />
                +389 70 000 000
              </div>
            </div>
          </div>
          <hr className="text-white" />
          <div className="text-center text-white fw-bold">
            @ 2024 Copyright: Kinoteka.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
