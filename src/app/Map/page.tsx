"use client";
import {
  CollapsibleComponent,
  useCollapsible,
} from "@/components/GIS/components/CollapsibleComponent/CollapsibleComponent";
import { MapLayer } from "@/components/GIS/components/MapLayer";
import { SimpleComponent } from "@/components/GIS/components/Debug/MapDebugComponent";
import Map from "@arcgis/core/Map";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapState } from "@/components/GIS/MapViewer";
import { MapAttachedObject } from "@/components/GIS/components/MapAttachedObject";
import { SimpleRenderer, UniqueValueRenderer } from "@arcgis/core/renderers";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const MapView = dynamic(() => import("@/components/GIS/MapViewer"), {
  ssr: false,
});

import "./map.css";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import {
  HazardCategory,
  HazardCategoryValues,
  HazardDescriptor,
  HazardDescriptorValues,
  HazardLookup,
} from "@/lib/gis_data";

export default function MapDisplay() {
  const [searchState, setSearchState] = useState("");
  // const Layers: MapFeatureServer = {
  //   url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/arcgis/rest/services/Deaf_Map_Base_Layers/FeatureServer/",
  //   serviceType: "FeatureService",
  //   count: 5,
  // };

  const startMap = new Map({ basemap: "streets-vector" });

  const initialConfig: MapState = {
    map: startMap,
    zoomLevel: 14,
  };

  const dhhRenderer = new SimpleRenderer({
    symbol: new SimpleFillSymbol({
      color: [255, 154, 77, 0.25],
    }),
  });

  const dhhPopLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/ArcGIS/rest/services/Monroe_Wayne_DHH_Population_Totals_by_Census_Tract/FeatureServer/0",
    renderer: dhhRenderer,
  });

  const createSymbol = (h: HazardCategoryValues, d: HazardDescriptorValues) => {
    return new SimpleMarkerSymbol({
      size: 16,
      color: HazardLookup(h).color,
      style: "diamond",
      outline: new SimpleLineSymbol({ color: [0, 0, 0], width: 5 }),
    });
  };

  const hazardRenderer = new UniqueValueRenderer({
    field: "Hazard_Category",
    defaultSymbol: new SimpleMarkerSymbol({
      size: 12,
      color: "white",
      style: "square",
      outline: new SimpleLineSymbol({ color: [0, 0, 0], width: 2 }),
    }),
    uniqueValueInfos: [
      {
        symbol: createSymbol("Severe_Weather", "Other"),
        value: "0",
      },
      {
        symbol: createSymbol("Buildings", "Other"),
        value: "1",
      },
      {
        symbol: createSymbol("Public_Safety", "Other"),
        value: "2",
      },
      {
        symbol: createSymbol("Traffic", "Other"),
        value: "3",
      },
      {
        symbol: createSymbol("Utilities", "Other"),
        value: "4",
      },
    ],
  });

  const testRender = new SimpleRenderer({
    symbol: createSymbol("Severe_Weather", "Other"),
  });

  const hazardLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/arcgis/rest/services/Hazard_Incident_Tracker_Test/FeatureServer/0",
    renderer: hazardRenderer,
    refreshInterval: 1,
  });

  //startMap.add(dhhPopLayer);
  startMap.add(hazardLayer);

  return (
    <>
      <MapView
        initialMapState={initialConfig}
        MapRenderer={(view) => {
          return (
            <>
              <MapAttachedObject
                view={view}
                attachmentLocation="top-right"
                id="search-bar"
              >
                <SearchBar value={searchState} />
              </MapAttachedObject>
              <MapAttachedObject
                view={view}
                attachmentLocation={"bottom-right"}
                id={"report-button"}
              >
                <button
                  className="report-button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Button Pressed");
                  }}
                >
                  <Image
                    className="report-image"
                    src="./Hazard_Report_Marker.svg"
                    alt="Report"
                    width={26}
                    height={36}
                  />
                </button>
              </MapAttachedObject>
              <CollapsibleComponent
                view={view}
                expanded={<TestCollapsible_Expanded />}
                collapsed={<TestCollapsible_Collapsed />}
              />
            </>
          );
        }}
      />

      {/* <MapViewer
        center={[-77.610924, 43.1566]} // Longitude, Latitude
        InputLayers={Layers}
        APIKey={process.env.ARC_API_KEY}
      ></MapViewer> */}
    </>
  );
}

function TestCollapsible_Expanded() {
  const collapsibleState = useCollapsible();

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          collapsibleState();
        }}
      >
        Collapse
      </button>
    </div>
  );
}

function TestCollapsible_Collapsed() {
  const collapsibleState = useCollapsible();

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          collapsibleState();
        }}
      >
        <Image src={"./Layer_Button.svg"} alt="Expand" height={25} width={25} />
      </button>
    </div>
  );
}
