using BankCustomerAPI.Data;
using BankCustomerAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Customer")]  // ✅ This protects every action in this controller
    public class AccountController : ControllerBase
    {
        private readonly BankCustomerContext _context;
        public AccountController(BankCustomerContext context)
        {
            _context= context;
        }
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

        [HttpPost]
        [Authorize(Roles = "Admin")] // Only Admins can create accounts
        public IActionResult CreateAccount([FromBody] Account newAccount)
        {
            if (newAccount == null)
                return BadRequest("Invalid account data.");

            // Auto-generate account number (just an example)
            newAccount.AccountNumber = "ACC-" + DateTime.UtcNow.Ticks;
            newAccount.CreatedDate = DateTime.UtcNow;
            newAccount.IsClosed = false;

            _context.Accounts.Add(newAccount);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetAccountById), new { id = newAccount.AccountId }, newAccount);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] // Only Admins can delete
        public IActionResult DeleteAccount(int id)
        {
            var account = _context.Accounts.Find(id);
            if (account == null)
                return NotFound("Account not found.");

            _context.Accounts.Remove(account);
            _context.SaveChanges();

            return Ok(new { message = "Account deleted successfully." });
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
