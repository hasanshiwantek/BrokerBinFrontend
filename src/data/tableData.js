// import ShieldOfQuality from "../svgs/ShieldOfQuality"

// import { useSelector } from "react-redux";

// export const tableHeader = {
//   th: ["Cart"],
// };

// const { searchResponse } = useSelector((store) => store.searchProductStore);
export const tableData = [
  {
    id: 1,
    check: false,
    company: "Alltech Resources, LLC",
    country: "GBR",
    region: "Europe",
    model: "SPI350PFB-A",
    ts: false,
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: "CALL",
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED PSU",
    contact: "bob marli",
    heci: 20933,
    from: "Alice",
    to: "Bob",
    read: false,
  },
  {
    id: 2,
    check: false,
    company: "Tech Solutions, Inc.",
    country: "USA",
    region: "North America",
    model: "SPI350PFB-B",
    ts: true,
    mfg: "SPI",
    cond: "NEW",
    price: "$200",
    quantity: 2,
    age: 2,
    description: "400W 4-SATA 2-MOLEX PSU",
    contact: "john cena",
    heci: 30933,
    from: "Carol",
    to: "Dave",
    read: false,
  },
  {
    id: 3,
    check: false,
    company: "Global Tech, Ltd.",
    country: "CAN",
    region: "North America",
    model: "SPI350PFB-C",
    ts: false,
    mfg: "POWER SUPPLY CO",
    cond: "USED",
    price: "$150",
    quantity: 3,
    age: 3,
    description: "500W 2-SATA 4-MOLEX PSU",
    contact: "rock",
    heci: 40933,
    from: "Eve",
    to: "Frank",
    read: false,
  },
  {
    id: 4,
    check: false,
    company: "Innovative Solutions",
    country: "AUS",
    region: "Oceania",
    model: "SPI350PFB-D",
    ts: true,
    mfg: "INNOVATION POWER",
    cond: "REF",
    price: "CALL",
    quantity: 4,
    age: 4,
    description: "300W 6-SATA 1-MOLEX PSU",
    contact: "lolopopo",
    heci: 50933,
    from: "Grace",
    to: "Hank",
    read: false,
  },
  {
    id: 5,
    check: false,
    company: "Tech Innovators",
    country: "NZL",
    region: "Oceania",
    model: "SPI350PFB-E",
    ts: false,
    mfg: "TECHNO POWER",
    cond: "NEW",
    price: "$180",
    quantity: 5,
    age: 5,
    description: "450W 3-SATA 3-MOLEX PSU",
    contact: "popololo",
    heci: 60933,
    from: "Ivy",
    to: "Jack",
    read: false,
  },
  {
    id: 6,
    check: false,
    company: "Power Supply Experts",
    country: "ZAF",
    region: "Africa",
    model: "SPI350PFB-F",
    ts: true,
    mfg: "EXPERT POWER",
    cond: "USED",
    price: "$130",
    quantity: 6,
    age: 6,
    description: "600W 5-SATA 2-MOLEX PSU",
    contact: "atif aslam",
    heci: 70933,
    from: "Karen",
    to: "Leo",
    read: false,
  },
  {
    id: 7,
    check: false,
    company: "Sparkle Tech",
    country: "IND",
    region: "Asia",
    model: "SPI350PFB-G",
    ts: false,
    mfg: "SPARK TECH",
    cond: "REF",
    price: "CALL",
    quantity: 7,
    age: 7,
    description: "550W 7-SATA 1-MOLEX PSU",
    contact: "atif aslam",
    heci: 80933,
    from: "Mona",
    to: "Nate",
    read: false,
  },
  {
    id: 8,
    check: false,
    company: "Tech Supply Co.",
    country: "CHN",
    region: "Asia",
    model: "SPI350PFB-H",
    ts: true,
    mfg: "SUPPLY TECH",
    cond: "NEW",
    price: "$170",
    quantity: 8,
    age: 8,
    description: "350W 6-SATA 2-MOLEX PSU",
    contact: "atif aslam",
    heci: 90933,
    from: "Olive",
    to: "Paul",
    read: false,
  },
  {
    id: 9,
    check: false,
    company: "Global Power Supplies",
    country: "JPN",
    region: "Asia",
    model: "SPI350PFB-I",
    ts: false,
    mfg: "GLOBAL POWER",
    cond: "USED",
    price: "$120",
    quantity: 9,
    age: 9,
    description: "700W 4-SATA 3-MOLEX PSU",
    contact: "atif aslam",
    heci: 100933,
    from: "Quinn",
    to: "Ray",
    read: false,
  },
  {
    id: 10,
    check: false,
    company: "Innovative Electronics",
    country: "KOR",
    region: "Asia",
    model: "SPI350PFB-J",
    ts: true,
    mfg: "INNOVATE POWER",
    cond: "REF",
    price: "CALL",
    quantity: 10,
    age: 10,
    description: "650W 5-SATA 4-MOLEX PSU",
    contact: "atif aslam",
    heci: 110933,
    from: "Sara",
    to: "Tom",
    read: false,
  },
];

