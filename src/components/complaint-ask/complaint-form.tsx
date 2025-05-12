'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { cn } from '@/lib/utils';

//
//
//

const askFormSchema = z.object({
  title: z.string().min(2, {
    message: '최소 2글자 이상 입력해주세요.',
  }),
  description: z
    .string()
    .min(2, {
      message: '최소 2글자 이상 입력해주세요.',
    })
    .max(1000, {
      message: '최대 1000자까지 입력가능합니다.',
    }),
});

//
//
//

const ComplaintForm = () => {
  const router = useRouter();

  const useFormMethods = useForm<z.infer<typeof askFormSchema>>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: zodResolver(askFormSchema),
  });

  /**
   *
   */
  const handleFormSubmit = useFormMethods.handleSubmit(async () => {
    try {
      router.replace('/complaint-answer');
    } catch {}
  });

  //
  //
  //

  return (
    <Form {...useFormMethods}>
      <form
        className={cn('flex w-full flex-col gap-6')}
        onSubmit={e => {
          e.preventDefault();
          void handleFormSubmit();
        }}
      >
        <FormField
          control={useFormMethods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>민원 제목</FormLabel>
              <FormControl>
                <Input {...field} placeholder="민원 제목을 입력해주세요." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={useFormMethods.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>민원 내용</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="민원 내용을 입력해주세요." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">검색하기</Button>
      </form>
    </Form>
  );
};

export default ComplaintForm;
