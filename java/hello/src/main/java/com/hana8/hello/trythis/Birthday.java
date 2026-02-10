package com.hana8.hello.trythis;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class Birthday {
	// [공휴일 설정] List.of를 사용하여 변경 불가능한(Immutable) 휴일 리스트 생성
	static final List<LocalDate> holidays = List.of(LocalDate.of(2026, 3, 25));

	public static void main(String[] args) {
		// 현재 시각 및 생일 설정
		LocalDateTime now = LocalDateTime.now();
		LocalDate nowld = now.toLocalDate();
		LocalDateTime birthdt = LocalDateTime.of(2025, 1, 5, 8, 30);
		LocalDate birthday = birthdt.toLocalDate();

		// [1] 정밀 나이 계산
		// Period: 년, 월, 일 단위의 차이 계산
		Period period = Period.between(birthday, nowld);
		int y = period.getYears();
		int m = period.getMonths();
		int d = period.getDays();

		// Duration: 시, 분, 초 단위의 정밀한 시간 차이 계산
		Duration dur = Duration.between(birthdt, now);
		long h = dur.toHours() % 24;      // 전체 시간에서 '일' 단위를 제외한 남은 시간
		long mm = dur.toMinutes() % 60;   // 전체 분에서 '시간' 단위를 제외한 남은 분
		long s = dur.toSeconds() % 60;    // 전체 초에서 '분' 단위를 제외한 남은 초

		System.out.printf("1. 태어난지 %d년 %d개월 %d일 %d시간 %d분 %d초 지났습니다!%n", y, m, d, h, mm, s);

		// [2] 다음 생일까지 남은 일수 계산
		// 올해 생일을 구하고, 이미 지났다면 내년 생일로 설정
		LocalDate nextBirth = birthday.plusYears(nowld.getYear() - birthday.getYear());
		if (nextBirth.isBefore(nowld)) {
			nextBirth = nextBirth.plusYears(1);
		}

		// ChronoUnit.DAYS를 사용하여 두 날짜 사이의 순수 '일(Day)' 차이 합산
		System.out.println("2. 다음 생일까지 남은 일: " + ChronoUnit.DAYS.between(nowld, nextBirth));

		// [3] 이탈리아 밀라노 시간 (유럽/로마 타임존)
		System.out.println("3. 지금 밀라노 시간: " + ZonedDateTime.now(ZoneId.of("Europe/Rome"))
			.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

		// [4] 프로젝트 근무 시간 계산 (164H 타겟)
		// 집중 근무 기간(4/13~4/17) 설정을 위해 전후 날짜 범위 지정 (isAfter/isBefore 사용용)
		LocalDate start19_1 = LocalDate.of(2026, 4, 13).minusDays(1);
		LocalDate end19_1 = LocalDate.of(2026, 4, 17).plusDays(1);

		// 프로젝트 시작일과 종료일 설정
		LocalDate start = YearMonth.of(2026, 3).atDay(23); // 2026-03-23
		LocalDate end = YearMonth.of(2026, 4).atDay(20);   // 2026-04-20

		int workHour = 0;

		// 종료일(4/20) 전날까지 루프를 돌며 하루씩 증가
		for (LocalDate ld = start; ld.isBefore(end); ld = ld.plusDays(1)) {
			// 주말이거나 공휴일이면 계산에서 제외 (continue)
			if (isWeekendOrHoliday(ld))
				continue;

			// 집중 근무 기간(4/13~4/17) 사이에 있다면 9시간, 아니면 8시간 가산
			workHour += (ld.isAfter(start19_1) && ld.isBefore(end19_1)) ? 9 : 8;
		}

		// [종료일 처리] 4월 20일 당일은 17:00 종료이므로 별도로 7시간 가산
		if (!isWeekendOrHoliday(end)) {
			workHour += 7;
		}

		System.out.println("4. 총 일할 수 있는 시간(Hours): " + workHour + "시간");
	}

	/**
	 * 주말(토, 일) 또는 지정된 공휴일 리스트에 포함되는지 확인하는 메서드
	 */
	private static boolean isWeekendOrHoliday(LocalDate ld) {
		DayOfWeek dayOfWeek = ld.getDayOfWeek();
		// contains를 사용하여 리스트에 포함된 날짜인지 확인
		return dayOfWeek == DayOfWeek.SATURDAY ||
			dayOfWeek == DayOfWeek.SUNDAY ||
			holidays.contains(ld);
	}
}
