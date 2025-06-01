'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { z } from 'zod';

import { LanguageSelector } from '../language';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import ComplaintFormLoadingDialog from './complaint-form-loading-dialog';

import type { ApiResponse } from '@/typings/api-response';
import type { SavingStorageData } from '@/typings/etc';

import { COMPLIANT_STORAGE_KEY } from '@/constants/complaint';
import { ROUTES } from '@/constants/routes';
import { useRouter } from '@/i18n/navigation';
import { addItemToLocalStorage } from '@/lib/complaint-saving';
import { cn } from '@/lib/utils';

//
//
//

const MIN_DESCRIPTION_LENGTH = 5;
const MAX_DESCRIPTION_LENGTH = 500;

//
//
//

const ComplaintForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const intl = useTranslations('ComplaintAskPage');
  const commonIntl = useTranslations('Common');

  const [isPending, startTransition] = React.useTransition();

  const askFormSchema = z.object({
    language: z.string(),
    question: z
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
      question: '',
      language: locale,
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
        url.searchParams.append('keyword', data.question);
        url.searchParams.append('language', data.language);

        const request = await fetch(url);
        const response =
          (await request.json()) as ApiResponse<SavingStorageData>;
        const storageData = response.data;

        if (!request.ok || !storageData) {
          const errorMessage =
            typeof response.error === 'string'
              ? response.error
              : commonIntl('error-occurred');

          toast.error(errorMessage);

          return;
        }

        startTransition(() => {
          const updatedItems = addItemToLocalStorage(
            COMPLIANT_STORAGE_KEY,
            data.question,
            storageData
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
          {/* 민원 질문 언어 */}
          <FormField
            control={useFormMethods.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{intl('form.language-label')}</FormLabel>
                <FormControl>
                  <LanguageSelector onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 민원 내용 */}
          <FormField
            control={useFormMethods.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{intl('form.question-label')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className={cn('min-h-56')}
                    placeholder={intl('form.question-placeholder')}
                    minLength={MIN_DESCRIPTION_LENGTH}
                    maxLength={MAX_DESCRIPTION_LENGTH}
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
