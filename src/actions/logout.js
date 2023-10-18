import { redirect } from "react-router-dom";

import { deleteItem } from "../helper";
import { toast } from "react-toastify";
import axios from "axios";


export async function logoutAction() {
  // delete user data from local storage
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });
  deleteItem({ key: "password" });  // NOTE: Storing plaintext password in local storage is NOT recommended for security reasons.
  deleteItem({ key: "maincurrency" });
  deleteItem({ key: "secondarycurrency" });

  toast.success("You’ve logged out successfully!");

  // return redirect
  return redirect("/");
}
