using Core.Products;
using Data.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
const string allowedOriginsPolicy = "allowedOriginsPolicy";
var allowedOrigins = builder.Configuration["AllowedOrigins"]?.Split(',') ?? Array.Empty<string>();

builder.Services.AddCors(opts => {
    opts.AddPolicy(allowedOriginsPolicy, policy => policy.WithOrigins(allowedOrigins));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IProductService, ProductService>();

builder.Services.AddDbContext<IProductRepository, ProductRepository>(
    opts => opts.UseSqlServer(builder.Configuration.GetConnectionString("Drinks4udb"))
);

var app = builder.Build();

app.UseCors(allowedOriginsPolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
