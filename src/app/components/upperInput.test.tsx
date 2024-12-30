import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpperInput from "./upperInput";
import userEvent from "@testing-library/user-event";

describe("UpperInput 테스트", () => {
  const User = userEvent.setup();

  it("요소 출력 확인, input이 출력된다.", () => {
    render(<UpperInput />);
    const inputEl = screen.getByLabelText("Upper");
    expect(inputEl).toBeInTheDocument();
  });

  it("기본동작 확인, stuff 입력시 STUFF가 출력된다.", async () => {
    render(<UpperInput />);
    const inputEl = screen.getByLabelText("Upper");
    expect(inputEl).toBeInTheDocument();

    // userevent를 사용해서 stuff 작성후 input value 변화 확인
    await User.type(inputEl, 'stuff')
    const currentInputValue = screen.getByDisplayValue('STUFF');
    const notAlloewdValue = screen.queryByDisplayValue('stuff');

    expect(currentInputValue).toBeInTheDocument();
    expect(notAlloewdValue).toBeNull();
  });
});
