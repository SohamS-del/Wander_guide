using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configure services
builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();

var key = Encoding.UTF8.GetBytes("ff57bdcce82b6ea621933f58b09907a379722ad3333c72063eec89afc2023c6297bb72a9aa7196e42af80c0f3dda50319121a8f2937ca99578b316ec3c9ea29b3ee96a33c3bea6b2e6df582d35e03980fcb006617d6a468778d4412f42c861dde7f1cda9edbbb0aa1f4a125b891b48937476d33f72fdac2a5828d36cfa16cbcb4f6ff82f779539ac211d83183c0e78e07cfd6c94629118b92a65ab5552baf24b7101ea1e55ef75bb341aaef67701f9dbefcf7769982f3c8b619675d41af3b57ed7a03b7861580e0bb1ca942333979ce7d29198404358480f82869574a65bb8a3f2e498bba785c7956a2f7af3f5c4251522754b146aaabf867e95caa915af1f14bd4217f217e1b3b0b24f517e0b1288bfc4fb288cb3b6793393c1f7f2a06359e1a1a9a26d74db3968a655271e25fcb71cabef2439f0ea96274ad82b437e356ead");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "Backend_WanderGuide",
        ValidAudience = "Backend_WanderGuide",
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddControllers();
builder.Services.AddAuthorization();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:8081") // Replace with your frontend's URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Auth API",
        Version = "v1",
        Description = "API for Authentication, Authorization, and User Management"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your token in the text input below.\n\nExample: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Middleware
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Enable CORS middleware
app.UseCors("AllowSpecificOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Auth API v1");
        options.RoutePrefix = string.Empty; // Swagger UI will be accessible at root "/"
    });
}

app.MapControllers();
app.Run();
