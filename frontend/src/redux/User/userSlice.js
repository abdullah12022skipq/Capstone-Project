import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  user: null,
  error: ''
};

const login_api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = createAsyncThunk('user/loginUser', (loginFields) => {
  return login_api.post('/auth/loginuser', loginFields)
    .then((response) => {
      const { authToken, user } = response.data;
      // Save the JWT token to local storage
      localStorage.setItem('token', authToken);
      // Return the user data
      user['profileUrl'] = `http://localhost:5000/${user.image}`;
      return user;
    })
    .catch((error) => {
      if (error.response.status === 400) {
        throw new Error(error.response.data.error); // Throw an error with the specific error message
      } else {
        throw error;
      }
    });
  });

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (signupFields, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append non-file fields to the FormData
      Object.keys(signupFields).forEach(key => {
        if (key !== 'profilePicture') {
          formData.append(key, signupFields[key]);
        } else {
          formData.append('profile', signupFields[key], signupFields.profilePicture.name);
        }
      });
      
      const response = await axios.post('http://localhost:5000/api/auth/createuser', formData);
      const { authToken, user } = response.data;
      localStorage.setItem('token', authToken);
      // Return the user data
      user['profileUrl'] = `http://localhost:5000/${user.image}`;
      return user;

    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });
  }
});

export default userSlice.reducer;
export const { resetState } = userSlice.actions