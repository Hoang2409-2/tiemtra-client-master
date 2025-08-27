// src/views/Admin/Dashboard/components/RevenueLineChart.tsx
import React from "react";
import { Box, Card, CardContent, Divider, Typography, Skeleton } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { RevenuePoint } from "../types";
import { currency } from "../utils/currency";
import { DailyRevenue } from "../../../../services/api/Dashboard";

interface RevenueLineChartProps {
  data?: DailyRevenue[];
  loading?: boolean;
}

export default function RevenueLineChart({ data, loading }: RevenueLineChartProps) {
  // Convert API data to chart format
  const chartData: RevenuePoint[] = data?.map(item => ({
    date: new Date(item.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' }),
    revenue: item.revenue
  })) || [];

  return (
    <Card sx={{ borderRadius: 3, height: 360, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" fontWeight={700} mb={1}>
          Doanh thu theo ngày
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ width: "100%", height: 260 }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1_000_000)}tr`} />
                <Tooltip formatter={(v: any) => currency(Number(v))} />
                <Line type="monotone" dataKey="revenue" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
