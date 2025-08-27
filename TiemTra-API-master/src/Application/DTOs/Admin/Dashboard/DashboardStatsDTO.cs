using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Admin.Dashboard
{
    public class DashboardStatsDTO
    {
        public decimal TotalRevenue { get; set; }
        public int TotalOrders { get; set; }
        public int TotalCustomers { get; set; }
        public int TotalProducts { get; set; }
        public List<DailyRevenueDTO> DailyRevenues { get; set; } = new List<DailyRevenueDTO>();
        public List<OrderStatusStatsDTO> OrderStatusStats { get; set; } = new List<OrderStatusStatsDTO>();
        public List<TopProductDTO> TopProducts { get; set; } = new List<TopProductDTO>();
        public List<TopCustomerDTO> TopCustomers { get; set; } = new List<TopCustomerDTO>();
    }

    public class DailyRevenueDTO
    {
        public DateTime Date { get; set; }
        public decimal Revenue { get; set; }
        public int OrderCount { get; set; }
    }

    public class OrderStatusStatsDTO
    {
        public string Status { get; set; } = string.Empty;
        public int Count { get; set; }
        public decimal Percentage { get; set; }
    }

    public class TopProductDTO
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int TotalSold { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    public class TopCustomerDTO
    {
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int TotalOrders { get; set; }
        public decimal TotalSpent { get; set; }
    }

    public enum DashboardFilterType
    {
        Today = 1,
        SevenDays = 2,
        ThisMonth = 3,
        LastMonth = 4,
        Custom = 5
    }

    public class DashboardFilterDTO
    {
        public DashboardFilterType FilterType { get; set; } = DashboardFilterType.Today;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
