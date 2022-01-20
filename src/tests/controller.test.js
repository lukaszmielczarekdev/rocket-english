import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Controller from "../components/places/controller";
import { renderWithContext } from "../tests/helpers/renderWithContext";

describe("Controller component (with API)", () => {
  test("Checks the wrong word", async () => {
    await waitFor(() => {
      renderWithContext(
        <BrowserRouter>
          <Controller />
        </BrowserRouter>
      );
    });

    await waitFor(async () => {
      fireEvent.click(await screen.findByText("Start"));
    });

    await waitFor(async () => {
      fireEvent.change(
        await screen.findByPlaceholderText("How many? (1 - 50)"),
        {
          target: { value: 1 },
        }
      );
    });

    await waitFor(async () => {
      fireEvent.click(await screen.findByText("Start"));
    });

    await waitFor(
      async () => {
        fireEvent.change(await screen.findByPlaceholderText("Answer"), {
          target: { value: "test" },
        });
      },
      { timeout: 25000 }
    );

    await waitFor(async () => {
      fireEvent.click(await screen.findByText("Submit"));
    });

    await waitFor(async () => {
      expect(await screen.findByText("Try again")).toBeInTheDocument();
    });

    await waitFor(async () => {
      fireEvent.click(await screen.findByTestId("quizCloseModalButton"));
    });
    await waitFor(async () => {
      fireEvent.click(await screen.findByText("Go back"));
    });
  });

  test("Checks the skip option", async () => {
    await waitFor(async () => {
      renderWithContext(
        <BrowserRouter>
          <Controller />
        </BrowserRouter>
      );
    });

    await waitFor(async () => {
      fireEvent.change(
        await screen.findByPlaceholderText("How many? (1 - 50)"),
        {
          target: { value: 1 },
        }
      );
    });

    await waitFor(async () => {
      fireEvent.click(await screen.findByText("Start"));
    });

    await waitFor(
      async () => {
        fireEvent.click(await screen.findByText("Skip"));
      },
      { timeout: 25000 }
    );

    await waitFor(async () => {
      expect(await screen.findByText("+0 exp")).toBeInTheDocument();
    });

    await waitFor(async () => {
      fireEvent.click(await screen.findByTestId("summaryCloseModalButton"));
    });
  });

  test("Checks the reveal option", async () => {
    await waitFor(() => {
      renderWithContext(
        <BrowserRouter>
          <Controller />
        </BrowserRouter>
      );
    });

    await waitFor(async () => {
      fireEvent.change(
        await screen.findByPlaceholderText("How many? (1 - 50)"),
        {
          target: { value: 1 },
        }
      );
    });

    await waitFor(async () => {
      fireEvent.click(await screen.findByText("Start"));
    });

    await waitFor(
      async () => {
        fireEvent.click(await screen.findByText("Reveal the word"));
      },
      { timeout: 25000 }
    );

    await waitFor(async () => {
      expect(await screen.findByText("+100 exp")).toBeInTheDocument();
    });

    await waitFor(async () => {
      fireEvent.click(await screen.findByTestId("summaryCloseModalButton"));
    });
  });
});
