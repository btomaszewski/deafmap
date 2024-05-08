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

export type HazardDescriptorValues = keyof typeof _HazardDescriptor;

export type HazardCategoryValues = keyof typeof _HazardCategory;

const _HazardCategory = {
  Severe_Weather: {
    value: 0,
    title: "Severe Weather",
    color: [80, 175, 15],
  },
  Building: {
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
    color: [255, 0, 0],
  },
  Tree_Down: {
    value: 1,
    title: "Tree_Down",
    color: [0, 70, 5],
  },
  Ice_Storm: {
    value: 2,
    title: "Ice Storm",
    color: [0, 229, 255],
  },
  Winter_Storm: {
    value: 3,
    title: "Winter Storm",
    color: [13, 115, 170],
  },
  Blizzard: {
    value: 4,
    title: "Blizzard",
    color: [155, 195, 255],
  },
  Hail_Storm: {
    value: 5,
    title: "Hail Storm",
    color: [30, 55, 100],
  },
  Extreme_Cold: {
    value: 6,
    title: "Extreme Cold",
    color: [50, 10, 195],
  },
  Flood: {
    value: 7,
    title: "Flood",
    color: [25, 30, 215],
  },
  Debris: {
    value: 8,
    title: "Debris",
    color: [100, 40, 0],
  },
  Dense_Fog: {
    value: 9,
    title: "Dense Fog",
    color: [155, 155, 155],
  },
  Thunder_Storm: {
    value: 10,
    title: "Thunder Storm",
    color: [240, 225, 100],
  },
  Heatwave: {
    value: 11,
    title: "Heatwave",
    color: [225, 60, 40],
  },
  Wildfire: {
    value: 12,
    title: "Wildfire",
    color: [250, 100, 0],
  },
  Tornado_Warning: {
    value: 13,
    title: "Tornado Warning",
    color: [80, 70, 120],
  },
  Landslide: {
    value: 14,
    title: "Landslide",
    color: [80, 25, 0],
  },
  Tornado_Siren: {
    value: 15,
    title: "Tornado Siren",
    color: [100, 90, 140],
  },
  Announcement: {
    value: 16,
    title: "Announcement",
    color: [195, 255, 0],
  },
  Fire: {
    value: 17,
    title: "Fire",
    color: [255, 105, 45],
  },
  Need_Rescue: {
    value: 18,
    title: "Need Rescue",
    color: [160, 0, 0],
  },
  Closed: {
    value: 19,
    title: "Closed",
    color: [200, 15, 0],
  },
  Wheelchair_Access: {
    value: 20,
    title: "Wheelchair Access",
    color: [40, 70, 120],
  },
  Elevator_Out: {
    value: 21,
    title: "Elevator Out",
    color: [60, 65, 77],
  },
  Alarm: {
    value: 22,
    title: "Alarm",
    color: [242, 31, 35],
  },
  Evacuate_Building: {
    value: 23,
    title: "Evacuate Building",
    color: [120, 20, 25],
  },
  Construction: {
    value: 24,
    title: "Construction",
    color: [220, 220, 0],
  },
  Car_Accident: {
    value: 25,
    title: "Car Accident",
    color: [222, 0, 210],
  },
  Rolled_Truck: {
    value: 26,
    title: "Rolled Truck",
    color: [225, 0, 140],
  },
  Stalled_Car: {
    value: 27,
    title: "Stalled Car",
    color: [0, 211, 222],
  },
  Event_Traffic: {
    value: 28,
    title: "Event Traffic",
    color: [100, 255, 110],
  },
  Police_Barricade: {
    value: 29,
    title: "Police Barricade",
    color: [100, 15, 250],
  },
  Bridge_Out: {
    value: 30,
    title: "Bridge Out",
    color: [219, 115, 220],
  },
  Road_Closed: {
    value: 31,
    title: "Road Closed",
    color: [219, 190, 115],
  },
  Seasonal_Road: {
    value: 32,
    title: "Seasonal Road",
    color: [125, 105, 45],
  },
  Radiation: {
    value: 33,
    title: "Radiation",
    color: [203, 235, 0],
  },
  Chemical_Spill: {
    value: 34,
    title: "Chemical Spill",
    color: [155, 255, 75],
  },
  Shelter_In_Place: {
    value: 35,
    title: "Shelter In Place",
    color: [75, 205, 255],
  },
  Evacuation_Area: {
    value: 36,
    title: "Evacuation Area",
    color: [5, 128, 176],
  },
  Active_Shooter: {
    value: 37,
    title: "Active Shooter",
    color: [5, 5, 95],
  },
  Police_Standoff: {
    value: 38,
    title: "Police Standoff",
    color: [40, 40, 95],
  },
  Food_Shortage: {
    value: 39,
    title: "Food Shortage",
    color: [75, 125, 85],
  },
  Gas_Shortage: {
    value: 40,
    title: "Gas Shortage",
    color: [110, 90, 35],
  },
  Pandemic: {
    value: 41,
    title: "Pandemic",
    color: [165, 5, 75],
  },
  Amber_Alert: {
    value: 42,
    title: "Amber Alert",
    color: [215, 55, 0],
  },
  No_Power: {
    value: 43,
    title: "No Power",
    color: [65, 65, 25],
  },
  No_Internet: {
    value: 44,
    title: "No Internet",
    color: [143, 3, 145],
  },
  No_Cell_Service: {
    value: 45,
    title: "No_Cell_Service",
    color: [205, 93, 207],
  },
  Water_Main_Burst: {
    value: 46,
    title: "Water Main Burst",
    color: [30, 15, 195],
  },
  Boil_Water_Notice: {
    value: 47,
    title: "Boil Water Notice",
    color: [128, 121, 217],
  },
  No_Heating: {
    value: 48,
    title: "No Heating",
    color: [56, 36, 5],
  },
  Other: {
    value: 50,
    title: "Other",
    color: [255, 0, 200],
  },
  Wind_Storm: {
    value: 51,
    title: "Wind Storm",
    color: [128, 128, 128],
  },
};

export function HazardLookup(h: HazardCategoryValues) {
  return RecordLookup(_HazardCategory, h);
}

export function HazardDescriptorLookup(d: HazardDescriptorValues) {
  return RecordLookup(_HazardDescriptor, d);
}
