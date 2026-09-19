/**
 * Commodity Pulse Tracker - Application Controller
 */

let appState = {
  data: null,
  currency: 'USD', // 'USD' or 'KRW'
  selectedItemId: 'cocoa',
  selectedRange: '7D',
  activeCategory: 'all',
  searchQuery: '',
  cardFilter: 'featured', // 'featured' (주요 품목), 'gainers' (상승), 'losers' (하락)
  newsLang: 'KR',
  chartInstance: null
};

// Fallback seed data in case file:// CORS restricts fetch
const FALLBACK_DATA = {
  "fetch_status": "error",
  "last_updated": "2026-09-19 19:04:20",
  "weekly_report": {
    "title": "[2026 Week 38 Report]",
    "week_number": 38,
    "week_date_range": "2026.09.14 ~ 2026.09.18",
    "weekly_price_title": "[W38 주요품목가격]",
    "date": "2026.09.19",
    "report_date": "2026.09.19, 19:04",
    "top_gainer": "라우릭 오일 : $1,930.00 (▲0.31%)",
    "top_loser": "코코아 : $5,330.00 (▼7.66%)",
    "weekly_price_list": [
      "코코아 : $5,330.00 (▲1.85%)",
      "아라비카 커피 : $6,111.21 (▼3.49%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,868.00 (▲0.09%)",
      "GDT 전지분유 : $3,565.00 (▼0.56%)",
      "GDT 탈지분유 : $3,689.00 (▼0.16%)",
      "GDT 버터 : $4,760.00 (▼5.33%)",
      "팜유 : $1,206.50 (▼2.33%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,330.00 (▲1.85%)",
      "아라비카 커피 : $6,111.21 (▼3.49%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,868.00 (▲0.09%)",
      "GDT 전지분유 : $3,565.00 (▼0.56%)",
      "GDT 탈지분유 : $3,689.00 (▼0.16%)",
      "GDT 버터 : $4,760.00 (▼5.33%)",
      "팜유 : $1,206.50 (▼2.33%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,385.00원 (▲5.47원)",
    "fx_eur": "1,590.90원 (▲8.09원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "DS단석, 바이오원료 글로벌 판로 확대·협력방안 논의"
  },
  "daily_briefing": {
    "title": "[2026 Week 38 Report]",
    "week_number": 38,
    "week_date_range": "2026.09.14 ~ 2026.09.18",
    "weekly_price_title": "[W38 주요품목가격]",
    "date": "2026.09.19",
    "report_date": "2026.09.19, 19:04",
    "top_gainer": "라우릭 오일 : $1,930.00 (▲0.31%)",
    "top_loser": "코코아 : $5,330.00 (▼7.66%)",
    "weekly_price_list": [
      "코코아 : $5,330.00 (▲1.85%)",
      "아라비카 커피 : $6,111.21 (▼3.49%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,868.00 (▲0.09%)",
      "GDT 전지분유 : $3,565.00 (▼0.56%)",
      "GDT 탈지분유 : $3,689.00 (▼0.16%)",
      "GDT 버터 : $4,760.00 (▼5.33%)",
      "팜유 : $1,206.50 (▼2.33%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,330.00 (▲1.85%)",
      "아라비카 커피 : $6,111.21 (▼3.49%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,868.00 (▲0.09%)",
      "GDT 전지분유 : $3,565.00 (▼0.56%)",
      "GDT 탈지분유 : $3,689.00 (▼0.16%)",
      "GDT 버터 : $4,760.00 (▼5.33%)",
      "팜유 : $1,206.50 (▼2.33%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,385.00원 (▲5.47원)",
    "fx_eur": "1,590.90원 (▲8.09원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "DS단석, 바이오원료 글로벌 판로 확대·협력방안 논의"
  },
  "lastUpdated": "2026-09-19T19:04:20.082211+09:00",
  "usdKrwRate": 1385.0,
  "eurKrwRate": 1590.9,
  "marketStatus": "OPEN",
  "items": [
    {
      "id": "cocoa",
      "nameKr": "코코아 (Cocoa)",
      "nameEn": "Cocoa Futures",
      "symbol": "CC=F",
      "exchange": "ICE Futures US",
      "exchangeUrl": "https://www.ice.com/products/Futures-Options/Agricultural/Cocoa",
      "category": "beverage",
      "categoryKr": "음료 & 커피",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "서아프리카(가나, 코트디부아르) 기후 변화 및 질병 영향으로 유례없는 변동성을 보이는 핵심 원자재",
      "newsKeywords": "Cocoa price market news",
      "naverQuery": "코코아 가격",
      "guide": {
        "definition": "코트디부아르·가나 등 서아프리카산 카카오두 기준, 미국 ICE 거래소 선물 가격",
        "correlation": "글로벌 가공사·제과업체의 원료 매입 단가 기준\n선물 급등 시 6개월~1년 시차를 두고 수입 현물가 및 제품가에 직접 반영",
        "factors": [
          "서아프리카 가뭄 및 병충해(CSSVD) 발생 여부",
          "코트디부아르·가나 정부의 수매가(LID) 정책",
          "글로벌 가공업체 분쇄량(Grindings) 지표 및 완제품 소비 수요"
        ]
      },
      "price": 5330.0,
      "change": -442.0,
      "changePercent": -7.66,
      "high52w": 7230.0,
      "low52w": 2798.0,
      "high24h": 5684.0,
      "low24h": 5290.0,
      "high7d": 5995.0,
      "low7d": 5330.0,
      "high1m": 6650.0,
      "low1m": 5330.0,
      "volume": 24191,
      "sparkline": [
        5961.0,
        5933.0,
        5995.0,
        5895.0,
        5979.0,
        5772.0,
        5330.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5298.02
          },
          {
            "time": "11:00",
            "price": 5308.68
          },
          {
            "time": "13:00",
            "price": 5319.34
          },
          {
            "time": "19:04",
            "price": 5330.0
          }
        ],
        "7D": [
          {
            "date": "09-10",
            "price": 5961.0
          },
          {
            "date": "09-11",
            "price": 5933.0
          },
          {
            "date": "09-14",
            "price": 5995.0
          },
          {
            "date": "09-15",
            "price": 5895.0
          },
          {
            "date": "09-16",
            "price": 5979.0
          },
          {
            "date": "09-17",
            "price": 5772.0
          },
          {
            "date": "09-18",
            "price": 5330.0
          }
        ],
        "1M": [
          {
            "date": "08-19",
            "price": 6046.0
          },
          {
            "date": "08-20",
            "price": 6088.0
          },
          {
            "date": "08-21",
            "price": 5990.0
          },
          {
            "date": "08-24",
            "price": 5820.0
          },
          {
            "date": "08-25",
            "price": 5759.0
          },
          {
            "date": "08-26",
            "price": 5817.0
          },
          {
            "date": "08-27",
            "price": 6155.0
          },
          {
            "date": "08-28",
            "price": 6527.0
          },
          {
            "date": "08-31",
            "price": 6650.0
          },
          {
            "date": "09-01",
            "price": 6552.0
          },
          {
            "date": "09-02",
            "price": 6254.0
          },
          {
            "date": "09-03",
            "price": 6057.0
          },
          {
            "date": "09-04",
            "price": 6082.0
          },
          {
            "date": "09-08",
            "price": 5886.0
          },
          {
            "date": "09-09",
            "price": 5924.0
          },
          {
            "date": "09-10",
            "price": 5961.0
          },
          {
            "date": "09-11",
            "price": 5933.0
          },
          {
            "date": "09-14",
            "price": 5995.0
          },
          {
            "date": "09-15",
            "price": 5895.0
          },
          {
            "date": "09-16",
            "price": 5979.0
          },
          {
            "date": "09-17",
            "price": 5772.0
          },
          {
            "date": "09-18",
            "price": 5330.0
          }
        ],
        "1Y": [
          {
            "date": "2025-10",
            "price": 6151.0
          },
          {
            "date": "2025-11",
            "price": 5404.0
          },
          {
            "date": "2025-12",
            "price": 6065.0
          },
          {
            "date": "2026-01",
            "price": 4165.0
          },
          {
            "date": "2026-04",
            "price": 3494.0
          },
          {
            "date": "2026-05",
            "price": 3923.0
          },
          {
            "date": "2026-06",
            "price": 5002.0
          },
          {
            "date": "2026-07",
            "price": 5397.0
          },
          {
            "date": "2026-08",
            "price": 6650.0
          },
          {
            "date": "2026-09",
            "price": 5772.0
          },
          {
            "date": "2026-09",
            "price": 5330.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Cocoa Prices Plummet on Ample Near-Term Supplies - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxOUV90NW1EbFhNSjlJMG53LWlaekJaZm10NGhjMFlYaFNNRWlPUm51c1pNOTQyeHIxSVI3T0FITzN5ekEyVUxwM1Y1anpSQ3hsZ3JzdmdlR2NPMGZjb0pGNTNodHlGLWlBbU1aRVUwQ3VxQjNOS29aUUlEcEhQQkxCYUFfWlB4bVJHTF96NWw5MEl2Ykc0MTJj?oc=5",
          "date": "09-19 01:05"
        },
        {
          "title": "Valentine's Day shoppers face soaring chocolate prices - ABC News - Breaking News, Latest News and Videos",
          "source": "ABC News - Breaking News, Latest News and Videos",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOdHk5UVN1QjBrajdlbmpya0g4VjJfQ3BxLTM2X1hsem5lUG5TRVJlVEpTaEZGOUxwRkFIR3UwdDFzaGdUaWxyeGd6STZNX0FYa0tfT0ZjdmpCTlMtcldyMVU5anFsaExRUnFsZ0ZOTlA4S1FjdDdyNW5kc2FpZTRpSGpnSG12NkFRWVQ4WU93YzVnNURVREZ0dUtpYTZLNU96ZlNr0gGoAUFVX3lxTE1iZmtJbWlEVTNqRlYwU3pDeTFoVnNRbGZhM0JaaGhzZGo0VXd5eHM4dzJFZF81V0ZZMVNycml2ZWlkdmhKeXFhbS1GclJPLXZTelA2RDZRek1SeXlSb185OW52TU9ySVR5SnRSa2xPZThNTTNlQ3QxaUV0Zy1TVldMTUZFM083N0tOdi15VXFNYy0zTnhVWGE0dFprTXV3SkViZHUyWG94MQ?oc=5",
          "date": "09-17 23:05"
        },
        {
          "title": "The $4 Billion Debt Crisis: Cocoa Failure or Governance Failure? - Modern Ghana",
          "source": "Modern Ghana",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNNEJKbFY2UmZ0WDM3dklGdlZQTm42ZzUyNk0xUHVKSWVUU0tQSjVDeWF2MllVOE1icGJLaWhTWEo1cGhQZTBzRnl0SjJYTE1JaE5LRUdEN1ZZVnFxcXNESnQ1akpRNld3Y1lEcUhfMnRMQlVWSWRGWFJVRHZZNjVydjlCNHdSZjJteVl3akN6MG1WVVlEQm5WadIBmAFBVV95cUxNNEJKbFY2UmZ0WDM3dklGdlZQTm42ZzUyNk0xUHVKSWVUU0tQSjVDeWF2MllVOE1icGJLaWhTWEo1cGhQZTBzRnl0SjJYTE1JaE5LRUdEN1ZZVnFxcXNESnQ1akpRNld3Y1lEcUhfMnRMQlVWSWRGWFJVRHZZNjVydjlCNHdSZjJteVl3akN6MG1WVVlEQm5WaQ?oc=5",
          "date": "09-18 19:45"
        },
        {
          "title": "When cocoa prices fall, farmers shouldn’t have to bear the cost - Business & Financial Times",
          "source": "Business & Financial Times",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNNWRkeFBBZndVVHZZYlRzZkp1QW55VjdydWVDWXZwNWVtUUkzaHUzN0J0ejBmNWhQQ0VCXzZsOTdlXzhpd2NtdjFXVE1qRmhWbng3ck9vdFRpUXRzZFBrTF8yXzl2N2JaeG4tQlZraVQteExwT1haWjU5V2hTU29nTk94dG5HWmZiTXhQazFPZWl3WHhJaHhmcWtMQQ?oc=5",
          "date": "09-18 19:30"
        }
      ],
      "newsKr": [
        {
          "title": "S&P, 카메룬 국가신용등급 ’B-/B’ 확인...부채 전망 고려 - Investing.com 한국어",
          "source": "Investing.com 한국어",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE9RU1FzQThpeVdZalVjM2VGVkRCYmE1aFNfbjRVSV8yNVdfa0pLbDVPMHZCb1B5TmYzQTNZa0QxUXNBN181N0NON01ZMkVsTHc0NkVJdjNJYklPZE9RQkpzNERqeUN1SmNZeG5YOVBn?oc=5",
          "date": "09-19 05:18"
        },
        {
          "title": "고환율 버티니 이젠 원화 강세…K푸드, ‘수출·원가’ 엇갈린 셈법 - 더트래커",
          "source": "더트래커",
          "link": "https://news.google.com/rss/articles/CBMiWEFVX3lxTE44aUl5dGVlTTBiRDdGWnhST01RQ1phYzVMVXpYNERxNTYweTZ6WXZReE95N2RnaHh2ampfUThISjZnWXhaLXV5bnpjQnVhaGozcW1SX1ozTW0?oc=5",
          "date": "09-18 11:24"
        },
        {
          "title": "‘국민 과자’ 가격 또 오른다…해태제과 주요 제품, 10월부터 줄줄이 인상 - wikitree.co.kr",
          "source": "wikitree.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE5oTzRJX1dvUVNtcDM0a0E5ci1wMkdsNVluTzdCcElleUZsZGZDV3dySWJtNFZVaUNxQWRVQzV2aWlYcWhoX2Yyd3NlamlrU0NtcDRqbXRB?oc=5",
          "date": "09-18 15:48"
        },
        {
          "title": "커피 가격이 kg당 96,000 VND를 기록한 이후 지속적으로 하락하는 이유는 무엇일까요? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQakFwNmZ4NllwejM0MnR1YTlLcjJiMFZWZUdtRndxZEx3X1ZfY1BqM3ZNYUhLenY2VUZQc1BrSm5YUEZFNFNHVWZSbklKM1VBSkRvSDFPWWI3c045dHY3cHJrTWxiSEx3ZzJQNUVrcElXWHA5QUx6RVFvYm9zZDVHbWRGekVJZUdxeEZSWWl3?oc=5",
          "date": "09-19 14:50"
        }
      ]
    },
    {
      "id": "arabica",
      "nameKr": "아라비카 커피 (Arabica)",
      "nameEn": "Coffee C (Arabica)",
      "symbol": "KC=F",
      "exchange": "ICE Futures US",
      "exchangeUrl": "https://www.ice.com/products/Futures-Options/Agricultural/Coffee-C",
      "category": "beverage",
      "categoryKr": "음료 & 커피",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "브라질 가뭄 및 한파 우려와 글로벌 수프라 서플라이 체인 수급 동향에 민감하게 반응하는 프리미엄 원두",
      "newsKeywords": "Arabica coffee price market news",
      "naverQuery": "아라비카 커피 가격",
      "guide": {
        "definition": "브라질·콜롬비아 등 고지대 생산 스페셜티·원두커피용 품종, 미국 ICE 거래소 선물 가격",
        "correlation": "국제 원두 거래의 핵심 벤치마크\n수입 현물가는 선물 가격에 산지 프리미엄(Diff) 합산하여 결정",
        "factors": [
          "브라질 개화기 가뭄 및 결빙(서리) 피해",
          "브라질 헤알화 환율 변동에 따른 농가 출하량 조절",
          "유럽 삼림벌채방지법(EUDR) 등 글로벌 규제 이슈"
        ]
      },
      "price": 6111.21,
      "change": -294.32,
      "changePercent": -4.59,
      "high52w": 9655.13,
      "low52w": 5350.61,
      "high24h": 6194.98,
      "low24h": 6063.81,
      "high7d": 6951.17,
      "low7d": 6111.21,
      "high1m": 8327.95,
      "low1m": 6111.21,
      "volume": 11205,
      "sparkline": [
        6951.17,
        6914.79,
        6775.9,
        6606.14,
        6522.37,
        6405.52,
        6111.21
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 6074.54
          },
          {
            "time": "11:00",
            "price": 6086.77
          },
          {
            "time": "13:00",
            "price": 6098.99
          },
          {
            "time": "19:04",
            "price": 6111.21
          }
        ],
        "7D": [
          {
            "date": "09-10",
            "price": 6951.17
          },
          {
            "date": "09-11",
            "price": 6914.79
          },
          {
            "date": "09-14",
            "price": 6775.9
          },
          {
            "date": "09-15",
            "price": 6606.14
          },
          {
            "date": "09-16",
            "price": 6522.37
          },
          {
            "date": "09-17",
            "price": 6405.52
          },
          {
            "date": "09-18",
            "price": 6111.21
          }
        ],
        "1M": [
          {
            "date": "08-19",
            "price": 7925.61
          },
          {
            "date": "08-20",
            "price": 8016.0
          },
          {
            "date": "08-21",
            "price": 7909.07
          },
          {
            "date": "08-24",
            "price": 8327.95
          },
          {
            "date": "08-25",
            "price": 8187.96
          },
          {
            "date": "08-26",
            "price": 7883.72
          },
          {
            "date": "08-27",
            "price": 7537.6
          },
          {
            "date": "08-28",
            "price": 7624.68
          },
          {
            "date": "08-31",
            "price": 7581.69
          },
          {
            "date": "09-01",
            "price": 7545.31
          },
          {
            "date": "09-02",
            "price": 7239.97
          },
          {
            "date": "09-03",
            "price": 7150.68
          },
          {
            "date": "09-04",
            "price": 7148.48
          },
          {
            "date": "09-08",
            "price": 7020.61
          },
          {
            "date": "09-09",
            "price": 7037.15
          },
          {
            "date": "09-10",
            "price": 6951.17
          },
          {
            "date": "09-11",
            "price": 6914.79
          },
          {
            "date": "09-14",
            "price": 6775.9
          },
          {
            "date": "09-15",
            "price": 6606.14
          },
          {
            "date": "09-16",
            "price": 6522.37
          },
          {
            "date": "09-17",
            "price": 6405.52
          },
          {
            "date": "09-18",
            "price": 6111.21
          }
        ],
        "1Y": [
          {
            "date": "2025-10",
            "price": 8643.21
          },
          {
            "date": "2025-11",
            "price": 9105.08
          },
          {
            "date": "2025-12",
            "price": 7688.61
          },
          {
            "date": "2026-01",
            "price": 7324.85
          },
          {
            "date": "2026-04",
            "price": 6633.7
          },
          {
            "date": "2026-05",
            "price": 5855.47
          },
          {
            "date": "2026-06",
            "price": 6860.78
          },
          {
            "date": "2026-07",
            "price": 7321.54
          },
          {
            "date": "2026-08",
            "price": 7581.69
          },
          {
            "date": "2026-09",
            "price": 6405.52
          },
          {
            "date": "2026-09",
            "price": 6111.21
          }
        ]
      },
      "newsEn": [
        {
          "title": "Signs of Improving Global Supplies Weigh on Coffee Prices - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNRGhPMk0zTURSMVJTUU1xRXFRaXlmcDNmVGpkOTA0cWNObU95Mjl0bnAtWkl3UXlWSW5aU1llNkhFYVhIWnA4cWQ1T2N2dko0SkNtbGNyQVNBYXJIbFU5UnNqTnQwWl8xYXk3ZWlQWlBzNENyMVBFcjF1R1RTZEk5SXo5b280TlRHRDdENkFkMlJUWTRySW9ZSDNaQmVkeVFQOXNjNURHbWNkRTlaazBBY0RBM0tOWXc?oc=5",
          "date": "09-17 03:28"
        },
        {
          "title": "Agricultural product prices today, September 19, 2026: Domestic coffee prices continue to fall, pepper prices remain stable; Vietnamese goods expand opportunities in the Russian market. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi6wFBVV95cUxPX0VNVTlLOUx1X3p4b1pER0hzUHV2TGM3bE9La2JSSDFwYVg2QjZYMVF2Rk5uRjJJdDhpb3ExUUxPUTRWTkk2T2UtRnBqSlJtZld2ZnZPTVQ3b1NYRjFtd0F2Wk4yY0JTNEpXS3Joa25vY1pCbjNrY3hJTEJ4QzhVMmNyVkhkbHM0MDFsUXV1b1ZhUndhR01TSU13ek5FU3FseW1FNTJxOUZhUUt4VnJQSmh6cDcwLUNzZ1ZQaW9Ma3JMd3dDdmJaQnpJcWt0OGZyYlRrTF84TV9oZURVRmJvNTFoV3BESTZvT2tz?oc=5",
          "date": "09-19 15:44"
        },
        {
          "title": "Commodity market: Crude oil and coffee prices both fall. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxQOHU5TXUxb0NURDIxaFp6SDgxMDJ1bWdob19haDdob1NqQUk2ZnVTWUxmLXRTa180V29VSWduVFNMZ1dHSUtVTmVFVU5WdFo0Y3hMbXIweDhQZTNnU1pYcUNHSmRxSXZXODdsdS0xblBTOS01RFpHb1NCVmpmOUNIcE1QWkw4bFVSMmc?oc=5",
          "date": "09-17 15:41"
        },
        {
          "title": "Agricultural commodity prices today, September 17, 2026: Coffee prices fluctuate amidst oversupply; Can Thailand avoid the risk of increased tariffs from the US? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi4gFBVV95cUxNaU5HbFl4QnZxWldqVi1aZFhHbko4bTVzeXNyVXVpZlVMTW5ONm02bko1ZS16TlgtYnhYeFFoYzhaYjktSVBmZGlTSENxZmxfMGh6bXN5aVk3OGUxSjN0WXhRNGlkelFKUVNuT3hoRGpQQ3pNSGJ3dzg2RUVjQy02c19laW1Ob1NhQ1VaemxZVHhyNzE3X0xiVkdSQWNpQzNTaFc1bVN3eEFZcVJmMWtwelVRUUxRQk5xbmJyOG1yNVdXYnZESEhURkVsemtuZVd5Z0UtVzdUTXdBQVh3bFdrTmVR?oc=5",
          "date": "09-17 13:44"
        }
      ],
      "newsKr": [
        {
          "title": "커피 가격이 kg당 96,000 VND를 기록한 이후 지속적으로 하락하는 이유는 무엇일까요? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQakFwNmZ4NllwejM0MnR1YTlLcjJiMFZWZUdtRndxZEx3X1ZfY1BqM3ZNYUhLenY2VUZQc1BrSm5YUEZFNFNHVWZSbklKM1VBSkRvSDFPWWI3c045dHY3cHJrTWxiSEx3ZzJQNUVrcElXWHA5QUx6RVFvYm9zZDVHbWRGekVJZUdxeEZSWWl3?oc=5",
          "date": "09-19 14:50"
        },
        {
          "title": "아라비카 커피 가격, 수출 회복과 재고 부족이 엇갈리는 이유 - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE9RcFFGSXlCWWR3b0c4czA4NWlocHEtTmNfM3hpb1loUnhSbXlHRmstRGtrbVRYakh0U01oZUptaGxCSURmd2VwRnJuNUFDVWpLUXc?oc=5",
          "date": "09-17 13:05"
        },
        {
          "title": "오늘(9월 19일) 커피 가격: 아라비카와 로부스타 모두 하락 압력을 받고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxNSzZPS01DTmx1OVZTWXNXQXZIY041N2xzSjlmMVRPTlA3VTFGVnhPenVDUXhVUW82bHZkaDBwQzVsM2ZNSmstVHlnMDBIcmQ5b3pwUGU4dnpYS0tMMjVNUWs4cENBdUdiZ09FNm4xc2RtOXlPQlFEYmpWbjZQci16VkxmUnlsM3JIZHktVzQyTE4?oc=5",
          "date": "09-19 07:31"
        },
        {
          "title": "2026년 9월 19일 오늘 농산물 가격: 국내 커피 가격은 계속 하락하고 있으며, 후추 가격은 안정세를 유지하고 있습니다. 베트남산 제품은 러시아 시장에서 기회를 확대하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi6wFBVV95cUxQWldqWkRpbjdvRG81TTQ0WTd2T3lpdldWV3BZUktUN1AxUEd2UkJxNEptdWxTWF9wZzcyY0V3VVNTWThldktYWFM5SXl4bExHOTRiTFB4b1pDUW12T3dYYnV4b2p3RnFNeUM3V01iVGVxQS14NG53bFlMaElPb1NlVnhod0NrU3JfOHgtUlVmVzlPdG9DTV81cENNcWxhY3NLNHR2UHVveEVTeWdxZExuSXZSZ3RvdGJWaUQ2OWZDdFRLSnZ5QnYzWjRYZEE1bmFYcTdVSmZiWnNYeWtWWTY1Uk0zdUNSdElCVmdv?oc=5",
          "date": "09-19 16:00"
        }
      ],
      "original_price_lb": 277.2
    },
    {
      "id": "robusta",
      "nameKr": "로부스타 커피 (Robusta)",
      "nameEn": "Robusta Coffee",
      "symbol": "RC=F",
      "exchange": "ICE Europe (London)",
      "exchangeUrl": "https://www.ice.com/products/Futures-Options/Agricultural/Robusta-Coffee",
      "category": "beverage",
      "categoryKr": "음료 & 커피",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "인스턴트 커피 및 에스프레소 블렌드 핵심 원료로 베트남 건기 이상 기후로 가격 급등세 유지",
      "newsKeywords": "Robusta coffee market news",
      "naverQuery": "로부스타 커피 가격",
      "guide": {
        "definition": "베트남·인도네시아 등 저지대 생산 인스턴트·에스프레소용 품종, 런던 ICE Europe 선물 가격",
        "correlation": "글로벌 인스턴트 커피 및 캔커피 제조사의 원가 기준\n직관성 확보를 위해 아라비카(¢/lb)와 달리 톤당 달러($/MT)로 환산 표기\n아라비카 가격 급등 시 대체재 수요 증가로 연동성 강화",
        "factors": [
          "최대 생산국 베트남 기후(가뭄 및 우기 강우량)",
          "산지 농가의 재고 비축 및 출하 속도",
          "수에즈 운하 등 주요 해상 항로 물류 차질"
        ]
      },
      "price": 3728.0,
      "change": -11.0,
      "changePercent": -0.29,
      "high52w": 3919.0,
      "low52w": 3555.0,
      "high24h": 3766.0,
      "low24h": 3672.0,
      "high7d": 3777.0,
      "low7d": 3594.0,
      "high1m": 3884.0,
      "low1m": 3594.0,
      "volume": 12850,
      "sparkline": [
        3777.0,
        3752.0,
        3644.0,
        3594.0,
        3644.0,
        3739.0,
        3728.0
      ],
      "history": {
        "7D": [
          {
            "date": "08-11",
            "price": 3777.0
          },
          {
            "date": "08-12",
            "price": 3752.0
          },
          {
            "date": "08-13",
            "price": 3644.0
          },
          {
            "date": "08-14",
            "price": 3594.0
          },
          {
            "date": "08-17",
            "price": 3644.0
          },
          {
            "date": "08-18",
            "price": 3739.0
          },
          {
            "date": "08-19",
            "price": 3728.0
          }
        ],
        "1M": [
          {
            "date": "07-20",
            "price": 3884.0
          },
          {
            "date": "07-21",
            "price": 3818.0
          },
          {
            "date": "07-22",
            "price": 3796.0
          },
          {
            "date": "07-23",
            "price": 3708.0
          },
          {
            "date": "07-24",
            "price": 3757.0
          },
          {
            "date": "07-27",
            "price": 3799.0
          },
          {
            "date": "07-28",
            "price": 3859.0
          },
          {
            "date": "07-29",
            "price": 3749.0
          },
          {
            "date": "07-30",
            "price": 3761.0
          },
          {
            "date": "07-31",
            "price": 3775.0
          },
          {
            "date": "08-03",
            "price": 3784.0
          },
          {
            "date": "08-04",
            "price": 3853.0
          },
          {
            "date": "08-05",
            "price": 3884.0
          },
          {
            "date": "08-06",
            "price": 3787.0
          },
          {
            "date": "08-07",
            "price": 3767.0
          },
          {
            "date": "08-10",
            "price": 3795.0
          },
          {
            "date": "08-11",
            "price": 3777.0
          },
          {
            "date": "08-12",
            "price": 3752.0
          },
          {
            "date": "08-13",
            "price": 3644.0
          },
          {
            "date": "08-14",
            "price": 3594.0
          },
          {
            "date": "08-17",
            "price": 3644.0
          },
          {
            "date": "08-18",
            "price": 3739.0
          },
          {
            "date": "08-19",
            "price": 3728.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 3705.63
          },
          {
            "time": "11:00",
            "price": 3713.09
          },
          {
            "time": "13:00",
            "price": 3720.54
          },
          {
            "time": "19:04",
            "price": 3728.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 4465.2
          },
          {
            "date": "2025-09",
            "price": 4539.62
          },
          {
            "date": "2025-10",
            "price": 4614.04
          },
          {
            "date": "2025-11",
            "price": 4651.25
          },
          {
            "date": "2025-12",
            "price": 4576.83
          },
          {
            "date": "2026-01",
            "price": 4502.41
          },
          {
            "date": "2026-02",
            "price": 4390.78
          },
          {
            "date": "2026-03",
            "price": 4279.15
          },
          {
            "date": "2026-04",
            "price": 4167.52
          },
          {
            "date": "2026-05",
            "price": 4055.89
          },
          {
            "date": "2026-06",
            "price": 3944.26
          },
          {
            "date": "2026-07",
            "price": 3832.63
          },
          {
            "date": "2026-08",
            "price": 3721.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Improving Global Supply Pressures Coffee Prices - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNMlhZUENCdnBwaUQyZW1PUnhrWU5SX1ZWS2g5VDltLUREV3lIRzF5cEhBYU1vWHZkeHhCZ3IyeDFNSFJjemRiQnJsM3dWUFlnUFJHbTU3TDRNQjJWYTJ4b2tlUHBPeTBvb0hjWnhPNVcwYTFvaG14WkRLYzVqV2NHZzBfUFJVbmNSSmZJWFdXSE9wakpRUGFDRmFxcXBPaXpxbDZyZkFBcEthUQ?oc=5",
          "date": "09-19 00:44"
        },
        {
          "title": "Coffee futures extend losses, Starbucks reportedly weighs sale of a majority stake of its sizable Japanese business - Comunicaffe International",
          "source": "Comunicaffe International",
          "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxNeDQ4c2NpOUlSVFRiVWtkdUJTLVQzbUNtYUJhd1I5c0tfblc5MlZ2dkxRV0pRSjdBaDN5OTlvbC1MdUltVE95allnM3VPM0ZkWEloR0xhX2xER3ZuMkxHVUwxXy1PWm85YTUyTkFaZnRKNV94bHJGMzB0Z0QtX0JVMWM1TGpQOGNOaDRBSi1jWk8zcmdwMU1VZ0lXQW1KQWIwLWRLTmxXdmpRZC1ld3RDdXBmNkcycDdnTnZiZk5XQVVTVlM2ekJmdDlrYjJCUQ?oc=5",
          "date": "09-17 07:59"
        },
        {
          "title": "Robusta coffee prices down in Vietnam - Business Recorder",
          "source": "Business Recorder",
          "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxNcFZEbnQ2RVpNTzFHUlRtakZWbV9HZTI2TEFub3J0c2tQendfeG93SUVyZTI5b0RUcGd1YU1qT1JDOVBxME1ZUUM0YkJGbU55eVY2eUxWcG1MLTJvVGU4TzZ6UUQ0Vzd4TXltNmdTOVhyUkJnVFRuVDJIRkNkSUZLdVlBWdIBVkFVX3lxTFBPcnpvQzhSTEp6RTJvNlBFTm1tbTlBdVkweFd0anFFT0dhUklleUN1dE9WS045Wk1QQUxEbExaT2RYdGQ3TF9Sb0EtaDBOV0NyR0ZqYUpB?oc=5",
          "date": "09-18 09:15"
        },
        {
          "title": "Agricultural commodity prices today, September 18, 2026: Coffee prices fall sharply amid a series of negative factors; US may ban fuel exports. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQenY4WEZDSGFkYW45YWVvTDByZW16Yng5THJwT3h2ZFJYRmNVcnBvTkRGQ0lMX1BpNHFpdXlza2I2NWFrTFdZb2dZUERnMlFfekk5eDRYbXNFZTJMUXhjVk1mVGxJOFB5eUpUbkIxUmNERVVSRTBGWC1EeU5mOHpPcEwzUU5iUE5ZU1Fhbld3ZWZLRTQzRWMybGNvYWhZNU5NN2VFSVBIaUxmczV6QWtyQWtjU1ZGU2VqdmRvTURycXo3ZDBPYXNfcWNmTzBxNUdLdi1DSTJ3?oc=5",
          "date": "09-18 13:21"
        }
      ],
      "newsKr": [
        {
          "title": "커피 가격이 kg당 96,000 VND를 기록한 이후 지속적으로 하락하는 이유는 무엇일까요? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQakFwNmZ4NllwejM0MnR1YTlLcjJiMFZWZUdtRndxZEx3X1ZfY1BqM3ZNYUhLenY2VUZQc1BrSm5YUEZFNFNHVWZSbklKM1VBSkRvSDFPWWI3c045dHY3cHJrTWxiSEx3ZzJQNUVrcElXWHA5QUx6RVFvYm9zZDVHbWRGekVJZUdxeEZSWWl3?oc=5",
          "date": "09-19 14:50"
        },
        {
          "title": "오늘(9월 19일) 커피 가격: 아라비카와 로부스타 모두 하락 압력을 받고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxNSzZPS01DTmx1OVZTWXNXQXZIY041N2xzSjlmMVRPTlA3VTFGVnhPenVDUXhVUW82bHZkaDBwQzVsM2ZNSmstVHlnMDBIcmQ5b3pwUGU4dnpYS0tMMjVNUWs4cENBdUdiZ09FNm4xc2RtOXlPQlFEYmpWbjZQci16VkxmUnlsM3JIZHktVzQyTE4?oc=5",
          "date": "09-19 07:31"
        },
        {
          "title": "오늘 9월 19일 커피 가격: 같은 방향으로 움직임 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxObGMwRFFBWjBJNlE4aFREV2VnQUtmbHUwMlFKckU5WXpJZTdYakRfVFhGaW5RQ25yUGc4TlRBNXlNUWNXazdQWGUxMk1Wb1lWTmhaMi1YWVYtc3JKOG5iMFJubTRfWC1SNExqLTFtOW5nLWx2a2NSZ2JEUDlYMnBkdHVkaEZYUnRQc1JMcXVwY1dOZw?oc=5",
          "date": "09-19 14:36"
        },
        {
          "title": "오늘의 농업 뉴스(9월 19일): 커피 가격이 계속 하락하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMihwFBVV95cUxPeWc2Z2liOTQ1ejRBcy1GOXdpVEVCeUcybWtRZjI4THRVY20zUnd5eDdscm4yenhDNkctZEdEYnlvZl9UNUVFeXpYRzZoWE9rZkR1UkIwN0JUUXNRZHpKeTlqRUhiZEUxYzhmclZJYjB3cGhOU3JUR2pKWUJJdlNjNUNhQUlnMXM?oc=5",
          "date": "09-19 11:30"
        }
      ]
    },
    {
      "id": "gdt-index",
      "nameKr": "GDT 지수 (Index)",
      "nameEn": "Global Dairy Trade Price Index",
      "symbol": "GDT-INDEX",
      "exchange": "Global Dairy Trade",
      "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
      "category": "dairy",
      "categoryKr": "유제품 (GDT Dairy)",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러 (평균)",
      "description": "글로벌 유제품 경매 종합 가중평균 거래가격 및 지수 (GDT Event Weighted Average Price & Index)",
      "newsKeywords": "Global Dairy Trade auction index news",
      "naverQuery": "GDT 지수 유제품",
      "guide": {
        "definition": "뉴질랜드 폰테라(Fonterra) 중심 글로벌 유제품 경매 플랫폼(GDT) 전 품목 가중평균 지표",
        "correlation": "전 세계 유제품 실거래가의 기준 방향성 결정\n2주 단위 경매 체결 결과가 각국 수입 계약 단가에 즉각 반영",
        "factors": [
          "중국 내수 원유 재고 수준 및 수입 수요",
          "뉴질랜드·EU 주요 산지의 산유량 증감",
          "국제 유가 변동에 따른 글로벌 해상 운임"
        ]
      },
      "price": 3868.0,
      "change": 3.37,
      "changePercent": -1.1,
      "high52w": 4164.31,
      "low52w": 3407.56,
      "high24h": 3868.0,
      "low24h": 3868.0,
      "high7d": 3871.1,
      "low7d": 3864.63,
      "high1m": 3871.1,
      "low1m": 3758.0,
      "volume": 42444,
      "sparkline": [
        3820.0,
        3758.0,
        3815.0,
        3778.0,
        3871.1,
        3864.63,
        3868.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-09-01 (Event 411)",
            "price": 3864.63
          },
          {
            "time": "2026-09-15 (Event 412)",
            "price": 3868.0
          }
        ],
        "7D": [
          {
            "date": "2026-08-18",
            "price": 3871.1
          },
          {
            "date": "2026-09-01",
            "price": 3864.63
          },
          {
            "date": "2026-09-15",
            "price": 3868.0
          }
        ],
        "1M": [
          {
            "date": "2026-07-07",
            "price": 3758.0
          },
          {
            "date": "2026-07-21",
            "price": 3815.0
          },
          {
            "date": "2026-08-04",
            "price": 3778.0
          },
          {
            "date": "2026-08-18",
            "price": 3871.1
          },
          {
            "date": "2026-09-01",
            "price": 3864.63
          },
          {
            "date": "2026-09-15",
            "price": 3868.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09-02",
            "price": 4106.1
          },
          {
            "date": "2025-09-16",
            "price": 4085.62
          },
          {
            "date": "2025-10-07",
            "price": 3984.29
          },
          {
            "date": "2025-10-21",
            "price": 3891.58
          },
          {
            "date": "2025-11-04",
            "price": 3776.23
          },
          {
            "date": "2025-11-18",
            "price": 3721.26
          },
          {
            "date": "2025-12-02",
            "price": 3626.39
          },
          {
            "date": "2025-12-16",
            "price": 3407.56
          },
          {
            "date": "2026-01-06",
            "price": 3672.75
          },
          {
            "date": "2026-01-20",
            "price": 3718.02
          },
          {
            "date": "2026-02-03",
            "price": 3895.89
          },
          {
            "date": "2026-02-17",
            "price": 3995.07
          },
          {
            "date": "2026-03-03",
            "price": 4164.31
          },
          {
            "date": "2026-03-17",
            "price": 3998.3
          },
          {
            "date": "2026-04-07",
            "price": 3974.59
          },
          {
            "date": "2026-04-21",
            "price": 3951.95
          },
          {
            "date": "2026-05-05",
            "price": 4032.8
          },
          {
            "date": "2026-05-19",
            "price": 4066.22
          },
          {
            "date": "2026-06-02",
            "price": 3880.0
          },
          {
            "date": "2026-06-16",
            "price": 3820.0
          },
          {
            "date": "2026-07-07",
            "price": 3758.0
          },
          {
            "date": "2026-07-21",
            "price": 3815.0
          },
          {
            "date": "2026-08-04",
            "price": 3778.0
          },
          {
            "date": "2026-08-18",
            "price": 3871.1
          },
          {
            "date": "2026-09-01",
            "price": 3864.63
          },
          {
            "date": "2026-09-15",
            "price": 3868.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Retaliatory Canadian tariffs hit US dairy markets - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPcncxajBkUkZfT3hnNkxuc25OanlZeTBYTnNpUGxieWZHOFVSazRCeUYxc09UMWtXbDYtcklJWkhXeWNMU2FZa19iUHlwN1JUSXE5Wkx0a0ZwckZXRHItTkJIM2ZBZzkza3U2Q0pTc2haWHprY3dBVXV0eXFVbHlzekFWNkFEOC1oTTR5TmI4Y0tVTy0tZzU5QTJPR21kaEJ0RmdtWFlMQWNuZEI1MlJLal9nRFFjQQ?oc=5",
          "date": "09-17 23:29"
        },
        {
          "title": "Global Dairy Markets Are Expected to Stabilise and Improve - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOYWpTeE5rOFh0Nk1lcVJYVzBJckxTTER1RXdISWx2XzhHdHExcjU3Z3U0RFZmU2dlOGM3b20zdmFIX2t3Z3hHRjhxUnlIVEw5UlVWcFNyVTJBdk4xbnNna1BFTnhGTzJSR1hNWDRsZ3cta1M1WHpUVjlJa2NSWmxKTnViVkxSbW9fY184OEp3eE9YYmJNUlZkRXN2QmY0dlVOTldUSnhxVlVHRms?oc=5",
          "date": "09-17 14:58"
        },
        {
          "title": "Dairy commodity prices fall - ukragroconsult.com",
          "source": "ukragroconsult.com",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTE9NZGxZRmtLTmxKMXh4blFsdThTbmZUdWQzdTNFR0JPbzRHVDNhSmNLSHJFYUYzejJST2NxOHc5djVnekhYNER2elYwa3k0UHlTUFA2TlJXa09vcmg3Qk1tQzE2WGlBTE1yZTdLR0FlY00?oc=5",
          "date": "09-16 22:41"
        },
        {
          "title": "Dairy Trends: short-term outlook for dairy markets stable and likely to improve 16 September 2026 Premium - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPM3BGSk10VnY5WFhSeld2U2FzSVJBb29wdlM0aUJWeHV6QmpmUW5rVXdwYm44UlJyMVNWWHljUjFfc1hIS1Q2Y3E0eGdFUnc4TDBIQ1pCMzQxX0VNUzBadkQ0YUM0Vnd6a1ZRd0ZGMFpaQmRtaDlLYzlBVTZUMllGMkFMYnI2VDdNc2F1a3JVZUVtNlZ0ajZDd2F4VnJoQXJyQTc0djFxRHFjWTZBRVN4M2RwekpQSnVvSUFCeDNHVUxZV1RKWDVUNDc2UXIzdw?oc=5",
          "date": "09-17 06:06"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 시세 7년 만에 최고치 기록 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBWdjdIaW9RWHBNV0ZRczRlREVWSlRHTkU2SkRla1R0VWdYNjZQV2cya1k1UFhta3RwTTJKSFRrNktxQU03N3FPRDV1UHJIZWVVZ2Q3U1lkQjdxVUw3Y1NtMl9xQzlWSExnY2FFRA?oc=5",
          "date": "12-09 17:00"
        },
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5PWTZ4b0NfZDlwckpnTF9yN3RMajUySkE4R1VidUpKaUZDYkVlWHZtYjlTaTFGLXd6VWpYY1pQOENxbkVBNUMwaUpNTjhQdlFKWEE?oc=5",
          "date": "06-12 16:00"
        }
      ]
    },
    {
      "id": "gdt-milk",
      "nameKr": "GDT 전지분유 (WMP)",
      "nameEn": "GDT Whole Milk Powder (WMP)",
      "symbol": "GDT-WMP",
      "exchange": "Global Dairy Trade",
      "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
      "category": "dairy",
      "categoryKr": "유제품 (GDT Dairy)",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "글로벌 유제품 가격 벤치마크(뉴질랜드 Fonterra 중심 경매 지수). 격주 화요일 경매 데이터 자동 실시간 연동",
      "newsKeywords": "Global Dairy Trade Whole Milk Powder news",
      "naverQuery": "GDT 전지분유 가격",
      "guide": {
        "definition": "원유에서 수분만 제거한 유지방 함유 분말인 전지분유 - GDT 경매 거래 가격",
        "correlation": "제과·제빵 및 조제분유 수입 현물 계약의 직접적 기준 가격\n국제 유제품 유통 시장 수급 상황 신속 반영",
        "factors": [
          "중국의 전지분유 수입 재개 및 수입량 추이",
          "뉴질랜드 목초지 기후 조건 및 원유 공급량",
          "글로벌 유제품 소비 트렌드"
        ]
      },
      "price": 3565.0,
      "change": -20.0,
      "changePercent": -0.56,
      "high52w": 3863.0,
      "low52w": 3161.0,
      "high24h": 3565.0,
      "low24h": 3565.0,
      "high7d": 3591.0,
      "low7d": 3565.0,
      "high1m": 3591.0,
      "low1m": 3425.0,
      "volume": 28500,
      "sparkline": [
        3589.0,
        3425.0,
        3486.0,
        3483.0,
        3591.0,
        3585.0,
        3565.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-09-01 (Event 411)",
            "price": 3585.0
          },
          {
            "time": "2026-09-15 (Event 412)",
            "price": 3565.0
          }
        ],
        "7D": [
          {
            "date": "2026-08-18",
            "price": 3591.0
          },
          {
            "date": "2026-09-01",
            "price": 3585.0
          },
          {
            "date": "2026-09-15",
            "price": 3565.0
          }
        ],
        "1M": [
          {
            "date": "2026-07-07",
            "price": 3425.0
          },
          {
            "date": "2026-07-21",
            "price": 3486.0
          },
          {
            "date": "2026-08-04",
            "price": 3483.0
          },
          {
            "date": "2026-08-18",
            "price": 3591.0
          },
          {
            "date": "2026-09-01",
            "price": 3585.0
          },
          {
            "date": "2026-09-15",
            "price": 3565.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09-02",
            "price": 3809.0
          },
          {
            "date": "2025-09-16",
            "price": 3790.0
          },
          {
            "date": "2025-10-07",
            "price": 3696.0
          },
          {
            "date": "2025-10-21",
            "price": 3610.0
          },
          {
            "date": "2025-11-04",
            "price": 3503.0
          },
          {
            "date": "2025-11-18",
            "price": 3452.0
          },
          {
            "date": "2025-12-02",
            "price": 3364.0
          },
          {
            "date": "2025-12-16",
            "price": 3161.0
          },
          {
            "date": "2026-01-06",
            "price": 3407.0
          },
          {
            "date": "2026-01-20",
            "price": 3449.0
          },
          {
            "date": "2026-02-03",
            "price": 3614.0
          },
          {
            "date": "2026-02-17",
            "price": 3706.0
          },
          {
            "date": "2026-03-03",
            "price": 3863.0
          },
          {
            "date": "2026-03-17",
            "price": 3709.0
          },
          {
            "date": "2026-04-07",
            "price": 3687.0
          },
          {
            "date": "2026-04-21",
            "price": 3666.0
          },
          {
            "date": "2026-05-05",
            "price": 3741.0
          },
          {
            "date": "2026-05-19",
            "price": 3772.0
          },
          {
            "date": "2026-06-02",
            "price": 3706.0
          },
          {
            "date": "2026-06-16",
            "price": 3589.0
          },
          {
            "date": "2026-07-07",
            "price": 3425.0
          },
          {
            "date": "2026-07-21",
            "price": 3486.0
          },
          {
            "date": "2026-08-04",
            "price": 3483.0
          },
          {
            "date": "2026-08-18",
            "price": 3591.0
          },
          {
            "date": "2026-09-01",
            "price": 3585.0
          },
          {
            "date": "2026-09-15",
            "price": 3565.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Retaliatory Canadian tariffs hit US dairy markets - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPcncxajBkUkZfT3hnNkxuc25OanlZeTBYTnNpUGxieWZHOFVSazRCeUYxc09UMWtXbDYtcklJWkhXeWNMU2FZa19iUHlwN1JUSXE5Wkx0a0ZwckZXRHItTkJIM2ZBZzkza3U2Q0pTc2haWHprY3dBVXV0eXFVbHlzekFWNkFEOC1oTTR5TmI4Y0tVTy0tZzU5QTJPR21kaEJ0RmdtWFlMQWNuZEI1MlJLal9nRFFjQQ?oc=5",
          "date": "09-17 23:29"
        },
        {
          "title": "Economic Update: USDA ends mandatory farmer funding of ESG commitments in dairy checkoff - Ag Proud",
          "source": "Ag Proud",
          "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNMjBFYW9kMWhUamg2XzE3N1BYTy1PWTBBVVF3VUpVQ1owVk1vZGc0eEUxUUl3UjE1UElPaS1oTXBvV1FrQWRhQkZUdkxMVEhfeVllcjhmaFNaNUMyVnRMcFRuZXdObFF6V21Fb2dCOWk1aS16WkRxbWVvQ1cyUVVGNFZ6WUpYYi1LVG1XOEEyVWtLM2ZWOGZxTXdCbzJ2WXRKTHVUWTljendrOFpLRk5uMmhWRWVFekVtZ3o3dGVUSThQR2wz?oc=5",
          "date": "09-18 04:11"
        },
        {
          "title": "Dairygold Lifts August Milk Price By 0.5c/L To 39c/L On Improving Market Sentiment - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPU0NISERMX2VOVWhvdXFDeE1WdnlCT0lLSkF4UDNUU2V5YmVIS0NKQnM4TjlhX2U5SjBzZDV0Nl9yZnV6UHBzV083c0VTQkN1SElvWG15dWdxMDhxX0dRa2ZReEt3cVltRk40a21hS0RDa29lRFd1SENtYXBQN0l1VGZ4WUt0b0lONDdnSF9VaWtsVjFCb0F4b1g0bUlIZEw3UkVmNFAxY3BYel8wZXc?oc=5",
          "date": "09-18 05:46"
        },
        {
          "title": "Global Dairy Markets Are Expected to Stabilise and Improve - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOYWpTeE5rOFh0Nk1lcVJYVzBJckxTTER1RXdISWx2XzhHdHExcjU3Z3U0RFZmU2dlOGM3b20zdmFIX2t3Z3hHRjhxUnlIVEw5UlVWcFNyVTJBdk4xbnNna1BFTnhGTzJSR1hNWDRsZ3cta1M1WHpUVjlJa2NSWmxKTnViVkxSbW9fY184OEp3eE9YYmJNUlZkRXN2QmY0dlVOTldUSnhxVlVHRms?oc=5",
          "date": "09-17 14:58"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 시세 7년 만에 최고치 기록 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBWdjdIaW9RWHBNV0ZRczRlREVWSlRHTkU2SkRla1R0VWdYNjZQV2cya1k1UFhta3RwTTJKSFRrNktxQU03N3FPRDV1UHJIZWVVZ2Q3U1lkQjdxVUw3Y1NtMl9xQzlWSExnY2FFRA?oc=5",
          "date": "12-09 17:00"
        },
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5PWTZ4b0NfZDlwckpnTF9yN3RMajUySkE4R1VidUpKaUZDYkVlWHZtYjlTaTFGLXd6VWpYY1pQOENxbkVBNUMwaUpNTjhQdlFKWEE?oc=5",
          "date": "06-12 16:00"
        }
      ]
    },
    {
      "id": "gdt-smp",
      "nameKr": "GDT 탈지분유 (SMP)",
      "nameEn": "GDT Skim Milk Powder (SMP)",
      "symbol": "GDT-SMP",
      "exchange": "Global Dairy Trade",
      "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
      "category": "dairy",
      "categoryKr": "유제품 (GDT Dairy)",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "제과/제빵 및 단백질 식품 원료로 활용되는 글로벌 탈지분유 벤치마크 경매 가격",
      "newsKeywords": "GDT Skim Milk Powder market news",
      "naverQuery": "GDT 탈지분유 가격",
      "guide": {
        "definition": "원유에서 지방을 분리 제거 후 건조한 분말인 탈지분유 - GDT 경매 거래 가격",
        "correlation": "음료, 제과, 빙과류 제조 원가 지표\n버터 부산물로 버터 생산량과 밀접하게 연동",
        "factors": [
          "유럽 및 오세아니아 유가공 공장 가동률",
          "버터박(Buttermilk) 가공 비율 및 유청 단백질 수요",
          "식물성 대체 단백질 시장 가격 동향"
        ]
      },
      "price": 3689.0,
      "change": -6.0,
      "changePercent": -0.16,
      "high52w": 3695.0,
      "low52w": 2431.0,
      "high24h": 3689.0,
      "low24h": 3689.0,
      "high7d": 3695.0,
      "low7d": 3502.0,
      "high1m": 3695.0,
      "low1m": 3135.0,
      "volume": 18200,
      "sparkline": [
        3368.0,
        3135.0,
        3234.0,
        3261.0,
        3502.0,
        3695.0,
        3689.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-09-01 (Event 411)",
            "price": 3695.0
          },
          {
            "time": "2026-09-15 (Event 412)",
            "price": 3689.0
          }
        ],
        "7D": [
          {
            "date": "2026-08-18",
            "price": 3502.0
          },
          {
            "date": "2026-09-01",
            "price": 3695.0
          },
          {
            "date": "2026-09-15",
            "price": 3689.0
          }
        ],
        "1M": [
          {
            "date": "2026-07-07",
            "price": 3135.0
          },
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          },
          {
            "date": "2026-08-18",
            "price": 3502.0
          },
          {
            "date": "2026-09-01",
            "price": 3695.0
          },
          {
            "date": "2026-09-15",
            "price": 3689.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09-02",
            "price": 2620.0
          },
          {
            "date": "2025-09-16",
            "price": 2615.0
          },
          {
            "date": "2025-10-07",
            "price": 2599.0
          },
          {
            "date": "2025-10-21",
            "price": 2559.0
          },
          {
            "date": "2025-11-04",
            "price": 2559.0
          },
          {
            "date": "2025-11-18",
            "price": 2542.0
          },
          {
            "date": "2025-12-02",
            "price": 2498.0
          },
          {
            "date": "2025-12-16",
            "price": 2431.0
          },
          {
            "date": "2026-01-06",
            "price": 2564.0
          },
          {
            "date": "2026-01-20",
            "price": 2615.0
          },
          {
            "date": "2026-02-03",
            "price": 2874.0
          },
          {
            "date": "2026-02-17",
            "price": 2973.0
          },
          {
            "date": "2026-03-03",
            "price": 3243.0
          },
          {
            "date": "2026-03-17",
            "price": 3409.0
          },
          {
            "date": "2026-04-07",
            "price": 3381.0
          },
          {
            "date": "2026-04-21",
            "price": 3448.0
          },
          {
            "date": "2026-05-05",
            "price": 3547.0
          },
          {
            "date": "2026-05-19",
            "price": 3552.0
          },
          {
            "date": "2026-06-02",
            "price": 3457.0
          },
          {
            "date": "2026-06-16",
            "price": 3368.0
          },
          {
            "date": "2026-07-07",
            "price": 3135.0
          },
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          },
          {
            "date": "2026-08-18",
            "price": 3502.0
          },
          {
            "date": "2026-09-01",
            "price": 3695.0
          },
          {
            "date": "2026-09-15",
            "price": 3689.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Economic Update: USDA ends mandatory farmer funding of ESG commitments in dairy checkoff - Ag Proud",
          "source": "Ag Proud",
          "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNMjBFYW9kMWhUamg2XzE3N1BYTy1PWTBBVVF3VUpVQ1owVk1vZGc0eEUxUUl3UjE1UElPaS1oTXBvV1FrQWRhQkZUdkxMVEhfeVllcjhmaFNaNUMyVnRMcFRuZXdObFF6V21Fb2dCOWk1aS16WkRxbWVvQ1cyUVVGNFZ6WUpYYi1LVG1XOEEyVWtLM2ZWOGZxTXdCbzJ2WXRKTHVUWTljendrOFpLRk5uMmhWRWVFekVtZ3o3dGVUSThQR2wz?oc=5",
          "date": "09-18 04:11"
        },
        {
          "title": "Dairy Trends: short-term outlook for dairy markets stable and likely to improve 16 September 2026 Premium - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPM3BGSk10VnY5WFhSeld2U2FzSVJBb29wdlM0aUJWeHV6QmpmUW5rVXdwYm44UlJyMVNWWHljUjFfc1hIS1Q2Y3E0eGdFUnc4TDBIQ1pCMzQxX0VNUzBadkQ0YUM0Vnd6a1ZRd0ZGMFpaQmRtaDlLYzlBVTZUMllGMkFMYnI2VDdNc2F1a3JVZUVtNlZ0ajZDd2F4VnJoQXJyQTc0djFxRHFjWTZBRVN4M2RwekpQSnVvSUFCeDNHVUxZV1RKWDVUNDc2UXIzdw?oc=5",
          "date": "09-17 06:06"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 시세 7년 만에 최고치 기록 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBWdjdIaW9RWHBNV0ZRczRlREVWSlRHTkU2SkRla1R0VWdYNjZQV2cya1k1UFhta3RwTTJKSFRrNktxQU03N3FPRDV1UHJIZWVVZ2Q3U1lkQjdxVUw3Y1NtMl9xQzlWSExnY2FFRA?oc=5",
          "date": "12-09 17:00"
        }
      ]
    },
    {
      "id": "gdt-butter",
      "nameKr": "GDT 버터 (Butter)",
      "nameEn": "GDT Butter",
      "symbol": "GDT-BUTTER",
      "exchange": "Global Dairy Trade",
      "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
      "category": "dairy",
      "categoryKr": "유제품 (GDT Dairy)",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "유지방 가공식품 및 베이커리 핵심 소재인 글로벌 버터 국제 경매 가격",
      "newsKeywords": "Global Dairy Trade Butter price news",
      "naverQuery": "GDT 버터 가격",
      "guide": {
        "definition": "유지방 80% 이상 유제품인 버터 - GDT 경매 거래 가격",
        "correlation": "베이커리·유가공 업체의 직수입 단가 벤치마크\n유지방 수급 불균형 시 단기 변동폭 확대",
        "factors": [
          "베이커리 성수기(연말 및 명절) 수요 집중",
          "계절별 원유 내 유지방(Fat) 함유율 변화",
          "식물성 대체 유지(팜유, 마가린 등)와의 가격차"
        ]
      },
      "price": 4760.0,
      "change": -268.0,
      "changePercent": -5.33,
      "high52w": 6969.0,
      "low52w": 4760.0,
      "high24h": 4760.0,
      "low24h": 4760.0,
      "high7d": 5090.0,
      "low7d": 4760.0,
      "high1m": 5336.0,
      "low1m": 4760.0,
      "volume": 14300,
      "sparkline": [
        5516.0,
        5336.0,
        5303.0,
        5225.0,
        5090.0,
        5028.0,
        4760.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-09-01 (Event 411)",
            "price": 5028.0
          },
          {
            "time": "2026-09-15 (Event 412)",
            "price": 4760.0
          }
        ],
        "7D": [
          {
            "date": "2026-08-18",
            "price": 5090.0
          },
          {
            "date": "2026-09-01",
            "price": 5028.0
          },
          {
            "date": "2026-09-15",
            "price": 4760.0
          }
        ],
        "1M": [
          {
            "date": "2026-07-07",
            "price": 5336.0
          },
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          },
          {
            "date": "2026-08-18",
            "price": 5090.0
          },
          {
            "date": "2026-09-01",
            "price": 5028.0
          },
          {
            "date": "2026-09-15",
            "price": 4760.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09-02",
            "price": 6969.0
          },
          {
            "date": "2025-09-16",
            "price": 6892.0
          },
          {
            "date": "2025-10-07",
            "price": 6712.0
          },
          {
            "date": "2025-10-21",
            "price": 6662.0
          },
          {
            "date": "2025-11-04",
            "price": 6371.0
          },
          {
            "date": "2025-11-18",
            "price": 5886.0
          },
          {
            "date": "2025-12-02",
            "price": 5169.0
          },
          {
            "date": "2025-12-16",
            "price": 5012.0
          },
          {
            "date": "2026-01-06",
            "price": 5206.0
          },
          {
            "date": "2026-01-20",
            "price": 5314.0
          },
          {
            "date": "2026-02-03",
            "price": 5773.0
          },
          {
            "date": "2026-02-17",
            "price": 6347.0
          },
          {
            "date": "2026-03-03",
            "price": 6728.0
          },
          {
            "date": "2026-03-17",
            "price": 6868.0
          },
          {
            "date": "2026-04-07",
            "price": 6181.0
          },
          {
            "date": "2026-04-21",
            "price": 5702.0
          },
          {
            "date": "2026-05-05",
            "price": 5525.0
          },
          {
            "date": "2026-05-19",
            "price": 5674.0
          },
          {
            "date": "2026-06-02",
            "price": 5734.0
          },
          {
            "date": "2026-06-16",
            "price": 5516.0
          },
          {
            "date": "2026-07-07",
            "price": 5336.0
          },
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          },
          {
            "date": "2026-08-18",
            "price": 5090.0
          },
          {
            "date": "2026-09-01",
            "price": 5028.0
          },
          {
            "date": "2026-09-15",
            "price": 4760.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Retaliatory Canadian tariffs hit US dairy markets - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPcncxajBkUkZfT3hnNkxuc25OanlZeTBYTnNpUGxieWZHOFVSazRCeUYxc09UMWtXbDYtcklJWkhXeWNMU2FZa19iUHlwN1JUSXE5Wkx0a0ZwckZXRHItTkJIM2ZBZzkza3U2Q0pTc2haWHprY3dBVXV0eXFVbHlzekFWNkFEOC1oTTR5TmI4Y0tVTy0tZzU5QTJPR21kaEJ0RmdtWFlMQWNuZEI1MlJLal9nRFFjQQ?oc=5",
          "date": "09-17 23:29"
        },
        {
          "title": "CME Weekly Average Cash Grade AA Butter Prices Hold Within Charted Range - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOamZnTkdORG1felRhX1prS1NRSkZ4bzV4N0tZZlhwRlFxTG54cFVYcF81NkZaUVJ5aVlZRUdmUmp0MTdaUkI2ZTJ3Z3hERFU0TkVDOXFtSVZyMndOcGYwSnEyVXRqR1VnekRfYllUVUw3WE02ZVVQangwMExBWThkRDJ4QkloLVBRUDJVYVNWVnJFNjNCMGlJOTRJWkluUVRGQlJsYw?oc=5",
          "date": "09-19 03:20"
        },
        {
          "title": "Brownfield Ag dairy markets | Nonfat Dry Milk Climbs to $2.05 as CME Cash Dairy Prices Settle Mixed - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPUFI3YUpOVlBFbzVWeFlsaFJJbE5JeE9fWnZOQ0lWQ1Axd0IySGhSQ0xqdkhYOFRUczJwZEE5bW41R1JtUTJ4UTFxZVFCSFhsb0lBU21hQVhPSnhqdVR5Z0JJRjVaR251dWhqQ1lPTXFLSzZCbGNDNzRjbi1CaW9wUU5uTTg5SFVXSWhzXzZXNUxBQllYSGYxaE5FRQ?oc=5",
          "date": "09-17 19:51"
        },
        {
          "title": "Economic Update: USDA ends mandatory farmer funding of ESG commitments in dairy checkoff - Ag Proud",
          "source": "Ag Proud",
          "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNMjBFYW9kMWhUamg2XzE3N1BYTy1PWTBBVVF3VUpVQ1owVk1vZGc0eEUxUUl3UjE1UElPaS1oTXBvV1FrQWRhQkZUdkxMVEhfeVllcjhmaFNaNUMyVnRMcFRuZXdObFF6V21Fb2dCOWk1aS16WkRxbWVvQ1cyUVVGNFZ6WUpYYi1LVG1XOEEyVWtLM2ZWOGZxTXdCbzJ2WXRKTHVUWTljendrOFpLRk5uMmhWRWVFekVtZ3o3dGVUSThQR2wz?oc=5",
          "date": "09-18 04:11"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 시세 7년 만에 최고치 기록 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBWdjdIaW9RWHBNV0ZRczRlREVWSlRHTkU2SkRla1R0VWdYNjZQV2cya1k1UFhta3RwTTJKSFRrNktxQU03N3FPRDV1UHJIZWVVZ2Q3U1lkQjdxVUw3Y1NtMl9xQzlWSExnY2FFRA?oc=5",
          "date": "12-09 17:00"
        }
      ]
    },
    {
      "id": "palm",
      "nameKr": "팜유 (Palm Oil)",
      "nameEn": "Crude Palm Oil Futures",
      "symbol": "CPO=F",
      "exchange": "CME / Bursa Malaysia",
      "exchangeUrl": "https://www.bursamalaysia.com/market_information/equities_prices",
      "category": "oil",
      "categoryKr": "식용유 & 유지",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "세계 최대 소비 식용유 원자재로 인도네시아·말레이시아 기후 및 바이오디젤 수요 직결",
      "newsKeywords": "Crude Palm Oil price market news",
      "naverQuery": "팜유 가격 시세",
      "guide": {
        "definition": "인도네시아·말레이시아산 기름야자 열매 추출 식물성 유지, 말레이시아(BMD)/미국 CME 선물 가격",
        "correlation": "가공식품·제과·바이오디젤의 핵심 원가 지표\n실제 수입 시 FOB/CIF 현물 가격과 즉각 연동",
        "factors": [
          "인도네시아 바이오디젤 의무 혼합 비율(B35/B40) 및 수출 규제",
          "동남아 엘니뇨 가뭄에 따른 수확량 감소",
          "대체 식물성 유지인 대두유(Soybean Oil) 가격 추이"
        ]
      },
      "price": 1206.5,
      "change": -2.25,
      "changePercent": -0.19,
      "high52w": 1244.25,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1226.0,
      "low7d": 1206.5,
      "high1m": 1244.25,
      "low1m": 1173.5,
      "volume": 10,
      "sparkline": [
        1226.0,
        1212.0,
        1214.75,
        1218.75,
        1218.75,
        1208.75,
        1206.5
      ],
      "history": {
        "7D": [
          {
            "date": "09-10",
            "price": 1226.0
          },
          {
            "date": "09-11",
            "price": 1212.0
          },
          {
            "date": "09-14",
            "price": 1214.75
          },
          {
            "date": "09-15",
            "price": 1218.75
          },
          {
            "date": "09-16",
            "price": 1218.75
          },
          {
            "date": "09-17",
            "price": 1208.75
          },
          {
            "date": "09-18",
            "price": 1206.5
          }
        ],
        "1M": [
          {
            "date": "08-19",
            "price": 1173.5
          },
          {
            "date": "08-20",
            "price": 1181.25
          },
          {
            "date": "08-21",
            "price": 1184.5
          },
          {
            "date": "08-24",
            "price": 1181.0
          },
          {
            "date": "08-25",
            "price": 1181.0
          },
          {
            "date": "08-26",
            "price": 1177.75
          },
          {
            "date": "08-27",
            "price": 1177.0
          },
          {
            "date": "08-28",
            "price": 1178.0
          },
          {
            "date": "08-31",
            "price": 1178.0
          },
          {
            "date": "09-01",
            "price": 1244.25
          },
          {
            "date": "09-02",
            "price": 1239.5
          },
          {
            "date": "09-03",
            "price": 1229.5
          },
          {
            "date": "09-04",
            "price": 1234.25
          },
          {
            "date": "09-08",
            "price": 1243.75
          },
          {
            "date": "09-09",
            "price": 1238.5
          },
          {
            "date": "09-10",
            "price": 1226.0
          },
          {
            "date": "09-11",
            "price": 1212.0
          },
          {
            "date": "09-14",
            "price": 1214.75
          },
          {
            "date": "09-15",
            "price": 1218.75
          },
          {
            "date": "09-16",
            "price": 1218.75
          },
          {
            "date": "09-17",
            "price": 1208.75
          },
          {
            "date": "09-18",
            "price": 1206.5
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1199.26
          },
          {
            "time": "11:00",
            "price": 1201.67
          },
          {
            "time": "13:00",
            "price": 1204.09
          },
          {
            "time": "19:04",
            "price": 1206.5
          }
        ],
        "1Y": [
          {
            "date": "2025-10",
            "price": 1052.25
          },
          {
            "date": "2025-11",
            "price": 990.5
          },
          {
            "date": "2025-12",
            "price": 990.25
          },
          {
            "date": "2026-01",
            "price": 1021.0
          },
          {
            "date": "2026-02",
            "price": 1046.75
          },
          {
            "date": "2026-03",
            "price": 1138.0
          },
          {
            "date": "2026-04",
            "price": 1157.0
          },
          {
            "date": "2026-05",
            "price": 1144.5
          },
          {
            "date": "2026-06",
            "price": 1123.0
          },
          {
            "date": "2026-07",
            "price": 1127.5
          },
          {
            "date": "2026-08",
            "price": 1178.0
          },
          {
            "date": "2026-09",
            "price": 1208.75
          }
        ]
      },
      "newsEn": [
        {
          "title": "Expectations Of Higher Crude Oil Prices To Support Cpo Futures Next Week - BernamaBiz",
          "source": "BernamaBiz",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE1QOGpmZ0RGcWV2WlV5ajQ1cEYxSE1WUmZVbHRmUjFkWGZDdFZhSVNjVDFnVWU4N2w1eXlENTF2V3E0ZDE0cExYSDgwc0NaRzRwSUFKSTZfaFZFZw?oc=5",
          "date": "09-19 11:22"
        },
        {
          "title": "Palm oil falls following weaker rival vegetable oils and crude oil - ukragroconsult.com",
          "source": "ukragroconsult.com",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQd1VUazdYb3BldjR6STZQZWxCaUFNNXFLRURkbmtVWDZUZElzZ001czhKbWNvS3d2QUN3WEROMnhZTlFGaVo0YjdEQm9ja0ZKNWp5cFNfN2tsYVZJRnQxaUVqMllJc0hacXVBUGNRaHBLcEc1YVpXRlh4ZnBvdHZvTy1QMWhybEgxVk5ZeEtDUVlyR29FWURKUTRDNER6T19fa056Rw?oc=5",
          "date": "09-18 20:27"
        },
        {
          "title": "First Thing Today | Grains mixed overnight; bulls need a spark - Pro Farmer",
          "source": "Pro Farmer",
          "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNXzNOelZNTkFjRUNKWl9GazdlTXI4YjNmZUlnLXU1dnZRZC10QTJLRkk0UlhfTEpkWmU0RF83a3YxaEJMU2p4OGVvQ3k3N1Rtc1lpRmFrMzliMndzaGVtUEk2cVJ1dElwTHFScVZyMFc5aVhrMFhPTElFWGpsOXloSl9Vb3lPbE90clZNLVF5MEZDZS12bWYyY0E4bFZHeGZxTnBfaDFEMzU3UQ?oc=5",
          "date": "09-18 20:02"
        },
        {
          "title": "Indonesia Palm Oil Market Under Strain as Wildfires and El Niño Meet Rising B50 Biodiesel Demand - ChemAnalyst",
          "source": "ChemAnalyst",
          "link": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPQVVITGo2TDBRM1ZZa3hNRVJEdFkxS2Z3WUNnMGo5QkdWM09Nem9rbUZHRzNhNk8wRXB4cDBWWnY5NjZkRUVGMmZQVEpvQXZMeXJRcUl3Z3NwczV2TWJud1ZPMTQwdEJPeUJqc0xnM3A1eGVaem9OY3BiQUk0UUphU2QyaHY0WWk1SlJhZjFQeFVsaUdQRE1nQ2xpdGJLdGdERW9wUENOS192bXhQYTBTeFJTUzdSeVByZDd0RWR3WQ?oc=5",
          "date": "09-18 19:04"
        }
      ],
      "newsKr": [
        {
          "title": "해바라기유도 ‘껑충’…유지류 가격 초비상 [푸드360] - 헤럴드경제",
          "source": "헤럴드경제",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE14VjRvazRSVFdoc1RyclRjZWtudlozWm1ESDd4ay14amtHTkllclducHRFYXR5RlVEdVRCbDRZWjJvbExwUlJtbndlVFA0WGZzZk9Ic2V3?oc=5",
          "date": "08-10 16:00"
        },
        {
          "title": "밀가루·팜유에 용기까지 뛰었다…식품업계, 가격 인상 '궁여지책' - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE8zSnQ4UkszR1psQ0tpLVpfTmIzODYwaWx6UGlkbURQRWZBSDYxbnZwNjhZc2t0OHM0aVEwV1JGY29ZdGJoOHJvOUhTSEd2LWM0b3VHZzRTUExxOWpWSzlHLdIBeEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1ncw?oc=5",
          "date": "08-19 16:00"
        },
        {
          "title": "세계식량가격지수 3개월 연속 오름세…4월 130.7포인트 - 식품음료신문",
          "source": "식품음료신문",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTE1fbEljWDY1OFROSXRmNDlPS1RTb1JHWFliLUVNekpWM0J4aHk0TlM2RkprcV9aUUh4QjVkeFVUaVZucWxmZlBsSWZaSlg1SS12VlFzWkpsWnZGc1AtLVVkb0xMZjNxQ2JnYlNFS2NJZw?oc=5",
          "date": "05-15 16:00"
        },
        {
          "title": "\"국제 시세·환율 급등에\"...bhc, 해바라기유 공급가 20% 인상 - 청년일보",
          "source": "청년일보",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE5ZMlVqQ1VPU0tXTHhjNnZnQ3NNMjY0cWp5S0JJVElkOC1sdWN3V1FySFgxNFZURmctZWs0ajg0ZG82QkpXdlBOZzlBQnVVY3MwQTZSdzJIN3Y1Y0NBU1g4NGZNYmV0aVE?oc=5",
          "date": "12-24 17:00"
        }
      ]
    },
    {
      "id": "lauric-oil",
      "nameKr": "라우릭 오일 (Lauric Oil)",
      "nameEn": "Lauric Coconut & Palm Kernel Oil",
      "symbol": "LAURIC",
      "exchange": "Rotterdam / Asian Physical",
      "exchangeUrl": "https://www.indexmundi.com/commodities/?commodity=coconut-oil",
      "category": "oil",
      "categoryKr": "식용유 & 유지",
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "야자유(코코넛유) 및 팜핵유(PKO) 등 라우르산 계열 고급 식물성 유지 원자재",
      "newsKeywords": "Lauric oil Coconut oil market news",
      "naverQuery": "라우릭 오일 야자유 가격",
      "guide": {
        "definition": "팜핵유(CPKO) 및 야자유 등 라우르산 함유 특수 식물성 유지의 로테르담/아시아 현물가",
        "correlation": "선물 시장 부재로 로테르담 공시 현물가가 글로벌 수입 계약 기준\n가공식품 및 화학 유지류 수입 시 단가 산정의 직접 지표",
        "factors": [
          "필리핀·인도네시아 코코넛 수확량 및 태풍 피해",
          "초콜릿 코팅용 대용유지(CBR/CBS) 수요",
          "화장품·계면활성제 등 비식품 화학 산업 수요"
        ]
      },
      "price": 1930.0,
      "change": 6.0,
      "changePercent": 0.31,
      "high52w": 2360.34,
      "low52w": 1450.0,
      "high24h": 1930.0,
      "low24h": 1930.0,
      "high7d": 1941.58,
      "low7d": 1930.0,
      "high1m": 1957.98,
      "low1m": 1930.0,
      "volume": 4050,
      "sparkline": [
        2259.13,
        2360.34,
        2300.0,
        2172.0,
        1979.0,
        1924.0,
        1930.0
      ],
      "history": {
        "7D": [
          {
            "date": "09-13",
            "price": 1930.0
          },
          {
            "date": "09-14",
            "price": 1931.93
          },
          {
            "date": "09-15",
            "price": 1933.86
          },
          {
            "date": "09-16",
            "price": 1935.79
          },
          {
            "date": "09-17",
            "price": 1937.72
          },
          {
            "date": "09-18",
            "price": 1939.65
          },
          {
            "date": "09-19",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "08-21",
            "price": 1930.0
          },
          {
            "date": "08-22",
            "price": 1930.96
          },
          {
            "date": "08-23",
            "price": 1931.93
          },
          {
            "date": "08-24",
            "price": 1932.9
          },
          {
            "date": "08-25",
            "price": 1933.86
          },
          {
            "date": "08-26",
            "price": 1934.82
          },
          {
            "date": "08-27",
            "price": 1935.79
          },
          {
            "date": "08-28",
            "price": 1936.76
          },
          {
            "date": "08-29",
            "price": 1937.72
          },
          {
            "date": "08-30",
            "price": 1938.68
          },
          {
            "date": "08-31",
            "price": 1939.65
          },
          {
            "date": "09-01",
            "price": 1940.62
          },
          {
            "date": "09-02",
            "price": 1941.58
          },
          {
            "date": "09-03",
            "price": 1942.54
          },
          {
            "date": "09-04",
            "price": 1943.51
          },
          {
            "date": "09-05",
            "price": 1944.48
          },
          {
            "date": "09-06",
            "price": 1945.44
          },
          {
            "date": "09-07",
            "price": 1946.4
          },
          {
            "date": "09-08",
            "price": 1947.37
          },
          {
            "date": "09-09",
            "price": 1948.34
          },
          {
            "date": "09-10",
            "price": 1949.3
          },
          {
            "date": "09-11",
            "price": 1950.26
          },
          {
            "date": "09-12",
            "price": 1951.23
          },
          {
            "date": "09-13",
            "price": 1952.2
          },
          {
            "date": "09-14",
            "price": 1953.16
          },
          {
            "date": "09-15",
            "price": 1954.12
          },
          {
            "date": "09-16",
            "price": 1955.09
          },
          {
            "date": "09-17",
            "price": 1956.06
          },
          {
            "date": "09-18",
            "price": 1957.02
          },
          {
            "date": "09-19",
            "price": 1957.98
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1450.0
          },
          {
            "date": "2025-09",
            "price": 1490.0
          },
          {
            "date": "2025-10",
            "price": 1530.0
          },
          {
            "date": "2025-11",
            "price": 1580.0
          },
          {
            "date": "2025-12",
            "price": 1650.0
          },
          {
            "date": "2026-01",
            "price": 2197.02
          },
          {
            "date": "2026-02",
            "price": 2259.13
          },
          {
            "date": "2026-03",
            "price": 2360.34
          },
          {
            "date": "2026-04",
            "price": 2300.0
          },
          {
            "date": "2026-05",
            "price": 2172.0
          },
          {
            "date": "2026-06",
            "price": 1979.0
          },
          {
            "date": "2026-07",
            "price": 1924.0
          },
          {
            "date": "2026-08",
            "price": 1930.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1918.42
          },
          {
            "time": "11:00",
            "price": 1922.28
          },
          {
            "time": "13:00",
            "price": 1926.14
          },
          {
            "time": "19:04",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Desiccated coconuts: weather and energy costs weigh on the markets - mundus-agri.eu",
          "source": "mundus-agri.eu",
          "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQdWdMdnpYejMtS3BrX1BONGthX0xQYWpVa09DRWVkTVJldXRjSnN2OC10Y2h0aUxOOUVzbVhJbGJ5ZFpZUG50LTZ2YVI4OG1laDlzZTdwZHpqWmxsNHZ5Y1ZGNVlnbEVRSmpPSHNfeWgtV1hyNEd3aDdBSFh2a0MtVm0tUktzZ0czQ2pRWnFYWTcwSUMtRGV2Ym1jdVpOYzA?oc=5",
          "date": "05-13 16:00"
        },
        {
          "title": "Does Coconut Oil Benefit Your Skin? Experts Explain — Plus Products to Shop - TODAY.com",
          "source": "TODAY.com",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTFBQRUtma2JheTljOU9uX09lTVFQcWZhei05X2JMdEhsellRdHl5TS1QVk93ZWdOb3FHOVM5eFFFbVhBYms3Uk5DVE5fOUszczJ6b2pYdkxZSkFvTU9vYVpMZkpVSUtSUktQbFpsR0VHaW4?oc=5",
          "date": "02-04 17:00"
        },
        {
          "title": "7 natural hair oils that can help reduce hair fall - The Economic Times",
          "source": "The Economic Times",
          "link": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQMHVYZ2J6eGJWSk45S3d5TTYtMk15QUQ5am90UWdJVFp4VVRDbEx5NWQ5RUV5MUpXOEhYSERIMmgxLTVXbG9HRnNfSkJpMWlNMkpvTkxSa2VnY0NFNFd2c3NHQThZSTM3QlVhUVgySGpFWWdINzJjMzA4dUxWTXFQbTF0a0M0cEpNRVh3VHpHdDFNX1hGdjN1NE9PNWRlR2lCZUozVTBxd0lrRkFRU05tQ0lFc3FXeFZsTm42Z3k0cmdmZ2M?oc=5",
          "date": "08-27 16:00"
        },
        {
          "title": "Desiccated coconuts: high supply weighs on prices - mundus-agri.eu",
          "source": "mundus-agri.eu",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOSzBxNlpldUhhTjdaNFhEQ1BYOWYxeVlVaFRoSE9NXy1xdnYwVXVjdi0zQ3lmZElLeEI2ZWYxWjhrTGhnUEdkY0pMd2pRUkVqV1NKN3BhX2V3VUkxLWdPa09FcjRIZU5sMFRjOUZXa2RvWnN1ejZzVmpOeUxJLWltTDc0UEZtTG8yQVA0MDduZFRES1U?oc=5",
          "date": "06-30 16:00"
        }
      ],
      "newsKr": [
        {
          "title": "DS단석, 바이오원료 글로벌 판로 확대·협력방안 논의 - 에너지플랫폼뉴스",
          "source": "에너지플랫폼뉴스",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBZN0J6ck9ITFA4dUh2SVl3cWd4QzZEUUlNMzlFYS1qWVFoQUhNblVFUG5ybVM2UGRfeVVlX2ctdkZ5aXVrQWFCVEwzZ3FZdm1nYy1jUlVfMHdFMEdJZC1WTVRBRGZWX0ExUHMxU9IBcEFVX3lxTE0tekNYcm1sZ1IzejBsc2MtRllZQ1BpbDBVWmg2M0Q3ME9VTFA2YUFtdnNVY2hTaG1oUGxyUTQ4a0JBTnRQZ2h3V3lmaXlqaDNkWHZYVXRIWFBXa1lzMXppYnBCbDZTWGZ5amc1Q0VCS3U?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 글로벌 행사서 바이오디젤 공정 고도화 방향 제시 - 전기신문",
          "source": "전기신문",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9valNza2JQLW5XeHRlRWhaNUJ5bWh5QXpIaHlCbjNFbTRsdkkzc0plUkUzbjhRa2V6cklNbnB1aTZGdUpNUThNaTk4cllETEhzTjFPa3VGNlhHVTcyWXdmaXJJYzBnaV9FbmNwZtIBcEFVX3lxTE9zbVJLQURvVmN4Y1RqVXhUbTdXVlpKOHpBN1Q5S3hKQXhQRUFlZ1FWMU1GbXQ3ZndjY2hVNW5iSXA0cEFMeldMZlJWamVMZVY4NklvQmI0YmF0SzZHbkFlRGNReFNuY1ZSVk5mV0NDV3M?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 말레이시아 'POC 2026' 참가…해외 판로 확대 박차 - 전자신문",
          "source": "전자신문",
          "link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9TcVlCLW90bkJGSkxHZUstODJvUlQ5emIxNzVWRzl3c2Y2WWUzS3VXeFM5VktQcDhWSTdGZF92Nk42aDhXREs3YlVRZFp0Zw?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 말레이시아서 원료 조달·판로 확대 협의 - 디지털투데이",
          "source": "디지털투데이",
          "link": "https://news.google.com/rss/articles/CBMic0FVX3lxTE5vY2NPRnZrUGQxQkRQR1ZESVZyeTNjb0FIOVpJdFhVM2ZQMVNOZk02NHN0em5nNmZ1ZjVadWhBUnhDQXROTXBNbmhpaTdlZ2ktbDJsZ09SdzRZbjRwUktWWHNERS1VbENSMzdKQ1QzcnZzRVU?oc=5",
          "date": "02-19 17:00"
        }
      ]
    },
    {
      "id": "usd-krw",
      "nameKr": "USD/KRW",
      "nameEn": "US Dollar to Korean Won",
      "symbol": "KRW=X",
      "exchange": "Seoul Foreign Exchange",
      "exchangeUrl": "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_USDKRW",
      "category": "forex",
      "categoryKr": "환율 (Forex)",
      "currency": "KRW",
      "unit": "KRW / USD",
      "unitKr": "원화/달러",
      "description": "실시간 원/달러 환율 추이 및 일일 매매기준율",
      "newsKeywords": "US Dollar Korean Won USD KRW exchange rate news",
      "naverQuery": "원달러 환율 전망",
      "guide": {
        "definition": "서울 외환시장 기준 미국 달러 대비 대한민국 원화 교환 비율",
        "correlation": "외환 선물/NDF 시장 흐름이 현물 환율에 실시간 반영\n달러 결제 수입 원자재의 원화 환산 매입 원가 최종 결정",
        "factors": [
          "미국 연방준비제도(Fed) 기준금리 정책 방향",
          "국내 수출입 무역수지 및 외국인 자본 유출입",
          "지정학적 리스크에 따른 글로벌 안전자산 선호 심리"
        ]
      },
      "price": 1385.0,
      "change": 5.47,
      "changePercent": 0.4,
      "high52w": 1587.7,
      "low52w": 1322.42,
      "high24h": 1385.0,
      "low24h": 1385.0,
      "high7d": 1385.0,
      "low7d": 1344.64,
      "high1m": 1414.73,
      "low1m": 1339.17,
      "volume": 0,
      "sparkline": [
        1348.17,
        1344.64,
        1345.61,
        1363.57,
        1376.6,
        1379.53,
        1385.0
      ],
      "history": {
        "7D": [
          {
            "date": "09-10",
            "price": 1348.17
          },
          {
            "date": "09-13",
            "price": 1344.64
          },
          {
            "date": "09-14",
            "price": 1345.61
          },
          {
            "date": "09-15",
            "price": 1363.57
          },
          {
            "date": "09-16",
            "price": 1376.6
          },
          {
            "date": "09-17",
            "price": 1379.53
          },
          {
            "date": "09-19",
            "price": 1385.0
          }
        ],
        "1M": [
          {
            "date": "08-17",
            "price": 1414.73
          },
          {
            "date": "08-18",
            "price": 1413.58
          },
          {
            "date": "08-19",
            "price": 1389.4
          },
          {
            "date": "08-20",
            "price": 1390.79
          },
          {
            "date": "08-23",
            "price": 1384.98
          },
          {
            "date": "08-24",
            "price": 1380.76
          },
          {
            "date": "08-25",
            "price": 1381.49
          },
          {
            "date": "08-26",
            "price": 1383.49
          },
          {
            "date": "08-27",
            "price": 1380.45
          },
          {
            "date": "08-30",
            "price": 1377.11
          },
          {
            "date": "08-31",
            "price": 1366.62
          },
          {
            "date": "09-01",
            "price": 1372.86
          },
          {
            "date": "09-02",
            "price": 1358.39
          },
          {
            "date": "09-03",
            "price": 1355.41
          },
          {
            "date": "09-06",
            "price": 1345.06
          },
          {
            "date": "09-07",
            "price": 1343.57
          },
          {
            "date": "09-08",
            "price": 1339.21
          },
          {
            "date": "09-09",
            "price": 1339.17
          },
          {
            "date": "09-10",
            "price": 1348.17
          },
          {
            "date": "09-13",
            "price": 1344.64
          },
          {
            "date": "09-14",
            "price": 1345.61
          },
          {
            "date": "09-15",
            "price": 1363.57
          },
          {
            "date": "09-16",
            "price": 1376.6
          },
          {
            "date": "09-17",
            "price": 1379.53
          },
          {
            "date": "09-19",
            "price": 1385.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1376.69
          },
          {
            "time": "11:00",
            "price": 1379.46
          },
          {
            "time": "13:00",
            "price": 1382.23
          },
          {
            "time": "19:04",
            "price": 1385.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 1424.02
          },
          {
            "date": "2025-11",
            "price": 1466.13
          },
          {
            "date": "2025-12",
            "price": 1437.91
          },
          {
            "date": "2026-01",
            "price": 1449.7
          },
          {
            "date": "2026-02",
            "price": 1432.32
          },
          {
            "date": "2026-03",
            "price": 1516.13
          },
          {
            "date": "2026-03",
            "price": 1487.38
          },
          {
            "date": "2026-04",
            "price": 1505.96
          },
          {
            "date": "2026-05",
            "price": 1541.73
          },
          {
            "date": "2026-06",
            "price": 1420.6
          },
          {
            "date": "2026-07",
            "price": 1377.11
          },
          {
            "date": "2026-08",
            "price": 1379.53
          },
          {
            "date": "2026-09",
            "price": 1385.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "South Korean Won: Foreign equity flows keep KRW heavy against US Dollar – OCBC - FXStreet",
          "source": "FXStreet",
          "link": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNVkk4Y29WaXUwM0E3SXMyVldwNEc0TkZ6QmktWkhTbGdpY1hRQ0dHWXgwdkR2RnNma3lCeG9EUmpfTUI1dHgwdjgtMGc2OThIaHZWaDQwYkZxWWpFMmx1VkRyV1p4ekJVNThYWFhqeXZiOEY1OEhxTjQxUWNlZGtEMC1GSUdSMWhQVVpBcERTQTZwWmx6UUxDQTlhbDJLR2U4ZERrdjc5ZzV6WFVEaGpLN1ZCejdnMnJMLWc?oc=5",
          "date": "09-19 08:27"
        },
        {
          "title": "Dollar’s allure, oil surge fan bearish bets on emerging Asian currencies: Reuters poll - whbl.com",
          "source": "whbl.com",
          "link": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQU3hpTXNhRktMVV9HWEhQVVV2QUIxbFdsSW9EXzJpSXhjaTlSS3R3ck56UjhuNHV5QTNlWHA0NnVTN3NXTm9uOWJIQVctekEyaXU1S2RTRWMtM0VwZGMtVEZuc1lPamdHc2hmMnRqQzZyeUg3VlRPNHpEZ2FOczdIUDRkZEdpZkFWX2ZUY3I3VHFiNzdtZUdaRURXQ0t6UlpqSDZfNmRWS0F4ZENxcEFDY3Jn?oc=5",
          "date": "09-18 12:01"
        },
        {
          "title": "Ripple Partners SBI and Kyobo Complete Direct Japan-Korea Stablecoin Transfer Pilot - Yahoo Finance",
          "source": "Yahoo Finance",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQQUJEalRNNGtkLU11U1NOdHJBYTZSZEZpVFRScTU1VzlfSkxKNS1WZmlXWXlwWjkxa09HNTdyVlJCbHRrYnk5dy16LVZoM3NGTzVrMjlEVndGUU1nLVZ0RGJPVHVRV0hOamo5d19QNU1vYURJTjhxMTF1RzFWbFByaURHTGw1RGwwTVlqTDhYWHg4d1UzMUtJUW0ydnF4eGlm?oc=5",
          "date": "09-17 15:21"
        },
        {
          "title": "Virbac H1 2026 slides: revenue up 7.4%, margin gains despite FX headwinds - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOTjFuNm9MSWt5bWpidzRlellaLTF3SnZBWkMtMXhhbXdZVW9PTlhTaXRGaFRld3RPNUgzeS11akdiMk5RRy13QVJvZzkwaTdaV25IeG1FbXZBYWRNSUQ2Q2M2SlRwVnd3M0tnOUlhZU1tYlpiTmM2RmNzdDRHWjltdU9FR3FOZnZaY3dHYVBBUjdHYTA1YlV1eFR4cEdEQTBjMU1fUUk0blA2aE9OS0JlX2N2WVNJYXhiNDQySU43OEd5UWtK?oc=5",
          "date": "09-18 22:21"
        }
      ],
      "newsKr": [
        {
          "title": "[다음주 환율전망] 원·달러 1380원대 굳어지나…고유가·美 추가 긴축에 1400원 '경계' - 굿모닝경제",
          "source": "굿모닝경제",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBISVJjM1Z5RE8yaUtkeVRnSmZHWG9laW1hOEhPdHZJXzl1VVF1Yk1OcjhVU2VtSnkzQkptclNNTlIyQXJtdWlPNlY1MUJ3RWV0aDkwVEdaVGkwVnJ5NGNtbGRkV1FwbzBzTXlZRA?oc=5",
          "date": "09-19 07:00"
        },
        {
          "title": "[환율 전망] 원화 기초체력 無하자, 결국 살아남을 승자 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE41V081aTZ1aE1tOGFKdml0RHRqeWdJamJydndDVm9ZR0p1SllMLXFoeWtwaDlSdzVGOFBYclVMQkxZcGV0TWdwTi1nVzJ5NXVvazRVMmVabEFTOUhoT2VvMg?oc=5",
          "date": "09-18 08:00"
        },
        {
          "title": "원·달러 환율 6거래일간 46.1원 급등…다시 1400원 가나 - v.daum.net",
          "source": "v.daum.net",
          "link": "https://news.google.com/rss/articles/CBMiRkFVX3lxTE5vTDNNakVkZm1SRmRlT21FM3VscXFkc3EyRXBtNEhJVjlTVlEzeVNlaFI2TTg5cWlIVnJGQ0w0bFNtWEJNV1E?oc=5",
          "date": "09-18 13:56"
        },
        {
          "title": "BOJ발 엔화 변동성 확대 '촉각'⋯\"1370원 안팎서 하락 예상\" [환율전망] - 이투데이",
          "source": "이투데이",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5RNWZQT0szSVo3azkybDFaaFoyTEdrNmZSdnlCMFNIOGlZVWw3YUZOUHBaQ0RnZmJna0gwbVZRQjdJM2lRVF9xQnctYkhaUDYzdFBxbA?oc=5",
          "date": "09-18 08:39"
        }
      ]
    },
    {
      "id": "eur-krw",
      "nameKr": "EUR/KRW",
      "nameEn": "Euro to Korean Won",
      "symbol": "EURKRW=X",
      "exchange": "Seoul Foreign Exchange",
      "exchangeUrl": "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_EURKRW",
      "category": "forex",
      "categoryKr": "환율 (Forex)",
      "currency": "KRW",
      "unit": "KRW / EUR",
      "unitKr": "원화/유로",
      "description": "실시간 원/유로 환율 추이 및 일일 매매기준율",
      "newsKeywords": "Euro Korean Won EUR KRW exchange rate news",
      "naverQuery": "원유로 환율 전망",
      "guide": {
        "definition": "유럽연합 유로화 대비 대한민국 원화 교환 비율",
        "correlation": "글로벌 외환시장(EUR/USD)과 서울 외환시장(USD/KRW) 교차 환율(Cross Rate)로 산출\n유럽산 유제품, 완제품 초콜릿, 가공설비 수입 시 직접 원가 연동",
        "factors": [
          "유럽중앙은행(ECB) 통화 정책 및 금리차",
          "유로존 주요국 경제 성장률 지표",
          "달러화 강세/약세에 따른 EUR/USD 역방향 변동"
        ]
      },
      "price": 1590.9,
      "change": 8.09,
      "changePercent": 0.51,
      "high52w": 1807.42,
      "low52w": 1549.5,
      "high24h": 1592.5,
      "low24h": 1582.6,
      "high7d": 1590.9,
      "low7d": 1555.19,
      "high1m": 1638.16,
      "low1m": 1555.19,
      "volume": 0,
      "sparkline": [
        1565.09,
        1556.39,
        1555.19,
        1572.95,
        1578.54,
        1582.81,
        1590.9
      ],
      "history": {
        "7D": [
          {
            "date": "09-10",
            "price": 1565.09
          },
          {
            "date": "09-13",
            "price": 1556.39
          },
          {
            "date": "09-14",
            "price": 1555.19
          },
          {
            "date": "09-15",
            "price": 1572.95
          },
          {
            "date": "09-16",
            "price": 1578.54
          },
          {
            "date": "09-17",
            "price": 1582.81
          },
          {
            "date": "09-18",
            "price": 1590.9
          }
        ],
        "1M": [
          {
            "date": "08-17",
            "price": 1638.16
          },
          {
            "date": "08-18",
            "price": 1634.92
          },
          {
            "date": "08-19",
            "price": 1620.23
          },
          {
            "date": "08-20",
            "price": 1626.37
          },
          {
            "date": "08-23",
            "price": 1616.97
          },
          {
            "date": "08-24",
            "price": 1610.77
          },
          {
            "date": "08-25",
            "price": 1611.99
          },
          {
            "date": "08-26",
            "price": 1612.38
          },
          {
            "date": "08-27",
            "price": 1607.13
          },
          {
            "date": "08-30",
            "price": 1579.97
          },
          {
            "date": "08-31",
            "price": 1587.47
          },
          {
            "date": "09-01",
            "price": 1592.22
          },
          {
            "date": "09-02",
            "price": 1573.29
          },
          {
            "date": "09-03",
            "price": 1575.39
          },
          {
            "date": "09-06",
            "price": 1559.22
          },
          {
            "date": "09-07",
            "price": 1562.45
          },
          {
            "date": "09-08",
            "price": 1556.73
          },
          {
            "date": "09-09",
            "price": 1557.39
          },
          {
            "date": "09-10",
            "price": 1565.09
          },
          {
            "date": "09-13",
            "price": 1556.39
          },
          {
            "date": "09-14",
            "price": 1555.19
          },
          {
            "date": "09-15",
            "price": 1572.95
          },
          {
            "date": "09-16",
            "price": 1578.54
          },
          {
            "date": "09-17",
            "price": 1582.81
          },
          {
            "date": "09-18",
            "price": 1590.9
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1581.35
          },
          {
            "time": "11:00",
            "price": 1584.54
          },
          {
            "time": "13:00",
            "price": 1587.72
          },
          {
            "time": "19:04",
            "price": 1590.9
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 1647.04
          },
          {
            "date": "2025-11",
            "price": 1700.53
          },
          {
            "date": "2025-12",
            "price": 1688.99
          },
          {
            "date": "2026-01",
            "price": 1718.01
          },
          {
            "date": "2026-02",
            "price": 1689.54
          },
          {
            "date": "2026-03",
            "price": 1736.26
          },
          {
            "date": "2026-03",
            "price": 1736.6
          },
          {
            "date": "2026-04",
            "price": 1755.9
          },
          {
            "date": "2026-05",
            "price": 1760.27
          },
          {
            "date": "2026-06",
            "price": 1636.68
          },
          {
            "date": "2026-07",
            "price": 1579.97
          },
          {
            "date": "2026-08",
            "price": 1582.81
          },
          {
            "date": "2026-09",
            "price": 1590.9
          }
        ]
      },
      "newsEn": [
        {
          "title": "Iran releases currency exchange rates for September 19 - trend.az",
          "source": "trend.az",
          "link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTE42T1F6OEZkdHRqdVhlRFBYM0Z3V19yVVhfWUticV9kZ1VQeUJKbHduZm4tMFNnQk8zb1pDWFNreHBzTHMtNmEzeHVHYThwM1k?oc=5",
          "date": "09-19 14:14"
        },
        {
          "title": "Nepal Rastra Bank Sets Today's Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQQVFlS2JEd3FxTUFlRnQzSFpBLVpPdkEtNlE1V1k0TWFUSjE5cmtYZXJJQ2J1T3JtcDNZMXdqaXJxRHE1VHJwZmFyUVplSF82VEsyZk40bVZoVHdsWWRwemw5YVI5OWgwX0RWR3dLMzFnekZsWlE5TTFQUE1ZNEkwcm94Mk0zZ1E1UklvTkhxV1dKLWZBSFpaX2pKUDFSRGVzbTB6VlUtbE1VSllteGRj?oc=5",
          "date": "09-18 08:47"
        },
        {
          "title": "CBA currency exchange rates (18.09.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMidkFVX3lxTE5BVmxWS0pKMlZackc3eXBmNUhfd0NJbU1zNmczTFp6ajhhNmNsMVU5aHljVl9mNC1rMXpiVHAtcnIyWU5uWi1ZYU1VbndjVjNiOVFnQUlIY2xyTmt3SmhJMzJtNm9zNUNrMUJNVnpqbGFfWHJObHfSAXtBVV95cUxNZ1UwajNTcm9tMXppR0hrQUdkX3VxcHVUUUc0YnN0djJuTGdRYTlJem9TV0YydlB5Umk3ZmZ6UTdPUWlROGM5YUM1WnJsd0J6al9WOXJkNS1QQzVJUGFzeERNX29GbjNYMXltSHZGalViek1BUjFEbkhCSzA?oc=5",
          "date": "09-18 14:29"
        },
        {
          "title": "Azerbaijani currency to world currency rates for September 18 - trend.az",
          "source": "trend.az",
          "link": "https://news.google.com/rss/articles/CBMiV0FVX3lxTE5oYWc0VkdZbi1LSVZZbHRNOFR5aTE3YnVOR25KZmJ5aFNhekJOZmpTbHVjYXJFd3U0RXVGaE9xR1VMUjBzcVE2bFVaUEQzNTZGazdVMWVJMA?oc=5",
          "date": "09-18 14:12"
        }
      ],
      "newsKr": [
        {
          "title": "[다음주 환율전망] 원·달러 1380원대 굳어지나…고유가·美 추가 긴축에 1400원 '경계' - 굿모닝경제",
          "source": "굿모닝경제",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBISVJjM1Z5RE8yaUtkeVRnSmZHWG9laW1hOEhPdHZJXzl1VVF1Yk1OcjhVU2VtSnkzQkptclNNTlIyQXJtdWlPNlY1MUJ3RWV0aDkwVEdaVGkwVnJ5NGNtbGRkV1FwbzBzTXlZRA?oc=5",
          "date": "09-19 07:00"
        },
        {
          "title": "[환율 전망] 원화 기초체력 無하자, 결국 살아남을 승자 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE41V081aTZ1aE1tOGFKdml0RHRqeWdJamJydndDVm9ZR0p1SllMLXFoeWtwaDlSdzVGOFBYclVMQkxZcGV0TWdwTi1nVzJ5NXVvazRVMmVabEFTOUhoT2VvMg?oc=5",
          "date": "09-18 08:00"
        },
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - LiteFinance",
          "source": "LiteFinance",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "09-18 09:14"
        },
        {
          "title": "국제유가 20% 넘게 뛰었는데…석유 최고가격 3번째 동결 | - 연합인포맥스",
          "source": "연합인포맥스",
          "link": "https://news.google.com/rss/articles/CBMidEFVX3lxTE55MUYwNENsQXdQRUdsdnMwb25Eek81aUFpcFVleVlUN1ZGTU9fVWpjbzY5UE9HSEdCckM4MlBoZV85c01yWFBtX18zTkRXNmtkRnp5QzVsTTNQbzhsV05YUnhrT3RNeXNINTJwMXBBSGJLcEtf?oc=5",
          "date": "09-18 18:04"
        }
      ]
    }
  ]
};

