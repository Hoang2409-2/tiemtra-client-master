// import { useNavigate } from "react-router-dom"

import { Box, Button, Grid, Typography } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import AnalyticsFilter from "./components/AnalyticsFilter";
import KpiCards from "./components/KpiCards";
import RevenueLineChart from "./components/RevenueLineChart";
import OrdersStatusPie from "./components/OrdersStatusPie";
import TopProductsBarChart from "./components/TopProductsBarChart";
import TopCustomersTable from "./components/TopCustomersTable";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import DashboardAPI, { DashboardFilterType, DashboardStats } from "../../../services/api/Dashboard";

const Dashboard = () => {
  const [applied, setApplied] = useState({
    range: "this_month",
    channel: "all",
  });

  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);

  const subtitle = useMemo(() => {
    const labelMap: Record<string, string> = {
      today: "Hôm nay",
      "7d": "7 ngày qua",
      this_month: "Tháng này",
      last_month: "Tháng trước",
      custom: "Tùy chọn",
    };
    return `${labelMap[applied.range]} • Kênh: ${applied.channel}`;
  }, [applied]);

  const [showFilter, setShowFilter] = useState(true);

  // Convert range string to API filter type
  const getFilterType = (range: string): DashboardFilterType => {
    const filterMap: Record<string, number> = {
      today: 1,
      "7d": 2,
      this_month: 3,
      last_month: 4,
      custom: 5,
    };
    
    return {
      filterType: filterMap[range] as 1 | 2 | 3 | 4 | 5,
    };
  };

  // Fetch dashboard data
  const fetchDashboardData = async (range: string) => {
    try {
      setLoading(true);
      const filter = getFilterType(range);
      const response = await DashboardAPI.getStats(filter);
      
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchDashboardData(applied.range);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle filter apply
  const handleFilterApply = (range: string, channel: string) => {
    setApplied({ range, channel });
    fetchDashboardData(range);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        height: "calc(100vh - 63px)",
      }}
    >
      {/* Header */}
      <Box sx={{ flexShrink: 0, p: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <DashboardHeader title="Bảng điều khiển — Tiệm Trà" />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {subtitle}
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={showFilter ? <CloseIcon /> : <FilterAltIcon />}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </Button>
        </Box>

        {showFilter && (
          <AnalyticsFilter
            onApply={handleFilterApply}
          />
        )}
      </Box>

      {/* Nội dung cuộn */}
      <Box sx={{ flex: 1, overflow: "auto", px: 1 }}>
        <KpiCards data={dashboardData} loading={loading} />
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <RevenueLineChart data={dashboardData?.dailyRevenues} loading={loading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrdersStatusPie data={dashboardData?.orderStatusStats} loading={loading} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <TopProductsBarChart data={dashboardData?.topProducts} loading={loading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TopCustomersTable data={dashboardData?.topCustomers} loading={loading} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "right", mb: 3 }}>
          <Button startIcon={<ShoppingBagIcon />} variant="contained">
            Xem danh sách đơn hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
