'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import { type } from '../../../.next/types/routes';

interface CommentEditorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const CommentEditor = ({ isOpen, setIsOpen }: CommentEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed inset-0 flex w-screen  item-center justify-center bg-black/30 p-4 transition duration-300  ease-out data-closed:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70" />

      <DialogPanel className="max-w-lg z-50 space-y-4 bg-[#131313] border border-white/10 p-4 rounded-lg">
        <DialogTitle className="text-white font-bold text-lg">
          What's on your mind?
        </DialogTitle>
        <input
          placeholder="Titile"
          type="text"
          className="w-full h-[100px] border text-sm border-white/10 rounded-lg px-2 focus:outline-none"
          value={title}
          onChange={onTitleChange}
        />

        <textarea
          placeholder="Comment"
          className="w-full h-[100px] border text-sm border-white/10 rounded-md px-2 focus:outline-none"
          value={content}
          onChange={onContentChange}
        ></textarea>

        <div className="flex gap-4 text-sm justify-end">
          <button
            className="text-white/50 font-bold cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>

          <button
            className="text-white font-bold cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Post
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CommentEditor;
