import type { ApiResponse } from './api-response';

//
//
//

declare module 'next/server' {
  interface Response {
    json<T>(body: ApiResponse<T>, init?: ResponseInit): Response;
  }
}
