using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceApp.Data
{
    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // Navigation property to represent the reverse relationship with Class
        public ICollection<Course> Courses { get; set; }
    }
}
