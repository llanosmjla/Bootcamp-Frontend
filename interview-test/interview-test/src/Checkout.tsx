import { useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import { getProducts } from './dataService';
import { LoadingIcon } from './Icons';
// import { getProducts } from './dataService';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1bcXpGUzJUyUwITOqEn8QPj8ZOgUbTGQD/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places

type ProductProps = {
  id: number;
  name: string;
  availableCount: number;
  price: number;
  orderedQuantity: number;
  total: number;
  onIncrement: (id: number) => void;
  onDecrement: (id:number) => void;
};





const Product = ({ 
    id, name, availableCount, price, orderedQuantity, total,
    onIncrement, onDecrement
    
    } : ProductProps) => {


  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>   
      <td>${total}</td>
      <td>
        <button
          onClick={() => onIncrement(id)}
          disabled={orderedQuantity >= availableCount}
         className={styles.actionButton}>+</button>

        <button 
          onClick={() => onDecrement(id)}
          disabled={orderedQuantity <= 0}
        className={styles.actionButton}>-</button>
      </td>
    </tr>    
  );
}


const Checkout = () => {
 
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [discount, setDiscount] = useState(0);

  const [orderTotal, setOrderTotal] = useState(0);


  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProducts();
        // Inicializa orderedQuantity y total en los productos cargados
        const initializedProducts = productData.map(product => ({
          ...product,
          orderedQuantity: 0,
          total: 0,
        }));
        setProducts(initializedProducts);
        setLoading(false);
    };
    fetchProducts();
  }, []);

  
  const incrementQuantity = (id: number) => {
    setProducts(products.map(product => {
      if (product.id === id && product.orderedQuantity < product.availableCount) {
        const newOrderedQuantity = product.orderedQuantity + 1;
        return {
          ...product,
          orderedQuantity: newOrderedQuantity,
          total: product.price * newOrderedQuantity,
        };
      }
      return product;
    }));
  }

  const decrementQuantity = (id: number) => {
    setProducts(products.map(product => {
      if (product.id === id && product.orderedQuantity > 0) {
        const newOrderedQuantity = product.orderedQuantity - 1;
        return {
          ...product,
          orderedQuantity: newOrderedQuantity,
          total: product.price * newOrderedQuantity,
        };
      }
      return product;
    }));
  }

  useEffect(() => {
    const calculateTotals = () => {
      const subtotal = products.reduce((acc, product) => acc + product.total, 0);
      const discountAmount = subtotal > 1000 ? subtotal * 0.1 : 0;
      setDiscount(discountAmount);
      setOrderTotal(subtotal - discountAmount);
    };

    calculateTotals();
  }, [products]);

  if (loading) {
    return (
      <div>
        <header className={styles.header}>
          <h1>Electro World</h1>
        </header>
        <main>
          <LoadingIcon />
        </main>
      </div>
    );
  }

  return (
    <div>
      <header className={styles.header}>        
        <h1>Electro World</h1>        
      </header>
      <main>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {/* Products should be rendered here */}
            {
              products.map((product : ProductProps) => (
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  availableCount={product.availableCount}
                  price={product.price}
                  orderedQuantity={product.orderedQuantity}
                  total={product.total}
                  onIncrement={() => incrementQuantity(product.id)}
                  onDecrement={() => decrementQuantity(product.id)}
                />
              ))
            }
          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>Discount: $ {discount.toFixed(2)}</p>
        <p>Total: $ { orderTotal.toFixed(2) }</p>
      </main>
    </div>
  );
};

export default Checkout;