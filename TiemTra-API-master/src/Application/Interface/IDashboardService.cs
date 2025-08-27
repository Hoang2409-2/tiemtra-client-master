using Application.DTOs.Admin.Dashboard;

namespace Application.Interface
{
    public interface IDashboardService
    {
        Task<DashboardStatsDTO> GetDashboardStatsAsync(DashboardFilterDTO filter, CancellationToken cancellationToken = default);
    }
}
