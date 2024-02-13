import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  IconButton,
  Pagination,
  Snackbar,
  Typography,
} from "@mui/material";
import ProductCard from "./components/ProductCard";
import Carousel from "./components/Carousel";
import { useNavigate } from "react-router-dom";
import { CartContext, SearchContext } from "../../App";
import { AddShoppingCart, Favorite } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const searchContext = useContext(SearchContext);
  const cartContext = useContext(CartContext);

  const [products, setProducts] = useState({});
  const [allProducts, setAllProducts] = useState({});
  const [page, setPage] = useState(1);
  const [open, setopen] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const apiCall = async () => {
    const response = await fetch("https://dummyjson.com/products").then(
      (response) => response.json()
    );
    setProducts(response);
    setAllProducts(response);
  };

  useEffect(() => {
    setProducts({
      ...allProducts,
      products: allProducts?.products
        ?.filter((x) =>
          x?.title
            ?.toLowerCase()
            ?.includes(searchContext?.search?.toLowerCase())
        )
        ?.slice(10 * (page - 1), 10 * page),
    });
  }, [searchContext?.search, page, allProducts?.products]);

  useEffect(() => {
    if (!products?.products) apiCall();
  }, []);

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#262b26",
          minHeight: "inherit",
        }}
      >
        <Carousel />

        {allProducts?.products?.length ? (
          products?.products?.length ? (
            <Grid container spacing={3} sx={{ mt: 4, pl: "auto" }}>
              {products?.products?.map((product) => (
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
                    navigateToDetails={() =>
                      navigate(`/products/${product.id}`)
                    }
                    cardActions={
                      <>
                        <IconButton aria-label="add to favorites">
                          <Favorite />
                        </IconButton>
                        <IconButton
                          aria-label="share"
                          onClick={() => addToCart(product)}
                        >
                          <AddShoppingCart />
                        </IconButton>
                      </>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" sx={{ color: "white" }}>
                "No results found"
              </Typography>
            </Box>
          )
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ color: "white" }}>
              "Loading..."
            </Typography>
          </Box>
        )}
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
            count={Math.ceil(allProducts?.products?.length / 10)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
