import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import CheckoutForm from "components/CheckoutForm";
import { commerce } from "lib/commerce";
import { convertObjectToArray } from "utils/helpers";
import { usePreviousState } from "utils/hooks";
import "./style.css";

const CheckoutPage = ({ basketData }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postCode: "",
    shippingCountry: {
      code: "",
    },
    shippingCountries: [{ code: "", name: "" }],
    shippingSubdivision: {
      code: "",
    },
    shippingSubdivisions: [{ code: "", name: "" }],
    shippingOption: {
      id: "",
    },
    shippingOptions: [
      { id: "", description: "", price: { formatted_with_symbol: "" } },
    ],
  });
  const [checkoutData, setCheckoutData] = useState({});
  const previousShippingCountry = usePreviousState(user.shippingCountry);
  const previousShippingSubdivision = usePreviousState(
    user.shippingSubdivision
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e, state) => {
    const { name, value } = e.target;
    if (state === "shippingOptions") {
      setUser((prev) => ({
        ...prev,
        shippingOptions: {
          id: value,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: {
          name: prev[state].find((country) => country.code === value).name,
          code: value,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log("user", user);

  useEffect(() => {
    if (basketData.id) {
      const generateToken = async () => {
        try {
          const response = await commerce.checkout.generateToken(
            basketData.id,
            {
              type: "cart",
            }
          );
          console.log("token", response);
          setCheckoutData(response);
        } catch (error) {
          console.error("Checkout error: ", error);
        }
      };
      generateToken();
    }
  }, [basketData]);

  useEffect(() => {
    const fetchShippingCountries = async () => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutData.id
      );
      console.log("countries", countries);
      const FormattedCountries = convertObjectToArray(countries);
      setUser((prev) => ({
        ...prev,
        shippingCountries: FormattedCountries,
        shippingCountry: FormattedCountries[FormattedCountries.length - 1],
      }));
    };

    if (!user.shippingCountries.length && checkoutData.id) {
      fetchShippingCountries();
    }
  }, [user, checkoutData]);

  useEffect(() => {
    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );

      const shippingSubdivisions = convertObjectToArray(subdivisions);
      setUser((prev) => ({
        ...prev,
        shippingSubdivisions,
        shippingSubdivision: shippingSubdivisions[0],
      }));
    };

    if (
      (user.shippingCountry.code && !user.shippingSubdivisions.length) ||
      (previousShippingCountry &&
        previousShippingCountry.code !== user.shippingCountry.code)
    ) {
      fetchSubdivisions(user.shippingCountry.code);
    }
  }, [user, previousShippingCountry]);

  useEffect(() => {
    const fetchShippingOptions = async (
      checkoutDataId,
      country,
      stateProvince = null
    ) => {
      const options = await commerce.checkout.getShippingOptions(
        checkoutDataId,
        {
          country,
          region: stateProvince,
        }
      );

      setUser((prev) => ({
        ...prev,
        shippingOptions: options,
        shippingOption: { id: options[0].id },
      }));
    };

    if (
      (user.shippingSubdivision.code && !user.shippingOptions.length) ||
      (previousShippingSubdivision &&
        previousShippingSubdivision.code !== user.shippingSubdivision.code)
    ) {
      fetchShippingOptions(
        checkoutData.id,
        user.shippingCountry.code,
        user.shippingSubdivision.code
      );
    }
  }, [
    user,
    checkoutData.id,
    user.shippingCountry.code,
    user.shippingSubdivision,
    previousShippingSubdivision,
  ]);

  return (
    <div className="checkout">
      <Container>
        <Paper className="paper" elevation={3}>
          <Typography align="center" variant="h5" gutterBottom>
            Checkout
          </Typography>
          <CheckoutForm
            user={user}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default CheckoutPage;
