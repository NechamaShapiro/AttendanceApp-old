using AttendanceApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography.X509Certificates;

namespace AttendanceApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppController : ControllerBase
    {
        private readonly string _connectionString;

        public AppController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getcourses")]
        public List<Course> GetCourses()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetCourses();
        }

        [HttpGet]
        [Route("getteachers")]
        public List<Teacher> GetTeachers()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetTeachers();
        }
        [HttpGet]
        [Route("getclasses")]
        public List<Class> GetClasses()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetClasses();
        }

        [HttpGet]
        [Route("getallstudents")]
        public List<Student> GetAllStudents()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetAllStudents();
        }

        [HttpGet]
        [Route("getbygrade")]
        public List<Student> GetByGrade(int grade)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetByGrade(grade);
        }

        [HttpGet]
        [Route("getbyclass")]
        public List<Student> GetByClass(int classId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetByClass(classId);
        }

        [HttpPost]
        [Route("addteacher")]
        public void AddTeacher(string name)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddTeacher(name);
        }
        [HttpPost]
        [Route("addstudent")]
        public void AddStudent(string name, int grade)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddStudent(name, grade);
        }

        [HttpPost]
        [Route("createcourse")]
        public int CreateCourse(string subject, int grade, int classId, int teacherId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.CreateCourse(subject, grade, classId, teacherId);
        }

        [HttpPost]
        [Route("addsession")]
        //public void AddSession(int courseId, string dayOfWeek, TimeSpan startTime, TimeSpan endTime)
        //{
        //    var repo = new AppRepository(_connectionString);
        //    repo.AddSession(courseId, dayOfWeek, startTime, endTime);
        //}
        public void AddSession(int courseId, [FromBody] List<CourseSession> newSessions)
        {
            var repo = new AppRepository(_connectionString);
            foreach (var session in newSessions)
            {
                repo.AddSession(courseId, session.DayOfWeek, session.StartTime, session.EndTime);
            }
        }

        [HttpPost]
        [Route("createclass")]
        public void CreateClass(string className)
        {
            var repo = new AppRepository(_connectionString);
            repo.CreateClass(className);
        }

        [HttpPost]
        [Route("createclasssplit")]
        public void CreateClassSplit([FromForm] int classId, [FromForm] List<int> studentIds)
        {
            var repo = new AppRepository(_connectionString);
            repo.CreateClassSplit(classId, studentIds);
        }

        [HttpPost]
        [Route("addstudents")]
        public void AddStudents([FromForm] int grade, [FromForm] List<string> names)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddStudents(grade, names);
        }

        [HttpPost]
        [Route("addtocourse")]
        public void AddToCourse([FromForm] int courseId, [FromForm] List<int> studentIds)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddToCourse(courseId, studentIds);
        }

        [HttpGet]
        [Route("getcourseinfo")]
        public CourseInfo GetCourseInfo(int teacherId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetCourseInfo(teacherId);
        }

        [HttpGet]
        [Route("getstudentsbycourse")]
        public List<Student> GetStudentsByCourse(int courseId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetStudentsByCourse(courseId);
        }

        [HttpPost]
        [Route("enterattendance")]
        public void EnterAttendance([FromBody] List<AttendanceRecord> attendanceRecords)
        {
            var repo = new AppRepository(_connectionString);
            repo.EnterAttendance(attendanceRecords);
        }

        [HttpGet]
        [Route("getstudentbyid")]
        public Student GetStudentById(int studentId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetStudentById(studentId);
        }

        [HttpGet]
        [Route("getcoursesforstudent")]
        public List<CourseInfo> GetCoursesForStudent(int studentId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetCoursesForStudent(studentId);
        }
    }
}
