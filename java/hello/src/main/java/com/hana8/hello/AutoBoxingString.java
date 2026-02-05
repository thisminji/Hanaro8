package com.hana8.hello;

import java.util.Arrays;

public class AutoBoxingString {
	public static void main(String[] args) {
		// Auto-boxing: 기본형 숫자(100)를 Integer 객체(상자)에 자동으로 담음
		Integer iObj = 100;

		// Auto-Unboxing: Integer 객체 상자에서 숫자 알맹이(100)를 자동으로 꺼냄
		int i1 = iObj;

		// Auto-boxing: 꺼낸 숫자 i1을 다시 다른 Integer 객체 상자 iObj1에 담음
		Integer iObj1 = i1;

		// 객체형(Integer)은 일반 숫자와 달리 기능을 가짐 (예: 다른 타입으로 변환)
		System.out.println("iObj1을 byte로 변환 = " + iObj1.byteValue());

		// Character는 char(문자형)의 래퍼 클래스 상자 이름
		// 숫자 65를 넣으면 유니코드 'A'로 자동 박싱됨
		Character cObj = 65;

		// 상자에서 'A'라는 문자 알맹이만 쏙 꺼내는 오토언박싱
		char c = cObj;
		System.out.println("cObj에서 꺼낸 문자: " + c);

		System.out.println("\n--- [2. 이메일 문자열 분석 섹션] ---");

		String s = "abc@gmail.com";

		// indexOf: 특정 문자의 위치(인덱스)를 숫자로 알려줌 (0부터 시작)
		int idxAt = s.indexOf('@');

		// substring(시작, 끝): 시작 위치부터 '끝 위치 전'까지 문자열을 자름
		String name1 = s.substring(0, idxAt);     // 0번부터 '@' 위치 전까지 -> "abc"
		String domain1 = s.substring(idxAt + 1);  // '@' 다음 위치부터 끝까지 -> "gmail.com"
		System.out.printf("추출 결과 -> 이름: %s, 도메인: %s%n", name1, domain1);

		// split: 기준 문자(@)를 칼로 써서 문자열을 조각조각 나눠 배열로 만듦
		String[] name_domain = s.split("@");

		// Arrays.toString: 배열은 그냥 출력하면 주소가 나오므로, 이 도구로 안의 내용을 확인
		System.out.println("나눠진 배열 내용 = " + Arrays.toString(name_domain));

		// 향상된 for문 (for-each): 배열 속의 조각들을 하나씩 'sss'에 담아 반복 출력
		for (String sss : name_domain) {
			System.out.println("조각내기 결과 sss = " + sss);
		}

		// contains: 해당 문자가 포함되어 있는지 O/X(true/false)로 알려줌
		boolean hasAtMark = s.contains("@");
		System.out.println("이메일에 @가 들어있나요? " + hasAtMark);
	}
}
