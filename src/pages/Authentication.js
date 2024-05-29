import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { auth, projectFirestore } from "../firebase/config";
import firebase from "firebase/app";
import "firebase/firestore";
import { setUserInfo } from "../util/auth";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const type = searchParams.get("type") || "signup";

  if (type !== "login" && type !== "signup") {
    throw json({ message: "Unsupported type of auth." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  let userCredential;

  if (type === "signup") {
    authData.firstName = data.get("firstName") || "";
    authData.lastName = data.get("lastName") || "";
    authData.dateOfBirth = data.get("dateOfBirth") || "";
    authData.gender = data.get("gender") || "";
    authData.role = data.get("role") || "";
    authData.phoneNumber = data.get("phoneNumber") || "";
    authData.country = data.get("country") || "";
    authData.city = data.get("city") || "";
    authData.address = data.get("address") || "";

    try {
      userCredential = await auth.createUserWithEmailAndPassword(
        authData.email,
        authData.password
      );

      const { password, ...userWithoutPassword } = authData;
      const dobDate = new Date(userWithoutPassword.dateOfBirth);
      const dobTimestamp = firebase.firestore.Timestamp.fromDate(dobDate);
      userWithoutPassword.dateOfBirth = dobTimestamp;
      userWithoutPassword.favoriteMovies = [];
      userWithoutPassword.reservations = [];

      await projectFirestore
        .collection("users")
        .doc(userCredential.user.uid)
        .set(userWithoutPassword);

      try {
        userCredential = await auth.signInWithEmailAndPassword(
          authData.email,
          authData.password
        );
        await setUserInfo(userCredential.user.uid);
      } catch (error) {
        return json({ message: "Incorrect credentials." }, { status: 500 });
      }
    } catch (error) {
      return json({ message: error.message }, { status: 500 });
    }
  } else if (type === "login") {
    try {
      userCredential = await auth.signInWithEmailAndPassword(
        authData.email,
        authData.password
      );
      await setUserInfo(userCredential.user.uid);
    } catch (error) {
      return json({ message: "Incorrect credentials." }, { status: 500 });
    }
  }

  return redirect("/");
}
