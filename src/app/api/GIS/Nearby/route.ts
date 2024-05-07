import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  if (!lng || !lat) {
    return NextResponse.json(
      { message: "Missing lng or lat!" },
      { status: 400 }
    );
  }

  console.log(
    moveDirection({
      longitude: Number.parseFloat(lng),
      latitude: Number.parseFloat(lat),
      dir: 90,
      distance: 30,
    })
  );

  return NextResponse.json({ message: "OK" }, { status: 200 });
}

function moveDirection({
  longitude,
  latitude,
  dir,
  distance,
}: {
  longitude: number;
  latitude: number;
  dir: number;
  distance: number;
}) {
  var lat0 = Math.cos((Math.PI / 180.0) * latitude);

  var a = (Math.PI * dir) / 180;

  var x =
    longitude +
    (((180 / Math.PI) * (distance / 6378137)) / Math.cos(lat0)) * Math.cos(a);
  var y = latitude + (180 / Math.PI) * (distance / 6378137) * Math.sin(a);

  return { longitude: x, latitude: y };
}
