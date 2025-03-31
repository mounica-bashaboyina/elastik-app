import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const mockHandlePrevious = jest.fn();
  const mockHandleNext = jest.fn();

  const renderPagination = (page, nextToken) => {
    render(
      <Pagination
        page={page}
        nextToken={nextToken}
        handlePrevious={mockHandlePrevious}
        handleNext={mockHandleNext}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the pagination component with buttons and page number", () => {
    renderPagination(1, "nextToken");
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 1")).toBeInTheDocument();
  });

  it("disables the 'Previous' button when on the first page", () => {
    renderPagination(1, "nextToken");

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("enables the 'Previous' button when not on the first page", () => {
    renderPagination(2, "nextToken");
    expect(screen.getByText("Previous")).not.toBeDisabled();
  });

  it("disables the 'Next' button when there is no nextToken", () => {
    renderPagination(1, null);
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("enables the 'Next' button when there is a nextToken", () => {
    renderPagination(1, "nextToken");
    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  it("calls handlePrevious when the 'Previous' button is clicked", () => {
    renderPagination(2, "nextToken");
    fireEvent.click(screen.getByText("Previous"));
    expect(mockHandlePrevious).toHaveBeenCalledTimes(1);
  });

  it("calls handleNext when the 'Next' button is clicked", () => {
    renderPagination(1, "nextToken");
    fireEvent.click(screen.getByText("Next"));
    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });
});