import { Form, Link } from "react-router-dom";
import classes from "./LoginForm.module.css";

function LoginForm({ data, navigation }) {
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.text}>Login </h1>
        <Form action="#">
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input type="email" required />
              <div className={classes.underline}></div>
              <label htmlFor="">E-mail</label>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <input type="password" required />
              <div className={classes.underline}></div>
              <label htmlFor="">Password</label>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              <div className={classes.submit_btn}>
                <div className={classes.input_data}>
                  <div className={classes.inner}></div>
                  <input type="submit" value="Login" />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.form_row}>
            <div className={classes.input_data}>
              Don't have an account?{" "}
              <Link to="/auth?type=signup">Register here</Link>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default LoginForm;
