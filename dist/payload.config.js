"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("payload/config");
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var User_1 = require("./collection/User");
var Products_1 = require("./collection/Products");
var AnotherInfo_1 = require("./collection/AnotherInfo");
var Media_1 = require("./collection/Media");
var HomePage_1 = require("./collection/HomePage");
var s3_1 = require("@payloadcms/plugin-cloud-storage/s3");
var plugin_cloud_storage_1 = require("@payloadcms/plugin-cloud-storage");
var BannerMedia_1 = require("./collection/BannerMedia");
var AboutPage_1 = require("./collection/AboutPage");
var ExtraInfoMedia_1 = __importDefault(require("./collection/ExtraInfoMedia"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
var storageAdapter = (0, s3_1.s3Adapter)({
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
var HomeAdapter = (0, s3_1.s3Adapter)({
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
var ExtraInfoAdapter = (0, s3_1.s3Adapter)({
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
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    cors: process.env.WHITELIST_ORIGINS
        ? process.env.WHITELIST_ORIGINS.split(',')
        : [],
    csrf: process.env.WHITELIST_ORIGINS
        ? process.env.WHITELIST_ORIGINS.split(',')
        : [],
    collections: [
        User_1.User,
        Products_1.Products,
        AnotherInfo_1.AnotherInfo,
        Media_1.Media,
        HomePage_1.HomePage,
        BannerMedia_1.BannerMedia,
        AboutPage_1.AboutPage,
        ExtraInfoMedia_1.default,
    ],
    routes: {
        admin: '/sell',
    },
    admin: {
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: 'sale-car',
            ogImage: '/thumbnail.jpg',
            favicon: '/favicon.ico',
        },
        // css: path.resolve(__dirname, 'productsStyle.scss'),
    },
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.MONGODB_URL,
    }),
    editor: (0, richtext_slate_1.slateEditor)({}),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, 'payload-type.ts'),
    },
    plugins: [
        (0, plugin_cloud_storage_1.cloudStorage)({
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