const ITEM_ICONS = {
  'cocoa': '🍫',
  'arabica': '☕',
  'robusta': '🫘',
  'gdt-milk': '🥛',
  'gdt-smp': '🍼',
  'gdt-butter': '🧈',
  'gdt-index': '🐄',
  'palm': '🌴',
  'lauric-oil': '🫙',
  'usd-krw': '💵',
  'eur-krw': '💶'
};

let autoRefreshTimer = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  setupEventListeners();
  renderApp();
  startSilentAutoRefresh();
});

async function loadData() {
  const cacheBuster = `?t=${Date.now()}`;
  const dataUrl = `./data/commodities.json${cacheBuster}`;
  console.log(`[Data Fetch] Attempting to load commodity data from: ${dataUrl}`);

  try {
    const response = await fetch(dataUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

    console.log(`[Data Fetch] Response received: Status=${response.status} (${response.statusText}), Type=${response.type}, Redirected=${response.redirected}, URL=${response.url}`);

    if (response.ok) {
      const jsonData = await response.json();
      console.log(`[Data Fetch Success] Loaded ${jsonData?.items?.length || 0} commodity items. last_updated: ${jsonData?.last_updated || 'N/A'}`);
      appState.data = jsonData;
    } else {
      const errMsg = `HTTP Error ${response.status} (${response.statusText}) when fetching ${dataUrl}`;
      console.error(`[Data Fetch Error] ${errMsg}`);
      throw new Error(errMsg);
    }
  } catch (err) {
    console.error(`[Data Fetch Exception] Failed to load ${dataUrl}:`, {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    if (!appState.data) {
      console.warn('[Data Fetch Fallback] Using embedded fallback dataset');
      appState.data = JSON.parse(JSON.stringify(FALLBACK_DATA));
    }
  }
  
  // ALWAYS fetch real-time live forex rates regardless of file:// protocol or network state
  await fetchLiveForex();
}

async function fetchLiveForex() {
  if (!appState.data) return;
  
  let fetched = false;

  // Primary live exchange rate API
  try {
    console.log('[Forex Fetch] Fetching live rates from api.exchangerate-api.com...');
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', { cache: 'no-store' });
    console.log(`[Forex Fetch] Primary API response: Status=${res.status}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.KRW) {
        const krw = data.rates.KRW;
        const eur = data.rates.EUR ? (krw / data.rates.EUR) : 1630.4;
        applyForexRates(krw, eur);
        fetched = true;
        console.log(`[Forex Fetch Success] Primary: USD/KRW=${krw}, EUR/KRW=${eur}`);
      }
    }
  } catch (e) {
    console.warn('[Forex Fetch Warning] Primary forex API failed:', e);
  }

  // Backup live exchange rate API
  if (!fetched) {
    try {
      console.log('[Forex Fetch] Fetching backup live rates from open.er-api.com...');
      const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
      console.log(`[Forex Fetch] Backup API response: Status=${res.status}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates && data.rates.KRW) {
          const krw = data.rates.KRW;
          const eur = data.rates.EUR ? (krw / data.rates.EUR) : 1630.4;
          applyForexRates(krw, eur);
          fetched = true;
          console.log(`[Forex Fetch Success] Backup: USD/KRW=${krw}, EUR/KRW=${eur}`);
        }
      }
    } catch (e) {
      console.warn('[Forex Fetch Warning] Backup forex API failed:', e);
    }
  }
}

function applyForexRates(usdKrw, eurKrw) {
  if (!appState.data) return;
  
  appState.data.usdKrwRate = parseFloat(usdKrw.toFixed(2));
  appState.data.eurKrwRate = parseFloat(eurKrw.toFixed(2));
  appState.data.lastForexUpdated = new Date().toISOString();
  
  // Sync live rate to items array (USD/KRW and EUR/KRW items in the table)
  if (appState.data.items) {
    const usdItem = appState.data.items.find(i => i.id === 'usd-krw');
    if (usdItem) {
      const prevPrice = usdItem.price;
      usdItem.price = appState.data.usdKrwRate;
      if (prevPrice && prevPrice !== usdItem.price) {
        usdItem.change = parseFloat((usdItem.price - prevPrice).toFixed(2));
        usdItem.changePercent = parseFloat(((usdItem.change / prevPrice) * 100).toFixed(2));
      }
    }
    const eurItem = appState.data.items.find(i => i.id === 'eur-krw');
    if (eurItem) {
      const prevPrice = eurItem.price;
      eurItem.price = appState.data.eurKrwRate;
      if (prevPrice && prevPrice !== eurItem.price) {
        eurItem.change = parseFloat((eurItem.price - prevPrice).toFixed(2));
        eurItem.changePercent = parseFloat(((eurItem.change / prevPrice) * 100).toFixed(2));
      }
    }
  }
}

function startSilentAutoRefresh() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  // Silently reload data and live forex every 60 seconds in the background
  autoRefreshTimer = setInterval(async () => {
    await loadData();
    renderApp();
  }, 60000);
}

