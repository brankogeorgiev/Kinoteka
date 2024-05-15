import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("uid");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  return redirect("/");
}
