import dynamic from 'next/dynamic';

/**
 * ref: https://medium.com/@emailsolah/lottie-react-nextjs-unhandled-runtime-error-error-document-is-not-defined-fix-8f4df29be872
 */
export const LottiePlayer = dynamic(
  () => import('react-lottie-player').then(mod => mod.default),
  { ssr: false }
);
