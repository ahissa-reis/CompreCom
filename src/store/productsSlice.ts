import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchByCategory, fetchById, Product } from '@services/api';

export type CategoryKey =
  | 'mens-shirts' | 'mens-shoes' | 'mens-watches'
  | 'womens-bags' | 'womens-dresses' | 'womens-jewellery' | 'womens-shoes' | 'womens-watches';

export const loadCategory = createAsyncThunk(
  'products/loadCategory',
  async (category: CategoryKey) => {
    const data = await fetchByCategory(category);
    return { category, data } as { category: CategoryKey; data: Product[] };
  }
);

export const loadProduct = createAsyncThunk(
  'products/loadProduct',
  async (id: number) => {
    const data = await fetchById(id);
    return data;
  }
);

interface ProductsState {
  byCategory: Partial<Record<CategoryKey, { items: Product[]; loading: boolean; error?: string }>>;
  byId: Record<number, { item?: Product; loading: boolean; error?: string }>;
}

const initialState: ProductsState = {
  byCategory: {},
  byId: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearAll: (state) => {
      state.byCategory = {};
      state.byId = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Category
      .addCase(loadCategory.pending, (state, action) => {
        const cat = action.meta.arg;
        state.byCategory[cat] = { items: state.byCategory[cat]?.items ?? [], loading: true };
      })
      .addCase(loadCategory.fulfilled, (state, action) => {
        state.byCategory[action.payload.category] = { items: action.payload.data, loading: false };
      })
      .addCase(loadCategory.rejected, (state, action) => {
        const cat = action.meta.arg;
        state.byCategory[cat] = { items: [], loading: false, error: action.error.message };
      })
      // Product by ID
      .addCase(loadProduct.pending, (state, action) => {
        const id = action.meta.arg;
        state.byId[id] = { ...state.byId[id], loading: true };
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        const item = action.payload;
        state.byId[item.id] = { item, loading: false };
      })
      .addCase(loadProduct.rejected, (state, action) => {
        const id = action.meta.arg;
        state.byId[id] = { item: undefined, loading: false, error: action.error.message };
      });
  },
});

export const { clearAll } = productsSlice.actions;
export default productsSlice.reducer;