import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const {data : products , status} = useSelector (state => state.products)
 
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if(status === 'Loading') {
    return <p>Loading...</p>
  }

  if(status === 'Error') {
    return <p>Something went wrong! Try again later! </p>
  }

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const cards = products.map((product) => (
    <div className="col-md-3" style={{ marginBottom: "10px" }}>
      <Card className="h-100" key={product.id} style={{ width: "18rem" }}>
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center bg-light">
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Card
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <div>
      <h1>Product Dashboard</h1>
      <div className="row">{cards}</div>
    </div>
  );
};

export default Product;
