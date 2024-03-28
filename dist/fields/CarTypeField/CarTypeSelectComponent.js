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
exports.CarTypeSelectComponent = void 0;
var React = __importStar(require("react"));
var forms_1 = require("payload/components/forms");
var config_1 = require("../../config");
var CarTypeSelectComponent = function (_a) {
    var path = _a.path;
    var _b = (0, forms_1.useField)({ path: path }), value = _b.value, setValue = _b.setValue;
    var _c = React.useState(config_1.Car_Type), options = _c[0], setOptions = _c[1];
    return (React.createElement("div", null,
        React.createElement("label", { className: "field-label" }, "\u8ECA\u7A2E (Car Brand)"),
        React.createElement(forms_1.SelectInput, { path: path, name: path, options: options, value: value, onChange: function (e) { return setValue(e === null || e === void 0 ? void 0 : e.value); }, style: { marginBottom: '12px' } })));
};
exports.CarTypeSelectComponent = CarTypeSelectComponent;
