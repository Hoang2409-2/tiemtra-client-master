// src/views/Admin/Dashboard/components/TopCustomersTable.tsx
import React from "react";
import { Box, Card, CardContent, Chip, Divider, Grid, Typography, Skeleton } from "@mui/material";
import { TopCustomer } from "../types";
import { currency } from "../utils/currency";
import { TopCustomer as APITopCustomer } from "../../../../services/api/Dashboard";

interface TopCustomersTableProps {
  data?: APITopCustomer[];
  loading?: boolean;
}

export default function TopCustomersTable({ data, loading }: TopCustomersTableProps) {
  // Convert API data to display format
  const tableData: TopCustomer[] = data?.map(item => ({
    name: item.customerName,
    phone: item.email, // Sử dụng email thay vì phone vì API trả về email
    orders: item.totalOrders,
    revenue: item.totalSpent
  })) || [];

  return (
    <Card sx={{ borderRadius: 3, height: 360, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" fontWeight={700} mb={1}>
          Top khách hàng
        </Typography>
        <Chip size="small" label="Theo doanh thu" sx={{ mb: 1 }} />
        <Divider sx={{ mb: 1.5 }} />
        <Box sx={{ maxHeight: 260, overflow: "auto" }}>
          <Grid container sx={{ px: 1, py: 1, color: "text.secondary", fontSize: 13 }}>
            <Grid item xs={5}>Khách hàng</Grid>
            <Grid item xs={2}>Số ĐH</Grid>
            <Grid item xs={5} textAlign="right">Doanh thu</Grid>
          </Grid>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <Box key={idx} sx={{ px: 1, py: 1.2, borderTop: idx ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                <Skeleton variant="text" height={40} />
              </Box>
            ))
          ) : (
            tableData.map((c, idx) => (
              <Box key={idx} sx={{ px: 1, py: 1.2, borderTop: idx ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                <Grid container alignItems="center">
                  <Grid item xs={5}>
                    <Typography fontWeight={600} sx={{ lineHeight: 1.2 }}>{c.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{c.phone}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Chip size="small" label={c.orders} />
                  </Grid>
                  <Grid item xs={5} textAlign="right">
                    <Typography fontWeight={600}>{currency(c.revenue)}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
