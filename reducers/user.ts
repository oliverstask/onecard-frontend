import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type UserState = {

     firstName: string,
     lastName: string,
     email: string;
     phone: string | null;
     companyName: string | null;
     adress : string | null;
     linkedin : string | null;
     website : string | null;

};


const initialState: UserState = {
    firstName:'', lastName:'', email: '', phone:'', companyName:'', adress:'', linkedin:'', website:'',         
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    updateFisrtName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    updateLastName : (state, action: PayloadAction<string>) => {
      state.lastName =action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    updateCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    updateAdress: (state, action: PayloadAction<string>) => {
      state.adress = action.payload;
    },
    updateLinkedin: (state, action: PayloadAction<string>) => {
      state.linkedin = action.payload;
    },
    updateWebsite: (state, action: PayloadAction<string>) => {
      state.website = action.payload;
    },

  },
});

export const { updateFisrtName, updateLastName, updateEmail, updatePhone,  updateCompanyName, updateAdress,  updateLinkedin, updateWebsite  } = userSlice.actions;
export default userSlice.reducer;