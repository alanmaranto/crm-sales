import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SalesUserCard } from "../components/crm/SalesUserCard";

describe("SalesUserCard", () => {
  it("should render the user's name, email, birthdate, and national ID", () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      birthdate: "01/01/1970",
      id: "123456",
    };
    const { getByText } = render(<SalesUserCard data={data} />);

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("john@example.com")).toBeInTheDocument();
    expect(getByText("01/01/1970")).toBeInTheDocument();
    expect(getByText("123456")).toBeInTheDocument();
  });

  it("should render the run model button if the user is not a prospect", () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      birthdate: "01/01/1970",
      id: "123456",
      status: "customer",
    };
    const { getByText } = render(<SalesUserCard data={data} />);

    expect(getByText("Run model")).toBeInTheDocument();
  });

  it("should not render the run model button if the user is a prospect", () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      birthdate: "01/01/1970",
      id: "123456",
      status: "prospect",
    };
    const { queryByText } = render(<SalesUserCard data={data} />);

    expect(queryByText("Run model")).toBeNull();
  });
});
