using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceApp.Data
{
    [NotMapped]
    public class CourseInfo
    {
        public string TeacherName { get; set; }
        public string Subject { get; set; }
        public int Grade { get; set; }
        public int CourseId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
