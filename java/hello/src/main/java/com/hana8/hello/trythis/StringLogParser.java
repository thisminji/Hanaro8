package com.hana8.hello.trythis;

public class StringLogParser {
	public static void main(String[] args) {
		// 텍스트 블록(""")을 사용해 여러 줄의 로그 데이터를 선언 (Java 15+)
		String log = """
			2024-02-05 09:15:23 ERROR UserService: Login failed for user admin
			2024-02-05 09:16:45 INFO PaymentService: Payment processed for order #1234
			2024-02-05 09:17:12 ERROR DatabaseService: Connection timeout
			2024-02-05 09:18:33 WARN UserService: Password retry limit reached for user john
			2024-02-05 09:19:01 ERROR UserService: Login failed for user admin
			2024-02-05 09:20:15 INFO OrderService: New order created #1235""";

		// [카운팅 변수] 로그 레벨별 횟수 저장
		int errorCnt = 0;
		int infoCnt = 0;
		int warnCnt = 0;

		// [기준 데이터] 분석할 서비스 목록과 각 서비스별 카운트를 매칭할 배열
		final String[] services = {"UserService", "PaymentService", "DatabaseService", "OrderService"};
		int[] serviceCnts = {0, 0, 0, 0}; // services 배열의 인덱스와 1:1 대응됨

		// [문자열 저장소] 메모리 효율을 위해 String 대신 StringBuilder 사용
		StringBuilder sbAdmin = new StringBuilder(); // admin이 포함된 전체 로그용
		StringBuilder sbError = new StringBuilder(); // ERROR 레벨의 메시지 요약용

		// 1. 전체 로그를 줄바꿈(\n) 기준으로 분리하여 배열에 담음
		String[] logs = log.split("\n");

		for (String l : logs) {
			// 2. [데이터 파싱] 한 줄을 공백 기준으로 최대 5개 덩어리로 쪼갬
			// 결과: [0]날짜, [1]시간, [2]레벨, [3]서비스:, [4]메시지
			String[] dt_tm_lvl_svc_msg = l.split(" ", 5);

			String lvl = dt_tm_lvl_svc_msg[2]; // 로그 레벨 (ERROR, INFO 등)
			String svc = dt_tm_lvl_svc_msg[3].replace(":", ""); // 서비스명 끝의 콜론(:) 제거
			String msg = dt_tm_lvl_svc_msg[4]; // 실제 로그 내용

			// 3. [레벨 카운팅] 화살표 케이스(Switch Expressions)를 사용해 가독성 높게 카운트
			switch (lvl) {
				case "ERROR" -> errorCnt++;
				case "INFO" -> infoCnt++;
				case "WARN" -> warnCnt++;
			}

			// 4. [서비스 카운팅] 현재 로그의 서비스가 기준 배열의 몇 번째에 있는지 찾아 카운트 증가
			for (int i = 0; i < services.length; i++) {
				if (services[i].equals(svc))
					serviceCnts[i]++;
			}

			// 5. [필터링 - admin] 메시지에 admin이라는 단어가 있으면 StringBuilder에 추가
			if (msg.contains("admin")) {
				if (!sbAdmin.isEmpty()) // 첫 줄이 아닐 때만 줄바꿈 추가 (앞에 빈 줄 방지)
					sbAdmin.append('\n');
				sbAdmin.append(l);
			}

			// 6. [필터링 - ERROR] 레벨이 ERROR라면 "서비스명: 메시지" 형태로 요약 저장
			if (lvl.equals("ERROR")) {
				if (!sbError.isEmpty())
					sbError.append('\n');
				sbError.append(svc).append(':').append(' ').append(msg);
			}
		} // 반복문 종료

		// 결과 출력 섹션
		System.out.printf("1. 전체 로그: %d개%n", logs.length);
		System.out.printf("2. ERROR: %d개, INFO: %d개, WARN: %d개%n", errorCnt, infoCnt, warnCnt);

		// 7. [최다 서비스 산출] 서비스 카운트 배열을 순회하며 가장 높은 숫자의 서비스 찾기
		int bigServiceCnt = 0;
		String bigService = "";
		for (int i = 0; i < serviceCnts.length; i++) {
			if (bigServiceCnt < serviceCnts[i]) {
				bigServiceCnt = serviceCnts[i];
				bigService = services[i];
			}
		}
		System.out.printf("3. 최다 등장한 서비스: %s (%d회)%n", bigService, bigServiceCnt);

		// StringBuilder에 저장된 내용 출력
		System.out.println("4. admin 관련 로그\n" + sbAdmin);
		System.out.println("5. Error 로그\n" + sbError);
	}
}
