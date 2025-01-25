using System.Security.Cryptography;
using System.Collections.Concurrent;
using Backend_WanderGuide.Models;

namespace Backend_WanderGuide.Uitilities
{
    public static class OtpUtility
    {
        public static readonly ConcurrentDictionary<string, OtpInfo> _otpStore = new ConcurrentDictionary<string, OtpInfo>();
        public static string GenerateOTP()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] randomNumber = new byte[4];
                rng.GetBytes(randomNumber);

                int otpNumber = Math.Abs(BitConverter.ToInt32(randomNumber, 0) % 1000000);
                return otpNumber.ToString("D6");
            }
        }

        public static bool ValidateOTP(string email, string providedOtp, string providedToken)
        {
            if (!_otpStore.ContainsKey(email))
                return false;

            var otpInfo = _otpStore[email];
            return otpInfo.Otp == providedOtp &&
                   otpInfo.Token == providedToken &&
                   otpInfo.ExpiresAt > DateTime.UtcNow;
        }
    }
}
