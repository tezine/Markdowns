using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shared.Models {
    [Table("users")]
    public class EUser {
        //[Required]
        public Int64 Id { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Address { get; set; }
        public String Password { get; set; }
        public DateTime ModificationDateUTC { get; set; }
        public DateTime CreationDateUTC { get; set; }
    }
}