// src/views/Admin/Dashboard/components/KpiCards.tsx
import React from "react";
import { Grid, Skeleton } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KpiCard from "./KpiCard";
import { currency } from "../utils/currency";
import { DashboardStats } from "../../../../services/api/Dashboard";

interface KpiCardsProps {
  data?: DashboardStats | null;
  loading?: boolean;
}

export default function KpiCards({ data, loading }: KpiCardsProps) {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((idx) => (
          <Grid key={idx} item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        ))}
      </Grid>
    );
  }

  const items = [
    { 
      icon: <MonetizationOnIcon />, 
      label: "Doanh thu", 
      value: currency(data?.totalRevenue || 0), 
      change: 0 // Có thể tính change so với kỳ trước nếu cần
    },
    { 
      icon: <ReceiptLongIcon />, 
      label: "Số đơn", 
      value: (data?.totalOrders || 0).toLocaleString("vi-VN"), 
      change: 0 
    },
    { 
      icon: <TrendingUpIcon />, 
      label: "AOV", 
      value: currency(data?.totalOrders ? (data.totalRevenue / data.totalOrders) : 0), 
      change: 0 
    },
    { 
      icon: <PeopleAltIcon />, 
      label: "Khách hàng", 
      value: (data?.totalCustomers || 0).toLocaleString("vi-VN"), 
      change: 0 
    },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((it, idx) => (
        <Grid key={idx} item xs={12} sm={6} md={3}>
          <KpiCard {...it} />
        </Grid>
      ))}
    </Grid>
  );
}
