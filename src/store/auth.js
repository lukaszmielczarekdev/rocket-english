import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreData, notify } from "./utils";
import { googleLogout } from "@react-oauth/google";
import { cloneDeep } from "lodash";
import * as api from "../api";

const INITIAL_STATE = {
  status: null,
  currentUser: null,
};

export const signin = createAsyncThunk("auth/signin", async (formData) => {
  try {
    const { data } = await api.signIn(formData);
    return data;
  } catch (error) {
    notify(error.response.data.message);
  }
});

export const externalSignin = createAsyncThunk(
  "auth/externalSignin",
  async (response) => {
    try {
      const { data } = await api.externalSignIn(response);
      return data;
    } catch (error) {
      notify(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  try {
    const { data } = await api.signUp(formData);
    return data;
  } catch (error) {
    notify(error.response.data.message);
  }
});

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ id }) => {
    try {
      await api.deleteUser(id);
      return id;
    } catch (error) {
      console.log(error);
      notify(error.response.data.message);
    }
  }
);

export const updateProgress = createAsyncThunk(
  "auth/updateProgress",
  async (update) => {
    try {
      const { data } = await api.updateProgress(update);
      return data;
    } catch (error) {
      console.log(error);
      notify(error.response.data.message);
    }
  }
);

export const saveGame = createAsyncThunk("auth/saveGame", async (save) => {
  try {
    const { data } = await api.saveGame(save);
    return data;
  } catch (error) {
    console.log(error);
    notify(error.response.data.message);
  }
});

