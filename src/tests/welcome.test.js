import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Welcome from "../components/places/welcome";
import { renderWithContext } from "../tests/helpers/renderWithContext";
import { initialUserInfo } from "../contexts/userContext";
import { initialTourData } from "../contexts/tourContext";
import { initialGeneralData } from "../contexts/generalContext";
import { initialUserInventory } from "../contexts/inventoryContext";

describe("Welcome component", () => {
  beforeEach(() => {
    localStorage.setItem("userInfo", JSON.stringify(initialUserInfo));
    localStorage.setItem("tourData", JSON.stringify(initialTourData));
    localStorage.setItem("generalData", JSON.stringify(initialGeneralData));
    localStorage.setItem("userInventory", JSON.stringify(initialUserInventory));
  });

  test("Checks a new game as a player", async () => {
    renderWithContext(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("I want a challenge"));

    fireEvent.change(screen.getByPlaceholderText("Please enter your name"), {
      target: { value: "TEST" },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("Play"));
    });
    expect(JSON.parse(localStorage.getItem("userInfo")).name).toEqual("TEST");
    expect(
      JSON.parse(localStorage.getItem("userInfo")).movement.maxMovePoints
    ).toEqual(15);
    expect(
      JSON.parse(localStorage.getItem("userInfo")).movement.currentMovePoints
    ).toEqual(15);
    expect(JSON.parse(localStorage.getItem("tourData")).tour).toEqual(false);
    expect(JSON.parse(localStorage.getItem("generalData")).newGame).toEqual(
      true
    );
    expect(
      JSON.parse(localStorage.getItem("generalData")).availablePlanets.crion
        .available
    ).toEqual(true);
    expect(JSON.parse(localStorage.getItem("userInventory"))).toEqual(
      initialUserInventory
    );

    fireEvent.change(screen.getByPlaceholderText("Please enter your name"), {
      target: { value: "x" },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("Play"));
    });

    expect(JSON.parse(localStorage.getItem("userInfo")).name).not.toEqual("x");
  });

  test("Checks a new game as a guest", async () => {
    renderWithContext(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("I'm just a tourist"));
    });

    expect(JSON.parse(localStorage.getItem("userInfo")).name).toEqual("Guest");
    expect(
      JSON.parse(localStorage.getItem("userInfo")).movement.maxMovePoints
    ).toEqual(150);
    expect(
      JSON.parse(localStorage.getItem("userInfo")).movement.currentMovePoints
    ).toEqual(150);
    expect(JSON.parse(localStorage.getItem("tourData")).tour).toEqual(true);
    expect(JSON.parse(localStorage.getItem("generalData")).newGame).toEqual(
      true
    );
    expect(
      JSON.parse(localStorage.getItem("generalData")).availablePlanets.crion
        .available
    ).toEqual(true);

    expect(JSON.parse(localStorage.getItem("userInventory")).credits).toEqual(
      45000
    );
    expect(JSON.parse(localStorage.getItem("userInventory")).steel).toEqual(
      500
    );
    expect(JSON.parse(localStorage.getItem("userInventory")).word).toEqual(100);
    expect(JSON.parse(localStorage.getItem("userInventory")).stardust).toEqual(
      500
    );
    expect(JSON.parse(localStorage.getItem("userInventory")).aluminum).toEqual(
      500
    );
    expect(JSON.parse(localStorage.getItem("userInventory")).crystal).toEqual(
      500
    );
    expect(JSON.parse(localStorage.getItem("userInventory")).favs).toEqual({});
  });
});
