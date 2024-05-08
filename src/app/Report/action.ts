"use server";

import {
  HazardCategory,
  HazardCategoryValues,
  HazardDescriptor,
  HazardDescriptorLookup,
  HazardDescriptorValues,
  HazardLookup,
} from "@/lib/gis_data";
import Point, { SpatialReference } from "@arcgis/core/geometry";
import { addFeatures } from "@esri/arcgis-rest-feature-service";
import { ApplicationCredentialsManager } from "@esri/arcgis-rest-request";
import { redirect } from "next/navigation";

export async function Submit(formData: FormData) {
  const appManager = ApplicationCredentialsManager.fromCredentials({
    clientId: process.env.ARC_CLIENT_KEY as string,
    clientSecret: process.env.ARC_CLIENT_SECRET as string,
  });
  console.log(formData);

  const categoryFD = formData.get("Category")?.toString();
  if (!categoryFD) redirect("/Report/false");

  const category: HazardCategory = HazardLookup(
    categoryFD as HazardCategoryValues
  ).value;
  //HazardCategory[categoryFD as HazardCategoryValues];

  const optionFD = formData.get(`${categoryFD}_Options`)?.toString();
  if (!optionFD) redirect("/Report/false");

  const option: HazardDescriptor = HazardDescriptorLookup(
    optionFD as HazardDescriptorValues
  ).value;

  const image = formData.get("Image_URL") as File;
  let imageData;
  if (image) {
    const data = await image.arrayBuffer();
    const nodeData = Buffer.from(data);

    imageData = nodeData.toString("base64");

    // await fs.writeFile("./public/test.jpg", Buffer.from(data), (err) => {
    //   if (err) {
    //     console.log(err.message);
    //   }
    // });
  }
  const location_txt = formData.get("userLocation");
  if (!location_txt) redirect("/Report/false");
  const location = JSON.parse(location_txt.toString());
  console.log(
    `Location type: ${typeof location}, x: ${typeof location.x}, ${
      location.x
    } y: ${typeof location.y}, ${location.y}`
  );

  const hazardPoint = {
    x: location.x,
    y: location.y,
    spatialReference: SpatialReference.WGS84,
  };

  await addFeatures({
    //url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/arcgis/rest/services/Hazard_Incident_Tracker_WFL1/FeatureServer/0",
    url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/arcgis/rest/services/Hazard_Incident_Tracker_Test/FeatureServer/0",
    features: [
      {
        geometry: hazardPoint,
        attributes: {
          Hazard_Category: category,
          Hazard_Descriptor: option,
          Date_Reported: Date.now(),
          Last_Updated: Date.now(),
          Image: imageData,
        },
      },
    ],
    authentication: appManager,
  })
    .then((resp) => {
      if (resp.addResults[0]) {
        for (var i = 0; i < resp.addResults.length; i++) {
          const success = resp.addResults[i].success;
          console.log(`Add features ${i} success?: ${success}`);
          if (!success) {
            console.log(resp.addResults[i].error?.description);
            redirect("/Report/false");
          }
        }
      }
    })
    .catch((e) => {
      redirect("/Report/false");
    });
  redirect("/Report/true");
}
