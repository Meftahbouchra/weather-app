import { configureStore } from "@reduxjs/toolkit";
import  WeatherSlice  from "../features/WeatherSlice";

export const store =configureStore(
    { reducer : { weather : WeatherSlice}
}
)