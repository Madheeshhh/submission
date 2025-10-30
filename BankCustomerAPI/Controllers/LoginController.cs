using BankCustomerAPI.Data;
using BankCustomerAPI.Models;
using BankCustomerAPI.DTO;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly BankCustomerContext _context;

        public LoginController(JwtService jwtService, BankCustomerContext context)
        {
            _jwtService = jwtService;
            _context = context;
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto request)
        {
            if (request == null)
                return BadRequest("Request is required.");

            // Check if user already exists
            if (_context.Users.Any(u => u.Email == request.Email))
                return BadRequest("User already exists.");

            // Hash the password
            var hashedPassword = PasswordSeeder.HashPassword(request.Password);

            // Create new user
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = PasswordSeeder.HashPassword(request.Password),
                CreatedDate = DateTime.UtcNow,
                UserType = "Customer" // default
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            // Assign "Customer" role
            var customerRole = _context.Roles.FirstOrDefault(r => r.RoleName == "Customer");
            if (customerRole != null)
            {
                _context.UserRoles.Add(new UserRole
                {
                    UserId = user.UserId,
                    RoleId = customerRole.RoleId
                });
                _context.SaveChanges();
            }

            return Ok(new { message = "User registered successfully!" });
        }




        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto request)
        {
            if (request == null)
                return BadRequest("Request is required.");

            // Find user by email
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            // Hash the incoming password and compare with stored hash
            var hashedInput = PasswordSeeder.HashPassword(request.Password);
            if (hashedInput != user.PasswordHash)
                return Unauthorized("Invalid email or password.");

            // Fetch user roles dynamically
            var roles = _context.UserRoles
                    .Include(ur => ur.Role)      // Include Role table
                    .Where(ur => ur.UserId == user.UserId)
                    .Select(ur => ur.Role.RoleName)
                    .ToList();
            // Generate JWT token
            var token = _jwtService.GenerateToken(user.Email, roles);

            return Ok(new
            {
                Token = token,
                Email = user.Email,
                Roles = roles
            });
        }

    }
}
