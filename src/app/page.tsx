// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Automatically redirect to the login page when visiting "/"
  redirect("/login");
}
