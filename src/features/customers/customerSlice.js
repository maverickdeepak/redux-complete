import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    create: (state, action) => {
      state.fullName = action.payload;
      state.nationalID = action.payload;
      state.createdAt = action.payload;
    },
    update: (state, action) => {
      state.fullName = action.payload;
    },
  },
});
console.log(customerSlice);
export default customerSlice.reducer;
export const { create, update } = customerSlice.actions;

/*
export default function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "ACCOUNT_CREATE_CUSTOMER":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case "ACCOUNT_UPDATE_CUSTOMER":
            return {
                ...state,
                fullName: action.payload.fullName,
            };
        default:
            return state;
    }
}

export function createCustomerAccount(fullName, nationalID) {
    return {
        type: "ACCOUNT_CREATE_CUSTOMER",
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
}

export function updateCustomerName(fullName) {
    return { type: "ACCOUNT_UPDATE_CUSTOMER", payload: { fullName } };
}
 */
