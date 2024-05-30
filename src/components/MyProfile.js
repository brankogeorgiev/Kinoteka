import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { projectFirestore } from "../firebase/config";
import { Form, Button, ListGroup } from "react-bootstrap";
import "firebase/auth";
import { FaPen } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

function MyProfile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { uid } = getAuthToken();
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUser(uid);
  }, []);

  useEffect(() => {
    const { id, ...userDataWithoutId } = user;
    setUserData(userDataWithoutId);
  }, [user]);

  async function fetchUser(uid) {
    await projectFirestore
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let userTemp = doc.data();
          userTemp.id = uid;
          setUser(userTemp);
        }
      });
  }

  function handleUpdateChange() {
    setIsUpdating(!isUpdating);
  }

  function formatDate(timestamp) {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function updateEmailInFirebaseAuth() {
    await projectFirestore.collection("users").doc(uid).update({
      address: userData.address,
      city: userData.city,
      country: userData.country,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
    });
  }

  function handleSubmitHandler(e) {
    e.preventDefault();

    updateEmailInFirebaseAuth(userData.email);
    window.location.reload();
  }

  return (
    <div
      className="d-flex flex-grow-1 px-5 py-2"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="flex-grow-1 row text-white px-5">
        {/* Left Side */}
        <h3 className="p-3 fw-bold" style={{ color: "var(--color-primary)" }}>
          My profile
        </h3>
        {!isUpdating && (
          <div className="col-9 bg-dark p-4" style={{ borderRadius: "25px" }}>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-column">
                <h3 className="my-auto">
                  {user.firstName + " " + user.lastName}
                </h3>
                <p className="my-auto">{user.email}</p>
              </div>
              <div className="d-inline-block my-auto p-3">
                <button
                  style={{
                    backgroundColor: "inherit",
                    border: "none",
                    color: "var(--color-primary)",
                  }}
                  onClick={handleUpdateChange}
                >
                  Update <FaPen className="fs-5" />
                </button>
              </div>
            </div>
            <hr />
            <div className="row">
              {/* Personal Information */}
              <div className="col-6">
                <h4 className="text-danger">Personal Information</h4>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">First Name</div>
                  <div>{user.firstName}</div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">Last Name</div>
                  <div>{user.lastName}</div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">Date of Birth</div>
                  <div>
                    {user.dateOfBirth
                      ? user.dateOfBirth
                          .toDate()
                          .toLocaleDateString()
                          .replaceAll("/", ".")
                      : "-"}
                  </div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">Gender</div>
                  <div>
                    {user.gender
                      ? user.gender.charAt(0).toUpperCase() +
                        user.gender.slice(1)
                      : "-"}
                  </div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">E-Mail</div>
                  <div>{user.email}</div>
                </div>
              </div>
              {/* Blank (Right side) */}
              <div className="col-6">
                <div className="p-3"></div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">Phone Number</div>
                  <div>
                    {user.phoneNumber === "" || !user.phoneNumber
                      ? "-"
                      : user.phoneNumber}
                  </div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">Country</div>
                  <div>
                    {user.country === "" || !user.country ? "-" : user.country}
                  </div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">City</div>
                  <div>{user.city === "" || !user.city ? "-" : user.city}</div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="text-secondary">Address</div>
                  <div>
                    {user.address === "" || !user.address ? "-" : user.address}
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        )}

        {isUpdating && (
          <div className="col-9 bg-dark p-4" style={{ borderRadius: "25px" }}>
            <div className="d-flex flex-row">
              <div className="d-inline-block my-auto p-3">
                <button
                  className="text-danger"
                  style={{ backgroundColor: "inherit", border: "none" }}
                  onClick={handleUpdateChange}
                >
                  <IoMdArrowRoundBack className="fs-4" /> Back
                </button>
              </div>
            </div>
            <hr />
            <Form className="row">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      !user.firstName || user.firstName === ""
                        ? ""
                        : user.firstName
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    placeholder="Enter First Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      !user.lastName || user.lastName === ""
                        ? ""
                        : user.lastName
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={
                      userData.dateOfBirth
                        ? formatDate(userData.dateOfBirth)
                        : ""
                    }
                    disabled
                    placeholder="Enter Date of Birth"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Gender select"
                    value={userData.gender || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  >
                    <option value="">Choose gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>E-Mail</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={
                      !user.email || user.email === "" ? "" : user.email
                    }
                    disabled
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    placeholder="Enter your Email"
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      !user.phoneNumber || user.phoneNumber === ""
                        ? ""
                        : user.phoneNumber
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, phoneNumber: e.target.value })
                    }
                    placeholder="Enter your Phone number"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      !user.country || user.country === "" ? "" : user.country
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, country: e.target.value })
                    }
                    placeholder="Enter your Country"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      !user.city || user.city === "" ? "" : user.city
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, city: e.target.value })
                    }
                    placeholder="Enter your City"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      !user.address || user.address === "" ? "" : user.address
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, address: e.target.value })
                    }
                    placeholder="Enter your Address"
                  />
                </Form.Group>
              </div>
              <Button
                className="w-50 mx-auto"
                variant="success"
                type="submit"
                onClick={handleSubmitHandler}
              >
                Submit
              </Button>
            </Form>
          </div>
        )}

        {/* Right Side */}
        <div className="col-3">
          <ListGroup>
            <Link className="text-decoration-none" to="favorite-movies">
              <ListGroup.Item
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-third)",
                }}
              >
                Favorites
              </ListGroup.Item>
            </Link>
            <Link className="text-decoration-none" to="my-reservations">
              <ListGroup.Item
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-third)",
                }}
              >
                My Tickets
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
