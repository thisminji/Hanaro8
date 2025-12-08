create database schooldb;

create user school@'%' identified by 'Schooldb1!';

grant all privileges on schooldb.* to school@'%';

use schooldb;

CREATE TABLE Student (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    name VARCHAR(15) NOT NULL,
    birthdt DATE NOT NULL,
    major TINYINT UNSIGNED NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(11) NOT NULL,
    gender BIT NOT NULL DEFAULT 0 COMMENT '성별(0: 남, 1:여)',
    graduatedat VARCHAR(10) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_Student_email (email)
);

show create table Student;
CREATE TABLE `Student` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdt` date NOT NULL,
  `major` tinyint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` bit(1) NOT NULL DEFAULT b'0' COMMENT '성별(0: 남, 1:여)',
  `graduatedat` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_Student_email` (`email`),
  KEY `fk_Student_Major` (`major`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`major`) REFERENCES `Major` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table Major(
  id tinyint unsigned auto_increment primary key,
  name varchar(15) not null,
  unique key uniq_Major_name (name)
);

insert into Major (name) values('철학과'), ('컴퓨터공학과'), ('건축과');

insert into Student(name, birthdt, major, email, mobile)
             values('Hong', '2001-01-03', 5, 'hong@gmail.com', '01012341234');

alter table Student add constraint foreign key fk_Student_Major (major)
    references Major(id);
    
select * from Student where major not in (select id from Major);
select * from schooldb.Major;
update Student set major = 1 where id = 1; -- Hong

show index from Student;

show create table Enroll;

CREATE TABLE `Enroll` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `subject` smallint unsigned NOT NULL,
  `student` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_Enroll_subject_student` (`subject`,`student`),
  KEY `fk_Enroll_Student` (`student`),
  CONSTRAINT `enroll_ibfk_1` FOREIGN KEY (`subject`) REFERENCES `Subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `enroll_ibfk_2` FOREIGN KEY (`student`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci