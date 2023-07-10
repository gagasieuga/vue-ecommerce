import express from "express";
import bodyParser from "body-parser";
import path from "path";
import history from "connect-history-api-fallback";

const client = require ('../connection.js');
  
  // export let cartItems = [
  //   products[0],
  //   products[2],
  //   products[3],
  // ];

client.connect();

let cartItems = [];

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), {maxAge : '1y', etag : false }));
app.use(history());

//endpoint for products
app.get('/api/products', (req,res) => {
    client.query('SELECT * FROM products', (err, result) => {
    if (err) throw err;
    res.send(result.rows);
    });
    //res.status(200).json(products);
});

app.get('/api/products/:productId', async (req,res) => {
    const { productId } = req.params;
    const result = await client.query('SELECT * FROM products WHERE product_id = $1', [productId]);
    //console.log(result)
    const product = result.rows[0];
    if(product) {
        res.status(200).json(product);
    }
    else {
        res.status(404).json({message: 'Product not found!'});
    }
});

//endpoint for cart
app.get('/api/users/:userId/cart', async (req,res) => {
    const { userId } = req.params;
    const customer = await client.query('SELECT * FROM customers WHERE customer_id = $1', [userId]);

    const customerData = customer.rows[0];
    //add a temporary cart property to customer, but won't add it to database
    //cart = cartItems;
    customerData.cart = cartItems;
    const cart = customerData.cart || {};
    console.log(cart);
    if (customer) {
      res.status(200).json(customerData);
    }
    else {
      res.status(404).json({ message: 'Customer not found!' });
    }
});
//endpoint for adding product to cart
app.post('/api/users/:userId/cart', async (req,res) => {
  const { productId } = req.body; //productId
  console.log(productId);
  console.log(cartItems);

  const itemExist = cartItems.find((product) => product.product_id.toString() === productId);

  console.log(itemExist);
  if(itemExist){ 
    itemExist.quantity += 1;
    console.log('already in cart');
    res.status(200).json(cartItems);
  }
  else {
    const result = await client.query('SELECT * FROM products WHERE product_id = $1', [productId]);
    //console.log(result)
    const product = result.rows[0];
    if(product) {
        product.quantity = 1;
        cartItems.push(product); //add product to cart
        res.status(200).json(cartItems);
    }
    else {
        res.status(404).json({message: 'Product not found!'});
    }
  }
});

//delete from cart
app.delete('/api/users/:userId/cart/:productId', (req,res) => {
     const { productId } = req.params; //productId
     cartItems = cartItems.filter((product) => product.product_id.toString() !== productId);
     res.status(200).json(cartItems);
});

//checking out from cart
app.post('/api/users/:userId/cart/checkout', async (req,res) => {
  const { userId } = req.params;
  const cartItems = req.body;
  console.log(cartItems);
  const orderDate = new Date();
  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price * item.quantity), 0);
  
  const orderResult = await client.query('INSERT INTO orders (customer_id, order_date, total_price) VALUES ($1, $2, $3) RETURNING order_id', [userId, orderDate, totalPrice]);
  const orderId = orderResult.rows[0].order_id;

  cartItems.forEach(async (item) => {
    await client.query('INSERT INTO OrderDetail (order_id, product_id, quantity) VALUES ($1, $2, $3)', [orderId, item.product_id, item.quantity]);
  });
  res.status(200).json({message: 'Checkout successfully!'});
  
})

//For references purpose
//-----------------------------------------------//
app.get('/hello', (req, res) => {
    res.send('Hello!');
});

app.post('/hello', (req, res) => {
    res.send(`Hello ${req.body.name}!`);
});

app.get('/xinchao/:name', (req, res) => {
    res.send(`Chào em bé ${req.params.name}`)
});

app.get('/test-db', (req, res) => {
    
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})