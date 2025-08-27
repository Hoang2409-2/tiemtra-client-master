// src/views/Admin/Dashboard/components/OrdersStatusPie.tsx
import React from "react";
import { Box, Card, CardContent, Chip, Divider, Typography, Skeleton } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { StatusSlice } from "../types";
import { OrderStatusStats } from "../../../../services/api/Dashboard";

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#22c55e", "#f87171"];

interface OrdersStatusPieProps {
  data?: OrderStatusStats[];
  loading?: boolean;
}

export default function OrdersStatusPie({ data, loading }: OrdersStatusPieProps) {
  // Convert API data to chart format
  const chartData: StatusSlice[] = data?.map(item => ({
    status: item.status,
    value: item.count
  })) || [];

  const total = chartData.reduce((s, i) => s + i.value, 0);

  return (
    <Card sx={{ borderRadius: 3, height: 360, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" fontWeight={700} mb={1}>
          Phân bố trạng thái đơn
        </Typography>
        <Chip size="small" label={`${total} đơn`} sx={{ mb: 1 }} />
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ width: "100%", height: 260 }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={90} label>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => `${v} đơn`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
