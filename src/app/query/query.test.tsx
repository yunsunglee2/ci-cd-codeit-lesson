import "@testing-library/jest-dom";
import {
  screen,
  render,
  getByRole,
  queryByRole,
  findByRole,
} from "@testing-library/react";
import Query from "./page";
import { FetchDataComponent } from "./fetchDataComponent";

describe("쿼리 페이지 테스트", () => {
  it("쿼리 페이지 렌더링 테스트", () => {
    // arrange
    render(<Query />);
    // act
    const ul = screen.getByRole("list");
    // 디버깅 용도로 쓰이는 함수들
    // -------------- 터미널에 코드가 표시된다.
    // screen.debug();
    // -------------- 브라우저 playground에 화면을 표시해준다.
    screen.logTestingPlaygroundURL();
    // assert
    expect(ul).toBeInTheDocument();
  });

  it("get by, query by, find by", async () => {
    // query 별로 요소 찾는 방법

    // arrange
    render(<Query />);

    // act
    // DOM 요소 못 찾으면 에러 던짐
    const getByRole = screen.getByRole("list");
    // DOM 요소 못 찾으면 null 던짐
    const queryByRole = screen.queryByRole("list");
    // 프로미스 반환한다. (비동기이므로 async/await 작성 필요)
    const findByRole = await screen.findByRole("list");

    // assert
    expect(getByRole).toBeInTheDocument();
    expect(queryByRole).toBeInTheDocument();
    expect(findByRole).toBeInTheDocument();
  });

  // it("DOM 요소 못찾는 경우 테스트", async () => {
  //   // arrange
  //   render(<Query />);

  //   // act
  //   // DOM 요소 못 찾으면 "에러 던짐"
  //   const getByRole = screen.getByRole("button");
  //   // DOM 요소 못 찾으면 "null 던짐"
  //   const queryByRole = screen.queryByRole("button");
  //   // "프로미스" 반환한다. (비동기이므로 async/await 작성 필요)
  //   const findByRole = await screen.findByRole("button");

  //   // assert
  //   expect(getByRole).not.toBeInTheDocument();
  //   expect(queryByRole).not.toBeInTheDocument();
  //   expect(findByRole).not.toBeInTheDocument();
  // });

  // it('getBy, queryBy, findBy를 사용해 li 태그 찾기', async () => {
  //   // arrange
  //   render(<Query />);
  //   // act
  //   const li = screen.getByRole("listItem");

  // })

  // it("getAllBy, queryAllBy, findAllBy 로 listItem 사용하기", async () => {
  //   // arrange
  //   render(<Query />);

  //   // act
  //   // DOM 요소 못 찾으면 "에러 던짐"
  //   const getAllByRole = screen.getAllByRole("listItem");
  //   // DOM 요소 못 찾으면 "null 던짐"
  //   const queryAllByRole = screen.queryAllByRole("listItem");
  //   // "프로미스" 반환한다. (비동기이므로 async/await 작성 필요)
  //   const findAllByRole = await screen.findAllByRole("listItem");

  //   // assert
  //   expect(getAllByRole).toHaveLength(3);
  //   expect(queryAllByRole).toHaveLength(3);
  //   expect(findAllByRole).toHaveLength(3);
  // });

  it("getAllBy, queryAllBy, findAllBy 요소가 없는 경우 ", async () => {
    // arrange
    render(<Query />);

    // act
    // DOM 요소 못 찾으면 "에러 던짐"
    const queryAllByRole = screen.queryAllByRole("button");
    // DOM 요소 못 찾으면 "null 던짐"

    // assert
    expect(() => screen.getAllByRole("button")).toThrow();
    expect(queryAllByRole).toHaveLength(0);
    await expect(screen.findAllByRole("button")).rejects.toThrow();
  });

  // 비동기 데이터 패칭 컴포넌트 테스트
  it("fetch data component", async () => {
    render(<FetchDataComponent />);

    const getBy = await screen.findByRole("list");

    expect(getBy).toBeInTheDocument();
  });
});
