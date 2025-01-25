using Backend_WanderGuide.Models;
using Backend_WanderGuide.Uitilities;
using Backend_WanderGuide.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    

    public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        
    }

    public async Task<IActionResult> Signup(SignupRequest request)
    {
        if (!AuthUtilities.IsValidEmail(request.Email))
            return new BadRequestObjectResult(new { message = "Invalid email format" });

        if (string.IsNullOrWhiteSpace(request.Name))
            return new BadRequestObjectResult(new { message = "Name is required" });

  

        if (request.Password != request.ConfirmPassword)
            return new BadRequestObjectResult(new { message = "Password and Confirm Password do not match" });

        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
            return new BadRequestObjectResult(new { message = "Email is already registered" });

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            Name = request.Name,
            Phone = request.Phone
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
            return new BadRequestObjectResult(result.Errors);

        return new OkObjectResult(new { message = "User created successfully" });
    }

    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            return new UnauthorizedObjectResult(new { message = "Invalid email or password" });

        var token = AuthUtilities.GenerateJwtToken(user);
        return new OkObjectResult(new { message = "Login Successful" });
    }

    public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return new BadRequestObjectResult(new { message = "User not found" });

        string otp = OtpUtility.GenerateOTP();
        string token = await _userManager.GeneratePasswordResetTokenAsync(user);

        // Store OTP with token and expiration
        OtpUtility._otpStore[request.Email] = new OtpInfo
        {
            Otp = otp,
            Token = token,
            ExpiresAt = DateTime.UtcNow.AddMinutes(10)
        };

        // Send OTP via email
        EmailUtility.SendEmail(user.Email, "Password Reset OTP", $"Your OTP is: {otp}");

        return new OkObjectResult(new { message = "OTP sent to email" });
    }

    public async Task<IActionResult> ValidateOtpRequest(ValidateOtpRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return new BadRequestObjectResult(new { message = "User not found" });

        // Check if the OTP exists and validate it against the stored value
        if (!OtpUtility._otpStore.TryGetValue(request.Email, out var otpInfo) ||
            otpInfo.Otp != request.Otp ||
            otpInfo.ExpiresAt < DateTime.UtcNow)
            return new BadRequestObjectResult(new { message = "Invalid or expired OTP" });

        // Save the email for the password reset step
        // Here, we can return a token or session ID to use in the next step
        return new OkObjectResult(new { message = "OTP validated successfully", email = request.Email });
    }
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
    {
        // Check if the new password and confirm password match
        if (request.NewPassword != request.ConfirmPassword)
        {
            return new BadRequestObjectResult(new { message = "Passwords do not match" });
        }

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return new BadRequestObjectResult(new { message = "User not found" });

        if (!OtpUtility._otpStore.TryGetValue(request.Email, out var otpInfo) ||
            otpInfo.ExpiresAt < DateTime.UtcNow)
            return new BadRequestObjectResult(new { message = "OTP expired or not validated" });

        // Reset password using the stored token
        var result = await _userManager.ResetPasswordAsync(user, otpInfo.Token, request.NewPassword);
        if (!result.Succeeded)
            return new BadRequestObjectResult(result.Errors);

        // Remove used OTP
        OtpUtility._otpStore.TryRemove(request.Email, out _);

        return new OkObjectResult(new { message = "Password reset successful" });
    }


}
