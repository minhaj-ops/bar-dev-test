import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { logos, ordersData } from "./utils/constants";

const App = () => {
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get("company");
  const orders = ordersData[companyName] || [];

  const companyLogo =
    logos[companyName] || "https://example.com/logos/placeholder.png";

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <Avatar
        src={companyLogo}
        alt={`${companyName} logo`}
        sx={{ width: 100, height: 100, margin: "0 auto 2rem" }}
      />
      {orders.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 900,
            margin: "0 auto",
            borderRadius: 2,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1565c0" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Customer Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.orderId}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f0f8ff",
                    },
                  }}
                >
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        order.status === "Delivered"
                          ? "green"
                          : order.status === "Cancelled"
                          ? "red"
                          : "#ffa500",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="h6"
          sx={{ color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
        >
          No orders available for this company.
        </Typography>
      )}
    </Box>
  );
};

export default App;

// For onboarding new companies
// We can create a form taking company name and url,  The form uses React's useState hook to manage the input fields for the company name and logo URL. When the user submits the form, the handleAddCompany function checks if both fields are filled. If they are, it updates the allCompanies state with the new company’s name and logo URL, and also initializes an empty order list for that company in the ordersData object.