const manufacturerCount = {};
tableData.forEach((item) => {
  const manufacturer = item.mfg;
  manufacturerCount[manufacturer] = (manufacturerCount[manufacturer] || 0) + 1;
});
const conditionCount = {};
tableData.forEach((item) => {
  const condition = item.cond;
  conditionCount[condition] = (conditionCount[condition] || 0) + 1;
});
const regionCount = {};
tableData.forEach((item) => {
  const region = item.region;
  regionCount[region] = (regionCount[region] || 0) + 1;
});
const countryCount = {};
tableData.forEach((item) => {
  const country = item.country;
  countryCount[country] = (countryCount[country] || 0) + 1;
});

export const counts = {
  manufacturerCount,
  conditionCount,
  regionCount,
  countryCount,
};

export const searchHistory = [
  { product: "SPI350PFB", time: "Today" },
  { product: "SPI350PFB", time: "Today" },
  { product: "SPI350PFB", time: "Today" },
  { product: "SPI350PFB", time: "Today" },
  { product: "723580-001", time: "1 day(s)" },
  { product: "353083403", time: "1 day(s)" },
  { product: "681249-001", time: "1 day(s)" },
  { product: "463-6720", time: "1 day(s)" },
  { product: "0T9D4V", time: "1 day(s)" },
  { product: "57-1000492-01", time: "1 day(s)" },
  { product: "57-1000480-01", time: "1 day(s)" },
  { product: "57-1000326-01", time: "1 day(s)" },
  { product: "500523-001", time: "1 day(s)" },
  { product: "390858-006", time: "1 day(s)" },
  { product: "512734-001", time: "1 day(s)" },
  { product: "01PE816", time: "1 day(s)" },
  { product: "01PE651", time: "1 day(s)" },
  { product: "02YE753", time: "1 day(s)" },
  { product: "00MW544", time: "1 day(s)" },
  { product: "00MW544", time: "1 day(s)" },
  { product: "01KT927", time: "1 day(s)" },
  { product: "47C9978", time: "1 day(s)" },
  { product: "41Y9210", time: "1 day(s)" },
  { product: "SPI350PFB", time: "1 day(s)" },
  { product: "00AK104", time: "1 day(s)" },
  { product: "NTCA50BA PEGASUS OPC CONTR", time: "1 day(s)" },
  { product: "NTCA50BA", time: "1 day(s)" },
  { product: "NTCA50BA", time: "1 day(s)" },
  { product: "46M4003", time: "1 day(s)" },
  { product: "461-AAEM", time: "1 day(s)" },
  { product: "MAM1Q00A-QSA28", time: "1 day(s)" },
  { product: "39Y8924", time: "1 day(s)" },
  { product: "252850-001", time: "1 day(s)" },
  { product: "0B29868", time: "1 day(s)" },
  { product: "0B34994", time: "1 day(s)" },
  { product: "01KP971", time: "1 day(s)" },
  { product: "SPI350PFB", time: "1 day(s)" },
  { product: "SPI350PFB", time: "1 day(s)" },
  { product: "SPI350PFB", time: "1 day(s)" },
  { product: "SPI350PFB", time: "1 day(s)" },
  { product: "SPI350PFB", time: "1 day(s)" },
  { product: "097-0418-002", time: "2 day(s)" },
  { product: "01DC663", time: "2 day(s)" },
  { product: "01DC663", time: "2 day(s)" },
  { product: "00YJ783", time: "2 day(s)" },
  { product: "00YJ782", time: "2 day(s)" },
  { product: "00YE185", time: "2 day(s)" },
  { product: "00YA700", time: "2 day(s)" },
  { product: "00PA534", time: "2 day(s)" },
  { product: "PA9E", time: "2 day(s)" },
  { product: "J211H", time: "2 day(s)" },
  { product: "330-4128", time: "2 day(s)" },
  { product: "211H", time: "2 day(s)" },
  { product: "3GVVD", time: "2 day(s)" },
  { product: "D6000", time: "2 day(s)" },
  { product: "5110", time: "2 day(s)" },
  { product: "LGA2011", time: "2 day(s)" },
  { product: "PA4E", time: "2 day(s)" },
  { product: "D3100", time: "2 day(s)" },
  { product: "R710", time: "2 day(s)" },
  { product: "59826", time: "2 day(s)" },
  { product: "tn2gy", time: "2 day(s)" },
  { product: "M56DP", time: "2 day(s)" },
  { product: "828TT", time: "2 day(s)" },
  { product: "LGA2011", time: "2 day(s)" },
  { product: "7NVY2", time: "2 day(s)" },
  { product: "PS4210", time: "2 day(s)" },
  { product: "XPS9320-7416BLKPUS", time: "2 day(s)" },
  { product: "C855M", time: "2 day(s)" },
  { product: "XK104", time: "2 day(s)" },
  { product: "59826-APD", time: "2 day(s)" },
  { product: "K22A", time: "2 day(s)" },
  { product: "W55CJ", time: "2 day(s)" },
  { product: "0W55CJ", time: "2 day(s)" },
  { product: "00W55CJ", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "SPI350PFB", time: "2 day(s)" },
  { product: "63Wh", time: "2 day(s)" },
  { product: "EX4600", time: "2 day(s)" },
  { product: "EX4300-48T", time: "2 day(s)" },
  { product: "TM-m30ll-h", time: "2 day(s)" },
  { product: "TM-T88VI", time: "2 day(s)" },
  { product: "(B2360/B3460)", time: "2 day(s)" },
  { product: "1271436", time: "3 day(s)" },
  { product: "P520c", time: "3 day(s)" },
  { product: "M920z", time: "3 day(s)" },
  { product: "E5-26XX", time: "3 day(s)" },
  { product: "CPX201/301/401LAMP", time: "3 day(s)" },
  { product: "5553L", time: "3 day(s)" },
  { product: "DPV4T", time: "3 day(s)" },
  { product: "647109-003", time: "3 day(s)" },
  { product: "60G-PM", time: "3 day(s)" },
  { product: "(60G-PM)", time: "3 day(s)" },
];

