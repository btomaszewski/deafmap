"use client";
import { FormContext } from "@/components/Form/FormContext";
import { useEffect, useRef, useState } from "react";
import {
  BackButton,
  NextButton,
} from "@/components/Form/Buttons/ControlButtons";
import {
  RadioOption,
  OptionList,
} from "@/components/Form/QuestionContents/OptionList";
import { OtherQuestion } from "@/components/Form/QuestionContents/OtherQuestion";
import { Submit } from "./action";
import {
  Question,
  QuestionProps,
  QuestionState,
} from "@/components/Form/QuestionContents/Question";
import {
  Summary,
  SummaryObject,
} from "@/components/Form/QuestionContents/Summary";

const ReportFormState: QuestionState = {
  Category: "",
  Severe_Weather_Options: "",
  Building_Options: "",
  Traffic_Options: "",
  Other: "",
  Image_URL: "",
};

export default function ReportPage() {
  const [activePage, setActivePage] = useState(0);
  const state = useRef(ReportFormState);

  const [userLocation, setUserLocation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setUserLocation({ x: p.coords.longitude, y: p.coords.latitude });
      },
      (e) => {}
    );
  }, []);

  const changeActivePage = (proceed: boolean) => {
    if (proceed) {
      if (
        activePage == 0 &&
        state.current[state.current["Category"] + "_Options"] === "Other"
      ) {
        setActivePage(0.5);
      } else if (activePage % 1 == 0.5) {
        setActivePage(activePage + 0.5);
      } else {
        setActivePage(activePage + 1);
      }
    } else if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  return (
    <form action={Submit}>
      <FormContext.Provider value={{ activePage, changeActivePage }}>
        <Question1 state={state.current} active={activePage == 0} />
        <Question2 state={state.current} active={activePage == 0.5} />
        <Question3 state={state.current} active={activePage == 1} />
        <Question4 state={state.current} active={activePage == 2} />
      </FormContext.Provider>
      <input
        type="hidden"
        name="userLocation"
        value={JSON.stringify(userLocation)}
      />
    </form>
  );
}

function Question1({ state, active }: QuestionProps) {
  const schema: RadioOption[] = [
    {
      group: "Category",
      id: "Severe_Weather",
      imgPath: "./hazards/Severe_Weather.svg",
      children: [
        {
          group: "Severe_Weather_Options",
          id: "Wind_Storm",
          imgPath: "./hazards/Wind_Storm.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Wire_Down",
          imgPath: "./hazards/Wire_Down.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Tree_Down",
          imgPath: "./hazards/Tree_Down.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Ice_Storm",
          imgPath: "./hazards/Ice_Storm.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Winter_Storm",
          imgPath: "./hazards/Winter_Storm.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Blizzard",
          imgPath: "./hazards/Blizzard.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Hail_Storm",
          imgPath: "./hazards/Hail_Storm.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Extreme_Cold",
          imgPath: "./hazards/Extreme_Cold.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Flood",
          imgPath: "./hazards/Flood.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Debris",
          imgPath: "./hazards/Placeholder.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Dense_Fog",
          imgPath: "./hazards/Dense_Fog.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Thunder_Storm",
          imgPath: "./hazards/Thunderstorm.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Heatwave",
          imgPath: "./hazards/Heatwave.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Wildfire",
          imgPath: "./hazards/Wildfire.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Tornado_Warning",
          imgPath: "./hazards/Tornado_Warning.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Landslide",
          imgPath: "./hazards/Landslide.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Hurricane",
          imgPath: "./hazards/Hurricane.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Tornado",
          imgPath: "./hazards/Tornado.svg",
        },
        {
          group: "Severe_Weather_Options",
          id: "Other",
          imgPath: "./hazards/Other.svg",
        },
      ],
    },
    {
      group: "Category",
      id: "Building",
      imgPath: "./hazards/Buildings.svg",
      children: [
        {
          group: "Building_Options",
          id: "Announcement",
          imgPath: "./hazards/Announcement.svg",
        },
        {
          group: "Building_Options",
          id: "Fire",
          imgPath: "./hazards/Fire.svg",
        },
        {
          group: "Building_Options",
          id: "Need_Rescue",
          imgPath: "./hazards/Need_Rescue.svg",
        },
        {
          group: "Building_Options",
          id: "Closed",
          imgPath: "./hazards/Building_Closed.svg",
        },
        {
          group: "Building_Options",
          id: "Wheelchair_Access",
          imgPath: "./hazards/Wheelchair_Access.svg",
        },
        {
          group: "Building_Options",
          id: "Elevator_Out",
          imgPath: "./hazards/Elevator.svg",
        },
        {
          group: "Building_Options",
          id: "Alarm",
          imgPath: "./hazards/Alarm.svg",
        },
        {
          group: "Building_Options",
          id: "Evacuate_Building",
          imgPath: "./hazards/Evacuate_Building.svg",
        },
        {
          group: "Building_Options",
          id: "Other",
          imgPath: "./hazards/Other.svg",
        },
      ],
    },
    {
      group: "Category",
      id: "Traffic",
      imgPath: "./hazards/Traffic.svg",
      children: [
        {
          group: "Traffic_Options",
          id: "Construction",
          imgPath: "./hazards/Construction.svg",
        },
        {
          group: "Traffic_Options",
          id: "Car_Accident",
          imgPath: "./hazards/Car_Accident.svg",
        },
        {
          group: "Traffic_Options",
          id: "Rolled_Truck",
          imgPath: "./hazards/Rolled_Truck.svg",
        },
        {
          group: "Traffic_Options",
          id: "Stalled_Car",
          imgPath: "./hazards/Stalled_Car.svg",
        },
        {
          group: "Traffic_Options",
          id: "Event_Traffic",
          imgPath: "./hazards/Event_Traffic.svg",
        },
        {
          group: "Traffic_Options",
          id: "Police_Barricade",
          imgPath: "./hazards/Police_Barricade.svg",
        },
        {
          group: "Traffic_Options",
          id: "Bridge_Out",
          imgPath: "./hazards/Bridge_Out.svg",
        },
        {
          group: "Traffic_Options",
          id: "Road_Closed",
          imgPath: "./hazards/Road_Closed.svg",
        },
        {
          group: "Traffic_Options",
          id: "Seasonal_Road",
          imgPath: "./hazards/Seasonal_Road.svg",
        },
        {
          group: "Traffic_Options",
          id: "Other",
          imgPath: "./hazards/Other.svg",
        },
      ],
    },
    {
      group: "Category",
      id: "Public_Safety",
      imgPath: "./hazards/Public_Safety.svg",
      children: [
        {
          group: "Public_Safety_Options",
          id: "Radiation",
          imgPath: "./hazards/Radiation.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Chemical_Spill",
          imgPath: "./hazards/Chemical_Spill.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Shelter_In_Place",
          imgPath: "./hazards/Shelter_In_Place.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Evacuation_Area",
          imgPath: "./hazards/Evacuate_Area.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Active_Shooter",
          imgPath: "./hazards/Active_Shooter.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Police_Standoff",
          imgPath: "./hazards/Police_Standoff.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Food_Shortage",
          imgPath: "./hazards/Food_Shortage.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Gas_Shortage",
          imgPath: "./hazards/Gas_Shortage.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "No_Water",
          imgPath: "./hazards/No_Water.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Police_Investigation",
          imgPath: "./hazards/Police_Investigation.svg",
        },
        {
          group: "Public_Safety_Options",
          id: "Other",
          imgPath: "./hazards/Other.svg",
        },
      ],
    },
    {
      group: "Category",
      id: "Utility_Problems",
      imgPath: "./hazards/Utilities.svg",
      children: [
        {
          group: "Utility_Problems_Options",
          id: "No_Power",
          imgPath: "./hazards/No_Power.svg",
        },
        {
          group: "Utility_Problems_Options",
          id: "No_Internet",
          imgPath: "./hazards/No_Internet.svg",
        },
        {
          group: "Utility_Problems_Options",
          id: "No_Cell_Service",
          imgPath: "./hazards/No_Cell_Service.svg",
        },
        {
          group: "Utility_Problems_Options",
          id: "Water_Main_Burst",
          imgPath: "./hazards/Water_Main_Burst.svg",
        },
        {
          group: "Utility_Problems_Options",
          id: "Boil_Water_Notice",
          imgPath: "./hazards/Boil_Water_Notice.svg",
        },
        {
          group: "Utility_Problems_Options",
          id: "No_Heating",
          imgPath: "./hazards/No_Heat.svg",
        },
        {
          group: "Utility_Problems_Options",
          id: "Other",
          imgPath: "./hazards/Other.svg",
        },
      ],
    },
  ];

  return (
    <Question state={state} active={active}>
      <OptionList
        options={schema}
        handleChange={(e) => {
          e.preventDefault();
          state[e.target.name] = e.target.value;
        }}
        isVisible={true}
      />
      <div className="centered-box">
        <NextButton />
        <BackButton />
      </div>
    </Question>
  );
}

