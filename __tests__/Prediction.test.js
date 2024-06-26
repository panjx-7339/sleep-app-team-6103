import React from "react";
import { render } from "@testing-library/react-native";
import Prediction from "../src/screens/StatsScreen/components/Prediction";

const monday = new Date("1990-01-01T00:00:00");
const mockSessions = [
  { end: monday.getTime() + 86400000 * 0, durationInHours: 5 }, // mon
  { end: monday.getTime() + 86400000 * 1, durationInHours: 5 }, // tues
  { end: monday.getTime() + 86400000 * 2, durationInHours: 5 }, // wed
  { end: monday.getTime() + 86400000 * 3, durationInHours: 8 }, // thurs
  { end: monday.getTime() + 86400000 * 4, durationInHours: 8 }, // fri
  { end: monday.getTime() + 86400000 * 5, durationInHours: 8 }, // sat
  { end: monday.getTime() + 86400000 * 6, durationInHours: 8 }, // sun
  { end: monday.getTime() + 86400000 * 7, durationInHours: 5 }, // mon
  { end: monday.getTime() + 86400000 * 8, durationInHours: 8 }, // tues
  { end: monday.getTime() + 86400000 * 9, durationInHours: 5 }, // wed
  { end: monday.getTime() + 86400000 * 10, durationInHours: 8 }, // thurs
  { end: monday.getTime() + 86400000 * 11, durationInHours: 8 }, // fri
  { end: monday.getTime() + 86400000 * 12, durationInHours: 8 }, // sat
  { end: monday.getTime() + 86400000 * 13, durationInHours: 8 }, // sun
  { end: monday.getTime() + 86400000 * 14, durationInHours: 5 }, // mon
  { end: monday.getTime() + 86400000 * 15, durationInHours: 5 }, // tues
];

const mockSessionsEmptySet = [];

const mockSesions5Days = [
  { end: monday.getTime() + 86400000 * 11, durationInHours: 8 }, // fri
  { end: monday.getTime() + 86400000 * 12, durationInHours: 8 }, // sat
  { end: monday.getTime() + 86400000 * 13, durationInHours: 8 }, // sun
  { end: monday.getTime() + 86400000 * 14, durationInHours: 5 }, // mon
  { end: monday.getTime() + 86400000 * 15, durationInHours: 5 }, // tues
];

test("finds correct days", () => {
  const { getByText } = render(<Prediction sessions={mockSessions} goal={8} />);
  expect(
    getByText(
      "You are most likely to miss your sleep goal on Monday, Wednesday and Tuesday"
    )
  ).toBeTruthy();
});
test("empty sessions", () => {
  const { getByText } = render(
    <Prediction sessions={mockSessionsEmptySet} goal={8} />
  );
  expect(
    getByText(
      "Track more than 7 days to see when you are most likely to miss your sleep goal."
    )
  ).toBeTruthy();
});

test("insufficient days", () => {
  const { getByText } = render(
    <Prediction sessions={mockSesions5Days} goal={8} />
  );

  expect(
    getByText(
      "Track more than 7 days to see when you are most likely to miss your sleep goal."
    )
  ).toBeTruthy();
});
