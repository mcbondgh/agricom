import { z } from "zod";

export const farmerSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z\s]+$/, "First name must contain only letters"),

  surname: z
    .string()
    .min(1, "Surname is required")
    .regex(/^[A-Za-z\s]+$/, "Surname must contain only letters"),

  last_name: z.string().optional(),

  gender: z
    .string()
    .refine(val => ["male", "female", "other"].includes(val), {
      message: "Gender is required",
    }),

    age: z.preprocess((val) => {
        if (val === "" || val === undefined || val === null) {
          return undefined;
        }
        return Number(val);
      },
      z.number({
          required_error: "Age is required",
          invalid_type_error: "Age must be a number",
        })
        .min(0, "Age must be a non-negative number")
    ),

  contact_details: z
    .string()
    .min(1,"Contact is required")
    .regex(/^\d{10}$/, "Contact must be exactly 10 digits"),

  residential_address: z
    .string()
    .min(1, "Address is required"),

  farming_experience: z
    .string()
    .min(1, "Experience is required")
    .refine(val => /^\d+$/.test(val), {
      message: "Experience must be a number",
    }),

  education_level: z
    .string()
    .refine(val => ["primary", "secondary", "tertiary", "other"].includes(val), {
      message: "Education level is required",
    }),

  farm_gps_coordinates: z
    .string()
    .min(1, "GPS coordinates required"),

  farm_association_memb: z
    .string()
    .min(1, "Membership info required"),

  land_size: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  },
  z.number({
      required_error: "Land size is required",
      invalid_type_error: "land size must be a number",
    })
    .min(0, "Land size must be a non-negative number")
  ),

  farm_location: z
    .string()
    .min(1, "Farm location required"),

  crop_type: z
    .string()
    .min(1, "Crop type required")
    .refine(val => ["legumes", "cereals", "vegetables" , "fruits" , "root and tuber", "cash crops"].includes(val), {
      message: "Crop type is required", 
      }),

  soil_type: z
    .string()
    .refine(val => ["clay", "sandy", "silt", "loam", "other"].includes(val), {
      message: "Soil type is required",
    }),

  farming_practice: z
    .string()
    .refine(val => ["organic", "conventional", "mixed", "other"].includes(val), {
      message: "Farming practice is required",
    }),

  mechanization: z
    .string()
    .refine(val => ["low", "medium", "high"].includes(val), {
      message: "Mechanization level is required",
    }),

    harvest_dates: z
    .string()
    .min(1, "Harvest date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  

  yield_per_acre: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  },
  z.number({
      required_error: "Yield-per-acre is required",
      invalid_type_error: "Yield-per-acre must be a number",
    })
    .min(0, "Yield-per-acre must be a non-negative number")
  ),

  market_prices: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  },
  z.number({
      required_error: "Market price is required",
      invalid_type_error: "Market price must be a number",
    })
    .min(0, "Market price must be a non-negative number")
  ),

  revenue: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  },
  z.number({
      required_error: "Revenue is required",
      invalid_type_error: "Revenue must be a number",
    })
    .min(0, "Revenue must be a non-negative number")
  ),

});

//SCHEMA FOR STEPPERS

//farmer info
export const farmerInfoSchema = farmerSchema.pick({
  first_name: true,
  surname: true,
  last_name: true,
  gender: true,
  age: true,
  contact_details: true,
  residential_address: true,
  farming_experience: true,
  education_level: true,
  farm_gps_coordinates: true,
  farm_association_memb: true,
});

//farmland info
export const farmLandInfoSchema = farmerSchema.pick({
  land_size: true,
  farm_location: true,
  crop_type: true,
  soil_type: true,
  farming_practice: true,
  mechanization: true,
});

//Yield info
export const yieldInfoSchema = farmerSchema.pick({
  harvest_dates: true,
  yield_per_acre: true,
  market_prices: true,
  revenue: true,
});