function Question2({ state, active }: QuestionProps) {
  return (
    <Question state={state} active={active}>
      <OtherQuestion
        title={state["Category"].replace("_", " ") + " Other"}
        name="Other" //{state["Category"] + "_Options"}
        imagePath={
          state["Category"] ? `./hazards/${state["Category"]}.svg` : ""
        }
      />
    </Question>
  );
}

function Question3({ state, active }: QuestionProps) {
  const [imageSelected, setImageSelected] = useState(false);
  const mediaSelectOptions = (
    <>
      <label htmlFor="file-upload" className="form-button photo-button">
        Upload a photo
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        name="Image_URL"
        onChange={(e) => {
          e.preventDefault();
          if (!e.target.files) return;
          state[e.target.name] = URL.createObjectURL(e.target.files[0]);
          setImageSelected(true);
        }}
      />
    </>
  );

  return (
    <Question state={state} active={active}>
      <div className="camera-box">
        <div className="image-bounding-box">
          {imageSelected ? (
            <img src={state["Image_URL"]} className={`video-player`} />
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {mediaSelectOptions}
        </div>
      </div>
      <div className="centered-box">
        <NextButton />
        <BackButton />
      </div>
    </Question>
  );
}

function Question4({ state, active }: QuestionProps) {
  const hazards = [];
  for (var key in state) {
    if (key.includes("_Options") && state[key]) {
      hazards.push(key);
    }
  }

  const hazardsSummary = (
    <SummaryObject
      key="Hazards-Summary"
      title="Hazards"
      content={hazards.map((h, i) => {
        return (
          <div className="mr-2" key={`hazard-sum-${i}`}>
            <div className="summary-icon-background">
              <img
                className="small-icon"
                src={`./hazards/${state[h]}.svg`}
                alt="h"
              />
            </div>
            <p className="header-4 text-wrap">{state[h].replace("_", " ")}</p>
          </div>
        );
      })}
      onEditSelect={() => {
        console.log("Edit Hazards");
      }}
    />
  );

  const imageSummary = state["Image_URL"] ? (
    <SummaryObject
      key="Image-Summary"
      title="Your Photo"
      content={
        <div>
          <img src={state["Image_URL"]} />
        </div>
      }
      onEditSelect={() => {
        console.log("Edit image");
      }}
    />
  ) : (
    <></>
  );

  return (
    <Question state={state} active={active}>
      <Summary summaryObjects={[hazardsSummary, imageSummary]} />
    </Question>
  );
}
