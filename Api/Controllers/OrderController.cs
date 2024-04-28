using Microsoft.AspNetCore.Mvc;
using Api.Infrastructure;
using Api.Models;
using System.Collections.Generic;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/order/5
        [HttpGet("order/{id:int}")]
        public ActionResult<IEnumerable<Order>> GetOrders(int id = 1)
        {
            var orders = _orderService.GetOrdersForCompany(id);
            if (orders == null || !orders.Any())
            {
                return NotFound();
            }
            return Ok(orders);
        }
    }
}
