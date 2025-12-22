// app/hi/[time]/comments/[cmt]/page.tsx

//주소에서 받아올 값의 이름표 <time/cmt>
type Params = { time: string; cmt: string };

//미리 정해둔 주소 말고는 404
export const dynamicParams = false; // generateStaticParams에 없는 건 404

//미리 만들 주소 목록
//빌드할 때 이 주소들의 HTML 미리 만들어짐
//SSG 핵심
export function generateStaticParams(): Params[] {
  // rules (각 time별로 cmt 번호)
  const rules: Record<string, number[]> = {
    morning: [1, 2, 3],
    afternoon: [4, 5, 6],
    evening: [7, 8, 9],
  };

  //result 만들기
  //주소를 하나씩 리스트로 만들기
  const result: Params[] = [];
  for (const [time, cmts] of Object.entries(rules)) {
    for (const cmt of cmts) {
      result.push({ time, cmt: String(cmt) });
    }
  }
  return result;
}

//실제 화면 그리는 Page
export default async function CmtPage({ params }: { params: Promise<Params> }) {
  const { time, cmt } = await params;

  return (
    <div>
      Good {time} - {cmt} comments!
    </div>
  );
}
