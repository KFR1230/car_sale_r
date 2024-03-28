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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelSelectComponent = void 0;
var forms_1 = require("payload/components/forms");
var React = __importStar(require("react"));
//使用 useFormFields 取得動態的field 資料。
var CarModelSelectComponent = function (_a) {
    var path = _a.path;
    var _b = (0, forms_1.useField)({ path: path }), value = _b.value, setValue = _b.setValue;
    var _c = React.useState([]), options = _c[0], setOptions = _c[1];
    var _d = React.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var brand = (0, forms_1.useFormFields)(function (_a) {
        var fields = _a[0], dispatch = _a[1];
        return fields.Car_Brand.value;
    });
    //向第三方找尋api，找尋相關資料
    React.useEffect(function () {
        if (!brand) {
            setOptions([]);
            setValue(undefined);
            return;
        }
        //遞迴尋找brand-type
        var allModelArr = [];
        var offsetNum = 0;
        var isEnding = false;
        var getCarModel = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, results, arr, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isEnding)
                            return [2 /*return*/];
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("https://public.opendatasoft.com//api/explore/v2.1/catalog/datasets/all-vehicles-model/records?group_by=model&order_by=model ASC&limit=50&offset=".concat(offsetNum, "&refine=make:\"").concat(brand, "\""))];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        results = (_a.sent()).results;
                        arr = results.map(function (i) {
                            return {
                                label: i.model,
                                value: i.model,
                            };
                        });
                        allModelArr.push.apply(allModelArr, arr);
                        //一次取50筆資料，最多50筆，滿足50筆執行下一次，無跳出迴圈
                        if (results.length === 50) {
                            offsetNum += 50;
                        }
                        else {
                            isEnding = true;
                            setOptions(allModelArr);
                            setIsLoading(false);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        setIsLoading(false);
                        console.log(err_1);
                        return [3 /*break*/, 5];
                    case 5:
                        getCarModel();
                        return [2 /*return*/];
                }
            });
        }); };
        getCarModel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brand]);
    return (React.createElement("div", null,
        React.createElement("label", { className: "field-label" },
            "\u8ECA\u578B (Car Type)",
            isLoading && (React.createElement("span", { style: { marginLeft: '4px', fontSize: '12px', color: 'gray' } }, "Loading..."))),
        React.createElement(forms_1.SelectInput, { path: path, name: path, value: value, options: options, onChange: function (e) {
                setValue(e === null || e === void 0 ? void 0 : e.value);
            }, style: { marginBottom: '12px' } })));
};
exports.CarModelSelectComponent = CarModelSelectComponent;
