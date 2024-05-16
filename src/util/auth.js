import { redirect } from "react-router-dom";
import { projectFirestore } from "../firebase/config";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("role");
  return { token, email, uid, role };
}

export async function userLoader(uid) {
  let user;
  await projectFirestore
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        user = doc.data();
        user.id = uid;
      }
    });
  console.log(user);
  return user;
}

export function getUID() {
  const uid = localStorage.getItem("uid");
  return uid;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const { token } = getAuthToken();
  if (!token) {
    return redirect("/auth?type=login");
  }

  return null;
}

export function checkLoginLoader() {
  const { token } = getAuthToken();
  if (token) {
    return redirect("/");
  }
  return null;
}

export function checkIsAdmin() {
  const role = localStorage.getItem("role");
  if (role !== "ROLE_ADMIN") {
    return redirect("/access_denied");
  }
  return true;
}

export async function setUserInfo(uid) {
  await projectFirestore
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        localStorage.setItem("uid", uid);
        localStorage.setItem("email", doc.data().email);
        localStorage.setItem("role", doc.data().role);
        localStorage.setItem("token", crypto.randomUUID());
        // const expiration = new Date();
        // expiration.setHours(expiration.getHours() + 1);
        // localStorage.setItem("expiration", expiration.toISOString());
      }
    });
}
