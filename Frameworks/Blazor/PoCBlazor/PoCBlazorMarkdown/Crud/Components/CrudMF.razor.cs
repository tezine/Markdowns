using Microsoft.AspNetCore.Components;
using Shared.Codes;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crud.Components {
    public class CrudMFBase : ComponentBase {

        protected List<EUser> users;

        protected override async Task OnAfterRenderAsync(bool firstRender) {
            if (firstRender) {
                using var context = new SMySQLContext();
                users =  context.Users.ToList();
                StateHasChanged();
            }
        }
    }
}
