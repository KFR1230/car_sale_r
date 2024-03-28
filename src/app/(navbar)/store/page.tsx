'use client';

import { FormEvent, ReactEventHandler, useState } from 'react';

const Page = () => {
  const [c, SetC] = useState<File | undefined | null>();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(c);
    const formData = new FormData();
    if (c) {
      formData.set('file', c);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/send-image`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        encType="multipart/form-data"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input type="file" onChange={(e) => SetC(e.target.files?.[0])} />
        <button>送出</button>
      </form>
    </>
  );
};

export default Page;
