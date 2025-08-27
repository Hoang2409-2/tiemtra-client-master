using Application.DTOs.Admin.Dashboard;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Shared.Common;

namespace TiemTra_Api.Controllers.Admin_Dashboard
{
    [Route("api/admin/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetDashboardStats([FromQuery] DashboardFilterDTO filter, CancellationToken cancellationToken = default)
        {
            try
            {
                var stats = await _dashboardService.GetDashboardStatsAsync(filter, cancellationToken);
                return Ok(new ApiResponse(true, "Lấy thống kê thành công", stats));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(false, $"Lỗi khi lấy thống kê: {ex.Message}"));
            }
        }

        [HttpGet("revenue-chart")]
        public async Task<IActionResult> GetRevenueChart([FromQuery] DashboardFilterDTO filter, CancellationToken cancellationToken = default)
        {
            try
            {
                var stats = await _dashboardService.GetDashboardStatsAsync(filter, cancellationToken);
                return Ok(new ApiResponse(true, "Lấy biểu đồ doanh thu thành công", stats.DailyRevenues));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(false, $"Lỗi khi lấy biểu đồ doanh thu: {ex.Message}"));
            }
        }

        [HttpGet("order-status-stats")]
        public async Task<IActionResult> GetOrderStatusStats([FromQuery] DashboardFilterDTO filter, CancellationToken cancellationToken = default)
        {
            try
            {
                var stats = await _dashboardService.GetDashboardStatsAsync(filter, cancellationToken);
                return Ok(new ApiResponse(true, "Lấy thống kê trạng thái đơn hàng thành công", stats.OrderStatusStats));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(false, $"Lỗi khi lấy thống kê trạng thái đơn hàng: {ex.Message}"));
            }
        }

        [HttpGet("top-products")]
        public async Task<IActionResult> GetTopProducts([FromQuery] DashboardFilterDTO filter, CancellationToken cancellationToken = default)
        {
            try
            {
                var stats = await _dashboardService.GetDashboardStatsAsync(filter, cancellationToken);
                return Ok(new ApiResponse(true, "Lấy top sản phẩm thành công", stats.TopProducts));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(false, $"Lỗi khi lấy top sản phẩm: {ex.Message}"));
            }
        }

        [HttpGet("top-customers")]
        public async Task<IActionResult> GetTopCustomers([FromQuery] DashboardFilterDTO filter, CancellationToken cancellationToken = default)
        {
            try
            {
                var stats = await _dashboardService.GetDashboardStatsAsync(filter, cancellationToken);
                return Ok(new ApiResponse(true, "Lấy top khách hàng thành công", stats.TopCustomers));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(false, $"Lỗi khi lấy top khách hàng: {ex.Message}"));
            }
        }
    }
}
