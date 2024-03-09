import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Rating,
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
            <div className="flex gap-2">
              <Skeleton
                className="flex-1"
                variant="text"
                sx={{ fontSize: "2rem" }}
              />
              <Skeleton
                className="flex-1"
                variant="text"
                sx={{ fontSize: "2rem" }}
              />
            </div>
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
                      <CardContent className="!pb-3">
                        <Typography gutterBottom variant="h6" component="div">
                          {prod.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {prod.brand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {prod.category}
                        </Typography>
                        <div className="flex justify-between my-2">
                          <p className="font-bold">${prod.price}</p>
                          <p>{prod.discountPercentage}%</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <Button variant="contained" size="small">
                            <AddShoppingCartIcon />
                          </Button>

                          <Rating
                            name="read-only"
                            value={prod.rating}
                            readOnly
                          />
                        </div>
                      </CardContent>
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
