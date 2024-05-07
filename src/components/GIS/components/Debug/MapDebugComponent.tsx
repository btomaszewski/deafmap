"use client";

import { useState, useEffect } from "react";
import { watch } from "@arcgis/core/core/reactiveUtils";

import "./MapDebugComponent.css";
import {
  MapAttachedComponentProps,
  MapAttachedObject,
} from "../MapAttachedObject";

export function SimpleComponent({ view }: MapAttachedComponentProps) {
  const [center, setCenter] = useState("");

  useEffect(() => {
    if (!view) return;
    // Watch for changes on the View's Extent
    let handle = watch(
      () => view.extent,
      (value) => {
        if (!value) return;

        const { latitude, longitude } = value.center;
        // Update the component's display
        console.log("Center changed");
        setCenter(`${longitude.toFixed(4)}, ${latitude.toFixed(4)}`);
      }
    );
    // Clean up any handles or event listeners
    // created in useEffect method
    return () => handle.remove();
  }, [view]);

  // useEffect(() => {
  //   navigator.permissions.query({ name: "geolocation" }).then((result) => {
  //     if (result.state === "granted") {
  //     } else if (result.state === "prompt") {
  //       navigator.geolocation.getCurrentPosition(
  //         (p) => {
  //           const { latitude, longitude } = p.coords;
  //           setCenter(`${longitude}, ${latitude}`);
  //         },
  //         (error) =>
  //           setCenter("Geolocation error: " + error.message + ", " + error.code)
  //       );
  //     } else {
  //       setCenter("Permission Denied");
  //     }
  //   });
  // });

  return (
    <MapAttachedObject
      id="Simple-component-div"
      attachmentLocation="bottom-right"
      view={view}
    >
      <div className="simple-component-div">Center: {center}</div>
    </MapAttachedObject>
  );
}
