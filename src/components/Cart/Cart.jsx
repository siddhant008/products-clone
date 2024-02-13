import {
  Alert,
  Box,
  Grid,
  IconButton,
  Pagination,
  Snackbar,
  Typography,
} from "@mui/material";
import ProductCard from "../home/components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../App";
import { Favorite, RemoveShoppingCart } from "@mui/icons-material";

const Cart = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  const [page, setPage] = useState(1);
  const [open, setopen] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const removeFromCart = (productId) => {
    let cart = cartContext?.cart;
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // Check the quantity of the product
      if (cart[existingProductIndex].quantity > 1) {
        // If more than one, decrease quantity
        cart[existingProductIndex].quantity -= 1;
      } else {
        // If quantity is 1, remove the product from the cart
        cart.splice(existingProductIndex, 1);
      }
    } else {
      console.log("Product not found in cart.");
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
          Item Removed from cart!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#262b26",
          minHeight: "inherit",
        }}
      >
        {cartContext?.cart?.length ? (
          <Grid container spacing={3} sx={{ mt: 4, pl: "auto" }}>
            {cartContext?.cart?.map((product) => (
              <Grid
                key={product?.id}
                item
                lg={3}
                md={4}
                sm={6}
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mb: 4 }}
              >
                <ProductCard
                  details={product}
                  navigateToDetails={() => navigate(`/products/${product.id}`)}
                  cardActions={
                    <>
                      <IconButton aria-label="add to favorites">
                        <Favorite />
                      </IconButton>
                      <IconButton
                        aria-label="share"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <RemoveShoppingCart />
                      </IconButton>
                    </>
                  }
                />
              </Grid>
            ))}
            <Box
              sx={{
                display: "flex",
                bgcolor: "grey",
                justifyContent: "center",
                width: "inherit",
                pt: 1,
                pb: 1,
              }}
            >
              <Pagination
                color="primary"
                page={page}
                onChange={handleChange}
                count={Math.ceil(cartContext?.cart?.length / 10)}
              />
            </Box>
          </Grid>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ color: "white" }}>
              "No Items found in Cart"
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
export default Cart;
