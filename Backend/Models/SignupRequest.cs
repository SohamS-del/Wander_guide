﻿using System.ComponentModel.DataAnnotations;

namespace Backend_WanderGuide.Models
{
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
}
