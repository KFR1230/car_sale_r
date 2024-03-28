import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import path from 'path';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { User } from './collection/User';
import { Products } from './collection/Products';
import { AnotherInfo } from './collection/AnotherInfo';
import { Media } from './collection/Media';
import { HomePage } from './collection/HomePage';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { BannerMedia } from './collection/BannerMedia';
import { AboutPage } from './collection/AboutPage';
import ExtraInfoMedia from './collection/ExtraInfoMedia';
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
  },
  bucket: process.env.S3_BUCKET || '',
});
const HomeAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
  },
  bucket: process.env.S3_BANNERBUCKET || '',
});
const ExtraInfoAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
  },
  bucket: process.env.S3_EXTRAINFOBUCKET || '',
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  cors: process.env.WHITELIST_ORIGINS
    ? process.env.WHITELIST_ORIGINS.split(',')
    : [],
  csrf: process.env.WHITELIST_ORIGINS
    ? process.env.WHITELIST_ORIGINS.split(',')
    : [],
  collections: [
    User,
    Products,
    AnotherInfo,
    Media,
    HomePage,
    BannerMedia,
    AboutPage,
    ExtraInfoMedia,
  ],
  routes: {
    admin: '/sell',
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: 'sale-car',
      ogImage: '/thumbnail.jpg',
      favicon: '/favicon.ico',
    },
    // css: path.resolve(__dirname, 'productsStyle.scss'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-type.ts'),
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: storageAdapter,
          disablePayloadAccessControl: true,
        },
        'banner-media': {
          adapter: HomeAdapter,
          disablePayloadAccessControl: true,
        },
        'extra-car-media': {
          adapter: ExtraInfoAdapter,
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
});
