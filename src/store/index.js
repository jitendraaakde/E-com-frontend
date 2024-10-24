import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import adminReducer from './adminSlice';
import productReducer from './productSlice';
import cartReducers from './cartSlice';
import orderReducers from './orderSlice'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['products', 'cart', 'orders'],
};

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    products: productReducer,
    cart: cartReducers,
    orders: orderReducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
