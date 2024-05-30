import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("type") === "login";
  const isSubmitting = navigation.state === "submitting"; // TO-DO

  return (
    <div
      className="container-fluid flex-grow-1 p-5"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="container m-auto">
        <Form method="post" className="text-white">
          <h1 className="fw-bold" style={{ color: "var(--color-primary)" }}>
            {isLogin ? "Log in" : "Create a new user"}
          </h1>
          {data && data.message && (
            <p className="text-danger">{data.message}</p>
          )}
          <div className="form-group row">
            <div className="col">
              <label htmlFor="email">Email*</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="password">Password*</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                </div>
                <div className="col">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="dateOfBirth">Date of Birth*</label>
                  <input
                    className="form-control"
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                  />
                </div>
                <div className="col">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    className="form-control"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="country">Country</label>
                  <input
                    className="form-control"
                    type="text"
                    id="country"
                    name="country"
                  />
                </div>
                <div className="col">
                  <label htmlFor="city">City</label>
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    name="city"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="address">Address</label>
                  <input
                    className="form-control"
                    type="text"
                    id="address"
                    name="address"
                  />
                </div>

                <div className="col">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" class="form-control">
                      <option value={null}>Choose your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <input type="hidden" value="ROLE_USER" name="role" id="role" />
            </div>
          )}
          <div className="row pt-3 ps-3">
            <p>* - Required</p>
          </div>
          <div>
            <Link
              class="btn btn-primary mx-3 p-2 px-3 text-white text-decoration-none"
              to={`?type=${isLogin ? "signup" : "login"}`}
            >
              {isLogin ? "Create new user" : "Log in"}
            </Link>
            <button
              disabled={isSubmitting}
              type="submit"
              class="btn btn-success mx-3 p-2 px-3"
            >
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;
