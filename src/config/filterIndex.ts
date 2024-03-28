export const SALE_CATEGORIES = [
  {
    title: 'ON SALE',
    subTitle: '特價車輛',
    status: 'onSale-vehicle',
  },
];

export const Car_Brand = [
  {
    value: 'AlfaRomeo(愛快羅密歐)',
    equals: 'AlfaRomeo',
  },
  {
    value: 'Audi(奧迪)',
    equals: 'Audi',
  },
  {
    value: 'BMW(寶馬)',
    equals: 'BMW',
  },
  {
    value: 'CMC(中華)',
    equals: 'CMC',
  },
  {
    value: 'Ford(福特)',
    equals: 'Ford',
  },
  {
    value: 'Honda(本田)',
    equals: 'Honda',
  },
  {
    value: 'Hyundai(現代)',
    equals: 'Hyundai',
  },
  {
    value: 'Infiniti(極致)',
    equals: 'Infiniti',
  },
  {
    value: 'Jaguar',
    equals: 'Jaguar',
  },
  {
    value: 'Kia(起亞)',
    equals: 'Kia',
  },
  {
    value: 'LandRover(荒原路華)',
    equals: 'LandRover',
  },
  {
    value: 'Lexus(凌志)',
    equals: 'Lexus',
  },
  {
    value: 'Luxgen(納智捷)',
    equals: 'Luxgen',
  },
  {
    value: 'Maserati(瑪莎拉蒂)',
    equals: 'Maserati',
  },
  {
    value: 'Mazda(馬自達)',
    equals: 'Mazda',
  },
  {
    value: 'Benz(賓士)',
    equals: 'Benz',
  },
  {
    value: 'Mini(迷你)',
    equals: 'Mini',
  },
  {
    value: 'Mitsubishi(三菱)',
    equals: 'Mitsubishi',
  },
  {
    value: 'Nissan(日產)',
    equals: 'Nissan',
  },
  {
    value: 'Peugeot(寶獅)',
    equals: 'Peugeot',
  },
  {
    value: 'Porsche(保時捷)',
    equals: 'Porsche',
  },
  {
    value: 'Proton',
    equals: 'Proton',
  },
  {
    value: 'Skoda',
    equals: 'Skoda',
  },
  {
    value: 'Subaru(速霸陸)',
    equals: 'Subaru',
  },
  {
    value: 'Suzuki(鈴木)',
    equals: 'Suzuki',
  },
  {
    value: 'Tesla',
    equals: 'Tesla',
  },
  {
    value: 'Toyota(豐田)',
    equals: 'Toyota',
  },
  {
    value: 'Volkswagen(福斯)',
    equals: 'Volkswagen',
  },
  {
    value: 'Volvo(富豪)',
    equals: 'Volvo',
  },
];

export const Car_Transmission = [
  {
    equals: 'MT',
    value: 'MT手排變速箱',
  },
  {
    equals: 'AT',
    value: 'AT自動變速箱',
  },
  {
    equals: 'AMT',
    value: 'AMT機械式自動變速箱',
  },
  {
    equals: 'CVT',
    value: 'CVT機械式無極變速箱',
  },
  {
    equals: 'DSG',
    value: 'DSG直接換檔變速箱',
  },
  {
    equals: 'DCT',
    value: 'DCT雙離合變速箱',
  },
  {
    equals: 'PDK',
    value: 'PDK雙離合器變速箱',
  },
];

export const Car_Fuel = [
  {
    equals: 'Gas',
    value: '汽油',
  },
  {
    equals: 'Diesel',
    value: '柴油',
  },
  {
    equals: 'Hybrid_Electric',
    value: '油電',
  },
  {
    equals: 'Hybrid',
    value: '混合動力',
  },
  {
    equals: 'Plug-in_Hybrid_Electric',
    value: '插電式混合動力車',
  },
  {
    equals: 'Extended_Range_Electric',
    value: '增程型電動車',
  },
  {
    equals: 'Electric',
    value: '電動',
  },
  {
    equals: 'Battery_Electric',
    value: '純電',
  },
  {
    equals: 'Fuel_Cell_Electric',
    value: '燃料電動',
  },
];

export const Car_Color = [
  {
    value: '紅色',
    equals: 'red',
  },
  {
    value: '橙色',
    equals: 'orange_color',
  },
  {
    value: '橘色',
    equals: 'orange',
  },
  {
    value: '黃色',
    equals: 'yellow',
  },
  {
    value: '金色',
    equals: 'gold',
  },
  {
    value: '棕色',
    equals: 'brown',
  },
  {
    value: '綠色',
    equals: 'green',
  },
  {
    value: '藍色',
    equals: 'blue',
  },
  {
    value: '藍紫色',
    equals: 'indigo',
  },
  {
    value: '紫色',
    equals: 'violet',
  },
  {
    value: '紫色',
    equals: 'violet',
  },
  {
    value: '灰色',
    equals: 'gray',
  },
  {
    value: '銀色',
    equals: 'sliver',
  },
  {
    value: '黑色',
    equals: 'black',
  },
  {
    value: '白色',
    equals: 'white',
  },
];

