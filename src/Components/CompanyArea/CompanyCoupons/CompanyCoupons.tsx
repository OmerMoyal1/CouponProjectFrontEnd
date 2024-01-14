import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryType from "../../../Models/CategoryTypes";
import { CouponModel } from "../../../Models/CouponModel";
import authService from "../../../Services/AuthService";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponBox from "../../CouponArea/CouponBox/CouponBox";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {
  const [myCoupons, setMyCoupons] = useState<CouponModel[]>([]);
  const [category, setCategory] = React.useState("*");
  const [minPrice, setMinPrice] = useState(0);
  const navigate = useNavigate();

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(+event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    new CompanyService()
      .getAllCoupons()
      .then((c) => setMyCoupons(c))
      .then()
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }, []);

  function filterMyCoupon(category: CategoryType) {}

  return (
    <div className="Customer">
      <h2>My Coupons :</h2>
      <div className="FilterCoupons">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="*">All</MenuItem>
            <MenuItem value={"Food"}>
              {CategoryType[CategoryType.Food]}
            </MenuItem>
            <MenuItem value={"Electricity"}>
              {CategoryType[CategoryType.Electricity]}
            </MenuItem>
            <MenuItem value={"Restaurant"}>
              {CategoryType[CategoryType.Restaurant]}
            </MenuItem>
            <MenuItem value={"Vacation"}>
              {CategoryType[CategoryType.Vacation]}
            </MenuItem>
            <MenuItem value={"Clothes"}>
              {CategoryType[CategoryType.Clothes]}
            </MenuItem>
            <MenuItem value={"Other"}>
              {CategoryType[CategoryType.Other]}
            </MenuItem>
          </Select>
          <FormHelperText>Filter Coupons by category</FormHelperText>
        </FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={handleChange1}
            id="outlined-basic"
            label="Minimum Price"
            variant="outlined"
          />
        </Box>
      </div>

    
      {/* Show all or some after the filtering by category or price */}

      {category === "*" && (
        <>
          {myCoupons
            .filter((c) => c.price >= minPrice)
            .map((c) => (
              <CouponBox key={c.id} coupon={c} />
            ))}
        </>
      )}

      {category !== "*" && (
        <>
          {myCoupons
            .filter((c) => c.price >= minPrice)
            .filter((c) => c.category == category)
            .map((c) => (
              <CouponBox key={c.id} coupon={c} />
            ))}
        </>
      )}
    </div>
  );
}

export default CompanyCoupons;
