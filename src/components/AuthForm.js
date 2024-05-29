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
    <div className="container-fluid flex-grow-1">
      <Form method="post">
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {/* TODO */}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </p>
        {!isLogin && (
          <div>
            <p>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" />
            </p>
            <p>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" />
            </p>
            <p>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth" />
            </p>
            <p>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" name="phoneNumber" />
            </p>
            <p>
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" />
            </p>
            <p>
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </p>
            <p>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" />
            </p>
            <input type="hidden" value="ROLE_USER" name="role" id="role" />
            <div>
              <input name="gender" type="radio" value="male" defaultChecked />
              Male
            </div>
            <div>
              <input type="radio" name="gender" value="female" /> Female
            </div>
          </div>
        )}
        <div>
          <Link to={`?type=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Log in"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
