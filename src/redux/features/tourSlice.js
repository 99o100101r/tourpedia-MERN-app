import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  tour: {},
  tours: [],
  userTours: [],
  tagTours: [],
  relatedTours: [],
  currentPage: 1,
  noOfPages: null,
  error: "",
  loading: false,
};

export const createTour = createAsyncThunk(
  "tour/createtour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addtour(updatedTourData);
      toast.success("tour added successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/get",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetTourByUser = createAsyncThunk(
  "tour/getTourByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ tourId, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(tourId);
      toast.success("Tour deleted successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ updatedTourData, id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      toast.success("Tour updted successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.searchTours(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tagByTours = createAsyncThunk(
  "tour/tagByTours",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.toursByTags(tag);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedTours = createAsyncThunk(
  "tour/relatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTour(tags);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTourApi(_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload.data;
      state.noOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [getTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [GetTourByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [GetTourByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [GetTourByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { tourId },
      } = action.meta;
      if (tourId) {
        state.userTours = state.userTours.filter((item) => item._id !== tourId);
        state.tours = state.tours.filter((item) => item._id !== tourId);
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { tourId },
      } = action.meta;
      if (tourId) {
        state.userTours = state.userTours.map((item) =>
          item._id === tourId ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === tourId ? action.payload : item
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [searchTours.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [tagByTours.pending]: (state, action) => {
      state.loading = true;
    },
    [tagByTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload;
    },
    [tagByTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [getRelatedTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    },
    [getRelatedTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [likeTour.pending]: (state, action) => {},
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.tours = state.tours.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.error = action.payload?.message;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
