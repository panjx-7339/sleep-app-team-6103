import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddSleepSession from "../src/screens/PastSessionsScreen/components/AddSleepSession";
import { auth, db } from "../src/firebase/config";

// Mock Firebase setup
jest.mock("../src/firebase/config", () => ({}));

const mockSessions = [
  { start: new Date().getTime() - 86400000 / 2, end: new Date().getTime() },
];

test("calculates correct averages", () => {});
