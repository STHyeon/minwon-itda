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
import ComplaintAgencyMap from './complaint-agency-map';

import type { ComplaintApiResponse } from '@/typings/api';

import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAgencyCardProps {
  recommendAgency: ComplaintApiResponse;
}

//
//
//

const ComplaintAgencyCard = ({ recommendAgency }: ComplaintAgencyCardProps) => {
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
                    {recommendAgency.facility}
                  </CardTitle>
                  <CardDescription className={cn('line-clamp-2')}>
                    {recommendAgency.organizationName}
                  </CardDescription>
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
                      {intl('agency-card.tel')}
                    </td>
                    <td className={cn('py-2')}>{recommendAgency.tel}</td>
                  </tr>
                  <tr>
                    <td className={cn('py-2 font-medium')}>
                      {intl('agency-card.address')}
                    </td>
                    <td className={cn('py-2')}>{recommendAgency.address}</td>
                  </tr>
                </tbody>
              </table>

              <ComplaintAgencyMap
                address={recommendAgency.originalAddress}
                facility={recommendAgency.facility}
              />
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Card>
    </Accordion>
  );
};

export default ComplaintAgencyCard;
