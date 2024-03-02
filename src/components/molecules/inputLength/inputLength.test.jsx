import { afterEach, describe, expect, it } from "vitest";
import PropTypes from "prop-types";
import { cleanup, render, screen } from "@testing-library/react";
import Form from "../../../utils/test/form";
import InputLength from ".";

Form.propTypes = {
  children: PropTypes.node,
};

describe("InputLength 테스트", () => {
  afterEach(cleanup);

  it("Undefined 테스트", () => {
    render(
      <Form>
        <InputLength name={"undefined"} maxLength={10} />
      </Form>
    );

    const text = screen.getByText("0 / 10");

    expect(text).toBeTruthy();
  });

  it("텍스트 테스트", () => {
    render(
      <Form>
        <InputLength name={"name"} maxLength={10} />
      </Form>
    );

    const text = screen.getByText("4 / 10");

    expect(text).toBeTruthy();
  });
});
