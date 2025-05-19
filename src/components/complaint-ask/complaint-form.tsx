'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
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
import ComplaintFormLoadingDialog from './complaint-form-loading-dialog';

import type { ApiResponse } from '@/typings/api';
import type { ComplaintApiResponse } from '@/typings/complaint';

import { COMPLIANT_STORAGE_KEY } from '@/constants/complaint';
import { ROUTES } from '@/constants/routes';
import { useRouter } from '@/i18n/navigation';
import { addItemToLocalStorage } from '@/lib/complaint-saving';
import { cn } from '@/lib/utils';

//
//
//

const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 100;
const MIN_DESCRIPTION_LENGTH = 2;
const MAX_DESCRIPTION_LENGTH = 500;

//
//
//

const ComplaintForm = () => {
  const router = useRouter();
  const intl = useTranslations('ComplaintAskPage');
  const commonIntl = useTranslations('Common');

  const [isPending, startTransition] = React.useTransition();

  const askFormSchema = z.object({
    title: z
      .string()
      .min(MIN_TITLE_LENGTH, {
        message: commonIntl('error-min-length', { min: MIN_TITLE_LENGTH }),
      })
      .max(MAX_TITLE_LENGTH, {
        message: commonIntl('error-max-length', { max: MAX_TITLE_LENGTH }),
      }),
    description: z
      .string()
      .min(MIN_DESCRIPTION_LENGTH, {
        message: commonIntl('error-min-length', {
          min: MIN_DESCRIPTION_LENGTH,
        }),
      })
      .max(MAX_DESCRIPTION_LENGTH, {
        message: commonIntl('error-max-length', {
          max: MAX_DESCRIPTION_LENGTH,
        }),
      }),
  });

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
  const handleFormSubmit = useFormMethods.handleSubmit(async data => {
    startTransition(async () => {
      try {
        const url = new URL('/api/complaint/ask', window.location.origin);
        url.searchParams.append('keyword', data.description);

        const request = await fetch(url);
        const response =
          (await request.json()) as ApiResponse<ComplaintApiResponse>;

        if (!request.ok) {
          const errorMessage =
            typeof response.error === 'string'
              ? response.error
              : '요청 처리 중 오류가 발생했습니다';

          toast.error(errorMessage);

          return;
        }

        startTransition(() => {
          const updatedItems = addItemToLocalStorage(
            COMPLIANT_STORAGE_KEY,
            data.title,
            data.description,
            response.data?.similarItems
          );

          router.push(`${ROUTES.complaintAskDetail(updatedItems[0].id)}`);
        });
      } catch {}
    });
  });

  //
  //
  //

  return (
    <>
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
                <FormLabel>{intl('form.title-label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={intl('form.title-placeholder')}
                  />
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
                <FormLabel>{intl('form.description-label')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={intl('form.description-placeholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{intl('form.action-search')}</Button>
        </form>
      </Form>

      <ComplaintFormLoadingDialog open={isPending} />
    </>
  );
};

export default ComplaintForm;
