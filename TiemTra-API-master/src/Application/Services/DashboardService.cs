using Application.DTOs.Admin.Dashboard;
using Application.Interface;
using Domain.Interface;
using Domain.Enum;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IProductRepository _productRepository;

        public DashboardService(
            IOrderRepository orderRepository,
            ICustomerRepository customerRepository,
            IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _customerRepository = customerRepository;
            _productRepository = productRepository;
        }

        public async Task<DashboardStatsDTO> GetDashboardStatsAsync(DashboardFilterDTO filter, CancellationToken cancellationToken = default)
        {
            var dateRange = GetDateRange(filter);
            var startDate = dateRange.StartDate;
            var endDate = dateRange.EndDate;

            var stats = new DashboardStatsDTO();

            // Lấy tất cả orders trong khoảng thời gian
            var orders = await _orderRepository.GetOrdersInRangeAsync(startDate, endDate, cancellationToken);

            // Tính tổng doanh thu và số đơn hàng
            stats.TotalRevenue = orders.Where(o => o.OrderStatus == OrderStatus.Delivered).Sum(o => o.TotalAmount);
            stats.TotalOrders = orders.Count();

            // Tính tổng khách hàng (unique customers trong khoảng thời gian)
            stats.TotalCustomers = orders.Select(o => o.CustomerId).Distinct().Count();

            // Tổng sản phẩm (có thể lấy từ tất cả sản phẩm hoặc chỉ những sản phẩm được bán)
            stats.TotalProducts = await _productRepository.GetTotalActiveProductsAsync(cancellationToken);

            // Doanh thu theo ngày
            stats.DailyRevenues = orders
                .Where(o => o.OrderStatus == OrderStatus.Delivered)
                .GroupBy(o => o.CreatedAt.Date)
                .Select(g => new DailyRevenueDTO
                {
                    Date = g.Key,
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(d => d.Date)
                .ToList();

            // Thống kê theo trạng thái đơn hàng
            var statusGroups = orders.GroupBy(o => o.OrderStatus).ToList();
            var totalOrdersCount = orders.Count();

            stats.OrderStatusStats = statusGroups.Select(g => new OrderStatusStatsDTO
            {
                Status = g.Key.ToString(),
                Count = g.Count(),
                Percentage = totalOrdersCount > 0 ? (decimal)g.Count() / totalOrdersCount * 100 : 0
            }).ToList();

            // Top sản phẩm bán chạy
            stats.TopProducts = await GetTopProductsAsync(startDate, endDate, cancellationToken);

            // Top khách hàng
            stats.TopCustomers = await GetTopCustomersAsync(startDate, endDate, cancellationToken);

            return stats;
        }

        private (DateTime StartDate, DateTime EndDate) GetDateRange(DashboardFilterDTO filter)
        {
            var now = DateTime.Now;
            var today = now.Date;

            return filter.FilterType switch
            {
                DashboardFilterType.Today => (today, today.AddDays(1).AddTicks(-1)),
                DashboardFilterType.SevenDays => (today.AddDays(-6), today.AddDays(1).AddTicks(-1)),
                DashboardFilterType.ThisMonth => (new DateTime(now.Year, now.Month, 1), new DateTime(now.Year, now.Month, 1).AddMonths(1).AddTicks(-1)),
                DashboardFilterType.LastMonth => (new DateTime(now.Year, now.Month, 1).AddMonths(-1), new DateTime(now.Year, now.Month, 1).AddTicks(-1)),
                DashboardFilterType.Custom => (filter.StartDate ?? today, filter.EndDate ?? today.AddDays(1).AddTicks(-1)),
                _ => (today, today.AddDays(1).AddTicks(-1))
            };
        }

        private async Task<List<TopProductDTO>> GetTopProductsAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken)
        {
            return await _orderRepository.GetTopProductsInRangeAsync(startDate, endDate, 5, cancellationToken);
        }

        private async Task<List<TopCustomerDTO>> GetTopCustomersAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken)
        {
            return await _orderRepository.GetTopCustomersInRangeAsync(startDate, endDate, 5, cancellationToken);
        }
    }
}
