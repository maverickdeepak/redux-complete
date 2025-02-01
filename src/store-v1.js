import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loanAmount: 0,
    loanPurpose: "",
};

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "ACCOUNT_DEPOSIT":
            return { ...state, balance: state.balance + action.payload };
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
        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
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

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);
// const customerStore = createStore(customerReducer);
// store.dispatch({ type: "ACCOUNT_DEPOSIT", payload: 500 });
// store.dispatch({ type: "ACCOUNT_WITHDRAW", payload: 200 });
//
// store.dispatch({
//     type: "ACCOUNT_REQUEST_LOAN",
//     payload: {
//         amount: 1200,
//         purpose: "Buy A Car",
//     },
// });
//
// store.dispatch({ type: "ACCOUNT_LOAN_PAID", payload: 500 });
// console.log(store.getState());

// Account actions
function deposit(params) {
    return { type: "ACCOUNT_DEPOSIT", payload: params };
}
function withdraw(params) {
    return { type: "ACCOUNT_WITHDRAW", payload: params };
}
function requestLoan(params) {
    return {
        type: "ACCOUNT_REQUEST_LOAN",
        payload: {
            amount: params.amount,
            purpose: params.purpose,
        },
    };
}
function payLoan() {
    return { type: "ACCOUNT_LOAN_PAID" };
}

// Customer actions
function createCustomerAccount(fullName, nationalID) {
    return {
        type: "ACCOUNT_CREATE_CUSTOMER",
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
}

function updateCustomerName(fullName) {
    return { type: "ACCOUNT_UPDATE_CUSTOMER", payload: { fullName } };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan({ amount: 1200, purpose: "Rent a House" }));
store.dispatch(payLoan());

store.dispatch(createCustomerAccount("Deepak Chauhan", "ADHAR1234"));
store.dispatch(deposit(500));
console.log(store.getState());
