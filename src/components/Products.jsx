import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getProducts } from "../store/productsManagement/productsManagementSlice";
import { useNavigate } from "react-router-dom";

const PER_PAGE_LIMIT = 8;

const Loading = () => {
  return (
    <Grid container spacing={2}>
      {new Array(8).fill(1).map((ele, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <div className="m-3">
            <Skeleton variant="rectangular" height={230} />
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const { loading, productsInfo } = useSelector(
    (state) => state.productsManagement
  );

  useEffect(() => {
    dispatch(getProducts({ limit: PER_PAGE_LIMIT, skip: 0 }));
  }, []);

  const handleChangeCurrentPage = (event, value) => {
    setCurrentPage(value);
    dispatch(
      getProducts({ limit: PER_PAGE_LIMIT, skip: PER_PAGE_LIMIT * (value - 1) })
    );
  };

  const handleClickViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {productsInfo?.products?.length && (
            <>
              <Grid container spacing={2}>
                {productsInfo?.products.map((prod) => (
                  <Grid key={prod.id} item xs={12} sm={6} md={3}>
                    <Card
                      className="m-3 cursor-pointer hover:shadow-2xl"
                      onClick={() => handleClickViewProduct(prod.id)}
                    >
                      <div className="h-56">
                        <img src={prod.thumbnail} className="w-full h-full" />
                      </div>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {prod.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {prod.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {prod.brand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {prod.rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          $ {prod.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {prod.discountPercentage}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" size="small">
                          <AddShoppingCartIcon />
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <div className="my-10 flex justify-end">
                <Pagination
                  variant="outlined"
                  showFirstButton
                  showLastButton
                  color="primary"
                  size="large"
                  siblingCount={2}
                  boundaryCount={2}
                  count={Math.ceil(productsInfo.total / PER_PAGE_LIMIT)}
                  page={currentPage}
                  onChange={handleChangeCurrentPage}
                />
              </div>
            </>
          )}

          {!productsInfo?.products?.length && <>No products found!</>}
        </>
      )}
    </>
  );
};

export default Products;
