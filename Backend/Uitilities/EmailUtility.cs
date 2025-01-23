using System;
using System.Net;
using System.Net.Mail;

namespace Backend_WanderGuide.Utilities
{
    public static class EmailUtility
    {
        public static void SendEmail(string to, string subject, string body)
        {
            using var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new System.Net.NetworkCredential("shravaniinov@gmail.com", "nnst dvbb pods dkgk"),
                EnableSsl = true
            };

            var mailMessage = new System.Net.Mail.MailMessage
            {
                From = new System.Net.Mail.MailAddress("shravaniinov@gmail.com", "WanderGuide No-Reply"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
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
}