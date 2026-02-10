package com.hana8.hello.trythis;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class Time {
	public static void main(String[] args) {
		LocalDateTime birthday = LocalDateTime.of(2003, 9, 22, 11, 28, 0);
		LocalDateTime now = LocalDateTime.now();

		java.time.Duration dDate = java.time.Duration.between(birthday, now);
		// [1] 정밀 나이 (년 월 일 시 분 초)
		Period p = Period.between(birthday.toLocalDate(), now.toLocalDate());
		System.out.printf("1. 내 정밀 나이: %d년 %d개월 %d일 %d시간 %d분 %d초%n",
			p.getYears(), p.getMonths(), p.getDays(),
			now.getHour(), now.getMinute(), now.getSecond());

		System.out.println("총 일 수 = " + dDate.toDays() + "일");
		System.out.println("총 시간 수 = " + dDate.toHours() + "시간");

		// [2] 다음 생일까지 남은 일 수
		LocalDate nextBirth = birthday.toLocalDate().withYear(now.getYear());
		if (nextBirth.isBefore(now.toLocalDate()) || nextBirth.isEqual(now.toLocalDate())) {
			nextBirth = nextBirth.plusYears(1);
		}
		long daysUntilBirth = ChronoUnit.DAYS.between(now.toLocalDate(), nextBirth);
		System.out.println("2. 다음 생일까지 남은 일 수: " + daysUntilBirth + "일");

		// [3] 이탈리아 밀라노 시간
		ZonedDateTime milanoTime = ZonedDateTime.now(ZoneId.of("Europe/Rome"));
		DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		System.out.println("3. 현재 밀라노 시간: " + milanoTime.format(fmt));

		// [4] 프로젝트 근무 시간 계산 (8시간 근무 기준)
		// 3월 23일 ~ 4월 24일 (주말 제외 영업일 계산 필요)
		LocalDate start = LocalDate.of(2026, 3, 23);
		LocalDate end = LocalDate.of(2026, 4, 20);

		long totalWorkHours = 0;
		LocalDate current = start;

		while (!current.isAfter(end)) {
			DayOfWeek dow = current.getDayOfWeek();
			boolean isWeekend = (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY);
			boolean isHoliday = current.equals(LocalDate.of(2026, 3, 25));

			if (!isWeekend && !isHoliday) {
				if (!current.isBefore(LocalDate.of(2026, 4, 13)) && !current.isAfter(LocalDate.of(2026, 4, 17))) {
					totalWorkHours += 9;
				} else if (current.equals(LocalDate.of(2026, 4, 20))) {
					totalWorkHours += 7;
				} else {
					totalWorkHours += 8;
				}
			}
			current = current.plusDays(1);
		}
		System.out.println("4. 총 일할 수 있는 시간(Hours): " + totalWorkHours + "시간");
	}
}