export const partVariance = [
  "SPI3001UH",
  "SPI3001UH1",
  "SPI3001UH2PCS",
  "SPI3001UHB204",
  "SPI3001UHOMN",
  "SPI300A8B8",
  "SPI300EP",
  "SPI300EPMPC",
  "SPI300F4BB",
  "SPI300F4BBSYM2",
  "SPI300G",
  "SPI300GCLONE",
  "SPI300GLSB204",
  "SPI300GSATA",
  "SPI300T8HNB",
  "SPI300T8HNBB204",
  "SPI3116F2255S",
  "SPI3501UH",
  "SPI3501UHB204",
  "SPI350PFB",
  "SPI350PFBCRU",
  "SPI350PFBEFI2",
  "SPI350U4BBHPR2",
  "SPI350U4BG",
  "SPI350U4BM8",
];

const mfgGroups = [];

tableData.forEach((e) => {
  const existingGroup = mfgGroups.find((group) => group.name === e.mfg);
  if (existingGroup) {
    existingGroup.value += 1;
  } else {
    mfgGroups.push({ name: e.mfg, value: 1 });
  }
});

const condBreakdown = [];

tableData.forEach((e) => {
  const existingGroup = condBreakdown.find((group) => group.name === e.cond);
  if (existingGroup) {
    existingGroup.value += 1;
  } else {
    condBreakdown.push({ name: e.cond, value: 1 });
  }
});
// console.log(condBreakdown);
export const breakdown = {
  mfgGroups,
  condBreakdown,
};

