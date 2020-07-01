#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Flurl.Http;
using Newtonsoft.Json;
using Flurl.Http.Configuration;
using PoCBlazor.Services;
using Shared.Codes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using PoCBlazor.Codes;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
#endregion

namespace PoCBlazor {
    public class Startup {
        #region Fields
        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        #endregion

        #region Constructor
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }
        #endregion

        #region ConfigureServices
        public void ConfigureServices(IServiceCollection services) {
            services.AddCors(options => {
                options.AddPolicy(MyAllowSpecificOrigins,
                    builder => {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            SetupJwt(services);
            services.AddMvcCore(options => {
                options.Filters.Add(typeof(SGlobalExceptionHandler));
                options.EnableEndpointRouting = false;
            }).AddApiExplorer()
                .AddJsonOptions(options => {
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                    //options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });
            services.AddSwaggerDocument(config => {
                //NSwag documentation here: https://docs.microsoft.com/pt-br/aspnet/core/tutorials/getting-started-with-nswag?view=aspnetcore-3.1&tabs=visual-studio
                config.PostProcess = document => {
                    document.Info.Version = "v1";
                    document.Info.Title = "Blazor API";
                    document.Info.Description = "A simple ASP.NET Core web API";
                    document.Info.TermsOfService = "None";
                    document.Info.Contact = new NSwag.OpenApiContact {
                        Name = "Blazor",
                        Email = string.Empty,
                        Url = "https://test.com"
                    };
                    document.Info.License = new NSwag.OpenApiLicense {
                        Name = "Use under Blazor License",
                        Url = "https://example.com/license"
                    };
                };
            });
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = System.IO.Compression.CompressionLevel.Optimal);
            services.AddResponseCompression();
            services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
            SetupApiVersioning(services);
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddHttpClient();
            AddServerSingletons(services);
        }
        #endregion 

        #region Configure
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseCors(MyAllowSpecificOrigins);
            app.UseResponseCompression();
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseOpenApi();
            app.UseSwaggerUi3();
            app.UseRouting();
            app.UseMvcWithDefaultRoute();//adicionado para suportar webapi
            app.UseAuthentication();
            app.UseEndpoints(endpoints => {
                endpoints.MapBlazorHub();
                endpoints.MapFallbackToPage("/_Host");
            });
            SharedDefines.ConnectionString = Configuration["Settings:SampleConnection"];
            SharedDefines.BaseURL = Configuration["Settings:BaseURL"];
            FlurlHttp.Configure(c => {
                c.JsonSerializer = new NewtonsoftJsonSerializer(new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            });
        }
        #endregion 

        #region SetupJwt
        private void SetupJwt(IServiceCollection services) {
            services.AddAuthentication()
                //.AddCookie(cfg => cfg.SlidingExpiration = true)
                .AddJwtBearer(cfg => {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = false;
                    cfg.TokenValidationParameters = new TokenValidationParameters() {
                        ValidIssuer = SDefines.TokenIssuer,
                        ValidAudience = SDefines.TokenAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SDefines.Token))
                    };
                });
        }
        #endregion

        #region SetupApiVersioning
        private void SetupApiVersioning(IServiceCollection services) {
            services.AddApiVersioning(
                o => {
                    o.AssumeDefaultVersionWhenUnspecified = true;
                    o.DefaultApiVersion = new ApiVersion(1, 0);
                });
        }
        #endregion

        #region AddServerSingletons
        private void AddServerSingletons(IServiceCollection services) {            
            services.AddSingleton<SUsersService>();
        }
        #endregion
    }
}
