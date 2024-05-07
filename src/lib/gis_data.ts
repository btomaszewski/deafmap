import { RecordLookup } from "./util";

export enum HazardCategory {
  Severe_Weather = 0,
  Buildings = 1,
  Traffic = 2,
  Public_Safety = 3,
  Utility_Problems = 4,
}

export enum HazardDescriptor {
  Wire_Down = 0,
  Tree_Down = 1,
  Ice_Storm = 2,
  Winter_Storm = 3,
  Blizzard = 4,
  Hail_Storm = 5,
  Extreme_Cold = 6,
  Flood = 7,
  Debris = 8,
  Dense_Fog = 9,
  Thunder_Storm = 10,
  Heatwave = 11,
  Wildfire = 12,
  Tornado_Warning = 13,
  Landslide = 14,
  Tornado_Siren = 15,
  Announcement = 16,
  Fire = 17,
  Need_Rescue = 18,
  Closed = 19,
  Wheelchair_Access = 20,
  Elevator_Out = 21,
  Alarm = 22,
  Evacuate_Building = 23,
  Construction = 24,
  Car_Accident = 25,
  Rolled_truck = 26,
  Stalled_Car = 27,
  Event_Traffic = 28,
  Police_Barricade = 29,
  Bridge_Out = 30,
  Road_Closed = 31,
  Seasonal_Road = 32,
  Radiation = 33,
  Chemical_Spill = 34,
  Shelter_In_Place = 35,
  Evacuation_Area = 36,
  Active_Shooter = 37,
  Police_Standoff = 38,
  Food_Shortage = 39,
  Gas_Shortage = 40,
  Pandemic = 41,
  Amber_Alert = 42,
  No_Power = 43,
  No_Internet = 44,
  No_Cell_Service = 45,
  Water_Main_Burst = 46,
  Boil_Water_Notice = 47,
  No_Heating = 48,
  Other = 49,
}

export type HazardDescriptorValues = keyof typeof HazardDescriptor;

export type HazardCategoryValues = keyof typeof _HazardCategory;

const _HazardCategory = {
  Severe_Weather: {
    value: 0,
    title: "Severe Weather",
    color: [80, 175, 15],
  },
  Buildings: {
    value: 1,
    title: "Buildings",
    color: [133, 133, 133],
  },
  Traffic: {
    value: 2,
    title: "Traffic",
    color: [219, 30, 0],
  },
  Public_Safety: {
    value: 3,
    title: "Public Safety",
    color: [30, 5, 255],
  },
  Utilities: {
    value: 4,
    title: "Utility Problems",
    color: [255, 140, 0],
  },
};

