package com.hana8.hello.trythis;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

public class Transfer {
	public static void main(String[] args) {
		// (이체번호, 받는사람, 보낸사람, 금액)
		String[] logs = {
			"1001,Hong,Choi,5000",
			"1002,Lee,Park,20000",
			"1003,Hong,Jade,10000",
			"1004,Kim,Park,20000",
			"1005,Lee,Choi,5000",
			"1006,Hong,Choi,5000"
		};

		Map<String, Set<String>> receiversMap = new LinkedHashMap<>(); // [받는사람 : 보낸사람목록]
		Map<String, Integer> sendCount = new HashMap<>();       // [보낸사람 : 보낸횟수]
		Map<String, Integer> sendAmount = new HashMap<>();      // [보낸사람 : 보낸총액]
		Map<String, Integer> receiveAmount = new HashMap<>();   // [받는사람 : 받은총액]

		for (String log : logs) {
			String[] parts = log.split(",");
			String receiver = parts[1];
			String sender = parts[2];
			int amount = Integer.parseInt(parts[3]);

			// 받는 사람별로 누구에게 돈을 받았는지 목록 만들기
			if (!receiversMap.containsKey(receiver)) {
				receiversMap.put(receiver, new LinkedHashSet<>());
			}
			receiversMap.get(receiver).add(sender);

			sendCount.put(sender, sendCount.getOrDefault(sender, 0) + 1); // 송금 횟수 증가
			sendAmount.put(sender, sendAmount.getOrDefault(sender, 0) + amount); // 보낸 금액 합산
			receiveAmount.put(receiver, receiveAmount.getOrDefault(receiver, 0) + amount); // 받은 금액 합산
		}

		System.out.println("--- 받는 사람 기준 보낸 사람 목록 ---");
		receiversMap.forEach((r, senders) -> {
			String names = String.join(", ", senders);
			System.out.println(r + ": " + names);
		});

		System.out.println();

		// 가장 자주 보낸 사람, 가장 많이 보낸/받은 사람 찾기
		String freqUser = "", maxSendUser = "", maxRecvUser = "";
		int maxF = 0, maxSA = 0, maxRA = 0;

		// 가장 자주 보낸 사람
		for (String user : sendCount.keySet()) {
			if (sendCount.get(user) > maxF) {
				maxF = sendCount.get(user);
				freqUser = user;
			}
		}
		// 가장 많은 금액을 보낸 사람
		for (String user : sendAmount.keySet()) {
			if (sendAmount.get(user) > maxSA) {
				maxSA = sendAmount.get(user);
				maxSendUser = user;
			}
		}
		// 가장 많은 금액을 받은 사람 찾기
		for (Map.Entry<String, Integer> entry : receiveAmount.entrySet()) {
			if (entry.getValue() > maxRA) {
				maxRA = entry.getValue();
				maxRecvUser = entry.getKey();
			}
		}

		System.out.printf("자주: %s(%d회), 최고금액: %s (%,d원)\n", freqUser, maxF, maxSendUser, maxSA);
		System.out.printf("가장 많은 금액을 받은 사람: %s (%,d원)\n", maxRecvUser, maxRA);
	}
}
