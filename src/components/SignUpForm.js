import { Form, Link } from "react-router-dom";
import classes from "./SignUpForm.module.css";

function SignUpForm({ data, navigation }) {
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.text}>Create your account</h1>
        <Form action="#">
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input type="text" required />
              <div className={classes.underline}></div>
              <label htmlFor="">First Name</label>
            </div>
            <div className={classes.input_data}>
              <input type="text" required />
              <div className={classes.underline}></div>
              <label htmlFor="">Last Name</label>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input type="text" required />
              <div className={classes.underline}></div>
              <label htmlFor="">Username</label>
            </div>
            <div className={classes.input_data}>
              <input type="email" required />
              <div className={classes.underline}></div>
              <label htmlFor="">Email Address</label>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input type="password" required />
              <div className={classes.underline}></div>
              <label htmlFor="">Password</label>
            </div>
            <div className={classes.input_data}>
              <input type="password" required />
              <div className={classes.underline}></div>
              <label htmlFor="">Confirm Password</label>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.genders}>
              <div className={classes.gender}>
                <input name="gender" type="radio" /> Male
              </div>
              <div className={classes.gender}>
                <input type="radio" name="gender" /> Female
              </div>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input type="date" style={{ width: "50%" }} />
              <label htmlFor="">Date of Birth</label>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <div className={classes.submit_btn}>
                <div className={classes.input_data}>
                  <div className={classes.inner}></div>
                  <input type="submit" value="Sign up" />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              Already have an account?{" "}
              <Link to="/auth?type=login">Register</Link>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SignUpForm;
