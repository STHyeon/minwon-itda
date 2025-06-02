import { useLocale, useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { LANGUAGE } from '@/typings/enums';

//
//
//

interface LanguageSelectorProps {
  onChange: (newLocale: string) => void;
}

//
//
//

const LanguageSelector = ({ onChange }: LanguageSelectorProps) => {
  const locale = useLocale();
  const commonIntl = useTranslations('Language');
  const intl = useTranslations('ComplaintAskPage');

  //
  //
  //

  return (
    <Select defaultValue={locale} onValueChange={onChange}>
      <SelectTrigger className="w-[11.25rem]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {intl('form.language-placeholder-selected')}
          </SelectLabel>
          {Object.values(LANGUAGE).map(language => {
            return (
              <SelectItem key={language} value={language}>
                {commonIntl(language)}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
