package com.hana8.hello.trythis;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class TransCollection {
	public static void main(String[] args) {
		String fullLog = """
			1001,Hong,Choi,5000
			1002,Lee,Park,20000
			1003,Hong,Jade,10000
			1004,Kim,Park,20000
			1005,Lee,Choi,5000
			1006,Hong,Choi,5000
			""";

		Map<String, Set<String>> sendersByReceiver = new HashMap<>();
		// Map<String, LinkedHashSet<String>> sendersByReceiver = new HashMap<>();
		Map<String, Integer> senderCnt = new HashMap<>();
		Map<String, Integer> senderAmt = new HashMap<>();
		Map<String, Integer> receiverAmt = new HashMap<>();

		for (String log : fullLog.split("\n")) {
			String[] row = log.split(",");
			String receiver = row[1];
			String sender = row[2];
			int amt = Integer.parseInt(row[3]);

		}
	}
}
