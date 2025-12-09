
select d.id, d.dname, avg(e.salary) avgsal 
	from Dept d inner join Emp e on d.id=e.dept
    group by d.id
    order by avgsal desc;
    

with  AvgSal AS(
select d.id, max(d.dname),avg(e.salary) avgsal
	from Dept d inner join Emp e on d.id=e.dept
	group by d.id
),
MaxSal AS (select * from AvgSal order by avgsal desc limit 1),
MinSal AS (select * from AvgSal order by avgsal limit 1),
SumUp AS (
	select '최고',avgsal from MaxSal
    UNION ALL
    select '최저',avgsal from MinSal)
select * from MaxSal
UNION ALL
select * from MinSal
UNION ALL 
select 0, '평균 차액',(select avgsal from MaxSal)-(select avgsal from MinSal);

select * from SumUp
UNION
select '','평균 차액', max(avgsal)-min(avgsal) from SumUp;


select d.id, max(d.dname), avg(e.salary) avgsal -- group by에 없는 요소들은 집계함수를 써줘야 함
	from Dept d inner join Emp e on d.id = e.dept
    group by d.id
    order by avgsal limit 1;
    
with AvgSal AS (
	select d.id, max(d.dname) dname, avg(e.salary) avgsal
		from Dept d inner join Emp e on d.id = e.dept
		group by d.id
),
MaxSal AS (select * from AvgSal order by avgsal desc limit 1),
MinSal AS (select * from AvgSal order by avgsal limit 1),
SumUp AS (
	select '최고', dname, avgsal from MaxSal
    union all 
    select '최저', dname, avgsal from MinSal
)

select * from SumUp
union
select '', '평균 차액', max(avgsal) - min(avgsal) from Sumup;

-- 피보나치 0 1 1 2 3 5 8 13 21 34 
--                      1  0   1
with recursive fibonacci (n,prev,next) AS (
	select 1, 0, 1
    UNION ALL
    select n +1, next, prev+next from fibonacci where n < 10
)
select * from fibonacci;

insert into Dept(pid,dname) values(6,'인프라셀'),(6,'DB셀'),(7,'모바일셀');
insert into Dept(pid,dname) values(3,'영업특공대');


select * from Dept;
select p.dname, d.dname
	from Dept p inner join Dept d on p.id=d.pid;
    

show variables like '%cte%';


select * from Dept;
select p.dname, d.dname, concat(p.id,'-',d.id) h
	from Dept p inner join Dept d on p.id = d.pid
    order by h; 


insert into Dept(pid,dname)
values(6,'인프라셀'),(6,'DB셀'),(7,'모바일셀');

insert into Dept(pid, dname)
  values(6, '인프라셀'), (6, 'DB셀'), (7, '모바일셀');
insert into Dept(pid, dname) values(3, '영특');

select * from Dept;
select p.dname, d.dname, concat(p.id, '-', d.id) h
   from Dept p inner join Dept d on p.id=d.pid
    order by h;
    
with recursive CteDept (id, dname, depth, h) AS (
   select id, dname, 0, cast(id as char(20)) from Dept where pid = 0
    UNION ALL
    select d.id, d.dname, cte.depth + 1, concat(cte.h, '-', d.id) 
      from Dept d inner join CteDept cte on d.pid = cte.id
      where pid = cte.id 
)
select concat(repeat('ㄴ', depth), dname) from CteDept order by h;



-- depth 만들기
WITH RECURSIVE DeptTree AS (
    -- 1단계: 루트(최상위 부서, pid = 0)
    SELECT
        id,
        pid,
        dname,
        0 AS dx,                           -- depth
        CAST(id AS CHAR(50)) AS h          -- path: "1", "2" ...
    FROM Dept
    WHERE pid = 0

    UNION ALL

    -- 2단계 이후: 자식들 붙이기
    SELECT
        d.id,
        d.pid,
        d.dname,
        dt.dx + 1 AS dx,                   -- 부모 depth + 1
        CONCAT(dt.h, '-', d.id) AS h       -- path: "1-3", "2-6-8" 이런 식
    FROM Dept d
    JOIN DeptTree dt ON d.pid = dt.id -- self join  pid,id
)

SELECT
    dx,
    dname,
    h -- ,
   --  -- 트리 모양으로 보기 좋게 출력 (선택)
--     CONCAT(
--         REPEAT('   ', dx),                 -- depth만큼 들여쓰기
--         CASE WHEN dx = 0 THEN '' ELSE 'ㄴ ' END,
--         dname
--     ) AS tree_line
FROM DeptTree
ORDER BY h;


-- window function
select row_number() over (order by dept, salary desc) '순번', e.*,
    avg(salary) over  w '급여 평균',
    format(sum(salary) over w,0 ) '급여 누적치'
  from Emp e
 where ename like '박%'
 window w as (partition by dept order by salary desc);
 
 
 select
    row_number() over(order by dept, salary desc) '순번',
    e.*,
    rank() over w '부서내 순위',
    dense_rank() over w '부서내 순위',
    percent_rank() over w '부서내 %순위',
    cume_dist() over w '부서내 %경계',
    ntile(3) over w '급여등급'
  from Emp e
 where ename like '박%'
 WINDOW w as (partition by dept order by dept, salary desc);
 
 
 
 select row_number() over(order by dept, salary desc) '순번',
    e.*,
    sum(salary) over w '급여 누적치',
    first_value(salary) over w '부서내 1등 급여',
    last_value(salary) over w '부서내 현재까지의 꼴등 급여',
    nth_value(salary, 2) over w '부서내 2등 급여',
    lag(salary, 1) over w '이전 급여',
    lead(salary, 1) over w '다음 급여'
  from Emp e
 where ename like '박%'
 WINDOW w as (partition by dept order by dept, salary desc);

-- 오류 발생 
select 
		(case when d.id is not null then max(p.dname) else '총계' end)pname, 
        (case when d.id is not null then max(d.dname) 
			  when p.id is not null then  '-소계-' 
			else '-' end) name, 
        format(sum(e.salary),0)
	from Dept p inner join Dept d on p.id=d.pid  -- 나의 id는 부모의 id로 join
				inner join Emp e on e.dept=d.id
group by p.id, d.id
with rollup;
 
 
 
 select d.id, max(d.dname), avg(e.salary), sum(e.salary)
 from Dept d inner join Emp e on d.id=e.dept
 group by d.id
 order by d.id;
 
 
 select '평균급여' as '구분',
		avg(case when dept = 3 then salary end) as '영업1팀',
		avg(if (dept =4, salary, null)) '영업2팀',
		avg(if (dept =5, salary, null)) '영업3팀' 
	from Emp 
 UNION 
 select '총 급여',
	sum(case when dept = 3 then salary end) as '영업1팀',
		sum(if (dept =4, salary, null)) '영업2팀',
		sum(if (dept =5, salary, null)) '영업3팀' 
	from Emp 
 