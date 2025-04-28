import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MoodSelector from "./MoodSelector";
import "@testing-library/jest-dom";

// Mock Confetti to avoid canvas issues in tests
jest.mock("react-confetti", () => () => <div data-testid="confetti" />);

describe("MoodSelector", () => {
  it("renders mood options", () => {
    render(<MoodSelector />);
    expect(screen.getByText("How are you feeling today?")).toBeInTheDocument();
    expect(screen.getByLabelText("Happy")).toBeInTheDocument();
    expect(screen.getByLabelText("Sad")).toBeInTheDocument();
  });

  it("toggles dark mode", () => {
    render(<MoodSelector />);
    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(document.querySelector(".mood-container")).toHaveClass("dark");
  });

  it("displays message when a mood is selected", () => {
    render(<MoodSelector />);
    fireEvent.click(screen.getByLabelText("Tired"));
    expect(screen.getByText("Nap time? 😴💤")).toBeInTheDocument();
  });

  it("shows confetti when Happy mood is selected", () => {
    render(<MoodSelector />);
    fireEvent.click(screen.getByLabelText("Happy"));
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });

  it("shows confetti when Loved mood is selected", () => {
    render(<MoodSelector />);
    fireEvent.click(screen.getByLabelText("Loved"));
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });

  it("does not show confetti when Sad mood is selected", () => {
    render(<MoodSelector />);
    fireEvent.click(screen.getByLabelText("Sad"));
    expect(screen.queryByTestId("confetti")).toBeNull();
  });

  it("confetti disappears after 3 seconds", async () => {
    jest.useFakeTimers(); // use fake timers
    render(<MoodSelector />);
    fireEvent.click(screen.getByLabelText("Happy"));
    expect(screen.getByTestId("confetti")).toBeInTheDocument();

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.queryByTestId("confetti")).toBeNull();
    });

    jest.useRealTimers(); // cleanup
  });
});
