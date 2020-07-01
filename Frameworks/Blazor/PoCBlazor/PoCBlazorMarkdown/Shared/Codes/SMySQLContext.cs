using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Shared.Codes;
using Shared.Models;

namespace Shared.Codes {
    public class SMySQLContext : DbContext {
        #region Fields
        public DbSet<EUser> Users { get; set; }
        #endregion

        #region OnConfiguring
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.EnableSensitiveDataLogging(true);
            optionsBuilder.UseMySQL(SharedDefines.ConnectionString);
        }
        #endregion

        #region OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            foreach (var entityType in modelBuilder.Model.GetEntityTypes()) {
                foreach (var property in entityType.GetProperties()) {
                    if (property.ClrType == typeof(bool)) {
                        property.SetValueConverter(new BoolToIntConverter());
                    }
                }
            }
        }
        #endregion
    }

    #region BoolToIntConverter - Para contornar bug do mysql entity framework que nao entende tinyint
    public class BoolToIntConverter : ValueConverter<bool, int> {
        public BoolToIntConverter(ConverterMappingHints mappingHints = null) : base(
            v => Convert.ToInt32(v),
            v => Convert.ToBoolean(v),
            mappingHints) {
        }

        public static ValueConverterInfo DefaultInfo { get; }
            = new ValueConverterInfo(typeof(bool), typeof(int), i => new BoolToIntConverter(i.MappingHints));
    }
    #endregion
}