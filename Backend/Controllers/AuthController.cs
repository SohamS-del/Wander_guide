using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using SmtpClient = System.Net.Mail.SmtpClient;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupRequest request)
    {
        if (!IsValidEmail(request.Email))
            return BadRequest(new { message = "Invalid email format" });

        if (!CheckEmailExists(request.Email))
            return BadRequest(new { message = "Email does not exist in DNS" });

        if (request.Password != request.ConfirmPassword)
            return BadRequest(new { message = "Password and Confirm Password do not match" });

        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
            return BadRequest(new { message = "Email is already registered" });

        var user = new IdentityUser { UserName = request.Email, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { message = "User created successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            return Unauthorized(new { message = "Invalid email or password" });

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return BadRequest(new { message = "User not found" });

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        SendEmail(user.Email, "Reset Password", $"Your reset token is: {token}");

        return Ok(new { message = "Reset token sent to email" });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return BadRequest(new { message = "User not found" });

        var result = await _userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { message = "Password reset successful" });
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> Profile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);

        return Ok(new { user.Email, user.UserName });
    }

    private string GenerateJwtToken(IdentityUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ff57bdcce82b6ea621933f58b09907a379722ad3333c72063eec89afc2023c6297bb72a9aa7196e42af80c0f3dda50319121a8f2937ca99578b316ec3c9ea29b3ee96a33c3bea6b2e6df582d35e03980fcb006617d6a468778d4412f42c861dde7f1cda9edbbb0aa1f4a125b891b48937476d33f72fdac2a5828d36cfa16cbcb4f6ff82f779539ac211d83183c0e78e07cfd6c94629118b92a65ab5552baf24b7101ea1e55ef75bb341aaef67701f9dbefcf7769982f3c8b619675d41af3b57ed7a03b7861580e0bb1ca942333979ce7d29198404358480f82869574a65bb8a3f2e498bba785c7956a2f7af3f5c4251522754b146aaabf867e95caa915af1f14bd4217f217e1b3b0b24f517e0b1288bfc4fb288cb3b6793393c1f7f2a06359e1a1a9a26d74db3968a655271e25fcb71cabef2439f0ea96274ad82b437e356ead"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "Backend_WanderGuide",
            audience: "Backend_WanderGuide",
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    private bool CheckEmailExists(string email)
    {
        try
        {
            var domain = email.Split('@')[1];
            var hostEntry = Dns.GetHostEntry(domain);
            return hostEntry != null;
        }
        catch
        {
            return false;
        }
    }

    private void SendEmail(string to, string subject, string body)
    {
        using var client = new SmtpClient("smtp.gmail.com", 587)
        {
            Credentials = new NetworkCredential("shravaniinov@gmail.com", "nnst dvbb pods dkgk"),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress("shravaniinov@gmail.com"),
            Subject = subject,
            Body = body,
            IsBodyHtml = true // if the email contains HTML content
        };
        mailMessage.To.Add(to);

        try
        {
            client.Send(mailMessage);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            throw;
        }
    }

}

public class SignupRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [MinLength(8)]
    public string Password { get; set; }
    [Required]
    [Compare("Password")]
    public string ConfirmPassword { get; set; }
}

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}

public class ForgotPasswordRequest
{
    public string Email { get; set; }
}

public class ResetPasswordRequest
{
    public string Email { get; set; }
    public string Token { get; set; }
    public string NewPassword { get; set; }
}
