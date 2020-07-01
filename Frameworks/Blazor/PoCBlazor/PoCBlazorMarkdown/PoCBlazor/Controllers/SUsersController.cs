using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Shared.Models;
using PoCBlazor.Services;

namespace PoCBlazor.Controllers {
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [AllowAnonymous]
    public class SUsersController : ControllerBase {
        #region Fields
        private readonly SUsersService usersService;
        #endregion

        #region Constructor
        public SUsersController(SUsersService service) {
            usersService = service;
        }
        #endregion

        #region GetAll
        [HttpGet("GetAll")]
        public IActionResult GetAll(int listCount = -1, int pageNumber = 0) {
            return Ok(usersService.GetAll(listCount, pageNumber));
        }
        #endregion

        #region GetByID
        [DisableCors]
        [HttpGet("GetByID/{id}")]
        public IActionResult GetByID(Int64 id) {
            var bill = usersService.GetByID(id);
            return Ok(bill);
        }
        #endregion

        #region Authenticate
        [HttpPost("Authenticate")]
        [AllowAnonymous]
        public ActionResult<EUser> Authenticate([FromBody] EUser eUser) {
            var e = usersService.Authenticate2(eUser);
            return Ok(e);
        }
        #endregion

        #region Save
        [HttpPut("Save")]
        [ProducesResponseType(StatusCodes.Status201Created)]     // Created
        [ProducesResponseType(StatusCodes.Status400BadRequest)]  // BadRequest
        public async Task<IActionResult> Save([FromBody] EUser eClient) {
            var result = await usersService.SaveAsync(eClient);
            return Ok(result);
        }
        #endregion

        #region Remove
        [HttpDelete("Remove/{id}")]
        public async Task<IActionResult> Remove(Int64 id) {
            var result = await usersService.RemoveAsync(id);
            return Ok(result);
        }
        #endregion
    }
}
