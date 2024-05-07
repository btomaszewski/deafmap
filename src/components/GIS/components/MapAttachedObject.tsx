import { ReactElement, useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";

export interface MapAttachedComponentProps {
  view: MapView;
}

interface MapAttachedObjectProps {
  children?: ReactElement | ReactElement[];
  attachmentLocation: "bottom-right" | "bottom-left" | "top-left" | "top-right";
  id: string;
  view: MapView;
}

export function MapAttachedObject({
  children,
  attachmentLocation,
  id,
  view,
}: MapAttachedObjectProps) {
  const containerRef = useRef(id);
  useEffect(() => {
    if (view) {
      view.ui.add(
        document.getElementById(containerRef.current) as HTMLElement,
        attachmentLocation
      );
      console.log(`Mounted ${id} on map at ${attachmentLocation}`);
    }

    return () => {
      console.log("Clean up of: " + id);
      if (!view) return;
      view.ui.remove(
        document.getElementById(containerRef.current) as HTMLElement
      );
    };
  }, [view]);

  return (
    <div id={containerRef.current} className="map-attached-object">
      {children}
    </div>
  );
}
