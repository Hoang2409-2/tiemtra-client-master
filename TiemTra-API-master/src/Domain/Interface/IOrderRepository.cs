using Domain.Data.Entities;
using Domain.DTOs;
using Domain.DTOs.Order;
using Application.DTOs.Admin.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order, CancellationToken cancellationToken);
        Task UpdateAsync(Order order, CancellationToken cancellationToken);

        Task<IEnumerable<Order>> GetAllOrder(CancellationToken cancellationToken);

        Task<bool> OrderCodeExistsAsync(string orderCode);
        Task<Order?> GetByIdWithItemsAsync(Guid orderId, CancellationToken cancellationToken);

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        Task<PagedResult<OrderDto>> GetPagedOrdersAsync(OrderFillterDto filter, int pageNumber, int pageSize, CancellationToken cancellationToken);

        Task<Order> GetByIdAsync(Guid orderId, CancellationToken cancellationToken); // ko include

        // Dashboard methods
        Task<List<Order>> GetOrdersInRangeAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken);
        Task<List<TopProductDTO>> GetTopProductsInRangeAsync(DateTime startDate, DateTime endDate, int take, CancellationToken cancellationToken);
        Task<List<TopCustomerDTO>> GetTopCustomersInRangeAsync(DateTime startDate, DateTime endDate, int take, CancellationToken cancellationToken);
    }
}