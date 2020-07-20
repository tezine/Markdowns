#region Imports
using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options; 
#endregion

namespace POCSelenium {
    class Program {


        static void Main(string[] args) {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile($"appsettings.json");
            var configuration = builder.Build();
            Console.WriteLine("Loading Chrome with RPA...");

            var seleniumConfigurations = new SeleniumConfig();
            new ConfigureFromConfigurationOptions<SeleniumConfig>(configuration.GetSection("SeleniumConfigurations")).Configure(seleniumConfigurations);

            var pageLogin = new PageLogin(seleniumConfigurations);
            pageLogin.LoadPage();
            var ok =pageLogin.DoLogin();
        }
    }
}