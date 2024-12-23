// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from 'firebase/auth'
// import auth from "../../../../firebase/firebase.config"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import auth from "../../../../firebase/firebase.config"
import { FaLastfmSquare } from "react-icons/fa"

// const initialState = {
//     name: '',
//     email: '',
//     isLoading: true,
//     isError: false,
//     error: ''
// }


// export const createUser = createAsyncThunk(
//     "userSlice/createUser",
//      async ({name, email, password}) => {
//       const data = await createUserWithEmailAndPassword(auth, email, password);
//      await updateProfile(auth.currentUser, {
//         displayName: name
//       })
//       console.log(data)
//        return {
//          email: data.user.email,
//          name : data.user.displayName
//        };
//      }
//   );
  

// export const googleSignIn = createAsyncThunk(
//     "userSlice/googleSignIn",
//     async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//         const user = result.user;
        
//         return {
//             name: user.displayName,
//             email: user.email
//         }
//     }
      
//   )

// const userSlice = createSlice({
//     name: 'userSlice',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(createUser.pending, (state) => {
//             state.isLoading = true;
//             state.isError = false;
//             state.name = '';
//             state.email = '';
//             state.error = ''
//         })
//         .addCase(createUser.fulfilled, (state, {payload}) => {
//             state.isLoading = false;
//             state.isError = false;
//             state.name = payload.name;
//             state.email = payload.email;
//             state.error = ''
//         })
//         .addCase(createUser.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//             state.name = '';
//             state.email = '';
//             state.error = action.error.message
//         })
//     }

// })


// export default userSlice.reducer;


const initialState = {
    name: '',
    email: '',
    isLoading: true,
    isError: false,
    error: ''

}


export const createUser = createAsyncThunk(
    'userSlice/createUser',
    async ({ name, email, password }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
            displayName: name
        })
        console.log(data)
        return {
            email: data.user.email,
            name: data.user.displayName
        };
    }
)

export const googleSignIn = createAsyncThunk(
    'userSlice/googleSignIn',
    async () => {
        const provider = new GoogleAuthProvider;
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return {
            name : user.displayName,
            email: user.email
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = false,
                state.isError = false,
                state.name = '',
                state.email = '',
            state.error = ''
                
        })
        .addCase(createUser.fulfilled, (state, {payload}) => {
            state.isLoading = true,
                state.isError = false,
                state.name = payload.name,
                state.email = payload.email,
            state.error = ''
                
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading = false,
                state.isError = true,
                state.name = '',
                state.email = '',
            state.error = action.error.message
                
        })
    }
})

export default userSlice.reducer;