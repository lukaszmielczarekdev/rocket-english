import React from "react";
import { render } from "@testing-library/react";
import UserDataProvider from "../../contexts/userContext";
import GeneralDataProvider from "../../contexts/generalContext";
import InventoryProvider from "../../contexts/inventoryContext";
import TourDataProvider from "../../contexts/tourContext";
import ShopDataProvider from "../../contexts/shopContext";
import TaskDataProvider from "../../contexts/taskContext";

export const renderWithContext = (children) => {
  return render(
    <TaskDataProvider>
      <TourDataProvider>
        <GeneralDataProvider>
          <ShopDataProvider>
            <InventoryProvider>
              <UserDataProvider>{children}</UserDataProvider>
            </InventoryProvider>
          </ShopDataProvider>
        </GeneralDataProvider>
      </TourDataProvider>
    </TaskDataProvider>
  );
};
