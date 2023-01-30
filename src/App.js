import ProductView from "./components/ProductView";
import products from './data/products.json'

function App() {
  return (
    <div className="App">
      <ProductView products={products} />
    </div>
  );
}

export default App;
