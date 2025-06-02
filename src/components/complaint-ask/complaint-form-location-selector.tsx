import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { INCHEON_LOCATION_LIST } from '@/constants/complaint';

//
//
//

interface ComplaintFormLocationSelectorProps {
  onChange: (newLocale: string) => void;
}

//
//
//

const TEMP_LOCATION_LIST = {
  ganghwa: '강화군',
  gyeyang: '계양구',
  nam: '남구',
  namdong: '남동구',
  dong: '동구',
  michuhol: '미추홀구',
  bupyeong: '부평구',
  seo: '서구',
  yeonsu: '연수구',
  ongjin: '옹진구',
  jung: '중구',
} as const;

//
//
//

const ComplaintFormLocationSelector = ({
  onChange,
}: ComplaintFormLocationSelectorProps) => {
  const intl = useTranslations('ComplaintAskPage');
  const locationIntl = useTranslations('Location');

  /**
   *
   */
  const handleChange = (newLocation: string) => {
    onChange(
      TEMP_LOCATION_LIST[newLocation as keyof typeof TEMP_LOCATION_LIST]
    );
  };

  //
  //
  //

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[17.5rem]">
        <SelectValue placeholder={intl('form.location-placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {intl('form.location-placeholder-selected')}
          </SelectLabel>
          {INCHEON_LOCATION_LIST.map(location => {
            return (
              <SelectItem key={location} value={location}>
                {locationIntl(location)}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ComplaintFormLocationSelector;
