package com.hana8.hello.trythis;

import java.util.Arrays;

public class SnailArray {
	public static void main(String[] args) {
		makeSnail(5);
		makeSnail(6);
		makeSnail(7);
	}

	private static void makeSnail(int N) {
		int[][] snails = new int[N][N];

		int val = 0;
		int row = -1;
		int col = 0;
		int flag = 1;

		// w: 9 -> 7 -> 5 -> 3 -> 1
		for (int w = N + N - 1; w > 0; w -= 2) {
			for (int i = 0; i < w; i++) {
				if (i <= w / 2)
					row += flag;
				else
					col += flag;

				snails[col][row] = ++val;
			}

			flag *= -1;
		}

		System.out.println("snails = " + Arrays.deepToString(snails));
		for (int[] _arr : snails) {
			for (int n : _arr) {
				System.out.printf("%3d", n);
			}
			System.out.println();
		}
	}

    /* // 아래는 리팩토링 및 테스트가 용이한 시뮬레이션 방식 코드입니다. (주석 처리)

    public static int[][] generateSnailArray(int n) {
        int[][] arr = new int[n][n];
        int value = 1;
        int r = 0, c = 0;
        int direction = 0;

        // 우, 하, 좌, 상 방향 배열
        int[] dr = {0, 1, 0, -1};
        int[] dc = {1, 0, -1, 0};

        while (value <= n * n) {
            arr[r][c] = value++;

            int nextR = r + dr[direction];
            int nextC = c + dc[direction];

            // 벽을 만나거나 이미 값이 있으면 방향 전환
            if (nextR < 0 || nextR >= n || nextC < 0 || nextC >= n || arr[nextR][nextC] != 0) {
                direction = (direction + 1) % 4;
                nextR = r + dr[direction];
                nextC = c + dc[direction];
            }

            if (value <= n * n) {
                r = nextR;
                c = nextC;
            }
        }
        return arr;
    }

    private static void printArray(int[][] arr) {
        for (int[] rows : arr) {
            for (int val : rows) {
                System.out.printf("%3d", val);
            }
            System.out.println();
        }
    }
    */
}
