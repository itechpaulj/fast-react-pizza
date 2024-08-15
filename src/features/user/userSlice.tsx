import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

type INIT_STATE = {
  username: string;
  loading: "idle" | "loading" | "error";
  position: {
    latitude: number | null;
    longitude: number | null;
  };
  address: string;
  error: string;
};

const initialState: INIT_STATE = {
  username: "",
  loading: "idle",
  position: {
    latitude: null,
    longitude: null,
  },
  address: "",
  error: "",
};

const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  //@ts-expect-error unknown object
  const positionObj: {
    coords: {
      latitude: number;
      longitude: number;
    };
  } = await getPosition();
  const position: {
    latitude: number | null;
    longitude: number | null;
  } = {
    latitude: positionObj.coords.latitude ?? null,
    longitude: positionObj.coords.longitude ?? null,
  };
  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

const storeSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateName: {
      prepare(username: string) {
        return {
          payload: username,
        };
      },
      reducer(state: INIT_STATE, action: PayloadAction<string>) {
        state.username = action.payload;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.loading = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.loading = "error";

        state.error =
          "The was problem getting in your address. Make sure fill this field.";
      });
  },
});

const updateName = storeSlice.actions.updateName;

export { updateName, fetchAddress };

export default storeSlice.reducer;
