"use client";
import StatsGrid from "@/components/dashBoardState";
import { useSession } from "@/lib/auth-client";
import React from "react";

const Recruter = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = session?.user;
  console.log(session, user, isPending, "all here");

  return (
    <div>
      <h2>Welcome Back , {user.name} </h2>
      <StatsGrid />
    </div>
  );
};

export default Recruter;
