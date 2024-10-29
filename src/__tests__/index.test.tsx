import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "../pages/Home";

describe("Counter is ok", () => {
  it("should handle the initial state", () => {
    render(<Home />);

    const countValue = screen.getByTestId("count");

    expect(countValue.textContent).toBe("0 items left");
  });
});

describe("List is ok", () => {
  it("should handle the initial state", () => {
    render(<Home />);

    const listValue = screen.getByTestId("todos-list");

    expect(listValue.children.length).toBe(0);
  });

  it("should handle the initial state when switching", () => {
    render(<Home />);

    const listValue = screen.getByTestId("todos-list");
    fireEvent.click(screen.getByTestId("button-active"));

    expect(listValue.children.length).toBe(0);

    fireEvent.click(screen.getByTestId("button-completed"));

    expect(listValue.children.length).toBe(0);
  });
});

describe("Add todos is ok", () => {
  it("should don't add empty item", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByTestId("button-add"));

    const listValue = screen.getByTestId("todos-list");

    expect(listValue.children.length).toBe(0);
  });

  it("should add items when add-button click", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "do todo" } });
    fireEvent.click(screen.getByTestId("button-add"));
    fireEvent.change(input, { target: { value: "todo do" } });
    fireEvent.click(screen.getByTestId("button-add"));

    const listValue = screen.getByTestId("todos-list");

    expect(listValue.children.length).toBe(2);
  });

  it("should add item when enter press", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "do todo" } });
    fireEvent.keyDown(input, { key: "Enter" })

    const listValue = screen.getByTestId("todos-list");

    expect(listValue.children.length).toBe(1);
  });

  it("should increase count when add item", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "do todo" } });
    fireEvent.click(screen.getByTestId("button-add"));
    fireEvent.change(input, { target: { value: "todo do" } });
    fireEvent.click(screen.getByTestId("button-add"));

    const countValue = screen.getByTestId("count");

    expect(countValue.textContent).toBe("2 items left");
  });
});

describe("Clear is ok", () => {
  it("should handle an empty list", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "do todo" } });
    fireEvent.click(screen.getByTestId("button-add"));
    fireEvent.click(screen.getByTestId("button-clear"));

    const listValue = screen.getByTestId("todos-list");

    expect(listValue.children.length).toBe(0);
  });

  it("should handle an count 0", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "do todo" } });
    fireEvent.click(screen.getByTestId("button-add"));
    fireEvent.click(screen.getByTestId("button-clear"));

    const countValue = screen.getByTestId("count");

    expect(countValue.textContent).toBe("0 items left");
  });
});

describe("Add todos and switch is ok", () => {
  it("should add active items, but not completed", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "do todo" } });
    fireEvent.click(screen.getByTestId("button-add"));
    fireEvent.change(input, { target: { value: "todo do" } });
    fireEvent.click(screen.getByTestId("button-add"));

    fireEvent.click(screen.getByTestId("button-active"));

    const listValue = screen.getByTestId("todos-list");

    expect(listValue.children.length).toBe(2);

    fireEvent.click(screen.getByTestId("button-completed"));

    expect(listValue.children.length).toBe(0);

    fireEvent.click(screen.getByTestId("button-all"));

    expect(listValue.children.length).toBe(2);
  });

  it("should switch completed items, but not active", () => {
    render(<Home />);

    const input = screen.getByTestId("input").querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "do todo" } });
    fireEvent.click(screen.getByTestId("button-add"));
    fireEvent.change(input, { target: { value: "todo do" } });
    fireEvent.click(screen.getByTestId("button-add"));

    const checkbox = screen.getByTestId("checkbox-0").querySelector("input") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(checkbox.checked).toEqual(true);

    fireEvent.click(screen.getByTestId("button-completed"));

    const listValue = screen.getByTestId("todos-list");

    expect(listValue.children.length).toBe(1);

    fireEvent.click(screen.getByTestId("button-active"));

    expect(listValue.children.length).toBe(1);

    fireEvent.click(screen.getByTestId("button-all"));

    expect(listValue.children.length).toBe(2);

    const countValue = screen.getByTestId("count");

    expect(countValue.textContent).toBe("1 items left");
  });
});
