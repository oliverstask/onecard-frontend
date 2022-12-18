import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingObject = {
  value: string,
  switchOn: boolean,

}
export type UserState = {

     firstName: string,
     lastName: string,
     email: string,
     phone: SettingObject,
     companyName: SettingObject,
     address : SettingObject,
     linkedin : SettingObject,
     website : SettingObject,
     customArr: ArrObject [],
};
export type ArrObject = {
  name: string,
  value: string ,
  switchOn: boolean,
}


const initialState: UserState = {
    firstName:'', lastName:'', email: '', 
    phone:{
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
      const { firstName, lastName, email, phoneNumber, companyName, address, linkedin, website } = action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.email = email
      state.phone.value = phoneNumber
      state.companyName.value = companyName
      state.address.value = address
      state.linkedin.value = linkedin
      state.website.value = website
    },
    updateFisrtName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    updateLastName : (state, action: PayloadAction<string>) => {
      state.lastName =action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePhone: (state, action: PayloadAction<SettingObject>) => {
      state.phone = action.payload;
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
      state.customArr.push(action.payload);
    },
    removeCustom : (state, action: PayloadAction<string>) => {
      state.customArr = state.customArr.filter(e=> e?.name !== action.payload);
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


  
export const { updateFisrtName, updateLastName, updateEmail, updatePhone,  updateCompanyName, updateAddress,  updateLinkedin, updateWebsite, addCustom, removeCustom, updateCustom, settingsInfos, resetSettings  } = userSlice.actions;
export default userSlice.reducer;