import dotenv from 'dotenv';
import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

//
//
//

dotenv.config();

//
//
//

const nextConfig: NextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