function setupEventListeners() {
  // Time Range Switcher
  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.selectedRange = e.target.dataset.range;
      renderMainChart();
    });
  });

  // Category Filter Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.activeCategory = e.target.dataset.category;
      renderTable();
    });
  });

  // Card Filter Tabs (주요 품목, 상승, 하락)
  document.querySelectorAll('.card-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.card-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.cardFilter = e.target.dataset.cardFilter;
      renderHighlightCards();
    });
  });

  // News Modal Close
  const newsModal = document.getElementById('newsModal');
  const closeNewsModalBtn = document.getElementById('closeNewsModal');
  if (closeNewsModalBtn) {
    closeNewsModalBtn.addEventListener('click', () => {
      newsModal.classList.remove('open');
    });
  }
  if (newsModal) {
    newsModal.addEventListener('click', (e) => {
      if (e.target === newsModal) newsModal.classList.remove('open');
    });
  }

  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value.toLowerCase().trim();
      renderTable();
    });
  }

  // Guide Modal
  const guideModal = document.getElementById('guideModal');
  const closeGuideModal = document.getElementById('closeGuideModal');

  if (closeGuideModal && guideModal) {
    closeGuideModal.addEventListener('click', () => {
      guideModal.classList.remove('open');
    });
  }
  if (guideModal) {
    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) guideModal.classList.remove('open');
    });
  }

  // Ticker Controls
  const btnPrev = document.getElementById('btnTickerPrev');
  const btnNext = document.getElementById('btnTickerNext');
  const tickerBanner = document.getElementById('newsTickerBanner');

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => rotateTicker(-1));
    btnNext.addEventListener('click', () => rotateTicker(1));
  }

  if (tickerBanner) {
    tickerBanner.addEventListener('mouseenter', () => {
      if (appState.tickerTimer) clearInterval(appState.tickerTimer);
    });
    tickerBanner.addEventListener('mouseleave', () => {
      startTickerInterval();
    });
  }

  // Detail Modal Close
  const detailModal = document.getElementById('detailModal');
  document.getElementById('closeDetailModal').addEventListener('click', () => {
    detailModal.classList.remove('open');
  });
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) detailModal.classList.remove('open');
  });

  // Pulse Cow Interaction (일일 시황 리포트 Market Daily & 클립보드 복사)
  const cowBtn = document.getElementById('cowIconBtn');
  const cowBubble = document.getElementById('cowSpeechBubble');
  const cowWrap = document.getElementById('cowTriggerWrap');

  if (cowBtn && cowBubble) {
    cowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShowing = cowBubble.classList.contains('show');
      
      // Trigger subtle wiggle animation on SVG icon
      cowBtn.classList.remove('wiggle');
      void cowBtn.offsetWidth; // trigger reflow
      cowBtn.classList.add('wiggle');

      if (isShowing) {
        cowBubble.classList.remove('show');
      } else {
        renderPulseCowPopup();
        cowBubble.classList.add('show');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (cowWrap && !cowWrap.contains(e.target)) {
        cowBubble.classList.remove('show');
      }
    });

    // Prevent clicks inside popup from bubbling to document
    cowBubble.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

