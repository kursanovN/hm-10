import { useEffect, useReducer } from "react";
import "./App.css";
import { Product } from "./components/Product";
import { TableProduct } from "./components/TableProduct";
import { productData } from "./utils/constants";

const initialState = {
  product: 
  JSON.parse(localStorage.getItem("product")) ||productData ,
};

const onlineReducer = (state, action) => {
  switch (action.type) {
    case "incrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.staticPrice,
            };
          }
          return item;
        }),
      };

    case "decrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.staticPrice,
            };
          }
          return item;
        }),
      };
    case "addProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price +item.staticPrice,

            };
          }
          return item;
        }),
      };

    case "removeProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 0) {
            return {
              ...item,
              quantity: (item.quantity = 0),
              price: item.staticPrice,
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

function App() {
  const [store, dispatchStore] = useReducer(onlineReducer, initialState);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(store.product));
  }, [store.product]);

  const incrementHendler = (id) => {
    dispatchStore({ type: "incrementProduct", payload: id });
  };
  const decrementHendler = (id) => {
    dispatchStore({ type: "decrementProduct", payload: id });
  };
  const addProductHandler = (id) => {
    dispatchStore({ type: "addProduct", payload: id });
  };

  const removeItem = (id) => {
    dispatchStore({ type: "removeProduct", payload: id });
  };
console.log(store.product, 'store');
  return (
    <div className="App">
      <Product store={store.product} addProductHandler={addProductHandler} />
      <TableProduct
        store={store.product}
        incrementHendler={incrementHendler}
        decrementHendler={decrementHendler}
        removeItem={removeItem}
      />
    </div>
  );
}

export default App;
