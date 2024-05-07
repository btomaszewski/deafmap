import { addFeatures } from "@esri/arcgis-rest-feature-service";
import { ApplicationCredentialsManager } from "@esri/arcgis-rest-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const appManager = ApplicationCredentialsManager.fromCredentials({
      clientId: process.env.ARC_CLIENT_KEY as string,
      clientSecret: process.env.ARC_CLIENT_SECRET as string,
    });
    await addFeatures({
      url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/arcgis/rest/services/Hazard_Incident_Tracker_WFL1/FeatureServer/0",
      features: [
        {
          geometry: {
            x: body.location.x,
            y: body.location.y,
          },
          attributes: {
            HazardType: body.values[0].value,
            Date_Reported: Date.now(),
            Last_Updated: Date.now(),
          },
        },
      ],
      authentication: appManager,
    })
      .then((resp) => console.log(resp))
      .catch((e) => {
        throw e;
      });

    const result = body; //save data
    return NextResponse.json({ message: "OK", result }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
