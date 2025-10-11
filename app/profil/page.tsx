import { redirect } from "next/navigation";

export default function ProfileRedirect() {
  // Redirect /profil to the actual page under /protected/profil
  redirect("/protected/profil");
}
