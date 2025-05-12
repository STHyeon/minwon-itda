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

import { cn } from '@/lib/utils';

//
//
//

const ComplaintAgencyCard = () => {
  return (
    <Accordion type="single" collapsible>
      <Card className={cn('w-full p-0')}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <CardHeader className={cn('w-full grid-rows-[auto]')}>
              <div className={cn('flex w-full items-center justify-between')}>
                <div className={cn('flex flex-col gap-1.5')}>
                  <CardTitle>관련 기관</CardTitle>
                  <CardDescription>안녕</CardDescription>
                </div>

                <IconChevronDown />
              </div>
            </CardHeader>
          </AccordionTrigger>

          <AccordionContent>
            <CardContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Card>
    </Accordion>
  );
};

export default ComplaintAgencyCard;
