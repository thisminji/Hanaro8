'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useActionState, useReducer, useState } from 'react';
import { useAlerter } from '@/components/alerter/use-alerter';
import CheckSwitch from '@/components/CheckSwitch';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  deleteBoard,
  type Post,
  type PostError,
  savePost,
} from './posts.action';

type Folder = {
  id: number;
  name: string;
  type?: 'text' | 'file';
};

const FOLDERS: Folder[] = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유게시판' },
  { id: 3, name: '앨범', type: 'file' },
];

export default function PostEdit() {
  // ✅ prompt 추가
  const { confirm, alert, prompt } = useAlerter();

  const [isOpen, toggleOpen] = useReducer((p) => !p, false);
  const [folder, setFolder] = useState<Folder>(FOLDERS[0]);
  const [post, setPost] = useState<Partial<Post>>();
  const [isShowButtons, setShowButtons] = useState(false);

  const [postError, save, isPending] = useActionState(
    async (_: PostError | undefined, formData: FormData) => {
      const [err, data] = await savePost(formData);
      if (err) {
        setPost(err.data);

        // ✅ 저장 에러도 alert로 보여주기
        await alert({
          title: err.error,
          variant: 'destructive',
          okText: 'Confirm',
        });

        return err;
      }

      setPost(data);
      return undefined;
    },
    undefined,
  );

  const remove = async () => {
    // 1) 삭제 의사 확인(confirm)
    const ok = await confirm({
      title: '정말 삭제하시겠어요??',
      description: '삭제 후에는 복원할 수 없습니다!',
      variant: 'destructive',
      okText: '삭제',
      cancelText: '취소',
    });

    if (!ok) return;

    // 2) 인증번호 입력(prompt)  ✅ 이 부분이 추가됨!
    const code = await prompt({
      title: '삭제하려면 인증 번호를 입력하세요!',
      placeholder: '인증번호...',
      okText: 'Continue',
      cancelText: 'Cancel',
    });

    if (code === null) return; // 취소

    // 3) (예시) 인증번호 검증: 1234만 통과
    if (code !== '1234') {
      await alert({
        title: '인증번호가 올바르지 않습니다.',
        variant: 'destructive',
        okText: 'Confirm',
      });
      return;
    }

    // 4) 실제 삭제 요청
    const err = await deleteBoard(post?.id);

    if (err) {
      await alert({
        title: err.message ?? 'Delete failed',
        variant: 'destructive',
        okText: 'Confirm',
      });
      return;
    }

    // 5) 성공 알림
    await alert({ title: '삭제되었습니다.', okText: '확인' });
  };

  // Tailwind 동적 클래스 대신 고정 문자열로
  const textareaBg = post?.isprivate ? 'bg-red-900' : 'bg-blue-900';

  return (
    <>
      <h1 className="text-center font-semibold text-2xl">게시글 작성</h1>
      <form action={save} className="space-y-3">
        <div className="flex gap-2">
          <DropdownMenu onOpenChange={toggleOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'}>
                {folder.name}
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>게시판 선택</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {FOLDERS.map((f) => (
                <DropdownMenuItem key={f.id} onClick={() => setFolder(f)}>
                  {f.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 폴더 바뀔 때 반영되게 value 사용 */}
          <input type="hidden" name="folder" value={folder.id} />

          <Input
            type="text"
            name="title"
            defaultValue={post?.title}
            className="bg-muted"
            placeholder="title..."
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <CheckSwitch
            label="default"
            name="isprivate"
            checked={post?.isprivate}
            setCheckedAction={setShowButtons}
          />
          <CheckSwitch
            label="destructive"
            name="isprivate"
            checked={post?.isprivate}
            variant="destructive"
            setCheckedAction={setShowButtons}
          />
          <CheckSwitch
            label="secondary"
            name="isprivate"
            checked={post?.isprivate}
            variant="secondary"
            setCheckedAction={setShowButtons}
          />
          <CheckSwitch
            label="muted"
            name="isprivate"
            checked={post?.isprivate}
            variant="muted"
            setCheckedAction={setShowButtons}
          />

          <CheckSwitch label="홈에 공개" type="switch" name="ispublic" />
          <CheckSwitch
            label="secondary"
            type="switch"
            variant="secondary"
            name="ispublic"
          />
          <CheckSwitch
            label="destructive"
            type="switch"
            variant="destructive"
            name="ispublic"
          />
          <CheckSwitch
            label="muted"
            type="switch"
            variant="muted"
            name="ispublic"
          />
        </div>

        {folder.type === 'file' ? (
          <Input
            type="file"
            name="filex"
            className="cursor-pointer hover:bg-muted"
          />
        ) : (
          <Textarea
            name="content"
            defaultValue={post?.content}
            placeholder="content..."
            className={`${textareaBg} text-white`}
          />
        )}

        {!!postError && <span className="text-red-500">{postError.error}</span>}

        {isShowButtons && (
          <div className="flex justify-around">
            <Button type="reset" variant={'secondary'}>
              취소
            </Button>

            {/* ✅ 삭제 버튼에 remove 연결 */}
            <Button type="button" variant={'destructive'} onClick={remove}>
              삭제
            </Button>

            <Button type="submit" variant={'apply'} disabled={isPending}>
              저장{isPending && '...'}
            </Button>
          </div>
        )}
      </form>
    </>
  );
}