function getWeeklyReportData() {
  if (appState.data && (appState.data.weekly_report || appState.data.daily_briefing)) {
    return appState.data.weekly_report || appState.data.daily_briefing;
  }

  // Fallback calculation from items if weekly_report object isn't present (exclude forex)
  const items = (appState.data && appState.data.items) ? appState.data.items : [];
  const commodityItems = items.filter(i => i.category !== 'forex' && !['usd-krw', 'eur-krw'].includes(i.id));
  const sorted = [...commodityItems].sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0));
  const gainer = sorted[0];
  const loser = sorted[sorted.length - 1];
  
  // Fixed priority order for all 9 commodities: 1) Cocoa/Coffee -> 2) Dairy -> 3) Oils
  const FIXED_ORDER = {
    'cocoa': 1,
    'arabica': 2,
    'robusta': 3,
    'gdt-index': 10,
    'gdt-milk': 11,
    'gdt-smp': 12,
    'gdt-butter': 13,
    'palm': 20,
    'lauric-oil': 21
  };
  // Include ALL commodities in the weekly price list (no exclusion)
  const allCommodities = [...commodityItems].sort((a, b) => (FIXED_ORDER[a.id] || 99) - (FIXED_ORDER[b.id] || 99));

  const formatDaily = (it) => {
    if (!it) return '';
    const cleanName = it.nameKr.split('(')[0].trim();
    const priceStr = it.currency === 'USD' ? `$${it.price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}` : `${it.price.toLocaleString('ko-KR')}원`;
    const pctVal = it.changePercent || 0;
    const sign = pctVal > 0 ? '▲' : (pctVal < 0 ? '▼' : '');
    return `${cleanName} : ${priceStr} (${sign}${Math.abs(pctVal).toFixed(2)}%)`;
  };

  const now = new Date();
  const dayNr = (now.getDay() + 6) % 7;
  const curMonday = new Date(now);
  curMonday.setDate(now.getDate() - dayNr);
  const prevMonday = new Date(curMonday);
  prevMonday.setDate(curMonday.getDate() - 7);

  const formatMD = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const formatYMD = (d) => `${d.getFullYear()}-${formatMD(d)}`;

  const findWeekPrice = (it, mondayDate) => {
    const allH = (it.history && it.history['1M']) || (it.history && it.history['7D']) || [];
    for (let offset = 0; offset < 5; offset++) {
      const target = new Date(mondayDate);
      target.setDate(mondayDate.getDate() + offset);
      const md = formatMD(target);
      const ymd = formatYMD(target);
      const entry = allH.find(h => h.date === md || h.date === ymd || (h.date && String(h.date).endsWith(md)));
      if (entry && entry.price) return entry.price;
    }
    return null;
  };

  const formatWeekly = (it) => {
    if (!it) return '';
    const cleanName = it.nameKr.split('(')[0].trim();
    const priceStr = it.currency === 'USD' ? `$${it.price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}` : `${it.price.toLocaleString('ko-KR')}원`;
    
    let curP = findWeekPrice(it, curMonday);
    let prevP = findWeekPrice(it, prevMonday);

    if (it.id.startsWith('gdt') || it.category === 'dairy') {
      const allH = ((it.history && it.history['1M']) || (it.history && it.history['7D']) || []).filter(x => x.price);
      if (allH.length >= 2) {
        curP = allH[allH.length - 1].price;
        prevP = allH[allH.length - 2].price;
      }
    }

    if (!curP) curP = it.price;
    if (!prevP) {
      const history7d = it.history && it.history['7D'] ? it.history['7D'] : [];
      const sparkline = it.sparkline || [];
      if (history7d.length >= 2) prevP = history7d[0].price;
      else if (sparkline.length >= 2) prevP = sparkline[0];
      else prevP = it.price;
    }
    
    let wPct = it.changePercent || 0;
    if (prevP && prevP > 0) {
      wPct = ((curP - prevP) / prevP) * 100;
    }
    const sign = wPct > 0 ? '▲' : (wPct < 0 ? '▼' : '');
    return `${cleanName} : ${priceStr} (${sign}${Math.abs(wPct).toFixed(2)}%)`;
  };

  const year = now.getFullYear();
  
  // Calculate ISO week number
  const target = new Date(now.valueOf());
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  const weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);

  const curFri = new Date(curMonday);
  curFri.setDate(curMonday.getDate() + 4);
  const fmtD = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  const weekDateRange = `${fmtD(curMonday)} ~ ${fmtD(curFri)}`;

  const dateStr = `${year}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const reportDateStr = `${dateStr}, ${hours}:${minutes}`;

  const usdItem = items.find(i => i.id === 'usd-krw');
  const eurItem = items.find(i => i.id === 'eur-krw');
  const usdPrice = usdItem ? usdItem.price : (appState.data ? appState.data.usdKrwRate : 1400.48);
  const usdChg = usdItem ? usdItem.change : 0;
  const eurPrice = eurItem ? eurItem.price : (appState.data ? appState.data.eurKrwRate : 1621.4);
  const eurChg = eurItem ? eurItem.change : 0;

  const usdSign = usdChg > 0 ? '▲' : (usdChg < 0 ? '▼' : '');
  const eurSign = eurChg > 0 ? '▲' : (eurChg < 0 ? '▼' : '');

  // Top 1 curated news across all items
  let newsTitle = '글로벌 원자재 공급망 및 주요 품목 시세 동향';
  const newsItem = allCommodities.find(it => it.newsKr && it.newsKr.length > 0) || allCommodities.find(it => it.newsEn && it.newsEn.length > 0);
  if (newsItem) {
    const rawN = (newsItem.newsKr && newsItem.newsKr[0]) || (newsItem.newsEn && newsItem.newsEn[0]);
    if (rawN && rawN.title) {
      const rawTitle = rawN.title;
      const dashIdx = Math.max(rawTitle.lastIndexOf(' - '), rawTitle.lastIndexOf(' – '));
      newsTitle = dashIdx > 10 ? rawTitle.substring(0, dashIdx).trim() : rawTitle.trim();
    }
  }

  return {
    title: `[${year} Week ${weekNumber} Report]`,
    week_number: weekNumber,
    week_date_range: weekDateRange,
    weekly_price_title: `[W${weekNumber} 주요품목가격]`,
    date: dateStr,
    report_date: reportDateStr,
    top_gainer: formatDaily(gainer),
    top_loser: formatDaily(loser),
    weekly_price_list: allCommodities.map(it => formatWeekly(it)),
    fx_usd: `${usdPrice.toLocaleString('ko-KR')}원 (${usdSign}${Math.abs(usdChg).toLocaleString('ko-KR')}원)`,
    fx_eur: `${eurPrice.toLocaleString('ko-KR')}원 (${eurSign}${Math.abs(eurChg).toLocaleString('ko-KR')}원)`,
    news_category: '오늘의 주요 헤드라인',
    news_title: newsTitle
  };
}

function renderPulseCowPopup() {
  const bubble = document.getElementById('cowSpeechBubble');
  if (!bubble) return;

  const b = getWeeklyReportData();
  const now = new Date();
  const weekNum = b.week_number || 34;
  const currentYear = now.getFullYear();
  const reportTitle = b.title || `[${currentYear} Week ${weekNum} Report]`;
  const weeklyPriceTitle = b.weekly_price_title || `[W${weekNum} 주요품목가격]`;
  
  // Calculate week date range (Monday to Friday)
  const dayNr = (now.getDay() + 6) % 7;
  const curMon = new Date(now);
  curMon.setDate(now.getDate() - dayNr);
  const curFri = new Date(curMon);
  curFri.setDate(curMon.getDate() + 4);
  const fmtD = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  const weekDateRange = b.week_date_range || `${fmtD(curMon)} ~ ${fmtD(curFri)}`;

  const priceLines = b.weekly_price_list || b.other_commodities || [];
  const listArray = Array.isArray(priceLines) ? priceLines : String(priceLines).split('\n').filter(Boolean);
  const weeklyPriceHtml = listArray.map(line => `<div class="pulse-cow-other-line">${line}</div>`).join('');

  const dateStr = b.date || `${currentYear}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const reportDateStr = b.report_date || `${dateStr}, ${hours}:${minutes}`;

  // Weekly report layout strictly contains 3 sections: [일일 원자재 동향], [W{주차} 주요품목가격], [오늘의 주요 헤드라인]
  bubble.innerHTML = `
    <div class="pulse-cow-header">
      <div class="pulse-cow-title">
        <span>${reportTitle}</span>
        <span class="cow-tooltip-wrap">
          <button type="button" class="cow-info-btn" aria-label="리포트 기간 안내" tabindex="0">?</button>
          <span class="cow-tooltip-box">${weekDateRange}</span>
        </span>
      </div>
      <button class="pulse-cow-close" id="closePulseCowBtn" title="닫기" type="button">&times;</button>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">
        <span>[일일 원자재 동향]</span>
        <span class="cow-tooltip-wrap">
          <button type="button" class="cow-info-btn" aria-label="일일 원자재 동향 안내" tabindex="0">?</button>
          <span class="cow-tooltip-box">전일 대비 최대 상승 및 하락 품목</span>
        </span>
      </div>
      <div class="pulse-cow-item gainer">
        <span>당일 급등 : ${b.top_gainer}</span>
      </div>
      <div class="pulse-cow-item loser">
        <span>당일 급락 : ${b.top_loser}</span>
      </div>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">
        <span>${weeklyPriceTitle}</span>
        <span class="cow-tooltip-wrap">
          <button type="button" class="cow-info-btn" aria-label="주간 주요품목가격 안내" tabindex="0">?</button>
          <span class="cow-tooltip-box">주간 가격 변동률 (해당 주차 월요일 vs 직전 주 월요일 종가)</span>
        </span>
      </div>
      <div class="pulse-cow-other-list">
        ${weeklyPriceHtml}
      </div>
    </div>

    <div class="pulse-cow-section" style="margin-bottom:0;">
      <div class="pulse-cow-section-title">
        <span>[오늘의 주요 헤드라인]</span>
      </div>
      <div class="pulse-cow-news">${b.news_title}</div>
    </div>

    <div style="font-size: 10px; color: #888; margin-top: 10px; text-align: left; padding-left: 2px;">
      Report Date: ${reportDateStr}
    </div>

    <div class="pulse-cow-footer">
      <button class="copy-report-btn" id="copyReportBtn" type="button">Copy</button>
    </div>
  `;

  // Close button inside popup
  const closeBtn = document.getElementById('closePulseCowBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      bubble.classList.remove('show');
    });
  }

  // Copy button
  const copyBtn = document.getElementById('copyReportBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const plainText = `${reportTitle}

[일일 원자재 동향]
당일 급등 : ${b.top_gainer}
당일 급락 : ${b.top_loser}

${weeklyPriceTitle}
${listArray.join('\n')}

[오늘의 주요 헤드라인]
${b.news_title}

Report Date: ${reportDateStr}`;

      copyReportToClipboard(copyBtn, plainText);
    });
  }
}

function copyReportToClipboard(btn, text) {
  const onSuccess = () => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(onSuccess)
      .catch(() => fallbackClipboardCopy(text, onSuccess));
  } else {
    fallbackClipboardCopy(text, onSuccess);
  }
}

function fallbackClipboardCopy(text, onSuccess) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful && onSuccess) onSuccess();
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textarea);
}

function setCurrency(curr) {
  appState.currency = curr;
  renderApp();
}

function getFormattedKstTimestamp() {
  let updatedDate = new Date();
  if (appState.data && appState.data.last_updated) {
    const parsed = new Date(appState.data.last_updated.replace(' ', 'T') + '+09:00');
    if (!isNaN(parsed.getTime())) updatedDate = parsed;
    else updatedDate = new Date(appState.data.lastUpdated || Date.now());
  } else if (appState.data && appState.data.lastUpdated) {
    updatedDate = new Date(appState.data.lastUpdated);
  }
  const year = updatedDate.getFullYear();
  const month = String(updatedDate.getMonth() + 1).padStart(2, '0');
  const day = String(updatedDate.getDate()).padStart(2, '0');
  const hours = String(updatedDate.getHours()).padStart(2, '0');
  const minutes = String(updatedDate.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes} KST`;
}

