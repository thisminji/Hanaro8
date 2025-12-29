'use server';

export type Post = {
  id?: number;
  folder: number;
  title: string;
  content: string;
  isprivate: boolean;
  ispublic: boolean;
};

export type PostError = { error: string; data: Partial<Post> };

export const savePost = async (
  formData: FormData,
): Promise<[PostError] | [undefined, Post]> => {
  console.log('savePost>>', Object.fromEntries(formData.entries()));

  await new Promise((resolve) => setTimeout(resolve, 700));

  const folder = Number(formData.get('folder'));
  const title = (formData.get('title') as string) ?? '';
  const isprivate = formData.get('isprivate') === 'on';
  const ispublic = formData.get('ispublic') === 'on';
  const content = (formData.get('content') as string) ?? '';

  const data: Post = { id: 1, folder, title, content, isprivate, ispublic };

  if (!title.trim()) return [{ error: 'Input the title!', data }];

  return [undefined, data];
};

// ✅ 삭제도 “서버 액션”으로 하나 만들어둠 (confirm 뒤에 호출할 용도)
export const deleteBoard = async (
  id?: number,
): Promise<{ message?: string } | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!id) return { message: 'Invalid id' };
  return null; // 성공이면 null
};
