#region Imports
using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl.Http;
using Microsoft.AspNetCore.Components;
using Shared.Codes;
using Shared.Models; 
#endregion

namespace Crud.Components {
    
    public class CrudComponentBase: ComponentBase {
        
        protected List<EUser> users;
    
        protected override async Task OnAfterRenderAsync(bool firstRender) {
            if (firstRender) {
                users = await (SharedDefines.BaseURL + "/api/v1/SUsers/GetAll").GetJsonAsync<List<EUser>>();
                StateHasChanged();
            }
        }
    }
}