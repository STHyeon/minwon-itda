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
  const intl = useTranslations('Language');

  //
  //
  //

  return (
    <Select defaultValue={locale} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>지원언어</SelectLabel>
          {Object.values(LANGUAGE).map(language => {
            return (
              <SelectItem key={language} value={language}>
                {intl(language)}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
