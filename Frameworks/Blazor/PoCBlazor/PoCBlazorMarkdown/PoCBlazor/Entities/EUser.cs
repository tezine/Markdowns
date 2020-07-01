using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoCBlazor.Entities {
    public class EUser {
        public Int64 id { get; set; }
        public Int64 pocId{get;set;}
        public string name { get; set; }
        public string avatarUrl { get; set; }
    }
}
