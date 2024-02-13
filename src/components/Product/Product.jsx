import { useContext, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import { CartContext } from "../../App";

const Product = () => {
  const cartContext = useContext(CartContext);

  const match = useMatch("/products/:id");
  const id = match?.params?.id;
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(0);
  const [open, setopen] = useState(false);

  const apiCall = async () => {
    const response = await fetch("https://dummyjson.com/products").then(
      (response) => response.json()
    );
    setProduct(response?.products?.find((p) => p?.id === +id));
  };

  useEffect(() => {
    if (!product?.id) apiCall();
  }, [product]);

  const addToCart = (product) => {
    // cartContext?.setCart((p) => [...p, { ...product }]);
    let cart = [...cartContext?.cart];

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      // Product exists, increase its quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // New product, add to cart with quantity of 1
      cart.push({ ...product, quantity: 1 });
    }
    cartContext?.setCart([...cart]);
    setopen(true);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={() => setopen(false)}
        open={open}
      >
        <Alert
          onClose={() => setopen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Item Added to cart!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundColor: "#262b26",
          minHeight: "inherit",
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {/* Image container */}
          <Box
            sx={{
              display: "flex",
              gap: 6,
              ml: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {product?.images?.map((img, idx) => (
                <Box
                  key={idx}
                  sx={{
                    height: "100px",
                    width: "100px",
                  }}
                >
                  <img
                    onMouseEnter={() => setImage(idx)}
                    src={img}
                    alt="sideImages"
                    height={"100%"}
                    width={"100%"}
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ height: "500px", width: "500px" }}>
              <img
                src={product?.images?.[image]}
                alt="Main-img"
                height={"100%"}
                width={"100%"}
              />
            </Box>
          </Box>
          {/* Details */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: 1,
              color: "white",
              ml: 6,
              // minWidth: "400px",
            }}
          >
            <Typography variant={"h4"}>{product?.title}</Typography>
            <Typography variant={"body2"}>{product?.rating} Rating </Typography>
            <Typography variant={"h5"}>${product?.price}/-</Typography>
            <Typography variant={"body1"} color={"yellow"}>
              {product?.discountPercentage}% off
            </Typography>
            <Typography variant={"body2"} color={"lightgrey"}>
              Only {product?.stock} in stock. Hurry Up!
            </Typography>
            <Typography variant={"body2"}>Seller: Amazing seller</Typography>
            <Typography variant={"body2"}>Brand: {product?.brand}</Typography>
            <Typography variant={"body2"}>
              Category: {product?.category}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
              <Button variant="contained">
                <FavoriteBorder />
              </Button>
            </Box>
          </Box>
          {/* Description */}
          <Box sx={{ width: "100%" }}>
            <Typography variant={"h5"} color={"lightgrey"}>
              Description
            </Typography>
            <hr />
            <Typography variant={"body1"} color={"lightgrey"}>
              {product?.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Product;
