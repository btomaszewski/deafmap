"use client";
import { useEffect, useRef, ReactElement, useState, ReactNode } from "react";
import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";
import ArcLayer from "@arcgis/core/layers/Layer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as geometry from "@arcgis/core/geometry";

import "./MapViewer.css";

interface MapViewerProps {
  children?: ReactElement | ReactElement[];
  initialMapState: MapState;
  MapRenderer: (view: MapView) => ReactNode;
}

export interface MapState {
  map: Map;
  APIKey?: string;
  center?: number[];
  zoomLevel?: number;
}

export default function MapViewer({
  children,
  initialMapState,
  MapRenderer,
}: MapViewerProps) {
  const [viewState, setViewState] = useState(null as unknown as MapView);
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const view = new MapView({
        container: mapDiv.current,
        map: initialMapState.map,
        center: initialMapState.center,
        zoom: initialMapState.zoomLevel, //mapState.zoomLevel,
      });

      view.ui.components = ["attribution"]; //Remove zoom default widget

      view
        .when(() => {
          console.log(
            "Map Loaded, center: " + view.center + " Zoom Level:" + view.zoom
          );
        })
        .catch((error) => {
          console.error("Map loading error: ", error);
        });
      setViewState(view);
    } else {
      console.warn("Map Div not available");
    }
  }, [mapDiv]);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        GetUserLocation(viewState);
      } else if (result.state === "prompt") {
        GetUserLocation(viewState);
      } else {
      }
    });
  });

  return (
    <div className={`mapViewer-style-div`}>
      <div className="mapDiv" ref={mapDiv}></div>
      {/* <FilterDisplay /> */}
      {MapRenderer(viewState)}
    </div>
  );

  function GetUserLocation(view: MapView) {
    if (!view) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const { latitude, longitude } = p.coords;
      view.center = new geometry.Point({ x: longitude, y: latitude });
    });
  }
}
