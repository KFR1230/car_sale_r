"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnSaleFormatText = exports.PriceFormatText = void 0;
var forms_1 = require("payload/components/forms");
var React = __importStar(require("react"));
var PriceFormatText = function () {
    var price = (0, forms_1.useFormFields)(function (_a) {
        var fields = _a[0], dispatch = _a[1];
        return fields.price.value;
    });
    var textPrice = formatPrice(price);
    function formatPrice(price) {
        var numberPrice = typeof price === 'string' ? parseInt(price) : price;
        if (isNaN(numberPrice)) {
            return '輸入格式非數字';
        }
        if (numberPrice / 10000 < 1) {
            return '輸入的價格不足一萬';
        }
        var tenThousandNum = numberPrice / 10000;
        return "".concat(tenThousandNum, "\u842C");
    }
    return (React.createElement("div", { className: "price-text" },
        React.createElement("span", null,
            "( ",
            textPrice,
            " )")));
};
exports.PriceFormatText = PriceFormatText;
var OnSaleFormatText = function () {
    var price = (0, forms_1.useFormFields)(function (_a) {
        var fields = _a[0], dispatch = _a[1];
        return fields.onSale.value;
    });
    var textPrice = formatPrice(price);
    function formatPrice(price) {
        var numberPrice = typeof price === 'string' ? parseInt(price) : price;
        if (isNaN(numberPrice)) {
            return '輸入格式非數字';
        }
        if (numberPrice / 10000 < 1) {
            return '輸入的價格不足一萬';
        }
        var tenThousandNum = numberPrice / 10000;
        return "".concat(tenThousandNum, "\u842C");
    }
    return (React.createElement("div", { className: "price-text" },
        React.createElement("span", null,
            "( ",
            textPrice,
            " )")));
};
exports.OnSaleFormatText = OnSaleFormatText;