let toastTimer = null;

function showStatusToast(message, isError = false) {
  let toast = document.getElementById('statusToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'statusToast';
    toast.className = 'status-toast';
    document.body.appendChild(toast);
  }
  
  toast.className = `status-toast ${isError ? 'error' : 'success'} show`;
  toast.innerHTML = `<span>${message}</span>`;

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

let isRefreshing = false;

async function refreshDashboardData(triggerEl) {
  if (isRefreshing) return;
  isRefreshing = true;
  
  console.log('[Pulse Refresh] User triggered manual data refresh');
  if (triggerEl) {
    triggerEl.style.pointerEvents = 'none';
    triggerEl.style.opacity = '0.6';
  }
  
  showStatusToast('최신 원자재 데이터를 갱신하는 중...');
  
  try {
    await loadData();
    renderApp();
    const timeStr = getFormattedKstTimestamp();
    console.log(`[Pulse Refresh Success] Dashboard re-rendered at ${timeStr}`);
    showStatusToast(`최신 데이터로 새로고침되었습니다 (${timeStr})`);
  } catch (err) {
    console.error('[Pulse Refresh Error] Manual refresh failed:', err);
    showStatusToast('데이터 갱신 중 오류가 발생했습니다', true);
  } finally {
    isRefreshing = false;
    if (triggerEl) {
      triggerEl.style.pointerEvents = '';
      triggerEl.style.opacity = '';
    }
  }
}

function renderSystemStatus() {
  const indicator = document.getElementById('systemStatusIndicator');
  if (!indicator) return;

  const timeStr = getFormattedKstTimestamp();
  const isSuccess = !!(appState.data && appState.data.items && appState.data.items.length > 0);

  indicator.className = `system-status-indicator ${isSuccess ? 'success' : 'error'}`;
  indicator.setAttribute('title', `마지막 업데이트: ${timeStr} (클릭하여 새로고침)`);
  indicator.setAttribute('aria-label', `마지막 업데이트: ${timeStr}`);

  indicator.onclick = (e) => {
    e.stopPropagation();
    refreshDashboardData(indicator);
  };
}

function renderApp() {
  renderSystemStatus();
  renderHeaderStatus();
  renderHighlightCards();
  renderMainChart();
  renderTable();
  initNewsTicker();
}

function initNewsTicker() {
  if (!appState.data || !appState.data.items) return;

  // Build combined news pool across all commodities
  const pool = [];
  appState.data.items.forEach(item => {
    const icon = ITEM_ICONS[item.id] || '📦';
    const shortName = item.nameKr.split(' ')[0];

    // Add Korean news first, then English news
    const krList = item.newsKr || item.news || [];
    const enList = item.newsEn || [];

    krList.forEach(art => {
      pool.push({
        icon,
        name: shortName,
        title: art.title,
        source: art.source,
        link: art.link,
        itemId: item.id
      });
    });

    enList.forEach(art => {
      pool.push({
        icon,
        name: shortName,
        title: art.title,
        source: art.source,
        link: art.link,
        itemId: item.id
      });
    });
  });

  if (pool.length === 0) return;

  appState.tickerItems = pool;
  appState.tickerIndex = 0;
  
  displayTickerItem();
  startTickerInterval();
}

function displayTickerItem() {
  if (!appState.tickerItems || appState.tickerItems.length === 0) return;

  const item = appState.tickerItems[appState.tickerIndex];
  const linkEl = document.getElementById('tickerLink');
  if (!linkEl) return;

  // Clean trailing source name suffix from RSS title (e.g. " - 한국경제", " - Reuters")
  let cleanTitle = item.title;
  const lastDashIdx = Math.max(cleanTitle.lastIndexOf(' - '), cleanTitle.lastIndexOf(' – '));
  if (lastDashIdx > 10) {
    cleanTitle = cleanTitle.substring(0, lastDashIdx);
  }

  // Fade out slightly then change content
  linkEl.style.opacity = '0';
  linkEl.style.transform = 'translateY(-4px)';

  setTimeout(() => {
    linkEl.innerHTML = `<span style="color:#60A5FA; font-weight:700;">${item.icon} ${item.name}:</span> ${cleanTitle} <span style="font-size:11.5px; color:#94A3B8; margin-left:6px; font-weight:400;">- ${item.source}</span>`;
    linkEl.href = item.link;
    linkEl.target = '_blank';
    linkEl.onclick = null; // Direct link opening in new tab as requested
    linkEl.style.opacity = '1';
    linkEl.style.transform = 'translateY(0)';
  }, 150);
}

function rotateTicker(direction = 1) {
  if (!appState.tickerItems || appState.tickerItems.length === 0) return;
  appState.tickerIndex = (appState.tickerIndex + direction + appState.tickerItems.length) % appState.tickerItems.length;
  displayTickerItem();
}

function startTickerInterval() {
  if (appState.tickerTimer) clearInterval(appState.tickerTimer);
  appState.tickerTimer = setInterval(() => {
    rotateTicker(1);
  }, 5000); // 5 seconds interval as requested
}

function renderHeaderStatus() {
  if (!appState.data) return;
  const usdRate = appState.data.usdKrwRate ? `₩${appState.data.usdKrwRate.toLocaleString('ko-KR')}` : '-';
  const eurRate = appState.data.eurKrwRate ? `₩${appState.data.eurKrwRate.toLocaleString('ko-KR')}` : '-';
  const textEl = document.getElementById('lastUpdatedText');
  if (textEl) {
    textEl.textContent = `USD/KRW ${usdRate} · EUR/KRW ${eurRate}`;
  }

  const timeStr = getFormattedKstTimestamp();
  const timeEl = document.getElementById('lastUpdatedTime');
  if (timeEl) {
    timeEl.textContent = `클릭 시 즉시 업데이트 | Last Updated: ${timeStr}`;
  }

  const badge = document.getElementById('lastUpdatedBadge');
  if (badge) {
    badge.setAttribute('title', `마지막 업데이트: ${timeStr} (클릭하여 새로고침)`);
    badge.setAttribute('aria-label', `마지막 업데이트: ${timeStr}`);
    badge.onclick = (e) => {
      e.stopPropagation();
      refreshDashboardData(badge);
    };
  }
}

function formatPrice(val, originalCurrency) {
  if (!val) return '-';
  const rate = appState.data ? appState.data.usdKrwRate : 1411.5;

  if (appState.currency === 'KRW') {
    let krwVal = val * rate;
    if (originalCurrency === 'US Cent') {
      krwVal = (val / 100) * rate; // cent -> dollar -> krw
    }
    return '₩' + Math.round(krwVal).toLocaleString('ko-KR');
  }

  // USD mode
  if (originalCurrency === 'US Cent') {
    return val.toFixed(2) + ' ¢';
  }
  return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderHighlightCards() {
  const container = document.getElementById('highlightCards');
  if (!container || !appState.data || !appState.data.items) return;
  container.innerHTML = '';

  let items = [];
  const filter = appState.cardFilter || 'featured';

  if (filter === 'gainers') {
    // Only items with positive change (> 0), sorted descending, max 4
    items = appState.data.items
      .filter(item => item.changePercent > 0)
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 4);
  } else if (filter === 'losers') {
    // Only items with negative change (< 0), sorted ascending (biggest drop first), max 4
    items = appState.data.items
      .filter(item => item.changePercent < 0)
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 4);
  } else {
    // Featured key 4 commodities (코코아, 아라비카, 로부스타, GDT 지수)
    const featuredIds = ['cocoa', 'arabica', 'robusta', 'gdt-index'];
    items = featuredIds.map(id => appState.data.items.find(i => i.id === id)).filter(Boolean);
    if (items.length < 4) {
      items = appState.data.items.slice(0, 4);
    }
  }

  items.forEach(item => {
    const isGain = item.change >= 0;
    const badgeClass = isGain ? 'badge-gain' : 'badge-loss';
    const sign = isGain ? '+' : '';
    const icon = ITEM_ICONS[item.id] || '📦';
    const isActive = item.id === appState.selectedItemId;

    const card = document.createElement('div');
    card.className = `metric-card ${isActive ? 'active-card' : ''}`;
    card.dataset.id = item.id;

    // Remove ( ) and English text within parentheses for clean Korean-only title in highlight cards
    const cleanKrName = item.nameKr.replace(/\s*\([^)]*\)/g, '').trim();
    const shortKrName = cleanKrName.split(' ')[0];

    // Compute 1W (7D) or 1M High & Low (GDT items use 1M as exception)
    const isGdt = item.id.startsWith('gdt') || item.category === 'dairy';
    let rangeLabel = '1W';
    let rangeHigh = item.price;
    let rangeLow = item.price;

    if (isGdt) {
      rangeLabel = '1M';
      const prices1m = (item.history && item.history['1M'] && item.history['1M'].length > 0)
        ? item.history['1M'].map(p => p.price)
        : (item.sparkline || [item.price]);
      rangeHigh = item.high1m || (prices1m.length ? Math.max(...prices1m) : item.price);
      rangeLow = item.low1m || (prices1m.length ? Math.min(...prices1m) : item.price);
    } else {
      rangeLabel = '1W';
      const prices7d = (item.history && item.history['7D'] && item.history['7D'].length > 0)
        ? item.history['7D'].map(p => p.price)
        : (item.sparkline || [item.price]);
      rangeHigh = item.high7d || (prices7d.length ? Math.max(...prices7d) : item.price);
      rangeLow = item.low7d || (prices7d.length ? Math.min(...prices7d) : item.price);
    }

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon-title">
          <span class="card-icon">${icon}</span>
          <div>
            <div class="card-title-kr">
              <span class="title-desktop">${cleanKrName}</span>
              <span class="title-mobile">${shortKrName}</span>
            </div>
            <div class="card-title-en">${item.symbol}</div>
          </div>
        </div>
        <span class="badge-change ${badgeClass}">
          <span class="badge-full">${sign}${item.changePercent.toFixed(2)}%</span>
          <span class="badge-mobile-trend">${isGain ? '▲ 상승' : '▼ 하락'}</span>
        </span>
      </div>
      <div class="card-value" style="display:flex; align-items:baseline; flex-wrap:wrap; gap:4px;">
        <span>${formatPrice(item.price, item.currency)}</span>
        ${item.original_price_lb ? `<span style="font-size:12px; font-weight:500; color:#94A3B8; letter-spacing:0;">(${item.original_price_lb.toFixed(2)} ¢/lb)</span>` : ''}
      </div>
      <div class="card-subtext">
        <span>${item.unitKr}</span>
        <span class="card-range-1w">${rangeLabel}: <span class="range-val-high">${formatPrice(rangeHigh, item.currency)}</span> / <span class="range-val-low">${formatPrice(rangeLow, item.currency)}</span></span>
      </div>
      <canvas class="card-sparkline" id="spark_${item.id}"></canvas>
    `;

    card.addEventListener('click', () => {
      appState.selectedItemId = item.id;
      updateActiveCardHighlight();
      renderMainChart();
    });

    container.appendChild(card);
    
    // Draw mini sparkline
    setTimeout(() => drawMiniSparkline(`spark_${item.id}`, item.sparkline, isGain), 50);
  });
}

function updateActiveCardHighlight() {
  document.querySelectorAll('.metric-card').forEach(c => {
    if (c.dataset.id === appState.selectedItemId) {
      c.classList.add('active-card');
    } else {
      c.classList.remove('active-card');
    }
  });
}

function drawMiniSparkline(canvasId, dataPoints, isGain) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !dataPoints) return;
  const ctx = canvas.getContext('2d');
  
  // Set width/height
  const w = canvas.clientWidth || 240;
  const h = canvas.clientHeight || 40;
  canvas.width = w;
  canvas.height = h;

  ctx.clearRect(0, 0, w, h);
  
  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const range = (max - min) || 1;

  ctx.beginPath();
  ctx.strokeStyle = isGain ? '#10B981' : '#F43F5E';
  ctx.lineWidth = 2.5;

  dataPoints.forEach((val, idx) => {
    const x = (idx / (dataPoints.length - 1)) * w;
    const y = h - ((val - min) / range) * (h - 8) - 4;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}

function renderMainChart() {
  const selectedItem = appState.data.items.find(i => i.id === appState.selectedItemId) || appState.data.items[0];
  const icon = ITEM_ICONS[selectedItem.id] || '📈';

  // Update header text with clickable exchange link
  const exUrl = selectedItem.exchangeUrl || (selectedItem.exchange.includes('Global Dairy Trade') ? 'https://www.globaldairytrade.info/en/product-results/' : 'https://finance.yahoo.com');
  const exLink = `<a href="${exUrl}" target="_blank" style="color:#60A5FA; font-weight:600; text-decoration:underline;">${selectedItem.exchange} ↗</a>`;

  const origCentSub = selectedItem.original_price_lb
    ? `<span style="color:#94A3B8; font-size:12px; font-weight:500; margin-left:6px;">· 벤치마크 원본: (${selectedItem.original_price_lb.toFixed(2)} ¢/lb)</span>`
    : '';

  document.getElementById('chartTitle').textContent = `${icon} ${selectedItem.nameKr}`;
  document.getElementById('chartSubtitle').innerHTML = `${exLink} · ${selectedItem.unitKr} (${selectedItem.symbol}) ${origCentSub}`;

  const historyData = selectedItem.history[appState.selectedRange] || selectedItem.history['7D'];
  const labels = historyData.map(d => d.date || d.time);
  const rawPrices = historyData.map(d => d.price);

  // Convert prices based on currency selection
  const rate = appState.data.usdKrwRate;
  const prices = rawPrices.map(p => {
    if (appState.currency === 'KRW') {
      return selectedItem.currency === 'US Cent' ? Math.round((p / 100) * rate) : Math.round(p * rate);
    }
    return p;
  });

  const ctx = document.getElementById('mainChart').getContext('2d');

  if (appState.chartInstance) {
    appState.chartInstance.destroy();
  }

  const isGain = selectedItem.change >= 0;
  const lineColor = isGain ? '#10B981' : '#3B82F6';
  
  const gradient = ctx.createLinearGradient(0, 0, 0, 320);
  gradient.addColorStop(0, isGain ? 'rgba(16, 185, 129, 0.25)' : 'rgba(59, 130, 246, 0.25)');
  gradient.addColorStop(1, 'rgba(10, 14, 23, 0.0)');

  appState.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${selectedItem.nameKr} (${appState.currency})`,
        data: prices,
        borderColor: lineColor,
        borderWidth: 3,
        pointBackgroundColor: lineColor,
        pointRadius: 4,
        pointHoverRadius: 7,
        fill: true,
        backgroundColor: gradient,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111726',
          titleColor: '#F8FAFC',
          bodyColor: '#38BDF8',
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              const rawVal = rawPrices[context.dataIndex];
              const mainPrice = formatPrice(rawVal, selectedItem.currency);
              if (selectedItem.id === 'arabica') {
                const centVal = (rawVal / 22.0462).toFixed(2);
                return [mainPrice, `(${centVal} ¢/lb)`];
              }
              return mainPrice;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#64748B', font: { family: 'Inter', size: 12 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#64748B',
            font: { family: 'Inter', size: 12 },
            callback: function(val) {
              return appState.currency === 'KRW' ? '₩' + val.toLocaleString() : val;
            }
          }
        }
      }
    }
  });
}

function renderTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  let filtered = appState.data.items.filter(item => {
    const matchCat = appState.activeCategory === 'all' || item.category === appState.activeCategory;
    const matchQuery = !appState.searchQuery || 
      item.nameKr.toLowerCase().includes(appState.searchQuery) ||
      item.nameEn.toLowerCase().includes(appState.searchQuery) ||
      item.symbol.toLowerCase().includes(appState.searchQuery);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748B; padding:32px;">검색 결과가 없습니다.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const isGain = item.change >= 0;
    const badgeClass = isGain ? 'badge-gain' : 'badge-loss';
    const sign = isGain ? '+' : '';
    const icon = ITEM_ICONS[item.id] || '📦';

    // 1M High & Low calculation for table
    const prices1m = (item.history && item.history['1M'] && item.history['1M'].length > 0)
      ? item.history['1M'].map(p => p.price)
      : (item.history && item.history['7D'] ? item.history['7D'].map(p => p.price) : [item.price]);
    const high1m = item.high1m || (prices1m.length ? Math.max(...prices1m) : item.price);
    const low1m = item.low1m || (prices1m.length ? Math.min(...prices1m) : item.price);

    // 52 week bar calculation
    const range = item.high52w - item.low52w || 1;
    const pct = Math.max(0, Math.min(100, ((item.price - item.low52w) / range) * 100));

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="cell-item">
          <div class="cell-icon">${icon}</div>
          <div>
            <div class="cell-name-kr">${item.nameKr}</div>
            <div class="cell-symbol">${item.symbol} · ${item.exchange}</div>
          </div>
        </div>
      </td>
      <td>
        <div class="cell-price">${formatPrice(item.price, item.currency)}</div>
        <div class="cell-unit">${item.unitKr} ${item.original_price_lb ? `<span style="color:#94A3B8; font-size:10.5px;">(${item.original_price_lb.toFixed(2)} ¢/lb)</span>` : ''}</div>
      </td>
      <td>
        <span class="badge-change ${badgeClass}">
          ${sign}${item.changePercent.toFixed(2)}%
        </span>
      </td>
      <td>
        <div style="font-size:13px; font-weight:600; color:#E2E8F0;">${formatPrice(high1m, item.currency)}</div>
        <div style="font-size:12px; color:#64748B;">저가 ${formatPrice(low1m, item.currency)}</div>
      </td>
      <td>
        <div class="range-bar-container">
          <div class="range-labels">
            <span>${formatPrice(item.low52w, item.currency)}</span>
            <span>${formatPrice(item.high52w, item.currency)}</span>
          </div>
          <div class="range-track">
            <div class="range-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      </td>
      <td>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn-primary" style="padding:6px 10px; font-size:12px;" onclick="openDetailModal('${item.id}')">상세분석</button>
          <button class="btn-primary" style="padding:6px 10px; font-size:12px; background:linear-gradient(135deg, #059669 0%, #047857 100%); box-shadow:none;" onclick="openNews('${item.id}')">📰 관련 뉴스</button>
        </div>
      </td>
    `;

    tr.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        appState.selectedItemId = item.id;
        updateActiveCardHighlight();
        renderMainChart();
        window.scrollTo({ top: 180, behavior: 'smooth' });
      }
    });

    tbody.appendChild(tr);
  });
}

function openNews(itemId, langPreference) {
  const item = appState.data.items.find(i => i.id === itemId);
  if (!item) return;

  const currentLang = langPreference || appState.newsLang || 'KR';
  appState.newsLang = currentLang;

  const icon = ITEM_ICONS[item.id] || '📦';
  document.getElementById('newsModalTitle').textContent = `📰 ${icon} ${item.nameKr} 관련 실시간 뉴스`;

  const articlesList = (currentLang === 'KR') ? (item.newsKr || item.news || []) : (item.newsEn || item.news || []);

  const articlesHtml = (articlesList && articlesList.length > 0) ? articlesList.map(art => `
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); padding:16px; border-radius:12px; margin-bottom:12px; transition:all 0.2s ease;">
      <a href="${art.link}" target="_blank" style="font-size:15px; font-weight:700; color:#3B82F6; text-decoration:none; line-height:1.5; display:block; margin-bottom:8px;">
        ${art.title}
      </a>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:#94A3B8;">
        <span style="background:${currentLang === 'KR' ? 'rgba(3,207,93,0.15)' : 'rgba(59,130,246,0.15)'}; color:${currentLang === 'KR' ? '#34D399' : '#60A5FA'}; padding:3px 10px; border-radius:4px; font-weight:600;">
          ${art.source}
        </span>
        <span>${art.date || ''}</span>
      </div>
    </div>
  `).join('') : `<p style="color:#94A3B8; font-size:14px; padding:16px;">수집된 최신 뉴스를 불러오는 중입니다...</p>`;

  const cleanTerm = item.nameKr.split(' ')[0];
  const naverSearchTerm = item.naverQuery || (cleanTerm + ' 가격');
  const naverNewsUrl = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(naverSearchTerm)}`;
  const targetedUrl = `https://www.google.com/search?q=${encodeURIComponent('"' + cleanTerm + '" futures price (site:reuters.com OR site:bloomberg.com OR site:ft.com OR site:wsj.com)')}&tbm=nws`;
  const bbcTargetUrl = `https://www.google.com/search?q=${encodeURIComponent('"' + cleanTerm + '" price site:bbc.co.uk')}&tbm=nws`;

  document.getElementById('newsModalBody').innerHTML = `
    <!-- Language Toggle Bar -->
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:10px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); margin-bottom:18px;">
      <span style="font-size:13px; font-weight:600; color:#E2E8F0;">
        선택된 언어: ${currentLang === 'KR' ? '국내 주요 언론 뉴스 (네이버 수집 3개)' : '해외 외신 뉴스 (Reuters/WSJ 수집 3개)'}
      </span>
      <div class="currency-toggle" style="background:rgba(255,255,255,0.06); padding:3px; border-radius:999px;">
        <button class="currency-btn ${currentLang === 'KR' ? 'active' : ''}" onclick="switchNewsLang('${item.id}', 'KR')">KR (국내 뉴스)</button>
        <button class="currency-btn ${currentLang === 'EN' ? 'active' : ''}" onclick="switchNewsLang('${item.id}', 'EN')">EN (외신 뉴스)</button>
      </div>
    </div>

    <!-- Articles Container -->
    <div style="margin-bottom:20px;">
      ${articlesHtml}
    </div>

    <!-- External Search Links -->
    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:18px;">
      <h4 style="font-size:14px; font-weight:700; color:#F8FAFC; margin-bottom:12px;">🔍 뉴스 원문 더보기</h4>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a href="${naverNewsUrl}" target="_blank" class="btn-primary" style="text-decoration:none; padding:9px 16px; font-size:13px; background:#03CF5D; color:#FFF; font-weight:700; box-shadow:0 4px 14px rgba(3,207,93,0.3);">
          네이버 뉴스 검색 ('${naverSearchTerm}')
        </a>
        <a href="${targetedUrl}" target="_blank" class="btn-primary" style="text-decoration:none; padding:9px 16px; font-size:13px; background:linear-gradient(135deg, #059669 0%, #047857 100%);">
          Reuters / Bloomberg 외신 검색
        </a>
        <a href="${bbcTargetUrl}" target="_blank" class="btn-primary" style="text-decoration:none; padding:9px 16px; font-size:13px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);">
          BBC News 검색
        </a>
      </div>
    </div>
  `;

  document.getElementById('newsModal').classList.add('open');
}

