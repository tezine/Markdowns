using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoCBlazor.Entities {
    public class ESkill {
        public Int64 id { get; set; }
        public Int64 userId { get; set; }
        public string name { get; set; }
        public int level { get; set; }
    }
}