const _HazardDescriptor = {
  Wire_Down: {
    value: 0,
    title: "Wire Down",
    color: [0, 0, 0],
  },
  Tree_Down: {
    value: 1,
    title: "Tree_Down",
    color: [0, 0, 0],
  },
  Ice_Storm: {
    value: 2,
    title: "Ice Storm",
    color: [0, 0, 0],
  },
  Winter_Storm: {
    value: 3,
    title: "Winter Storm",
    color: [0, 0, 0],
  },
  Blizzard: {
    value: 4,
    title: "Blizzard",
    color: [0, 0, 0],
  },
  Hail_Storm: {
    value: 5,
    title: "Hail Storm",
    color: [0, 0, 0],
  },
  Extreme_Cold: {
    value: 6,
    title: "Extreme Cold",
    color: [0, 0, 0],
  },
  Flood: {
    value: 7,
    title: "Flood",
    color: [0, 0, 0],
  },
  Debris: {
    value: 8,
    title: "Debris",
    color: [0, 0, 0],
  },
  Dense_Fog: {
    value: 9,
    title: "Dense Fog",
    color: [0, 0, 0],
  },
  Thunder_Storm: {
    value: 10,
    title: "Thunder Storm",
    color: [0, 0, 0],
  },
  Heatwave: {
    value: 11,
    title: "Heatwave",
    color: [0, 0, 0],
  },
  Wildfire: {
    value: 12,
    title: "Wildfire",
    color: [0, 0, 0],
  },
  Tornado_Warning: {
    value: 13,
    title: "Tornado Warning",
    color: [0, 0, 0],
  },
  Landslide: {
    value: 14,
    title: "Landslide",
    color: [0, 0, 0],
  },
  Tornado_Siren: {
    value: 15,
    title: "Tornado Siren",
    color: [0, 0, 0],
  },
  Announcement: {
    value: 16,
    title: "Announcement",
    color: [0, 0, 0],
  },
  Fire: {
    value: 17,
    title: "Fire",
    color: [0, 0, 0],
  },
  Need_Rescue: {
    value: 18,
    title: "Need Rescue",
    color: [0, 0, 0],
  },
  Closed: {
    value: 19,
    title: "Closed",
    color: [0, 0, 0],
  },
  Wheelchair_Access: {
    value: 20,
    title: "Wheelchair Access",
    color: [0, 0, 0],
  },
  Elevator_Out: {
    value: 21,
    title: "Elevator Out",
    color: [0, 0, 0],
  },
  Alarm: {
    value: 22,
    title: "Alarm",
    color: [0, 0, 0],
  },
  Evacuate_Building: {
    value: 23,
    title: "Evacuate Building",
    color: [0, 0, 0],
  },
  Construction: {
    value: 24,
    title: "Construction",
    color: [0, 0, 0],
  },
  Car_Accident: {
    value: 25,
    title: "Car Accident",
    color: [0, 0, 0],
  },
  Rolled_Truck: {
    value: 26,
    title: "Rolled Truck",
    color: [0, 0, 0],
  },
  Stalled_Car: {
    value: 27,
    title: "Stalled Car",
    color: [0, 0, 0],
  },
  Event_Traffic: {
    value: 28,
    title: "Event Traffic",
    color: [0, 0, 0],
  },
  Police_Barricade: {
    value: 29,
    title: "Police Barricade",
    color: [0, 0, 0],
  },
  Bridge_Out: {
    value: 30,
    title: "Bridge Out",
    color: [0, 0, 0],
  },
  Road_Closed: {
    value: 31,
    title: "Road Closed",
    color: [0, 0, 0],
  },
  Seasonal_Road: {
    value: 32,
    title: "Seasonal Road",
    color: [0, 0, 0],
  },
  Radiation: {
    value: 33,
    title: "Radiation",
    color: [0, 0, 0],
  },
  Chemical_Spill: {
    value: 34,
    title: "Chemical Spill",
    color: [0, 0, 0],
  },
  Shelter_In_Place: {
    value: 35,
    title: "Shelter In Place",
    color: [0, 0, 0],
  },
  Evacuation_Area: {
    value: 36,
    title: "Evacuation Area",
    color: [0, 0, 0],
  },
  Active_Shooter: {
    value: 37,
    title: "Active Shooter",
    color: [0, 0, 0],
  },
  Police_Standoff: {
    value: 38,
    title: "Police Standoff",
    color: [0, 0, 0],
  },
  Food_Shortage: {
    value: 39,
    title: "Food Shortage",
    color: [0, 0, 0],
  },
  Gas_Shortage: {
    value: 40,
    title: "Gas Shortage",
    color: [0, 0, 0],
  },
  Pandemic: {
    value: 41,
    title: "Pandemic",
    color: [0, 0, 0],
  },
  Amber_Alert: {
    value: 42,
    title: "Amber Alert",
    color: [0, 0, 0],
  },
  No_Power: {
    value: 43,
    title: "No Power",
    color: [0, 0, 0],
  },
  No_Internet: {
    value: 44,
    title: "No Internet",
    color: [0, 0, 0],
  },
  No_Cell_Service: {
    value: 45,
    title: "No_Cell_Service",
    color: [0, 0, 0],
  },
  Water_Main_Burst: {
    value: 46,
    title: "Water Main Burst",
    color: [0, 0, 0],
  },
  Boil_Water_Notice: {
    value: 47,
    title: "Boil Water Notice",
    color: [0, 0, 0],
  },
  No_Heating: {
    value: 48,
    title: "No Heating",
    color: [0, 0, 0],
  },
  Other: {
    value: 50,
    title: "Other",
    color: [0, 0, 0],
  },
};

export function HazardLookup(h: HazardCategoryValues) {
  return RecordLookup(_HazardCategory, h);
}
