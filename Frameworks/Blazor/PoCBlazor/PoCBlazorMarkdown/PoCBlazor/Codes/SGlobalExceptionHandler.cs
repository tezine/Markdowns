using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Shared.Codes;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace PoCBlazor.Codes {
    public class SGlobalExceptionHandler : IExceptionFilter {

        #region OnException
        public void OnException(ExceptionContext context) {
            try {
                HttpStatusCode status = HttpStatusCode.InternalServerError;
                String message = String.Empty;

                var exceptionType = context.Exception.GetType();
                if (exceptionType == typeof(UnauthorizedAccessException)) {
                    message = "Unauthorized Access";
                    status = HttpStatusCode.Unauthorized;
                } else if (exceptionType == typeof(NotImplementedException)) {
                    message = "A server error occurred.";
                    status = HttpStatusCode.NotImplemented;
                } else {
                    message = context.Exception.Message;
                    status = HttpStatusCode.NotFound;
                }
                HttpResponse response = context.HttpContext.Response;
                response.StatusCode = (int)status;
                response.ContentType = "application/json";
                var err = message + " " + context.Exception.StackTrace;
                SLogger.LogError(err);
                //todo recolocar EResponse eResponse = new EResponse();
                //response.WriteAsync(JsonConvert.SerializeObject(eResponse.SetErrorResponse((int)ErrorCode.ServerException)));
                response.WriteAsync("erro interno");
                context.ExceptionHandled = true; // mark exception as handled
            } catch (Exception e) {
                Debug.WriteLine(e.StackTrace);
            }
        }
        #endregion
    }
}