function switchNewsLang(itemId, lang) {
  openNews(itemId, lang);
}

function stripTrailingDots(text) {
  if (!text) return '';
  return text
    .split('\n')
    .map(line => line.trim().replace(/\.+$/, ''))
    .join('\n');
}

const COMMODITY_GUIDE_DATA = {
  'cocoa': {
    definition: '코트디부아르·가나 등 서아프리카산 카카오두 기준, 미국 ICE 거래소 선물 가격',
    correlation: '글로벌 가공사·제과업체의 원료 매입 단가 기준\n선물 급등 시 6개월~1년 시차를 두고 수입 현물가 및 제품가에 직접 반영',
    factors: [
      '서아프리카 가뭄 및 병충해(CSSVD) 발생 여부',
      '코트디부아르·가나 정부의 수매가(LID) 정책',
      '글로벌 가공업체 분쇄량(Grindings) 지표 및 완제품 소비 수요'
    ]
  },
  'arabica': {
    definition: '브라질·콜롬비아 등 고지대 생산 스페셜티·원두커피용 품종, 미국 ICE 거래소 선물 가격',
    correlation: '국제 원두 거래의 핵심 벤치마크\n수입 현물가는 선물 가격에 산지 프리미엄(Diff) 합산하여 결정',
    factors: [
      '브라질 개화기 가뭄 및 결빙(서리) 피해',
      '브라질 헤알화 환율 변동에 따른 농가 출하량 조절',
      '유럽 삼림벌채방지법(EUDR) 등 글로벌 규제 이슈'
    ]
  },
  'robusta': {
    definition: '베트남·인도네시아 등 저지대 생산 인스턴트·에스프레소용 품종, 런던 ICE Europe 선물 가격',
    correlation: '글로벌 인스턴트 커피 및 캔커피 제조사의 원가 기준\n직관성 확보를 위해 아라비카(¢/lb)와 달리 톤당 달러($/MT)로 환산 표기\n아라비카 가격 급등 시 대체재 수요 증가로 연동성 강화',
    factors: [
      '최대 생산국 베트남 기후(가뭄 및 우기 강우량)',
      '산지 농가의 재고 비축 및 출하 속도',
      '수에즈 운하 등 주요 해상 항로 물류 차질'
    ]
  },
  'gdt-index': {
    definition: '뉴질랜드 폰테라(Fonterra) 중심 글로벌 유제품 경매 플랫폼(GDT) 전 품목 가중평균 지표',
    correlation: '전 세계 유제품 실거래가의 기준 방향성 결정\n2주 단위 경매 체결 결과가 각국 수입 계약 단가에 즉각 반영',
    factors: [
      '중국 내수 원유 재고 수준 및 수입 수요',
      '뉴질랜드·EU 주요 산지의 산유량 증감',
      '국제 유가 변동에 따른 글로벌 해상 운임'
    ]
  },
  'gdt-milk': {
    definition: '원유에서 수분만 제거한 유지방 함유 분말인 전지분유 - GDT 경매 거래 가격',
    correlation: '제과·제빵 및 조제분유 수입 현물 계약의 직접적 기준 가격\n국제 유제품 유통 시장 수급 상황 신속 반영',
    factors: [
      '중국의 전지분유 수입 재개 및 수입량 추이',
      '뉴질랜드 목초지 기후 조건 및 원유 공급량',
      '글로벌 유제품 소비 트렌드'
    ]
  },
  'gdt-wmp': {
    definition: '원유에서 수분만 제거한 유지방 함유 분말인 전지분유 - GDT 경매 거래 가격',
    correlation: '제과·제빵 및 조제분유 수입 현물 계약의 직접적 기준 가격\n국제 유제품 유통 시장 수급 상황 신속 반영',
    factors: [
      '중국의 전지분유 수입 재개 및 수입량 추이',
      '뉴질랜드 목초지 기후 조건 및 원유 공급량',
      '글로벌 유제품 소비 트렌드'
    ]
  },
  'gdt-smp': {
    definition: '원유에서 지방을 분리 제거 후 건조한 분말인 탈지분유 - GDT 경매 거래 가격',
    correlation: '음료, 제과, 빙과류 제조 원가 지표\n버터 부산물로 버터 생산량과 밀접하게 연동',
    factors: [
      '유럽 및 오세아니아 유가공 공장 가동률',
      '버터박(Buttermilk) 가공 비율 및 유청 단백질 수요',
      '식물성 대체 단백질 시장 가격 동향'
    ]
  },
  'gdt-butter': {
    definition: '유지방 80% 이상 유제품인 버터 - GDT 경매 거래 가격',
    correlation: '베이커리·유가공 업체의 직수입 단가 벤치마크\n유지방 수급 불균형 시 단기 변동폭 확대',
    factors: [
      '베이커리 성수기(연말 및 명절) 수요 집중',
      '계절별 원유 내 유지방(Fat) 함유율 변화',
      '식물성 대체 유지(팜유, 마가린 등)와의 가격차'
    ]
  },
  'palm': {
    definition: '인도네시아·말레이시아산 기름야자 열매 추출 식물성 유지, 말레이시아(BMD)/미국 CME 선물 가격',
    correlation: '가공식품·제과·바이오디젤의 핵심 원가 지표\n실제 수입 시 FOB/CIF 현물 가격과 즉각 연동',
    factors: [
      '인도네시아 바이오디젤 의무 혼합 비율(B35/B40) 및 수출 규제',
      '동남아 엘니뇨 가뭄에 따른 수확량 감소',
      '대체 식물성 유지인 대두유(Soybean Oil) 가격 추이'
    ]
  },
  'cpo': {
    definition: '인도네시아·말레이시아산 기름야자 열매 추출 식물성 유지, 말레이시아(BMD)/미국 CME 선물 가격',
    correlation: '가공식품·제과·바이오디젤의 핵심 원가 지표\n실제 수입 시 FOB/CIF 현물 가격과 즉각 연동',
    factors: [
      '인도네시아 바이오디젤 의무 혼합 비율(B35/B40) 및 수출 규제',
      '동남아 엘니뇨 가뭄에 따른 수확량 감소',
      '대체 식물성 유지인 대두유(Soybean Oil) 가격 추이'
    ]
  },
  'lauric-oil': {
    definition: '팜핵유(CPKO) 및 야자유 등 라우르산 함유 특수 식물성 유지의 로테르담/아시아 현물가',
    correlation: '선물 시장 부재로 로테르담 공시 현물가가 글로벌 수입 계약 기준\n가공식품 및 화학 유지류 수입 시 단가 산정의 직접 지표',
    factors: [
      '필리핀·인도네시아 코코넛 수확량 및 태풍 피해',
      '초콜릿 코팅용 대용유지(CBR/CBS) 수요',
      '화장품·계면활성제 등 비식품 화학 산업 수요'
    ]
  },
  'lauric': {
    definition: '팜핵유(CPKO) 및 야자유 등 라우르산 함유 특수 식물성 유지의 로테르담/아시아 현물가',
    correlation: '선물 시장 부재로 로테르담 공시 현물가가 글로벌 수입 계약 기준\n가공식품 및 화학 유지류 수입 시 단가 산정의 직접 지표',
    factors: [
      '필리핀·인도네시아 코코넛 수확량 및 태풍 피해',
      '초콜릿 코팅용 대용유지(CBR/CBS) 수요',
      '화장품·계면활성제 등 비식품 화학 산업 수요'
    ]
  },
  'usd-krw': {
    definition: '서울 외환시장 기준 미국 달러 대비 대한민국 원화 교환 비율',
    correlation: '외환 선물/NDF 시장 흐름이 현물 환율에 실시간 반영\n달러 결제 수입 원자재의 원화 환산 매입 원가 최종 결정',
    factors: [
      '미국 연방준비제도(Fed) 기준금리 정책 방향',
      '국내 수출입 무역수지 및 외국인 자본 유출입',
      '지정학적 리스크에 따른 글로벌 안전자산 선호 심리'
    ]
  },
  'eur-krw': {
    definition: '유럽연합 유로화 대비 대한민국 원화 교환 비율',
    correlation: '글로벌 외환시장(EUR/USD)과 서울 외환시장(USD/KRW) 교차 환율(Cross Rate)로 산출\n유럽산 유제품, 완제품 초콜릿, 가공설비 수입 시 직접 원가 연동',
    factors: [
      '유럽중앙은행(ECB) 통화 정책 및 금리차',
      '유로존 주요국 경제 성장률 지표',
      '달러화 강세/약세에 따른 EUR/USD 역방향 변동'
    ]
  }
};

