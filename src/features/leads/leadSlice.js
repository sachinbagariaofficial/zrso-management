import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Dummy_Data = [
  {
    id: 1,
    name: "Paracetamol",
    company: "Cipla",
    totalQuantity: 200,
    availableQuantity: 81,
    expireDate: "25/07/2026",
  },
  {
    id: 2,
    name: "Paracetamol222",
    company: "Cipla",
    totalQuantity: 200,
    availableQuantity: 81,
    expireDate: "25/07/2026",
  },
];
export const getLeadsContent = createAsyncThunk("/leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: Dummy_Data,
  },
  reducers: {
    addNewLead: (state, action) => {
      console.log("first");
      let { newLeadObj } = action.payload;
      state.leads = [...state.leads, newLeadObj];
    },

    deleteLead: (state, action) => {
      console.log("action", action);

      const { index } = action.payload; // assuming you're passing the lead's `id` in the payload
      state.leads = state.leads.filter((lead) => lead.id !== index); // filter out the lead with the matching id
    },
  },

  extraReducers: {
    [getLeadsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload.data;
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
