using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using Backend_WanderGuide.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using SmtpClient = System.Net.Mail.SmtpClient;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Backend_WanderGuide.Uitilities;
using Backend_WanderGuide.Utilities;



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
        if (!AuthUtilities.IsValidEmail(request.Email))
            return BadRequest(new { message = "Invalid email format" });

        if (!AuthUtilities.CheckEmailExists(request.Email))
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

        var token = AuthUtilities.GenerateJwtToken(user);
        return Ok(new { message = "Login Successful" });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return BadRequest(new { message = "User not found" });

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

        return Ok(new { message = "OTP sent to email" });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return BadRequest(new { message = "User not found" });

        if (!OtpUtility._otpStore.TryGetValue(request.Email, out var otpInfo) ||
        otpInfo.Otp != request.Otp ||
        otpInfo.ExpiresAt < DateTime.UtcNow)
            return BadRequest(new { message = "Invalid or expired OTP" });

        // Reset password using the stored token
        var result = await _userManager.ResetPasswordAsync(user, otpInfo.Token, request.NewPassword);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        // Remove used OTP
        OtpUtility._otpStore.TryRemove(request.Email, out _);


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

    




}