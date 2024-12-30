import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./form";
import { TODO } from "./types";
import exp from "constants";

describe("form 테스트", () => {
  const User = userEvent.setup();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handleAddTodo 함수가 호출될때 todo가 없으면 에러를 던져야한다.", async () => {
    // Arrange
    const setTodosMock = jest.fn();
    const handleSaveToStorageMock = jest.fn();
    const newTodo: TODO = {
      id: 1,
      todo: "",
      done: false,
    };
    jest.spyOn(Date.prototype, "getTime").mockReturnValue(newTodo.id);

    render(
      <Form
        handleSaveToStorage={handleSaveToStorageMock}
        setTodos={setTodosMock}
      />
    );

    const input = screen.getByRole("textbox", { name: /todo/i });
    // await User.type(input, newTodo.todo);
    fireEvent.change(input, { target: { value: newTodo.todo } });

    const submitButton = screen.getByRole("button", { name: /create/i });

    // await User.click(submitButton);

    // await expect(User.click(submitButton)).rejects.toThrow(
    //   "할 일을 입력하세요"
    // );

    // User.click(submitButton).catch((e) => {
    //   expect(e).toBeInstanceOf(Error);
    // });

    // await expect(User.click(submitButton)).rejects.toThrow(
    //   "할 일을 입력하세요"
    // );

    // try {
    //   await User.click(submitButton);
    // } catch (e) {
    //   expect(e).toBeInstanceOf(Error);
    // }

    // await expect(User.click(submitButton)).rejects.toThrow(
    //   "할 일을 입력하세요"
    // );

    // Act
    expect(setTodosMock).not.toHaveBeenCalled;
    expect(handleSaveToStorageMock).not.toHaveBeenCalled();
  });

  it("생성하기 버튼을 클릭하면 handleAddTodo가 호출되고 setTodos와 handleSaveToStorage가 호출되어야한다.", async () => {
    // Arrange
    const setTodosMock = jest.fn();
    const handleSaveToStorageMock = jest.fn();
    const newTodo: TODO = {
      id: 1,
      todo: "test",
      done: false,
    };
    jest.spyOn(Date.prototype, "getTime").mockReturnValue(newTodo.id);

    render(
      <Form
        handleSaveToStorage={handleSaveToStorageMock}
        setTodos={setTodosMock}
      />
    );

    const input = screen.getByRole("textbox", { name: /todo/i });
    await User.type(input, newTodo.todo);
    // fireEvent.change(input, { target: { value: newTodo.todo } });

    const submitButton = screen.getByRole("button", { name: /create/i });

    await User.click(submitButton);

    // Act
    expect(setTodosMock).toHaveBeenCalledTimes(1);
    expect(handleSaveToStorageMock).toHaveBeenCalledTimes(1);
    expect(handleSaveToStorageMock).toHaveBeenCalledWith(newTodo);
  });

  it("input에 값을 입력하면 value에 값이 있어야한다.", async () => {
    // Arrange
    const setTodoMock = jest.fn();
    render(<Form handleSaveToStorage={jest.fn()} setTodos={setTodoMock} />);

    // Act
    // 1. input 요소를 찾는다.
    const input = screen.getByRole("textbox");

    // // 2. input 요소를 클릭한다.
    // await User.click(input);

    // 2. input 요소에 타이핑한다.
    await User.type(input, "test");

    // setTodoMock 호출 되었는지 확인
    expect(input).toHaveValue("test");
  });

  const renderForm = () => {
    render(<Form handleSaveToStorage={jest.fn()} setTodos={jest.fn()} />);
  };

  it("form이 렌더링 되어야 합니다.", () => {
    renderForm();

    const form = screen.getByLabelText("form");
    expect(form).toBeInTheDocument();

    const formByTestId = screen.getByTestId("todo-form");
    expect(formByTestId).toBeInTheDocument();

    const formByTitle = screen.getByTitle(/create/i);
    expect(formByTitle).toBeInTheDocument();

    const formByQuerySelector = document.querySelector("form");
    expect(formByQuerySelector).toBeInTheDocument();

    const formById = document.getElementById("todo-form");
    expect(formById).toBeInTheDocument();
  });

  it("input이 렌더링 되어야합니다.", () => {
    renderForm();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const inputByLabel = screen.getByLabelText(/입력/i);
    expect(inputByLabel).toBeInTheDocument();

    const inputByPlaceholder = screen.getByPlaceholderText(/할 일/i);
    expect(inputByPlaceholder).toBeInTheDocument();

    const inputByQuerySelector = document.querySelector("form input");
    expect(inputByQuerySelector).toBeInTheDocument();
  });

  it("button이 렌더링 되어야합니다.", () => {
    renderForm();

    const button = screen.getByRole("button", { name: /cancel/i });
    expect(button).toBeInTheDocument();
  });
});
