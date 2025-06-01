import dayjs from 'dayjs';

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
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

import type { PolicyQnAItemData } from '@/typings/api';

import { cn } from '@/lib/utils';

//
//
//

interface ComplaintCaseExamplesProps {
  data: 'skeleton' | PolicyQnAItemData;
}

//
//
//

function decodeHtmlAndHandleBreaks(text: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  const decodedText = doc.body.textContent || '';

  return decodedText.replace(/<br\s*\/?>/gi, '\n');
}

//
//
//

const ComplaintCaseExamples = ({ data }: ComplaintCaseExamplesProps) => {
  /**
   *
   */
  const renderContent = () => {
    if (data === 'skeleton') {
      return (
        <Card className={cn('p-0 py-4')}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-1/6" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-10/12" />
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return (
      <Accordion type="single" defaultValue="item-1" collapsible>
        <Card className={cn('w-full p-0')}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <CardHeader className={cn('w-full grid-rows-[auto]')}>
                <div className={cn('flex w-full items-center justify-between')}>
                  <div className={cn('flex flex-col gap-1.5')}>
                    <CardTitle className={cn('line-clamp-1')}>
                      {data.qnaTitl}
                    </CardTitle>
                    <CardDescription className={cn('line-clamp-2')}>
                      {dayjs(data.regDate).format('YYYY-MM-DD')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </AccordionTrigger>

            <AccordionContent>
              <CardContent className={cn('flex flex-col gap-2')}>
                <p className={cn('whitespace-pre-wrap')}>{data.qstnCntnCl}</p>
                <Separator />

                <table className={cn('w-full')}>
                  <colgroup>
                    <col style={{ width: '10%' }} />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className={cn('py-1 font-medium')}>담당부서:</td>
                      <td className={cn('py-1')}>{data.deptName}</td>
                    </tr>
                    <tr>
                      <td className={cn('py-1 font-medium')}>관련 법령:</td>
                      <td className={cn('py-1')}>
                        {data?.lawList?.map(law => law?.fullName).join(' / ')}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p className={cn('whitespace-pre-line')}>
                  {decodeHtmlAndHandleBreaks(data.ansCntnCl)}
                </p>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Card>
      </Accordion>
    );
  };

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>사례로 보는 민원 해결 방법</CardTitle>
        <CardDescription>
          이전에 해결된 민원을 참고하여 민원을 해결하는 방법을 확인해보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default ComplaintCaseExamples;
