
# Inventory Demo

A React project that displays a list of products and displays details of selected product in a side panel.

## Live Site
https://inventorydemo.netlify.app/

## Components
- `ProductView`: main component that renders the product list and side panel
- `ProductListItem`: component for each item in the product list
- `ProductDetails`: component that displays details of selected product

## Features
- On initial render, the side panel state (open or closed) is retrieved from local storage.
T- he side panel can be opened and closed by clicking the toggle button.
- When a product is selected, the side panel opens and displays details of the selected product.
- When the side panel is closed, the selected product is cleared.
- The side panel state is stored in local storage so it persist across page refreshes.
## Usage
The component takes a single prop products which is an array of product objects, with each object having the following properties:

- `id` (number)
- `name` (string)
- `description` (string)
- `price` (string)
- `photo` (object)
- `filename` (string)
- `details` (array of objects)
- `label` (string)
- `value` (string)

Here is an example usage of the main component:
```js
function ProductView({ products }) {
  const [sideOpen, setSideOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Retreive side panel state from local storage on initial render
  useEffect(() => {
    const storedValue = localStorage.getItem('sideOpen');
    if (storedValue) setSideOpen(JSON.parse(storedValue));
  }, []);
  
  // Open side panel when selection is made
  useEffect(() => {
    if (selectedProduct) setSideOpen(true);
  }, [selectedProduct]);
  
  // Clear selection when the panel is closed
  useEffect(() => {
    if (!sideOpen) setSelectedProduct('');
    // store state in localstorage
    localStorage.setItem('sideOpen', sideOpen);
  }, [sideOpen])

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => setSelectedProduct(item)}
              isSelected={selectedProduct && selectedProduct.id === item.id}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={products.find(el => el.id === selectedProduct.id)} />
      </div>
    </div>
  )
}

export default ProductView;
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