export const Product_Status = [
  //new-vehicle
  {
    name: 'onSale-vehicle',
    value: '特售車款',
  },
];

const FILTER_CONDITION = {
  Car_Brand: {
    name: 'Car_Brand',
    label: '品牌',
    filterType: 'equals',
  },
  Car_Type: {
    name: 'Car_Type',
    label: '車種',
    filterType: 'equals',
  },
  Car_Color: {
    name: 'Car_Color',
    label: '顏色',
    filterType: 'equals',
  },
  Car_Fuel: {
    name: 'Car_Fuel',
    label: '引擎燃料',
    filterType: 'equals',
  },
  Car_Transmission: {
    name: 'Car_Transmission',
    label: '變速系統',
    filterType: 'equals',
  },
  is_onSale: {
    name: 'onSale',
    label: '特售車輛',
    filterType: 'equals',
  },

  Car_CC: {
    name: 'Car_CC',
    label: '排氣量',
    filterType: 'in',
  },
  Car_Mileage: {
    name: 'Car_Mileage',
    label: '里程數',
    filterType: 'in',
  },
  //price and onSale must be choose onSale first.
  //condition onSale have greater than 0 ? onSale : price
  price: {
    name: 'price',
    label: '定價',
    filterType: 'isOnSale ? onSale : price ',
  },
};

export const Car_Mileage = [
  {
    less_than_equal: 10000,
    greater_than_equal: 0,
    value: '1萬公里以內',
  },
  {
    less_than_equal: 20000,
    greater_than_equal: 10000,
    value: '1~2萬公里',
  },
  {
    less_than_equal: 50000,
    greater_than_equal: 20000,
    value: '2~5萬公里',
  },
  {
    less_than_equal: 100000,
    greater_than_equal: 50000,
    value: '5~10萬公里',
  },
  {
    less_than_equal: 150000,
    greater_than_equal: 100000,
    value: '10~15萬公里',
  },
  {
    less_than_equal: 200000,
    greater_than_equal: 150000,
    value: '15~20萬公里',
  },
  {
    less_than_equal: 90000000,
    greater_than_equal: 200000,
    value: '20萬公里以上',
  },
];

export const Car_CC = [
  {
    less_than_equal: 1200,
    greater_than_equal: 0,
    value: '1200cc以下',
  },
  {
    less_than_equal: 1500,
    greater_than: 1200,
    value: '1200cc ~ 1500cc',
  },
  {
    less_than_equal: 1800,
    greater_than: 1500,
    value: '1500cc ~ 1800cc',
  },
  {
    less_than_equal: 2400,
    greater_than: 1800,
    value: '1800cc ~ 2400cc',
  },
  {
    less_than_equal: 3000,
    greater_than: 2400,
    value: '2400cc ~ 3000cc',
  },
  {
    less_than_equal: 3600,
    greater_than: 3000,
    value: '3000cc ~ 3600cc',
  },
  {
    less_than_equal: 90000,
    greater_than_equal: 3600,
    value: '3600cc以上',
  },
];

const date = new Date();
export const year = date.getFullYear();

export const Car_Year = [
  {
    less_than_equal: year - 1,
    value: `1年以內(${year - 1}年以內)`,
  },
  {
    less_than_equal: year - 1,
    greater_than_equal: year - 3,
    value: `1 ~ 3年(${year - 3} ~ ${year - 1})`,
  },
  {
    less_than_equal: year - 3,
    greater_than_equal: year - 5,
    value: `3 ~ 5年(${year - 5} ~ ${year - 3})`,
  },
  {
    less_than_equal: year - 5,
    greater_than_equal: year - 10,
    value: `5 ~ 10年(${year - 10} ~ ${year - 5})`,
  },
  {
    less_than_equal: year - 10,
    value: `10年以上(${year - 10}以上)`,
  },
];

export const price = [
  {
    less_than_equal: 100000,
    value: '10萬以下',
  },
  {
    less_than_equal: 350000,
    greater_than_equal: 100000,
    value: '10萬 ~ 35萬',
  },
  {
    less_than_equal: 500000,
    greater_than_equal: 350000,
    value: '35萬 ~ 50萬',
  },
  {
    less_than_equal: 1000000,
    greater_than_equal: 500000,
    value: '50萬 ~ 100萬',
  },
  {
    less_than_equal: 1500000,
    greater_than_equal: 1000000,
    value: '100萬 ~ 150萬',
  },
  {
    greater_than_equal: 1500000,
    value: '150萬以上',
  },
];
