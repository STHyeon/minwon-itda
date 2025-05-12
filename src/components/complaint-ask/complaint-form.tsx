'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
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

import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

//
//
//

const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 100;
const MIN_DESCRIPTION_LENGTH = 2;
const MAX_DESCRIPTION_LENGTH = 1000;

//
//
//

const ComplaintForm = () => {
  const router = useRouter();
  const intl = useTranslations('ComplaintAskPage');
  const commonIntl = useTranslations('Common');

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
  );
};

export default ComplaintForm;
