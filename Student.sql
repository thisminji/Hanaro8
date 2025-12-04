use schooldb;
-- 학생
CREATE TABLE Student (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  createdate  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedate  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
                          ON UPDATE CURRENT_TIMESTAMP,
  name        VARCHAR(15)  NOT NULL,
  birthdt     DATE         NOT NULL,
  major       TINYINT UNSIGNED NOT NULL,
  email       VARCHAR(255) NOT NULL,
  mobile      VARCHAR(11)  NOT NULL, 
  gender      BIT          NOT NULL DEFAULT b'0' COMMENT '성별(0: 남, 1: 여)',
  graduatedat VARCHAR(10)  NULL,
  
  PRIMARY KEY (id),
  UNIQUE KEY unique_Student_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



show create table Student;

insert into Student(name,birthdt,major,email,mobile)
			values('Hong','2001-01-03',5);


create table Major(
	id tinyint unsigned auto_increment primary key,
    name varchar(15) not null,
    unique key uniq_Major_name (name)
);

insert  into Major (name) values ('철학과'),('컴퓨터공학과'),('건축과');

