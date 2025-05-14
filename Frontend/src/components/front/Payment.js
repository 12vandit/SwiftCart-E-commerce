import React, { useState } from "react";
import { Container, TextField, Button, Typography, Grid, Card, CardContent, Checkbox, FormControlLabel, Snackbar, CircularProgress } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { FaCreditCard, FaLock } from "react-icons/fa";

export default function Payment() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    saveDetails: false,
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const dummyOrderItems = [
    { name: "Premium Headphones", price: "$199.99" },
    { name: "Wireless Mouse", price: "$49.99" },
    { name: "Mechanical Keyboard", price: "$129.99" },
  ];

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "saveDetails" ? checked : value,
    }));
  };

  const calculateTotal = () => {
    return dummyOrderItems
      .reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0)
      .toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Simulating a payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSnackbar({ open: true, message: "Payment processed successfully!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Payment failed. Please try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                <FaCreditCard style={{ marginRight: "8px" }} />
                Payment Details
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Cardholder Name"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      inputProps={{ maxLength: 19 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      inputProps={{ maxLength: 5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      type="password"
                      inputProps={{ maxLength: 4 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Billing Address"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="saveDetails"
                          checked={formData.saveDetails}
                          onChange={handleInputChange}
                        />
                      }
                      label="Save payment details for future use"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <FaLock />}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Order Summary</Typography>
              {dummyOrderItems.map((item, index) => (
                <Typography key={index}>
                  {item.name}: {item.price}
                </Typography>
              ))}
              <Typography variant="h6">Total: ${calculateTotal()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
