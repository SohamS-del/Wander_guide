using Backend_WanderGuide.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

public interface IAuthService
{
    Task<IActionResult> Signup(SignupRequest request);
    Task<IActionResult> Login(LoginRequest request);
    Task<IActionResult> ForgotPassword(ForgotPasswordRequest request);
    Task<IActionResult> ResetPassword(ResetPasswordRequest request);
    Task<IActionResult> ValidateOtpRequest(ValidateOtpRequest request);

}
