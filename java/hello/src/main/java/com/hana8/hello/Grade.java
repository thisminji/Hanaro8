package com.hana8.hello;

public enum Grade {
	BASIC, VIP, VVIP;

	Grade() {
		System.out.println("*****" + this.name());
	}
}
