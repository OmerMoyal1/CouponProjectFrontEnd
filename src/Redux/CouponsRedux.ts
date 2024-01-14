import { createStore } from "redux";

import { CouponModel } from "../Models/CouponModel";

// 1. Products State: the data we store
export class CouponsState {
  public coupons: CouponModel[] = []; // new Array();
}

// 2. Action Types: list of actions to perform on the state
export enum CouponsActionType {
  FetchCoupons,
  addCoupon,
  EditCoupon,
  DeleteCoupon,
}

// 3. Action: interface with ActionType and payload
export interface CouponAction {
  type: CouponsActionType;
  payload: any;
}

// 4. Action creators: functions to create Actions
export function createFetchAction(coupons: CouponModel[]) {
  return { type: CouponsActionType.FetchCoupons, payload: coupons };
}
export function createAddAction(product: CouponModel) {
  return { type: CouponsActionType.addCoupon, payload: product };
}
export function createEditAction(product: CouponModel) {
  return { type: CouponsActionType.EditCoupon, payload: product };
}
export function createDeleteAction(id: number) {
  return { type: CouponsActionType.DeleteCoupon, payload: id };
}

// 5. Reducer: function to handle all the actions
/* currentState gets default value (if currentState is undefined create a new object*/
export function couponsReducer(
  currentState = new CouponsState(),
  action: CouponAction
): CouponsState {
  // IMPORTANT - Reducer FUNCTION DOES NOT CHANGE THE CURRENT STATE, IT RETURNS A NEW STATE
  const newState = { ...currentState }; // copy the current state

  switch (action.type) {
    case CouponsActionType.FetchCoupons:
      newState.coupons = action.payload; // payload is CouponModel[]
      break;

    case CouponsActionType.addCoupon: // payload is CouponModel
      newState.coupons.push(action.payload);
      break;

    case CouponsActionType.EditCoupon: // payload is CouponModel
      const indexToEdit = newState.coupons.findIndex(
        (p) => p.id == action.payload.id
      );
      if (indexToEdit >= 0) newState.coupons[indexToEdit] = action.payload;
      break;

    case CouponsActionType.DeleteCoupon: // payload is id
      const indexToDelete = newState.coupons.findIndex(
        (p) => p.id == action.payload
      );
      if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1);
      break;
  }

  return newState;
}

// 6. Products Store
export const couponsStore = createStore(couponsReducer);
