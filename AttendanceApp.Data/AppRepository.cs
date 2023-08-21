using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceApp.Data
{
    public class AppRepository
    {
        private string _connectionString;

        public AppRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Course> GetCourses()
        {
            using var context = new AppContext(_connectionString);
            //var classes = context.Classes
            //    .Include(c => c.Teacher) // Include the related Teacher entity
            //    .Select(c => new Class
            //    {
            //        Id = c.Id,
            //        Name = c.Name,
            //        TeacherName = c.Teacher.Name // Assuming you have a TeacherName property in Class to store the teacher's name
            //    })
            //    .ToList();

            //return classes;
            return context.Courses.ToList();
        }
        public List<Teacher> GetTeachers()
        {
            using var context = new AppContext(_connectionString);
            return context.Teachers.ToList();
        }
        public List<Class> GetClasses()
        {
            using var context = new AppContext(_connectionString);
            return context.Classes.ToList();
        }
        public List<Student> GetAllStudents()
        {
            using var context = new AppContext(_connectionString);
            var students = context.Students.ToList();
            foreach (var student in students)
            {
                if (student.ClassId != 0)
                {
                    context.Entry(student).Reference(s => s.Class).Load();
                }
            }
            return students;
        }
        public List<Student> GetByGrade(int grade)
        {
            using var context = new AppContext(_connectionString);
            var students = context.Students.Where(s => s.Grade == grade).ToList();
            foreach (var student in students)
            {
                if (student.ClassId != 0)
                {
                    context.Entry(student).Reference(s => s.Class).Load();
                }
            }
            return students;
        }
        public List<Student> GetByClass(int classId)
        {
            using var context = new AppContext(_connectionString);
            return context.Students.Where(s => s.ClassId == classId).ToList();
        }
        public void AddTeacher(string name)
        {
            using var context = new AppContext(_connectionString);
            context.Teachers.Add(new Teacher
            {
                Name = name
            });
            context.SaveChanges();
        }
        public void AddStudent(string name, int grade)
        {
            using var context = new AppContext(_connectionString);
            context.Students.Add(new Student
            {
                Name = name,
                Grade = grade
            });
            context.SaveChanges();
        }
        public int CreateCourse(string subject, int grade, int classId, int teacherId)
        {
            using var context = new AppContext(_connectionString);
            Teacher teacher = context.Teachers.Where(t => t.Id == teacherId).FirstOrDefault();
            var newCourse = new Course
            {
                Subject = subject,
                Grade = grade,
                ClassId = classId,
                TeacherId = teacher.Id,
                Teacher = teacher
            };
            context.Courses.Add(newCourse);
            context.SaveChanges();
            return newCourse.Id;
        }
        public void AddSession(int courseId, string dayOfWeek, TimeSpan startTime, TimeSpan endTime)
        {
            using var context = new AppContext(_connectionString);
            var newCourseSession = new CourseSession
            {
                CourseId = courseId,
                DayOfWeek = dayOfWeek,
                StartTime = startTime,
                EndTime = endTime
            };
            context.CourseSessions.Add(newCourseSession);
            context.SaveChanges();
        }
        public void CreateClass(string className)
        {
            using var context = new AppContext(_connectionString);
            var newClass = new Class
            {
                ClassName = className
            };
            context.Classes.Add(newClass);
            context.SaveChanges();
        }
        public void CreateClassSplit(int classId, List<int> studentIds)
        {
            using var context = new AppContext(_connectionString);
            foreach (int i in studentIds)
            {
                context.Database.ExecuteSqlInterpolated($"UPDATE Students SET ClassId = {classId} WHERE Id = {i}");
            }
        }

        public void AddStudents(int grade, List<string> names)
        {
            using var context = new AppContext(_connectionString);
            foreach (string i in names)
            {
                context.Database.ExecuteSqlInterpolated($"INSERT INTO Students VALUES ({i}, {grade}, {0})");
            }
        }
        public void AddToCourse(int courseId, List<int> studentIds)
        {
            using var context = new AppContext(_connectionString);
            foreach (int i in studentIds)
            {
                var newStudentCourse = new StudentCourse
                {
                    StudentId = i,
                    CourseId = courseId
                };
                context.StudentsCourses.Add(newStudentCourse);
            }
            context.SaveChanges();
        }
        public CourseInfo GetCourseInfo(int teacherId)
        {
            using var context = new AppContext(_connectionString);
            var time = DateTime.Now.ToString();
            //var time = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 15, 0, 0); // 3:00 PM
            //var today = DateTime.Now.DayOfWeek.ToString();
            var today = "Monday";

            var courseInfo = context.CourseInfos.FromSqlInterpolated($@"
                SELECT t.Name as 'TeacherName', c.Subject, c.Grade, cs.CourseId,  
                CONVERT(time, cs.StartTime) AS 'StartTime', CONVERT(time, cs.EndTime) AS 'EndTime'
                FROM Teachers t
                JOIN Courses c ON t.Id = c.TeacherId
                JOIN CourseSessions cs ON c.Id = cs.CourseId
                WHERE t.Id = {teacherId} AND cs.DayOfWeek = {today} AND
                CAST({time} AS time) BETWEEN cs.StartTime AND cs.EndTime")
                .ToList().FirstOrDefault();

            return courseInfo;
        }

        public List<Student> GetStudentsByCourse(int courseId)
        {
            using var context = new AppContext(_connectionString);
            var studentIds = context.StudentsCourses.Where(sc => sc.CourseId == courseId).Select(sc => sc.StudentId).ToList();
            return context.Students.Where(s => studentIds.Contains(s.Id)).ToList();
        }
        public void EnterAttendance(List<AttendanceRecord> attendanceRecords)
        {
            using var context = new AppContext(_connectionString);
            foreach (AttendanceRecord record in attendanceRecords)
            {
                context.AttendanceRecords.Add(record);
            }
            context.SaveChanges();
        }
        public Student GetStudentById(int studentId)
        {
            using var context = new AppContext(_connectionString);
            return context.Students.Where(s => s.Id == studentId).FirstOrDefault();
        }
        public List<CourseInfo> GetCoursesForStudent(int studentId)
        {
            using var context = new AppContext(_connectionString);
            //var today = DateTime.Now.DayOfWeek.ToString();
            var today = "Monday";
            var courses = context.CourseInfos.FromSqlInterpolated($@"
                SELECT t.Name as 'TeacherName', c.Subject, c.Grade, cs.CourseId, s.Name,  
                CONVERT(time, cs.StartTime) AS 'StartTime', CONVERT(time, cs.EndTime) AS 'EndTime'
                FROM Teachers t
                JOIN Courses c ON t.Id = c.TeacherId
                JOIN CourseSessions cs ON c.Id = cs.CourseId
                JOIN StudentsCourses sc ON cs.CourseId = sc.CourseId
                JOIN Students s ON sc.StudentId = s.Id
                WHERE s.Id = {studentId} AND cs.DayOfWeek = {today}")
                .ToList();
            return courses;
        }

    }
}
