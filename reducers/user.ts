import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingObject = {
  value: string,
  switchOn: boolean,

}
export type UserState = {

     firstName: string,
     lastName: string,
     email: string,
     phoneNumber: SettingObject,
     companyName: SettingObject,
     address : SettingObject,
     linkedin : SettingObject,
     website : SettingObject,
     customArr: ArrObject [],
};
export type ArrObject = {
  
  icon: string,
  name: string,
  url: string | null,
  switchOn: boolean,
}


const initialState: UserState = {
    firstName:'', lastName:'', email: '', 
    phoneNumber:{
      value:'',
      switchOn: false,
    },
    companyName:{
      value:'',
      switchOn: false,
    },
    address:{
      value:'',
      switchOn: false,
    }, 
    linkedin:{
      value:'',
      switchOn: false,
    },
    website:{
      value:'',
      switchOn: false,
    },
    customArr: [],           
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetSettings: (state) => {
      state = initialState   
    },
    settingsInfos: (state, action) => {
      const { firstName, lastName, email, phoneNumber, companyName, address, linkedin, website, customs } = action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.email = email
      state.phoneNumber = phoneNumber
      state.companyName = companyName
      state.address = address
      state.linkedin = linkedin
      state.website = website
      state.customArr = customs
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    updateLastName : (state, action: PayloadAction<string>) => {
      state.lastName =action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePhoneNumber: (state, action: PayloadAction<SettingObject>) => {
      state.phoneNumber = action.payload;
    },
    updateCompanyName: (state, action: PayloadAction<SettingObject>) => {
      state.companyName = action.payload;
    },
    updateAddress: (state, action: PayloadAction<SettingObject>) => {
      state.address = action.payload;
    },
    updateLinkedin: (state, action: PayloadAction<SettingObject>) => {
      state.linkedin = action.payload;
    },
    updateWebsite: (state, action: PayloadAction<SettingObject>) => {
      state.website = action.payload;
    },
    addCustom : (state, action:PayloadAction<ArrObject>) => {
      
      (!state.customArr ? state['customArr'] = [action.payload] : state.customArr.push(action.payload));
    },
    removeCustom : (state, action: PayloadAction<string>) => {
      state.customArr = state.customArr.filter(e => e.url !== action.payload);
    },
    updateCustom :(state, action: PayloadAction<ArrObject>) => {
       state.customArr.map((e,i) => {
        if(e.name === action.payload.name){
          state.customArr[i] = action.payload
          
        }
      })
    }
  },

});


  
export const { updateFirstName, updateLastName, updateEmail, updatePhoneNumber,  updateCompanyName, updateAddress,  updateLinkedin, updateWebsite, addCustom, removeCustom, updateCustom, settingsInfos, resetSettings  } = userSlice.actions;
export default userSlice.reducer;