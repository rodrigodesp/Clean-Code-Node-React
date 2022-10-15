import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";

import {
  ValidationStub,
  AuthenticationSpy,
  SaveAccessTokenMock,
} from "@/presentation/test";

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from "@testing-library/react";

import { faker } from "@faker-js/faker";

import { createMemoryHistory } from "history";

import React from "react";

import { Router } from "react-router-dom";

import { Login } from "@/presentation/pages";

import { Helper } from "@/presentation/test";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ["/login"] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router navigator={history} location={"/"}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
  };
};

const validationError = "contem erro";

describe("Login Component", () => {
  afterEach(cleanup);

  test("Validate the initial state when entering the page login page", () => {
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, "error-wrap", 0);
    Helper.testButtonIsDisabled(sut, "submit", true);
    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
  });

  test("Should show error if Validation email fails", () => {
    const { sut } = makeSut({ validationError });
    Helper.populateEmailField(sut);
    Helper.testStatusForField(sut, "email", validationError);
  });

  test("Should show error if Validation password fails", () => {
    const { sut } = makeSut({ validationError });
    Helper.populatePasswordField(sut);
    Helper.testStatusForField(sut, "password", validationError);
  });

  test("Should displayed green ball if the email was correct", () => {
    const { sut } = makeSut();
    Helper.populateEmailField(sut);
    Helper.testStatusForField(sut, "email");
  });

  test("Should displayed green ball if the password was correct", () => {
    const { sut } = makeSut();
    Helper.populatePasswordField(sut);
    Helper.testStatusForField(sut, "password");
  });

  test("Should enable submit button if the form is valid", () => {
    const { sut } = makeSut();
    Helper.populateEmailField(sut);
    Helper.populatePasswordField(sut);
    Helper.testButtonIsDisabled(sut, "submit", false);
  });

  test("Should enable spinner when click on the submit button", async () => {
    const { sut } = makeSut();
    await Helper.simulateValidSubmit(sut);
    Helper.testElementExists(sut, "spinner");
  });

  test("Should call Authentication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await Helper.simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test("Should call Authentication only once", async () => {
    const { sut, authenticationSpy } = makeSut();
    await Helper.simulateValidSubmit(sut);
    await Helper.simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should call Authentication if forms is invalid", async () => {
    const { sut, authenticationSpy } = makeSut({ validationError });
    await Helper.simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));
    await Helper.simulateValidSubmit(sut);

    await waitFor(() => screen.getByTestId("main-error"));
    const mainError = sut.getByTestId("main-error");
    expect(mainError.textContent).toBe(error.message);

    // testElementText(sut, "main-error", error.message);
    Helper.testChildCount(sut, "error-wrap", 1);
  });

  test("Should call SaveAccessToken on success", async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    await Helper.simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    );
    expect(history.index).toBe(4);
    expect(history.location.pathname).toBe("/");
  });

  test("Should present error if SaveAccessToken fails", async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(saveAccessTokenMock, "save")
      .mockReturnValueOnce(Promise.reject(error));
    await Helper.simulateValidSubmit(sut);

    await waitFor(() => screen.getByTestId("main-error"));
    const mainError = sut.getByTestId("main-error");

    Helper.testElementText(sut, "main-error", error.message);
    Helper.testChildCount(sut, "error-wrap", 1);
  });

  test("Should go to signup page", async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId("signup");
    fireEvent.click(register);
    console.log(history);
    expect(history.index).toBe(5);
    expect(history.location.pathname).toBe("/signup");
  });
});
