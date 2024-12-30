import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UpperInput } from "./upper-input";
import UserEvent from "@testing-library/user-event";

describe("upper-input test suite", () => {
  const User = UserEvent.setup();

  it("텍스트를 대문자로 바꾼다.", async () => {
    render(<UpperInput />);
    const text = "hello";
    const input = screen.getByRole("textbox");

    await User.type(input, text);
    expect(input).toHaveValue(text.toUpperCase());
  });

  it("input에 문자를 입력하면 대문자로 변환된다.", async () => {
    render(<UpperInput />);
    const input = document.getElementById("upper");
    const testStr = "stuff";
    await User.type(input as Element, testStr);

    const inputText = input?.getAttribute("value");
    expect(inputText).toBe(testStr.toUpperCase());
  });

  it("기본동작 확인, stuff 입력시 STUFF가 출력된다.", async () => {
    render(<UpperInput />);
    const inputEl = screen.getByLabelText("Upper");
    expect(inputEl).toBeInTheDocument();

    // userevent를 사용해서 stuff 작성후 input value 변화 확인
    await User.type(inputEl, "stuff");
    const currentInputValue = screen.getByDisplayValue("STUFF");
    const unChangedInputValue = screen.queryByDisplayValue("stuff");

    expect(currentInputValue).toBeInTheDocument();
    expect(unChangedInputValue).toBeNull();
  });
});
