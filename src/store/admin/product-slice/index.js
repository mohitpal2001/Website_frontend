import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    products:[],
    isLoading:false,
    error:null
}

export const addnewProduct = createAsyncThunk('product/addnewproduct', async(productData)=>{
    //api call to add product
    const response = await axios.post('http://localhost:5000/api/admin/products/add-product',productData,{
        Headers:{
            'Content-Type':'application/json'
        }
    });
    return response?.data;
});

export const fetchProducts = createAsyncThunk('product/fetchAllProducts', async()=>{
    //api call to fetch all products
    const response = await axios.get('http://localhost:5000/api/admin/products/products',{
        Headers:{
            'Content-Type':'application/json'
        }
    });
    return response?.data;
});


export const editExistingProduct = createAsyncThunk('product/editProduct', async({id,productData})=>{
    //api call to edit product
    const response = await axios.put(`http://localhost:5000/api/admin/products/edit-product/${id}`,productData,{
        Headers:{
            'Content-Type':'application/json'
        }
    });
    return response?.data;
}   );

export const deleteProductById = createAsyncThunk('product/deleteProduct', async(id)=>{
    //api call to delete product
    const response = await axios.delete(`http://localhost:5000/api/admin/products/delete-product/${id}`,{
        Headers:{
            'Content-Type':'application/json'
        }
    });
    return response?.data;
}   ); 

const AdminProductSlice = createSlice({
    name:'adminproduct',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(fetchProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false;
            state.products = action.payload.products;
        }).addCase(fetchProducts.rejected,(state,action)=>{
            state.isLoading = false;
           state.products = [];
        })

    }
})


export default AdminProductSlice.reducer;