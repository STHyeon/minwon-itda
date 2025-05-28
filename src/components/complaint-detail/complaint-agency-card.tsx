import { ChevronDownIcon as IconChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

import type { ComplaintApiResponse } from '@/typings/complaint';

import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAgencyCardProps {
  data: ComplaintApiResponse;
}

//
//
//

const ComplaintAgencyCard = ({ data }: ComplaintAgencyCardProps) => {
  const intl = useTranslations('ComplaintDetailPage');

  //
  //
  //

  return (
    <Accordion type="single" collapsible>
      <Card className={cn('w-full p-0')}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <CardHeader className={cn('w-full grid-rows-[auto]')}>
              <div className={cn('flex w-full items-center justify-between')}>
                <div className={cn('flex flex-col gap-1.5')}>
                  <CardTitle className={cn('line-clamp-1')}>
                    {data.facility}
                  </CardTitle>
                  <CardDescription className={cn('line-clamp-2')}>
                    {data.organizationName}
                  </CardDescription>
                </div>

                <div className={cn('shrink-0')}>
                  <IconChevronDown />
                </div>
              </div>
            </CardHeader>
          </AccordionTrigger>

          <AccordionContent>
            <CardContent>
              <table className={cn('w-full')}>
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <td className={cn('py-2 font-medium')}>
                      {intl('agency-card.address')}
                    </td>
                    <td className={cn('py-2')}>{data.address}</td>
                  </tr>
                  <tr>
                    <td className={cn('py-2 font-medium')}>
                      {intl('agency-card.tel')}
                    </td>
                    <td className={cn('py-2')}>{data.tel}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Card>
    </Accordion>
  );
};

export default ComplaintAgencyCard;
