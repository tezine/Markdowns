using PoCBlazor.Pages;
using PoCBlazor.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Bunit;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Components;
using Bunit.Extensions.WaitForHelpers;

namespace PoCBlazorTest {
    public class LoginTest : TestContext {

        SUsersService usersService = new SUsersService();
        IRenderedComponent<Login> component;
        Login instance;

        public LoginTest() {            
            Services.AddSingleton(usersService);
            Services.AddScoped(typeof(NavigationManager), typeof(MockNavigationManager));
            component = RenderComponent<Login>();
            instance = component.Instance;
        }

        [Fact]
        public async Task TestWithInvalidCredentials() {
            instance.email = instance.password = null;
            var result = await instance.AuthenticateUser();
            Assert.False(result);            
            component.WaitForState(() => component.Find("#loginButton") !=null, TimeSpan.FromSeconds(10));//todo remover
        }

        [Fact]
        public async Task TestWithValidCredentials() {
            instance.email = "bruno@tezine.com";
            instance.password = "tata";
            var result = await instance.AuthenticateUser();
            Assert.True(result);
        }
    }
}
