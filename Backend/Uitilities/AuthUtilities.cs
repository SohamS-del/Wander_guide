using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace Backend_WanderGuide.Utilities
{
    public static class AuthUtilities
    {
        public static string GenerateJwtToken(IdentityUser user)
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

        public static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public static bool CheckEmailExists(string email)
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
    }
}
