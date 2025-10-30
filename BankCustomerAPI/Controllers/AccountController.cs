using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Customer")]  // ✅ This protects every action in this controller
    public class AccountController : ControllerBase
    {
        // ✅ This is a simple demo endpoint to verify your JWT works
        [HttpGet]
        public IActionResult GetAccounts()
        {
            // The token will be validated before this executes
            var userEmail = User.Identity?.Name; // Extracts email from token claims

            return Ok(new
            {
                Message = "🎉 You are authorized to access this endpoint!",
                LoggedInUser = userEmail
            });
        }

        // ✅ Example of a more specific route
        [HttpGet("{id}")]
        public IActionResult GetAccountById(int id)
        {
            // Here, you would normally fetch account data from your DB
            return Ok(new
            {
                Message = $"Fetched account {id} successfully.",
                RequestedBy = User.Identity?.Name
            });
        }
    }
}
