import React from "react";
import { render } from "@testing-library/react-native";
import BasicStats from "../src/screens/StatsScreen/components/BasicStats";

const mockSessions = [
  { end: new Date().getTime() - 86400000 * 1, durationInHours: 8 }, // 1 day ago
  { end: new Date().getTime() - 86400000 * 2, durationInHours: 9 }, // 2 days ago
  { end: new Date().getTime() - 86400000 * 3, durationInHours: 7 }, // 3 days ago
  { end: new Date().getTime() - 86400000 * 8, durationInHours: 5 }, // 8 days ago
  { end: new Date().getTime() - 86400000 * 31, durationInHours: 1 }, // 31 days ago
];

test("calculates correct averages", () => {
  const { getByText } = render(<BasicStats sessions={mockSessions} />);

  expect(getByText("Average hours slept...")).toBeTruthy();

  expect(getByText("8.0")).toBeTruthy();
  expect(getByText("Past 7 Days")).toBeTruthy();

  expect(getByText("7.3")).toBeTruthy();
  expect(getByText("Past 30 Days")).toBeTruthy();

  expect(getByText("6.0")).toBeTruthy();
  expect(getByText("All-time")).toBeTruthy();
});
