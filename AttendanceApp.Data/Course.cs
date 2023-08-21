using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceApp.Data
{
    public class Course
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public int ClassId { get; set; }
        public int Grade { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
    }
}