export const pieChartData = {
  labels: ["WTB", "WTS", "RFQ", "SVC"],
  name: [
    "Want To Buy",
    "Want To Sell",
    "Request For Quote",
    "Service Broadcasts",
  ],
  datasets: [
    {
      // label: 'My First Dataset',
      data: [670, 110, 394, 101],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "orange",
      ],
      hoverOffset: 5,
    },
  ],
};
export const inventoryData = [
  {
    name: "Inventory:",
    data: 0,
  },
  {
    name: "Uploaded:",
    data: "0 day[s] ago",
  },
  {
    name: "Expires:",
    data: "+9 Days",
  },
  {
    name: "Want to Sell:",
    data: 0,
  },
  {
    name: "Want to Buy:",
    data: 0,
  },
];
export const inventoryDataTotalParts = [
  {
    name: "Total Parts:",
    data: 14080671,
  },
  {
    name: "Total Companies:",
    data: 2738,
  },
  {
    name: "Shield Companies:",
    data: 117,
  },
  {
    name: "Who's New:",
    data: 43,
  },
];

export const panels = [
  {
    title: "5 parts with 5 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
  },
  {
    title: "4 parts with 4 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium harum autem delectus mollitia ab assumenda nemo facilis ea aliquam deleniti earum recusandae, eius, atque explicabo, expedita alias laboriosam labore iste.",
  },
  {
    title: "3 parts with 3 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
  },
  {
    title: "2 parts with 2 results",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nulla possimus obcaecati hic cumque amet totam, labore placeat. Laudantium consequatur expedita nihil ipsam at porro!",
  },
  {
    title: "1 parts with 1 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
  },
  {
    title: "5 parts with 5 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
  },
  {
    title: "4 parts with 4 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium harum autem delectus mollitia ab assumenda nemo facilis ea aliquam deleniti earum recusandae, eius, atque explicabo, expedita alias laboriosam labore iste.",
  },
  {
    title: "3 parts with 3 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
  },
  {
    title: "2 parts with 2 results",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nulla possimus obcaecati hic cumque amet totam, labore placeat. Laudantium consequatur expedita nihil ipsam at porro!",
  },
  {
    title: "1 parts with 1 results",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
  },
];

