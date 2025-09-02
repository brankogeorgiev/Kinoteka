import { Form, Link } from "react-router-dom";
import classes from "./SignUpForm.module.css";

function SignUpForm({ data, navigation, onSubmit }) {
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.text}>Create your account</h1>
        <Form action="#">
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input name="email" type="email" id="email" required />
              <div className={classes.underline}></div>
              <label htmlFor="email">Email Address</label>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input name="password" type="password" id="password" required />
              <div className={classes.underline}></div>
              <label htmlFor="password">Password</label>
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
