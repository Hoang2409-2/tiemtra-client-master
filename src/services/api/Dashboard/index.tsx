import axiosInstance from '../../extended/axiosInstance';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface DashboardFilterType {
  filterType: 1 | 2 | 3 | 4 | 5; // Today, SevenDays, ThisMonth, LastMonth, Custom
  startDate?: string;
  endDate?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  dailyRevenues: DailyRevenue[];
  orderStatusStats: OrderStatusStats[];
  topProducts: TopProduct[];
  topCustomers: TopCustomer[];
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  orderCount: number;
}

export interface OrderStatusStats {
  status: string;
  count: number;
  percentage: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  totalSold: number;
  totalRevenue: number;
}

export interface TopCustomer {
  customerId: string;
  customerName: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
}

const DashboardAPI = {
  // Lấy tổng quan thống kê
  getStats: (filter: DashboardFilterType) => 
    axiosInstance.get<ApiResponse<DashboardStats>>('/api/admin/dashboard/stats', { params: filter }),

  // Lấy biểu đồ doanh thu
  getRevenueChart: (filter: DashboardFilterType) => 
    axiosInstance.get<ApiResponse<DailyRevenue[]>>('/api/admin/dashboard/revenue-chart', { params: filter }),

  // Lấy thống kê trạng thái đơn hàng
  getOrderStatusStats: (filter: DashboardFilterType) => 
    axiosInstance.get<ApiResponse<OrderStatusStats[]>>('/api/admin/dashboard/order-status-stats', { params: filter }),

  // Lấy top sản phẩm
  getTopProducts: (filter: DashboardFilterType) => 
    axiosInstance.get<ApiResponse<TopProduct[]>>('/api/admin/dashboard/top-products', { params: filter }),

  // Lấy top khách hàng
  getTopCustomers: (filter: DashboardFilterType) => 
    axiosInstance.get<ApiResponse<TopCustomer[]>>('/api/admin/dashboard/top-customers', { params: filter }),
};

export default DashboardAPI;