const slice = createSlice({
  name: "auth",
  initialState: getStoreData("user.auth", INITIAL_STATE),

  reducers: {
    logout: (state) => {
      localStorage.removeItem("rocket-english-profile");
      state.currentUser = null;
      state.status = null;
      googleLogout();
    },
    currentPlanetSet: (state, action) => {
      state.currentUser.progress.currentPlanet = action.payload;
    },
    trophyCollected: (state, action) => {
      state.currentUser.progress.trophiesCollected = [
        ...state.currentUser.progress.trophiesCollected,
        action.payload,
      ];
      notify("Trophy collected");
    },
    expAdded: (state, action) => {
      state.currentUser.progress.exp =
        state.currentUser.progress.exp + action.payload;

      notify(`+${action.payload} exp`);
    },
    eventCounterIncremented: (state, action) => {
      const events = { ...state.currentUser.progress.eventsHappened };
      events[action.payload] += 1;
      state.currentUser.progress.eventsHappened = events;
    },
    playerLvlCalculated: (state) => {
      state.currentUser.progress.characterLvl =
        Math.floor(state.currentUser.progress.exp / 1000) + 1;
    },
    vortexUnlocked: (state) => {
      state.currentUser.progress.vortexAccess = true;
      notify("Vortex unlocked");
    },
    gameFinished: (state) => {
      state.currentUser.progress.currentPlanet = "menu";
      state.currentUser.progress.gameFinished = true;
      state.currentUser.progress.narration.unlocked = [
        ...state.currentUser.progress.narration.unlocked,
        "menu",
      ];
      notify("Congratulations: GAME FINISHED!");
    },
    newGamePlusStarted: (state) => {
      state.currentUser.progress.currentPlanet = "centuria";
      state.currentUser.progress.gameFinished = true;
      state.currentUser.progress.narration.completed = [
        ...state.currentUser.progress.narration.completed,
        "menu",
      ];
      notify("WELCOME TO NEW GAME PLUS");
    },
    narrationCompleted: (state, action) => {
      state.currentUser.progress.narration.completed = [
        ...state.currentUser.progress.narration.completed,
        action.payload,
      ];
    },
    spcialCompleted: (state, action) => {
      const dialogues = cloneDeep(state.currentUser.progress.dialogues);
      dialogues[action.payload].specialCompleted = true;

      state.currentUser.progress.dialogues = dialogues;
    },
    narrationUnlocked: (state, action) => {
      state.currentUser.progress.narration.unlocked = [
        ...state.currentUser.progress.narration.unlocked,
        action.payload,
      ];
    },
    dialogueHided: (state, { planet, id }) => {
      const dialogues = cloneDeep(state.currentUser.progress.dialogues);
      if (
        dialogues[planet].shownOnce.includes(id) ||
        dialogues[planet].spcialCompleted
      ) {
        dialogues[planet].hidden.push(id);
        state.currentUser.progress.dialogues = dialogues;
      }
    },
    dialogueShownAndCompleted: (state, { id, planet, event }) => {
      const dialogues = cloneDeep(state.currentUser.progress.dialogues);
      dialogues[planet].specialCompleted = true;
      dialogues[planet].hidden.push(id);
      const events = { ...state.currentUser.progress.eventsHappened };
      events[event] += 1;
      state.currentUser.progress.dialogues = dialogues;
      state.currentUser.progress.eventsHappened = events;
    },
    dialogueCompleted: (state, { id, unlockId, planet }) => {
      const dialogues = cloneDeep(state.currentUser.progress.dialogues);
      dialogues[planet].completed.push(id);

      if (
        (dialogues[planet].shownOnce.includes(id) &&
          dialogues[planet].specialActions.includes(id)) ||
        dialogues[planet].specialCompleted === true
      ) {
        dialogues[planet].hidden.push(id);
      }

      if (dialogues[planet].shownOnce.includes(id) && unlockId !== 0) {
        dialogues[planet].hidden = dialogues[planet].hidden.filter(
          (index) => index !== unlockId
        );
      }
      state.currentUser.progress.dialogues = dialogues;
    },
    ufoDefeated: (state, action) => {
      state.currentUser.progress.ufoDefeated = [
        ...state.currentUser.progress.ufoDefeated,
        action.payload,
      ];
      const events = { ...state.currentUser.progress.eventsHappened };
      events["ufoDefeated"] += 1;
      state.currentUser.progress.eventsHappened = events;
    },
    movementPointsAdded: (state, action) => {
      if (
        state.currentUser.progress.movement.currentMovePoints + action.payload >
        state.currentUser.progress.movement.maxMovePoints
      ) {
        state.currentUser.progress.movement.currentMovePoints =
          state.currentUser.progress.movement.maxMovePoints;
      } else {
        state.currentUser.progress.movement.currentMovePoints += action.payload;
      }
    },
    movementPointsSubtracted: (state, action) => {
      if (
        action.payload <= state.currentUser.progress.movement.currentMovePoints
      ) {
        state.currentUser.progress.movement.currentMovePoints -= action.payload;
      }
    },
    movementPointsSet: (state, action) => {
      state.currentUser.progress.movement.currentMovePoints = action.payload;
      state.currentUser.progress.movement.maxMovePoints = action.payload;
    },
    rocketUpgraded: (state) => {
      state.currentUser.progress.rocketLvl += 1;
      state.currentUser.progress.exp += 1000;
      notify("Rocket upgraded\n\n + 1000 exp");
    },
    expeditionArrived: (state, { exp, planet }) => {
      state.currentUser.progress.exp += exp;
      state.currentUser.progress.currentPlanet = planet;
      state.currentUser.progress.narration.completed = [
        ...state.currentUser.progress.narration.completed,
        planet,
      ];
    },
  },

  extraReducers: {
    [signin.pending]: (state) => {
      state.status = "loading";
    },
    [signin.fulfilled]: (state, action) => {
      if (action.payload?.token) {
        localStorage.setItem(
          "rocket-english-profile",
          JSON.stringify({ credential: action.payload.token })
        );
        state.currentUser = action.payload.user;
        notify(`Hello ${action.payload.user.name}`);
      }
      state.status = "success";
    },
    [signin.rejected]: (state) => {
      state.status = "failed";
    },

    [externalSignin.pending]: (state) => {
      state.status = "loading";
    },
    [externalSignin.fulfilled]: (state, action) => {
      if (action.payload?.token) {
        localStorage.setItem(
          "rocket-english-profile",
          JSON.stringify({ credential: action.payload.token })
        );
        state.currentUser = action.payload.user;
        notify(`Hello ${action.payload.user.name}`);
      }
      state.status = "success";
    },
    [externalSignin.rejected]: (state) => {
      state.status = "failed";
    },
    [signup.pending]: (state) => {
      state.status = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      if (action.payload?.token) {
        localStorage.setItem(
          "rocket-english-profile",
          JSON.stringify({ credential: action.payload.token })
        );
        state.currentUser = action.payload.user;
        notify(`Hello ${action.payload.user.name}`);
      }
      state.status = "success";
    },
    [signup.rejected]: (state) => {
      state.status = "failed";
    },

    [deleteUser.pending]: (state) => {
      state.status = "loading";
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (!action.payload?.user) {
        localStorage.removeItem("rocket-english-profile");
        state.currentUser = null;
        state.status = null;
        googleLogout();
        notify("Account deleted");
      }
      state.status = "success";
    },
    [deleteUser.rejected]: (state) => {
      state.status = "failed";
    },
    [updateProgress.pending]: (state) => {
      state.status = "loading";
    },
    [updateProgress.fulfilled]: (state, action) => {
      state.currentUser.progress = action.payload;
      state.status = "success";
    },
    [updateProgress.rejected]: (state) => {
      state.status = "failed";
    },
    [saveGame.pending]: (state) => {
      state.status = "loading";
    },
    [saveGame.fulfilled]: (state, action) => {
      state.currentUser.progress = action.payload;
      notify("Game saved");
      state.status = "success";
    },
    [saveGame.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const {
  logout,
  currentPlanetSet,
  trophyCollected,
  expAdded,
  eventCounterIncremented,
  playerLvlCalculated,
  vortexUnlocked,
  gameFinished,
  newGamePlusStarted,
  narrationCompleted,
  spcialCompleted,
  narrationUnlocked,
  dialogueHided,
  dialogueShownAndCompleted,
  dialogueCompleted,
  ufoDefeated,
  movementPointsAdded,
  movementPointsSubtracted,
  movementPointsSet,
  rocketUpgraded,
  expeditionArrived,
} = slice.actions;
export default slice.reducer;
