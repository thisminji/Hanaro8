import Link from "next/link";
import { PropsWithChildren } from "react";

export const dynamic = "auto";

export default function Hellolayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>Hello Layout</h1>
      <Link href={"/"}>Home</Link>
      <div className="border p-5 text-center">{children}</div>
    </>
  );
}