export const partList = [
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
  {
    check: false,
    model: "SPI350PFB",
    mfg: "SPI",
    cond: "REF",
    quantity: 1,
    age: 1,
  },
];
const cartList = [
  {
    check: false,
    country: "USA",
    company: "Serverworlds.com",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 20,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "GBR",
    company: "Alltech Resources, LLC",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 10,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "USA",
    company: "Alltech Resources, LLC",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 20,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "USA",
    company: "Serverworlds.com",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 220,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "GBR",
    company: "Alltech Resources, LLC",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 20,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "USA",
    company: "Alltech Resources, LLC",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 21,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "GBR",
    company: "Alltech Resources, LLC",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 55,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "USA",
    company: "Alltech Resources, LLC",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 2,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
  {
    check: false,
    country: "USA",
    company: "Serverworlds.com",
    model: "SPI350PFB",
    mfg: "SPARKLE POWER",
    cond: "REF",
    price: 20,
    quantity: 1,
    age: 1,
    description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
  },
];

export const organizedByCountry = cartList.reduce((acc, item) => {
  const { country } = item;
  if (!acc[country]) {
    acc[country] = [];
  }
  acc[country].push(item);
  return acc;
}, {});

export const organizedByCountryAndCompany = Object.entries(
  organizedByCountry
).reduce((acc, [country, items]) => {
  acc[country] = items.reduce((companyAcc, item) => {
    const { company } = item;
    if (!companyAcc[company]) {
      companyAcc[company] = [];
    }
    companyAcc[company].push(item);
    return companyAcc;
  }, {});
  return acc;
}, {});

// Object.entries(organizedByCountry).map((e) => {
// e[1].map(e=>console.log(e))
// console.log(e[0]);
// });
// Object.entries(organizedByCountryAndCompany).map(([country, companies]) => {
//   console.log(country);
//   console.log(companies);
//   Object.entries(companies).map(([company,data])=>{

//     console.log(company);

//     data.map((e)=>{
//       console.log(e);
//     })
//   })
//   // e[1].map(e=>console.log(e.check))
// });

// console.log(organizedByCountryAndCompany);
// console.log(organizedByCountry);

const companyInformation = [
  {
    Employees: "0 - 5",
    "Member Since": "17+ yrs",
    Open: "9 AM +0 GMT",
    Close: "6 PM +0 GMT",
    "Inventory Listed": 11238,
  },
];
const PrimaryContactInformation = [
  {
    Contact: "Dave Hamilton",
    Title: "Director",
    Phone: "+44-1273-701-648",
    Networks: "",
  },
];
const SalesInformation = [
  {
    "Lease Program": "No",
    "Trade Programs": "No",
    "Rental Programs": "No",
    "Blind Shipping": "No",
    "Shipping Deadline": "3 PM +0 GMT",
  },
];
export const companySideInformation = {
  companyInformation,
  PrimaryContactInformation,
  SalesInformation,
};

export const inventoryEditDeleteTable = [
  {
    th: [
      "Part#",
      "HECI / CLEI",
      "Mfg",
      "Price",
      "Qty",
      "Status",
      "Description",
      "Cond",
      "Special",
      "Age",
    ],
  },
  {
    td: [
      {
        id: 1,
        part: "SPI350PFB",
        mfg: "SPARKLE POWER",
        price: "CALL",
        quantity: 1,
        status: "pending",
        description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
        cond: "REF",
        special: "yes",
        age: 1,
      },
      {
        id: 2,
        part: "SPI350PFB",
        mfg: "SPARKLE POWER",
        price: "CALL",
        quantity: 1,
        status: "pending",
        description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
        cond: "REF",
        special: "yes",
        age: 1,
      },
      {
        id: 3,
        part: "SPI350PFB",
        mfg: "SPARKLE POWER",
        price: "CALL",
        quantity: 1,
        status: "pending",
        description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
        cond: "REF",
        special: "yes",
        age: 1,
      },
      {
        id: 4,
        part: "SPI350PFB",
        mfg: "SPARKLE POWER",
        price: "CALL",
        quantity: 1,
        status: "pending",
        description: "350W 8-SATA 2-MOLEX 2-FLOPPY LED AND 2-WIRE I/O ONLY PSU",
        cond: "REF",
        special: "yes",
        age: 1,
      },
    ],
  },
];
export const inventoryAddTable = [
  "Part / Model",
  "HECI / CLEI",
  "Mfg",
  "Price",
  "Qty",
  "Status",
  "Product Description",
  "Cond",
];

// console.log(inventoryEditDeleteTable[1].td.length == 0 );

// inventoryEditDeleteTable[0].th.filter((item) => true ? (item !== "HECI / CLEI") : item ).map((item) =>console.log(item))

export const companyList = [
  {
    ["Company #"]: [
      {
        name: "4D Companies, Inc.",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_ec39a14993c2d4766280d53121448f14.png",
        address: "Hopkins, MN USA",
        phone: "952-484-1839",
        description:
          "Who are we: 4D is a services consulting firm and an independent distributor of IT hardware systems, parts and their related peripheral devices to the international community at large.What we do: We build relationships by working hand in hand with end users, leasing companies, maintenance...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [100, 8],
        ratingMember: "A 5 Star Member",
      },
      {
        name: "Compeve Corp.",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_15569.jpg",
        address: "Elmhurst, IL USA",
        phone: "708-331-3459",
        description:
          "Compeve Corporation Is a name recognized as the forerunner in Graphics Cards, Workstations, Server and Computer component sales and service. Since its establishment in 2005, Compeve Corporation quickly became a globally recognized provider of technology solutions for Corporate Clients also...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [94, 17],
        ratingMember: "A 5 Star Member",
      },
    ],
  },
  {
    ["Company A"]: [
      {
        name: "Alltech Resources, LLC",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_16224.jpg",
        address: "Seabrook, NH USA",
        phone: "603-474-1111",
        description:
          "ALLTECH RESOURCES, LLC, supplies warranted new and refurbished proprietary spare parts from IBM, DELL,HP, SUN AND CISCO. Our inventory stock has replacement parts for most Desktops, Servers, Laptops and networking equipment. ALLTECH RESOURCES ships globally and offers same day shipping and...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [100, 27],
        ratingMember: "A 5 Star Member",
      },
      {
        name: "Compeve Corp.",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_15569.jpg",
        address: "Elmhurst, IL USA",
        phone: "708-331-3459",
        description:
          "Compeve Corporation Is a name recognized as the forerunner in Graphics Cards, Workstations, Server and Computer component sales and service. Since its establishment in 2005, Compeve Corporation quickly became a globally recognized provider of technology solutions for Corporate Clients also...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [94, 17],
        ratingMember: "A 5 Star Member",
      },
    ],
  },
  {
    ["Company B"]: [
      {
        name: "Ignite IT LLC",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_38347533e36736d43ab228ebdf724235.jpg",
        address: "Minnetonka, MN USA",
        phone: "320-249-2345",
        description: "",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [100, 5],
        ratingMember: "A 5 Star Member",
      },
      {
        name: "PC Server & Parts",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_1018b06e0cbe9c8f6d27da104fac6d63.jpg",
        address: "New Hudson, MI USA",
        phone: "248-305-7900",
        description:
          "PC Server & Parts LLC. (PCSP) is a seller of OEM and surplus technology products. With 25 years of experience operating in Michigan, we are one of largest resellers of enterprise level servers, workstations, and network equipment. We buy & sell used and off-lease refurbished IT hardware including...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [100, 4],
        ratingMember: "A 5 Star Member",
      },
    ],
  },
  {
    ["Company C"]: [
      {
        name: "4D Companies, Inc.",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_ec39a14993c2d4766280d53121448f14.png",
        address: "Hopkins, MN USA",
        phone: "952-484-1839",
        description:
          "Who are we: 4D is a services consulting firm and an independent distributor of IT hardware systems, parts and their related peripheral devices to the international community at large.What we do: We build relationships by working hand in hand with end users, leasing companies, maintenance...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [100, 8],
        ratingMember: "A 5 Star Member",
      },
      {
        name: "Compeve Corp.",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_15569.jpg",
        address: "Elmhurst, IL USA",
        phone: "708-331-3459",
        description:
          "Compeve Corporation Is a name recognized as the forerunner in Graphics Cards, Workstations, Server and Computer component sales and service. Since its establishment in 2005, Compeve Corporation quickly became a globally recognized provider of technology solutions for Corporate Clients also...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [94, 17],
        ratingMember: "A 5 Star Member",
      },
    ],
  },
  {
    ["Company D"]: [
      {
        name: "Ignite IT LLC",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_38347533e36736d43ab228ebdf724235.jpg",
        address: "Minnetonka, MN USA",
        phone: "320-249-2345",
        description: "",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [100, 5],
        ratingMember: "A 5 Star Member",
      },
      {
        name: "PC Server & Parts",
        img: "https://ben.cachefly.net/upload/comp_logos/broker/logo_1018b06e0cbe9c8f6d27da104fac6d63.jpg",
        address: "New Hudson, MI USA",
        phone: "248-305-7900",
        description:
          "PC Server & Parts LLC. (PCSP) is a seller of OEM and surplus technology products. With 25 years of experience operating in Michigan, we are one of largest resellers of enterprise level servers, workstations, and network equipment. We buy & sell used and off-lease refurbished IT hardware including...",
        feedbackImg:
          "https://static.brokerbin.com/version/v8.1.5/images/stars/star_10.png",
        ratingCount: [100, 4],
        ratingMember: "A 5 Star Member",
      },
    ],
  },
];

// companyList.map((group,index)=>{
//   //getting the company name from the company list.
//   const groups = Object.keys(group)[0]
//   console.log(groups)
//   //getting the specific company list from that company object.
//   const companies = group[groups];
//   console.log(companies);

// });
