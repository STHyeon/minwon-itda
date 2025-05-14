import { ChevronDownIcon as IconChevronDown } from 'lucide-react';

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

import type { SimilarInfoResponse } from '@/typings/complaint';

import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAgencyCardProps {
  data: SimilarInfoResponse;
}

//
//
//

const ComplaintAgencyCard = ({ data }: ComplaintAgencyCardProps) => {
  return (
    <Accordion type="single" collapsible>
      <Card className={cn('w-full p-0')}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <CardHeader className={cn('w-full grid-rows-[auto]')}>
              <div className={cn('flex w-full items-center justify-between')}>
                <div className={cn('flex flex-col gap-1.5')}>
                  <CardTitle className={cn('line-clamp-1')}>
                    {data.title}
                  </CardTitle>
                  <CardDescription className={cn('line-clamp-2')}>
                    {data.content}
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
                    <td className={cn('py-2 font-medium')}>기관명</td>
                    <td className={cn('py-2')}>{data.mainSubName}</td>
                  </tr>
                  <tr>
                    <td className={cn('py-2 font-medium')}>기관 부서</td>
                    <td className={cn('py-2')}>{data.depName}</td>
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
