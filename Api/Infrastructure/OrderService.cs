namespace Api.Infrastructure
{
    using System.Data;
    using Models;

    public interface IDatabaseExecutor
    {
        IDataReader ExecuteReader(string sql);
    }

    public class DatabaseExecutor : IDatabaseExecutor
    {
        public IDataReader ExecuteReader(string sql)
        {
            // Implement the actual database execution logic here
            throw new NotImplementedException();
        }
    }

    public class OrderService
    {
        private readonly IDatabaseExecutor _databaseExecutor;

        public OrderService(IDatabaseExecutor databaseExecutor)
        {
            _databaseExecutor = databaseExecutor;
        }

        public List<Order> GetOrdersForCompany(int companyId)
        {
            var orders = GetOrders(companyId);
            var orderProducts = GetOrderProducts();

            foreach (var order in orders)
            {
            foreach (var orderProduct in orderProducts)
            {
                if (orderProduct.OrderId != order.OrderId)
                continue;

                order.OrderProducts.Add(orderProduct);
                order.OrderTotal = order.OrderTotal + (orderProduct.Price * orderProduct.Quantity);
            }
            }

            return orders;
        }

        private List<Order> GetOrders(int companyId)
        {
            var sql =
            "SELECT c.name, o.description, o.order_id FROM company c INNER JOIN [order] o on c.company_id=o.company_id";

            var reader = _databaseExecutor.ExecuteReader(sql);

            var orders = new List<Order>();

            while (reader.Read())
            {
            var record = (IDataRecord)reader;

            orders.Add(new Order()
            {
                CompanyName = record.GetString(0),
                Description = record.GetString(1),
                OrderId = record.GetInt32(2),
                OrderProducts = new List<OrderProduct>()
            });

            }

            reader.Close();

            return orders;
        }

        private List<OrderProduct> GetOrderProducts()
        {
            var sql =
            "SELECT op.price, op.order_id, op.product_id, op.quantity, p.name, p.price FROM orderproduct op INNER JOIN product p on op.product_id=p.product_id";

            var reader = _databaseExecutor.ExecuteReader(sql);

            var orderProducts = new List<OrderProduct>();

            while (reader.Read())
            {
            var record = (IDataRecord)reader;

            orderProducts.Add(new OrderProduct()
            {
                OrderId = record.GetInt32(1),
                ProductId = record.GetInt32(2),
                Price = record.GetDecimal(0),
                Quantity = record.GetInt32(3),
                Product = new Product()
                {
                Name = record.GetString(4),
                Price = record.GetDecimal(5)
                }
            });
            }

            reader.Close();

            return orderProducts;
        }
    }
}