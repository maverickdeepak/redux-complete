import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
};

/*
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "ACCOUNT_DEPOSIT":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "ACCOUNT_WITHDRAW":
      return { ...state, balance: state.balance - action.payload };
    case "ACCOUNT_REQUEST_LOAN":
      if (state.loanAmount > 0)
        return { ...state, loanAmount: state.loanAmount };
      return {
        ...state,
        loanAmount: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "ACCOUNT_LOAN_PAID":
      return {
        ...state,
        loanAmount: 0,
        loanPurpose: "",
        balance: state.balance - state.loanAmount,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(params, currency) {
  if (currency === "USD") return { type: "ACCOUNT_DEPOSIT", payload: params };

  return async function (dispatch, getState) {
    dispatch({ type: "LOADING" });
    // API CALL
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
    );
    const convertedResponse = await response.json();
    const convertedBalance = (params * convertedResponse.rates["USD"]).toFixed(
      2,
    );

    dispatch({ type: "ACCOUNT_DEPOSIT", payload: convertedBalance });
  };
}
export function withdraw(params) {
  return { type: "ACCOUNT_WITHDRAW", payload: params };
}
export function requestLoan(params) {
  return {
    type: "ACCOUNT_REQUEST_LOAN",
    payload: {
      amount: params.amount,
      purpose: params.purpose,
    },
  };
}
export function payLoan() {
  return { type: "ACCOUNT_LOAN_PAID" };
}
 */

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance = state.balance + action.payload;
      state.loading = false;
    },
    withdraw: (state, action) => {
      state.balance = state.balance - action.payload;
    },
    requestLoan: (state, action) => {
      if (state.loanAmount > 0) {
        alert(`Please pay your previous loan amount $${state.loanAmount}`);
        return;
      }
      state.loanAmount = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance = state.balance + action.payload.amount;
    },
    payLoan: (state, action) => {
      state.loanAmount = 0;
      state.loanPurpose = "";
      state.balance = state.balance - state.loanAmount;
    },
    convertingCurrency: (state) => {
      state.loading = true;
    },
  },
});

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions;

export function deposit(params, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: params };

  return async function (dispatch, getState) {
    dispatch(convertingCurrency());
    // API CALL
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
    );
    const convertedResponse = await response.json();
    const convertedBalance = (params * convertedResponse.rates["USD"]).toFixed(
      2,
    );

    dispatch({ type: "account/deposit", payload: convertedBalance });
  };
}
