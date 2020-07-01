using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace Shared.Codes {
    public class SLogger {
        static public void LogError(string msg) {
            Console.WriteLine(msg);
            Debug.WriteLine(msg);
        }

        static public void LogDebug(string msg) {
            Console.WriteLine(msg);
            Debug.WriteLine(msg);
        }

        static public void LogError(Exception ex) {
            Console.WriteLine(ex);
            Debug.WriteLine(ex);
        }
    }
}
