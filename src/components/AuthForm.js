import {
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("type") === "login";

  const isSubmitting = navigation.state === "submitting"; // TO-DO

  return (
    <>
      <div className={classes.outer}>
        {!isLogin && (
          <SignUpForm isLogin={isLogin} data={data} navigation={navigation} />
        )}
        {isLogin && (
          <LoginForm isLogin={isLogin} data={data} navigation={navigation} />
        )}
      </div>
    </>
  );
}

export default AuthForm;
