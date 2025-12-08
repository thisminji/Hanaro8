select conv('FF',16,10), conv('10110',2,10);

select CAST('2025-12-25 11:22:22.123' AS DATETIME);   -- cf. char, datetime
select CAST( 1.467 AS Signed Integer ), CONVERT(1.567, Signed Integer);
select str_to_date('2025/12/03', '%Y/%d/%m');  -- ←→ date_format  -- %ymdHis
select date_format(now(),'%m/%d %h:%i:%s');

select dname, HEX(AES_ENCRYPT(dname, '암호키')),
			 cast(AES_DECRYPT(UNHEX(HEX(AES_ENCRYPT(dname, '암호키'))),'암호키') as char)
from Dept; -- AES_DECRYPT
-- CAST(AES_DECRYPT(UNHEX(sub.enc), '암호키') as char)
select sha2('data', 256), sha2('data', 512); -- 단방향암호화(64, 128 length)
-- cf. Postgresql: encode(digest('data', 'sha512'), 'hex'), cf. password()
select password('abcde');

-- concat은 null 이 없을 때만 사용이 가능
-- concat, concat_ws, group_concat
select concat('A', ',', ifnull(null,''), 'B'), concat_ws(',', 'A', null, 'B')

-- ex. concat('A', ',', null, 'B'), concat_ws(',', 'A', null, 'B')
-- select concat(e.ename, ',', d.dname), concat_ws(',', e.ename, d.dname) from Emp e right outer join Dept d on e.id = d.captain;

-- 오류발생
select CAST(char(65,66) as char);
select length('AB한글'), char_length('AB한글'), bit_length('A'), sign(-2);

select elt(2, 'str1', 'str2', 'str3'), field('s1', 's0', 's1'); -- 'str2', 2
-- 오류발생

select ELT(FIELD(didAgree, 'Y', 'N'), 'Active', 'Inactive');
select ELT(2,'Active','Inactive');

select find_in_set('s3', 's1,s2,s3,s4'); -- 3

select dept, min(ename), group_concat(ename) from Emp group by dept;
select dept, find_in_set(min(ename), group_concat(ename order by ename))from Emp group by dept;

select instr('str', 't'), locate('s1', 's0s1s2'); -- cf. indexOf
select insert('12345', 3, 2, '/'); -- 12/5 -- (문자열, 위치, 제거수, 추가문자) splice(2, 2, '/')
select format(123456789,0), format(78901.012356, 4), truncate(789.012356, 4);

select left('abc', 2), right('abc',2), lpad('5', 2, '0'), rpad('15', 3, '0');

select reverse('abc'), repeat('x', 9), space(n), replace('abcdefg', 'cde', 'xxx');
select trim(leading,'s' from 'ssstrss'),ltrim('sstrss');

select substring('str', 2, 3); -- select substring('Bearer accessTokenasdafdsafdsff', 7);
select substring_index('a,b,c', ',', 2);  -- a,b (,를 기준으로 두번째까지)
select substring_index('a,b,c', ',', -1); -- c  (-1은 ,로 잘라낸 마지막 값)
select substring_index(substring_index('a,b,c', ',', 2), ',', -1); -- ← arr[1]

select now(), sysdate(), curdate(), current_date(), curtime(), current_time();
select year(now()), month(now()), day(now()), month('2025-11-29'),
	   hour(now()), minute(now()), second(now()), quarter(now()), week(now());
       
select weekday('2025-12-25');   -- 월요일 0 ~ 6(일요일)
select dayofweek('2025-12-25'); -- 일요일 1 ~ 7(토요일)
select DATE(now()), TIME(now()), MAKEDATE(2020, 336), MAKETIME(19,3,50);
select dayofyear(now()), monthname(now()), last_day(now()); -- weekOfyear

select datediff('2025-12-01', '2025-03-11'), timediff('12:20:33', '11:30:20');

select adddate(now(), interval 31 day), subdate(now(), interval 31 day);
select date_add(now(), interval -31 day), adddate(now(), interval -1 month);

select '12' regexp '[a-z29]'; -- test(match)되면 1
SELECT REGEXP_INSTR('dog cat dog', 'dog', 2); -- 2번째 dog의 인덱스 번
SELECT REGEXP_INSTR('aa aaa aaaa', 'a{4}');
SELECT REGEXP_LIKE('abc', 'ABC', 'c'); -- c: case sensitive
SELECT REGEXP_REPLACE('abc def ghi', '[a-z]+', 'X', 2, 2);
-- * 0개 이상 +한개이상 ? 0개 또는 1
-- 2번째 char(b) 부터 2번째 그룹을 X로 변경!


select regexp_replace('abcdefg', '[bdf]', 'X'), 
       regexp_replace('abcdefg', '[f-z]', 'X');
       
select elt(field(0,0,1)'남','여');
select id, name, birthdt, gender from Student order by rand();


--  1. case when문 사용
SELECT  id,
        name,
        birthdt,
        CASE gender
            WHEN 0 THEN '남'
            WHEN 1 THEN '여'
            ELSE '알수없음'
        END AS gender_kor
FROM Student;

-- 2. ELT 함수 사용
SELECT  id,
        name,
        birthdt,
        ELT(FIELD(gender, 0, 1), '남', '여') AS gender_kor
FROM Student;
-- const rand = (s,e) => s + Math.floor((e-s+1)*Math.random())
select rand();
select 1 + floor(3*rand());

select id, name,birthdt,gender,
(case gender when 0 then '남' else '여' end),
elt(field(gender,0,1),'남','여'),
elt(gender+1,'남','여') 
from student
order by elt(1 + floor(3*rand()),id,name,birthdt);




-- 3. id/name/birthdt 중에서 랜덤 선택 정렬
-- 1,2,3 중 하나를 랜덤 선택
SET @order_key := FLOOR(1 + RAND() * 3);

SELECT  id,
        name,
        birthdt,
        gender
FROM Student
ORDER BY
    CASE @order_key
        WHEN 1 THEN id
        WHEN 2 THEN name
        WHEN 3 THEN birthdt
    END;
    
    SELECT SUBSTRING_INDEX(
         SUBSTRING_INDEX('https://www.topician.com/lms/lectures', '://', -1),
         '/',
         1
       ) AS domain;
    select name from Student;
    
    SELECT  name,
        CONCAT(SUBSTRING(name, 1, 1), '*', SUBSTRING(name, 3)) AS masked_name
FROM Student;

select name, regexp_replace(name,'-','*',2,1) from Student;

SELECT REGEXP_REPLACE('010.2323 4545', '[^0-9]', '') AS only_digits;
-- 결과: 01023234545

select regexp_replace('010-2323-4545','[^0-9]','');
select regexp_replace('010.2323.4545','[^0-9]','');

select @@autocommit;
show variables like '%commit%';
select @@autocommit;

start transaction;
update Student set birthdt='20250909';

rollback;

update Student set birthdt='20050909' where id = 5;

commit;

create table StudentBackup as select * from Student;
-- altering ...

select * from Student;


