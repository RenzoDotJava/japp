import { getServerSession } from "next-auth";

import ApplicationsPage from "@/components/pages/applications";
import { authConfig } from "@/lib/auth";

export default async function Applications() {
  return <ApplicationsPage />
}

//https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=2107s&ab_channel=CodewithKliton