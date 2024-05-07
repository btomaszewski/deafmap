"use client";
import Image from "next/image";
import "./root.css";
import { useSession } from "next-auth/react";
import AccessDenied from "../Access/AcessDenied";
import Link from "next/link";

export default function Home() {
  //const { data: session, status } = useSession();

  // if (status !== "authenticated") {
  //   return <AccessDenied />;
  // }

  return (
    <div className="main-div">
      {/* <h1 className="title-text">Emergency Official/Volunteer Login</h1>
      <Login /> */}
      <Link href="/Map">
        <Image
          src={"./Report_Button.svg"}
          alt="Report Button"
          height={140}
          width={140}
          className="mb-12"
        />
      </Link>

      <div className="action-item-container">
        <p className="mb-8">Submit Accessibility Form</p>
        <div className="access-form-buttons">
          <button className="reject-button">No Thanks</button>
          <button className="accept-button">Start</button>
        </div>
      </div>

      <div className="action-item-container">
        <p>Hazards Within 10 Miles</p>
        <button
          onClick={(e) => {
            fetch("/api/GIS/Nearby?lng=-77.698031&lat=43.063938", {
              method: "GET",
              // body: JSON.stringify({
              //   location: { x: -77.698031, y: 43.063938 },
              // }),
            });
          }}
        >
          Test
        </button>
      </div>
    </div>
  );
}
