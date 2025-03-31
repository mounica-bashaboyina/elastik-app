import React from "react";
import { render, screen } from "@testing-library/react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Profile from "./ProfileCard";

jest.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: jest.fn(),
}));

describe("ProfileCard Component", () => {
  it("renders the profile card with user information", () => {
    useAuthenticator.mockReturnValue({
      user: { username: "testuser" },
    });

    render(<Profile />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Name: testuser")).toBeInTheDocument();
  });

  it("renders correctly when no user is provided", () => {
    useAuthenticator.mockReturnValue({
      user: null,
    });

    render(<Profile />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Name:").textContent).toBe("Name: ");
  });
});
