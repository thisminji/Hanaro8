show tables;

show processlist;
kill 11;

desc DeptBackup;
show index from DeptBackup;
select * from Dept;
create table DeptBackup as select * from Dept;
drop table DeptBackup;

-- truncate table Dept;
-- Error Code: 1701. Cannot truncate a table referenced in a foreign key constraint (`testdb`.`Emp`, CONSTRAINT `emp_ibfk_1`)

create table EmpBackup AS select * from Emp;
-- truncate table Emp;
insert into Emp select * from EmpBackup;
drop table EmpBAckup;
select * from Emp;
select last_insert_id();
select * from T where id = last_insert_id();

select user();

create database schooldb;
create user school@'%' identified by 'Schooldb1!';

grant all privileges on schooldb.* to school@'%';

create table T(
	id tinyint unsigned auto_increment primary key,
    name varchar(30) not null ,
    score enum ('A','B','C','F') default 'F' comment '학점'
);

select * from T;
desc T;

insert into T(name, score) values('Hong','A');
insert into T(name, score) values('Kim','B'), ('Lee','C');
insert into T(name) values ('Park');


select * from T where score = 4;

insert into T(name, score) values('choi','F');

select * from T where score = 5;

alter table T modify column score enum ('A','B','C','D','F') default 'F' comment '학점';

insert into T(name, score) values('Han','D');

select now(), sysdate(), curdate(), curtime(), unix_timestamp();
select now(), current_time(), current_date(), curdate(), current_timestamp();

select year(now()), month(now()), day(now()), now(3), now(5),
       hour(now()), minute(now()), second(now()), microsecond(now(6));

show variables like '%time_zone%';    -- with system_time_zone

set time_zone = 'Asia/Seoul'; 
set global time_zone = 'UTC';    -- root authority

