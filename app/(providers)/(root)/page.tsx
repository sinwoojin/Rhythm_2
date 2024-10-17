"use client";

import { redirect } from "next/navigation";

function HomePage() {
  redirect("/today");

  return null;
}
export default HomePage;
