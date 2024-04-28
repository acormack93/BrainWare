using NUnit.Framework;
using Moq;
using System.Data;
using Api.Infrastructure;
using System.Collections.Generic;
using Api.Models;

namespace Api.Infrastructure.Tests
{
    [TestFixture]  // This should be right above the class declaration
    public class OrderServiceTests
    {
        private Mock<IDatabaseExecutor> _mockDatabaseExecutor;
        private OrderService _orderService;

        [SetUp]  // Correctly placed above the SetUp method
        public void SetUp()
        {
            _mockDatabaseExecutor = new Mock<IDatabaseExecutor>();
            _orderService = new OrderService(_mockDatabaseExecutor.Object);
        }

        [Test]  // Correctly placed above each test method
        public void GetOrdersForCompany_WithValidData_ReturnsOrders()
        {
            // Arrange
            int companyId = 1;
            var fakeReader = new Mock<IDataReader>();
            fakeReader.SetupSequence(x => x.Read())
                .Returns(true) // First row
                .Returns(true) // Second row
                .Returns(false); // End of data

            fakeReader.Setup(x => x.GetInt32(2)).Returns(1);
            fakeReader.Setup(x => x.GetString(0)).Returns("Company A");
            fakeReader.Setup(x => x.GetString(1)).Returns("Order 1");

            _mockDatabaseExecutor.Setup(x => x.ExecuteReader(It.IsAny<string>()))
                .Returns(fakeReader.Object);

            // Act
            var result = _orderService.GetOrdersForCompany(companyId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Company A", result[0].CompanyName);
            Assert.AreEqual("Order 1", result[0].Description);
            Assert.AreEqual(1, result[0].OrderId);
        }

        [Test]
        public void GetOrdersForCompany_WhenNoOrders_ReturnsEmptyList()
        {
            // Arrange
            int companyId = 1;
            var fakeReader = new Mock<IDataReader>();
            fakeReader.Setup(x => x.Read()).Returns(false); // No rows returned

            _mockDatabaseExecutor.Setup(x => x.ExecuteReader(It.IsAny<string>()))
                .Returns(fakeReader.Object);

            // Act
            var result = _orderService.GetOrdersForCompany(companyId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count);
        }
    }
}
