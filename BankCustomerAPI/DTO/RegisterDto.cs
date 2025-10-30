namespace BankCustomerAPI.DTO
{
    public class RegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }  // Optional
        public DateTime DateOfBirth { get; set; }
    }
}
