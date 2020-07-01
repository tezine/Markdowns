using Flurl.Http;
using Shared.Codes;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoCBlazor.Services {
    public class SUsersService {

        #region Constructor
        public SUsersService() {
        }
        #endregion

        #region GetByID
        public EUser GetByID(Int64 id) {
            using var context = new SMySQLContext();
            var e = context.Users.SingleOrDefault(x => x.Id == id);
            return e;
        }
        #endregion

        #region Authenticate
        public async Task<bool> Authenticate(string email, string password) {
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(password)) return false;
            var result = await ("http://dummy.restapiexample.com/api/v1/employees").GetJsonAsync();
            return true;
        }
        #endregion

        #region GetAll
        public List<EUser> GetAll(int listCount = -1, int pageNumber = 0) {
            List<EUser> list = null;
            using var context = new SMySQLContext();
            if (listCount == -1) list = context.Users.ToList();
            else list = context.Users.Skip(pageNumber * listCount).Take(listCount).ToList();
            return list;
        }
        #endregion


        #region Authenticate2
        public EUser Authenticate2(EUser e) {
            using var context = new SMySQLContext();
            var eUser = context.Users.FirstOrDefault(x => x.Email == e.Email && x.Password == e.Password);
            return eUser;
        }
        #endregion


        #region SaveAsync
        public async Task<Int64> SaveAsync(EUser eUser) {
            eUser.ModificationDateUTC = DateTime.UtcNow;
            await using var context = new SMySQLContext();
            if (eUser.Id < 1) {
                eUser.CreationDateUTC = eUser.ModificationDateUTC = DateTime.UtcNow;
                var e = await context.Users.AddAsync(eUser);
                await context.SaveChangesAsync();
                return e.Entity.Id;
            } else {
                var e = context.Users.Update(eUser);
                await context.SaveChangesAsync();
                return e.Entity.Id;
            }
        }
        #endregion

        #region RemoveAsync
        public async Task<bool> RemoveAsync(Int64 id) {
            await using var context = new SMySQLContext();
            var e = context.Users.SingleOrDefault(x => x.Id == id);
            if (e == null) return false;
            context.Remove(e);
            await context.SaveChangesAsync();
            return true;
        }
        #endregion
    }
}