function openDetailModal(itemId) {
  const item = appState.data.items.find(i => i.id === itemId);
  if (!item) return;

  const icon = ITEM_ICONS[item.id] || '📦';
  // 1. 팝업 타이틀 간소화: '[아이콘] [품목명] 상세'
  document.getElementById('detailTitle').textContent = `${icon} ${item.nameKr} 상세`;
  
  const isGain = item.change >= 0;
  const sign = isGain ? '+' : '';
  const exchangeUrl = item.exchangeUrl || 'https://finance.yahoo.com';
  const exchangeName = item.exchange || '공식 거래소';

  // Compute 7D (or 1M for dairy) history points
  const isGdt = item.id.startsWith('gdt') || item.category === 'dairy';
  const rangeKey = isGdt ? '1M' : '7D';
  const rangeLabel = isGdt ? '최근 1개월' : '최근 7일';
  
  const historyData = (item.history && item.history[rangeKey] && item.history[rangeKey].length > 0)
    ? item.history[rangeKey]
    : ((item.history && item.history['7D'] && item.history['7D'].length > 0)
        ? item.history['7D']
        : (item.sparkline ? item.sparkline.map((p, idx) => ({ date: `D-${idx}`, price: p })) : [{ date: '현재', price: item.price }]));
        
  const prices = historyData.map(h => h.price);
  const rangeHigh = prices.length ? Math.max(...prices) : item.price;
  const rangeLow = prices.length ? Math.min(...prices) : item.price;

  // 2. 품목 기초 가이드 데이터 매핑
  const guide = item.guide || COMMODITY_GUIDE_DATA[item.id] || COMMODITY_GUIDE_DATA[item.id.replace('-wmp', '-milk')] || {
    definition: item.description || '국제 시장 기준 원자재 가격 정보입니다',
    correlation: '국제 선물/현물 벤치마크 가격과 연동되어 거래됩니다',
    factors: ['글로벌 수급 동향 및 기후 요인', '환율 및 운임 변동', '주요 산지 정책 변화']
  };

  const factorListHtml = (guide.factors || []).map(f => `
    <li class="guide-factor-item">
      <span class="guide-factor-dot">▪</span>
      <span>${stripTrailingDots(f)}</span>
    </li>
  `).join('');

  document.getElementById('detailBody').innerHTML = `
    <!-- Top Price Summary Box -->
    <div class="detail-summary-box">
      <div>
        <div style="font-size:12px; color:#94A3B8;">현재 시세</div>
        <div style="font-size:26px; font-family:'Outfit'; font-weight:800; color:#FFF; line-height:1.2;">${formatPrice(item.price, item.currency)}</div>
        <div style="font-size:11.5px; color:#64748B; margin-top:2px;">단위: ${item.unitKr} (${item.unit})</div>
      </div>
      <div style="text-align:right;">
        <span class="badge-change ${isGain ? 'badge-gain' : 'badge-loss'}" style="font-size:14px; padding:4px 12px;">
          ${sign}${item.changePercent.toFixed(2)}%
        </span>
        <div style="font-size:11.5px; color:#94A3B8; margin-top:6px;">거래소: ${item.exchange}</div>
      </div>
    </div>

    <!-- Mini Trend Chart Section (Compact) -->
    <div class="detail-chart-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:12px; font-weight:700; color:#E2E8F0;">📈 ${rangeLabel} 시세 추이</span>
        <span style="font-size:11px; color:#94A3B8;">
          최고 <span style="color:#10B981; font-weight:600;">${formatPrice(rangeHigh, item.currency)}</span> / 최저 <span style="color:#F43F5E; font-weight:600;">${formatPrice(rangeLow, item.currency)}</span>
        </span>
      </div>
      <div style="height:95px; width:100%; position:relative;">
        <canvas id="detailMiniChart"></canvas>
      </div>
    </div>

    <!-- 3. 신규 '품목 기초 가이드' 영역 -->
    <div class="detail-guide-card">
      <div class="detail-guide-header">
        <span>📚 품목 기초 가이드</span>
      </div>

      <!-- [품목 정의] -->
      <div class="guide-item">
        <div class="guide-label">[품목 정의]</div>
        <p class="guide-text">${stripTrailingDots(guide.definition)}</p>
      </div>

      <!-- [선물-현물 연관성] -->
      <div class="guide-item">
        <div class="guide-label">[선물-현물 연관성]</div>
        <p class="guide-text">${stripTrailingDots(guide.correlation || '').replace(/\n/g, '<br>')}</p>
      </div>

      <!-- [주요 변동 요인] -->
      <div class="guide-item">
        <div class="guide-label">[주요 변동 요인]</div>
        <ul class="guide-factor-list">
          ${factorListHtml}
        </ul>
      </div>
    </div>

    <!-- 4. 출처 버튼: 우측 하단 슬림 링크 버튼 -->
    <div class="detail-modal-footer">
      <a href="${exchangeUrl}" target="_blank" rel="noopener noreferrer" class="btn-source-slim" title="${exchangeName} 공식 데이터 출처 바로가기">
        🔗 ${exchangeName} 공식 출처 ↗
      </a>
    </div>
  `;

  document.getElementById('detailModal').classList.add('open');

  // Render Mini Chart
  setTimeout(() => {
    const canvas = document.getElementById('detailMiniChart');
    if (canvas) {
      if (window.detailMiniChartInstance) {
        window.detailMiniChartInstance.destroy();
      }
      const ctx = canvas.getContext('2d');
      const strokeColor = isGain ? '#10B981' : '#F43F5E';
      const grad = ctx.createLinearGradient(0, 0, 0, 95);
      grad.addColorStop(0, isGain ? 'rgba(16, 185, 129, 0.28)' : 'rgba(244, 63, 94, 0.28)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      window.detailMiniChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: historyData.map(h => h.date || h.time || ''),
          datasets: [{
            data: prices,
            borderColor: strokeColor,
            borderWidth: 2.2,
            backgroundColor: grad,
            fill: true,
            tension: 0.35,
            pointRadius: 2.5,
            pointBackgroundColor: strokeColor,
            pointHoverRadius: 4.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              titleColor: '#E2E8F0',
              bodyColor: '#FFFFFF',
              padding: 6,
              callbacks: {
                label: (c) => ` 시세: ${formatPrice(c.raw, item.currency)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#64748B', font: { size: 10 } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: {
                color: '#64748B',
                font: { size: 9.5 },
                callback: (v) => formatPrice(v, item.currency)
              }
            }
          }
        }
      });
    }
  }, 40);
}
