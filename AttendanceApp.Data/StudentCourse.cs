using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceApp.Data
{
    public class StudentCourse
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }
    }
}
