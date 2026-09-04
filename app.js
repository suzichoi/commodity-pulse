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
  "last_updated": "2026-09-05 07:41:45",
  "weekly_report": {
    "title": "[2026 Week 36 Report]",
    "week_number": 36,
    "week_date_range": "2026.08.31 ~ 2026.09.04",
    "weekly_price_title": "[W36 주요품목가격]",
    "date": "2026.09.05",
    "report_date": "2026.09.05, 07:41",
    "top_gainer": "GDT 탈지분유 : $3,695.00 (▲5.51%)",
    "top_loser": "아라비카 커피 : $6,457.33 (▼9.70%)",
    "weekly_price_list": [
      "코코아 : $6,175.00 (▲14.26%)",
      "아라비카 커피 : $6,457.33 (▼8.96%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,910.00 (▲1.00%)",
      "GDT 전지분유 : $3,585.00 (▼0.17%)",
      "GDT 탈지분유 : $3,695.00 (▲5.51%)",
      "GDT 버터 : $5,028.00 (▼1.22%)",
      "팜유 : $1,229.50 (▼0.25%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $6,175.00 (▲14.26%)",
      "아라비카 커피 : $6,457.33 (▼8.96%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,910.00 (▲1.00%)",
      "GDT 전지분유 : $3,585.00 (▼0.17%)",
      "GDT 탈지분유 : $3,695.00 (▲5.51%)",
      "GDT 버터 : $5,028.00 (▼1.22%)",
      "팜유 : $1,229.50 (▼0.25%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,345.99원 (▼9.42원)",
    "fx_eur": "1,562.40원 (▼12.99원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가"
  },
  "daily_briefing": {
    "title": "[2026 Week 36 Report]",
    "week_number": 36,
    "week_date_range": "2026.08.31 ~ 2026.09.04",
    "weekly_price_title": "[W36 주요품목가격]",
    "date": "2026.09.05",
    "report_date": "2026.09.05, 07:41",
    "top_gainer": "GDT 탈지분유 : $3,695.00 (▲5.51%)",
    "top_loser": "아라비카 커피 : $6,457.33 (▼9.70%)",
    "weekly_price_list": [
      "코코아 : $6,175.00 (▲14.26%)",
      "아라비카 커피 : $6,457.33 (▼8.96%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,910.00 (▲1.00%)",
      "GDT 전지분유 : $3,585.00 (▼0.17%)",
      "GDT 탈지분유 : $3,695.00 (▲5.51%)",
      "GDT 버터 : $5,028.00 (▼1.22%)",
      "팜유 : $1,229.50 (▼0.25%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $6,175.00 (▲14.26%)",
      "아라비카 커피 : $6,457.33 (▼8.96%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $3,910.00 (▲1.00%)",
      "GDT 전지분유 : $3,585.00 (▼0.17%)",
      "GDT 탈지분유 : $3,695.00 (▲5.51%)",
      "GDT 버터 : $5,028.00 (▼1.22%)",
      "팜유 : $1,229.50 (▼0.25%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,345.99원 (▼9.42원)",
    "fx_eur": "1,562.40원 (▼12.99원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가"
  },
  "lastUpdated": "2026-09-05T07:41:45.086496+09:00",
  "usdKrwRate": 1345.99,
  "eurKrwRate": 1562.4,
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
      "price": 6175.0,
      "change": 118.0,
      "changePercent": 1.95,
      "high52w": 7644.0,
      "low52w": 2798.0,
      "high24h": 6314.0,
      "low24h": 6149.0,
      "high7d": 6650.0,
      "low7d": 6057.0,
      "high1m": 6650.0,
      "low1m": 5543.0,
      "volume": 11927,
      "sparkline": [
        6155.0,
        6527.0,
        6650.0,
        6552.0,
        6254.0,
        6057.0,
        6175.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 6137.95
          },
          {
            "time": "11:00",
            "price": 6150.3
          },
          {
            "time": "13:00",
            "price": 6162.65
          },
          {
            "time": "07:41",
            "price": 6175.0
          }
        ],
        "7D": [
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
            "price": 6175.0
          }
        ],
        "1M": [
          {
            "date": "08-04",
            "price": 5924.0
          },
          {
            "date": "08-05",
            "price": 5882.0
          },
          {
            "date": "08-06",
            "price": 5776.0
          },
          {
            "date": "08-07",
            "price": 5782.0
          },
          {
            "date": "08-10",
            "price": 5821.0
          },
          {
            "date": "08-11",
            "price": 5543.0
          },
          {
            "date": "08-12",
            "price": 5619.0
          },
          {
            "date": "08-13",
            "price": 5648.0
          },
          {
            "date": "08-14",
            "price": 5734.0
          },
          {
            "date": "08-17",
            "price": 6044.0
          },
          {
            "date": "08-18",
            "price": 5905.0
          },
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
            "price": 6175.0
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
            "price": 6057.0
          },
          {
            "date": "2026-09",
            "price": 6175.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Sufficient Short-Term Supplies Limit Cocoa Price Gains - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNZmR1OU9xZkswMlNfdmpCdk8yZ1Bod1ItendxTE5sWVU3ZnpkWE1OOEEyTGdOZmVRdHFLOFowZFlLRTdtQmtLY3lIdGdUeGVtR1pHVG9aRURSWGNDUnJfSzF4S2RLY1JaQV90clRqNGlOUnJqZ2QxV0txazEzcXA4ZTZZeE5LZEgteENXaW1peXdnQmxpeTF4ZllkODgydXc?oc=5",
          "date": "09-05 01:07"
        },
        {
          "title": "Cocoa prices wobble as near-term supply meets fresh crop worries - briefs.co",
          "source": "briefs.co",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQTDYyT2wyTVlveTR3TFF2TXoyX0RqcDFxSTNrd0Z5Ui1palRxZ1RmeFR3VkU0ZGZqbHFhY3YwQWlwYWU2YlVLWWFkT3RwQmNLSmJUZDdDQUlLOUF0RmpZTzVMa0NDUEhhRV9XdEVXdHlIZ1ZJd0xkZ2JHRUN3VDEzMXdOcjZ6UE05VVpMTlYwOXBKUQ?oc=5",
          "date": "09-05 01:51"
        },
        {
          "title": "Cocoa Prices Retreat as Supply Fears Abate - Yahoo Finance",
          "source": "Yahoo Finance",
          "link": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQaFdYMW1ocGRqdDg1aTZJQ3JQVllCemxkZWlIdVVBaVVnUWZacDBIRmt0ZDl3aVhxTFc5dWFhVEwwV0x4THlWX3VPMlF5alRERkxXcVcySnktZlY2UFZyQ1dhTXZKLUF0bk9wdlRqY1dfbGpFR1FfNjRzNUp5aldrOU83cGNiUXl2VGtMQjRaYWU1Z29YS1ExblFVdkVjeEkxb2NHZkxn?oc=5",
          "date": "09-04 03:20"
        },
        {
          "title": "Disappointment as Ivory Coast keeps cocoa price unchanged - africanews.com",
          "source": "africanews.com",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOTVNfdkxBRnZWSGRYNW0yU0V1aDA2UUlkYnZjb0dUSjNyWkllRW5tbXdjUHMtOFFQcWk4QXdlcUtMd01pU0ltLXlXXzQwelpBQnl2R1VuejFHLV81NzBhNlhleTRpM0czUEJEYVdmRlRUbDhWYTlSWWlGMW00NkZMRkJTal9qR0Y5UXgxRGhyb2JRWTNnNjlZWkt0Wl_SAaIBQVVfeXFMTm1ZUFJVZWRjal9QcDJ6NWQwZmI5eHk3RUQ3ZUY3UlQyeGxKZXAxeV9QRWgwd1BpVE00Q3Y3SFhndWVRQ2IwaUx6a21BYzg5VVUtNU4wUVlZblU0bmFVeUZVVldJcm9rNmwyT281a0prWmpMSzRsbFY1TDJvNG84UjZkWkl1bjYzTnVmcUNFOHBtdmpNUXExN0lhWmdIaDlYSVJ3?oc=5",
          "date": "09-03 16:11"
        }
      ],
      "newsKr": [
        {
          "title": "미국 코코아 선물(COCOA-F) 종목이 9월4일에 2.10% 상승한 이유는 무엇인가요? - tradingkey.com",
          "source": "tradingkey.com",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxPZjFyd09tVXZRSDBEZGktVmFvbzNOMW40dkZuTFczYTJwaDdYU0haNXJHbi1tWXpfeTBxYk9xUUJYVW1SbUN4cDl1WVFiUFVsZlAwUWN3cmNJZEtaY2dDNjk0Z3hQdlF6Qlpid1RtbXJlSnpjZzd2TTlJQklpYjd5VnVqSWQ2ZHRCcjNlM2c4ek4wcTQ?oc=5",
          "date": "09-04 18:36"
        },
        {
          "title": "미국 코코아 선물(COCOA-F) 종목이 9월2일에 3.37% 하락했습니다. 무엇을 주의해야 할까요? - tradingkey.com",
          "source": "tradingkey.com",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQdTlXa2sxTmlWUWwyQmUxMURMRm85ZGM1Vk4zTU1DZmVBdVRCUXlnVGgtakoyOWRwMm1Rd1Vod2JpY2tyMjdJdDY4SjNRQndVZlNfZWNuX05oQzgtaTlDSzF2VXJ2aHNjY0RQM3NpVmk3UVotZHZNNl96bVNrU3BGMFVYNVpmZ2N1eGhIZzg2Yjl5dkE?oc=5",
          "date": "09-02 20:31"
        },
        {
          "title": "150만 아동의 현실 앞에 선 공정무역 — 서아프리카 코코아 농장 아동 노동 보고서의 성과와 한계 - 뉴스N연합",
          "source": "뉴스N연합",
          "link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTE9YX2xLUVR3dUI0N1dwU0s0bEMzU2xZVFdfM2hvanhPX1lfUDdlaUVNZU1WbzhwcGJrSUNwMGNmTHgzQzhieHB4MDBodGNHVkk?oc=5",
          "date": "09-02 16:00"
        },
        {
          "title": "코코아, $5,967 지지선 근처에서 가격이 안정된 후 보합세 거래 - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQMXBmcDJUTDVwT2RsSzl4Y2NhejB4NF9aeE5CeG5PaFh4NnI1MUtxbXE2SzRLY3dGbGtBS2NCdTZHTnVkdlI2a0RWVS11YzZibVlZTzJuZGtyTnIwSnBubk5ka09LVzFsWFFoUkRQODluTXZ1dFg3TXcxeG9DSzliTU9JY3dDcHJqNm1rdnF5cjlTRm4wdElxUg?oc=5",
          "date": "09-04 00:10"
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
      "price": 6457.33,
      "change": -693.35,
      "changePercent": -9.7,
      "high52w": 9655.13,
      "low52w": 5350.61,
      "high24h": 6632.6,
      "low24h": 6454.03,
      "high7d": 7624.68,
      "low7d": 6457.33,
      "high1m": 8327.95,
      "low1m": 6457.33,
      "volume": 15188,
      "sparkline": [
        7537.6,
        7624.68,
        7581.69,
        7545.31,
        7239.97,
        7150.68,
        6457.33
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 6418.59
          },
          {
            "time": "11:00",
            "price": 6431.5
          },
          {
            "time": "13:00",
            "price": 6444.42
          },
          {
            "time": "07:41",
            "price": 6457.33
          }
        ],
        "7D": [
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
            "price": 6457.33
          }
        ],
        "1M": [
          {
            "date": "08-04",
            "price": 7145.17
          },
          {
            "date": "08-05",
            "price": 7206.9
          },
          {
            "date": "08-06",
            "price": 7091.16
          },
          {
            "date": "08-07",
            "price": 7397.6
          },
          {
            "date": "08-10",
            "price": 7325.95
          },
          {
            "date": "08-11",
            "price": 7402.01
          },
          {
            "date": "08-12",
            "price": 7497.91
          },
          {
            "date": "08-13",
            "price": 7343.59
          },
          {
            "date": "08-14",
            "price": 7453.82
          },
          {
            "date": "08-17",
            "price": 7608.14
          },
          {
            "date": "08-18",
            "price": 8011.59
          },
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
            "price": 6457.33
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
            "price": 7150.68
          },
          {
            "date": "2026-09",
            "price": 6457.33
          }
        ]
      },
      "newsEn": [
        {
          "title": "What’s brewing in the coffee market? - Ohio's Country Journal",
          "source": "Ohio's Country Journal",
          "link": "https://news.google.com/rss/articles/CBMia0FVX3lxTE9VbDdxVHhLT0JhcTIzamgtbWRvQi1fUWk5WGQ0d2ZFRU5jQzlSa09FNno2T0U4ZVJtYjRrVVBaSmVmcnFicDhUb2RwNzl6YmhTLVc0cHg1b0lDQzQwbldPREtFUm1GR3AtSVdJ?oc=5",
          "date": "09-04 04:20"
        },
        {
          "title": "Coffee Prices Pressured as More Supplies Hit the Market - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQZUdRVVJRT09xQ3hTWV9xUUcweWpyZm9vb3YzV3gtOWFsSm5tbDNyUGNYdk9fbVhtT0ZQUlpWUS1FMDJCZVpSc1R5enJQQ3JrMXV1RTNtZF83QnF0bnNhUmlQbDZCdUl2TnQtbEx4VkRMQTJDR0U1ZjdDbnNqbU1wSUoxczYzQmtRNEtPN2pBLU9wR05Cd2FONDQ2dmhMU0VJ?oc=5",
          "date": "09-04 00:47"
        },
        {
          "title": "It's not your imagination: Coffee prices are up 125% since 2019 — 4 times the rate of food overall - moneywise.com",
          "source": "moneywise.com",
          "link": "https://news.google.com/rss/articles/CBMif0FVX3lxTE5YbVk5UjNNOURTNzRBa3Y0VnZFVlhwQ3hYaElmV0VmVVpSWTU2RFF6RXViQnA0aWhWNnZma1MwZEVJVWNiSjY1MWlZVUtaOF9nenZ4WjRMZzJfYlZLMldEQUVVZVFwWC1CSVNPYzAtOEZzLWVGYk5XZUJVSjF1R0k?oc=5",
          "date": "09-02 23:43"
        },
        {
          "title": "Coffee: How to read Coffee market moves - equiti.com",
          "source": "equiti.com",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxNOURkdnllLTZvTnBOWWQzbnVHSzNQYVdvRm51clFZR3lwbFpRS0VNclZkOGsyVG5nazRrMjVfN25KVk9GR3RlRG8zbHNRNnVic3EyQzdKZTdkdTZNTTlUWU9zcm0wRmVYM1JtZk1nUjVTUjQzWmpDZldJaWw4UHVMNmRNWE1yS0RPNjBwNDRKQkRBZw?oc=5",
          "date": "09-04 06:07"
        }
      ],
      "newsKr": [
        {
          "title": "2026년 9월 4일 오늘 농산물 가격: 전 세계적으로 커피 가격이 급락했지만 작황 전망은 긍정적입니다. 베트남 상품 거래소에 대한 새로운 규정이 시행됩니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMigwJBVV95cUxPNVdkNFNrRUFzMlhzOXZNdERCdmVzbEhfbk9Jb3lCdzFsSV9pZVRfQkZfbzlmc01uSl9TX3dwZnQ4ZFdHTXFwdWdma0w0aHU0UGNMY3VRd0d0T2hUbUZ6Qk9UV2liYmNFeUp1Vlowc2xRZUdqVTlRMzhyUzNndWJpaGRGMHRnemFYbnR0cURCRW9ZM1lGLVNtV1dvY0Fic3V4aFdLUDdZcVIxdEt6dmRIQXJSWjlfM0hSZE5HeWY1UkoxUzNNUGstSEZ4Mm03X3ktZ2RwaGhCN0djWWlNTkt6RWtNbElxZ3Z1ODlmNHpqWDVlZ29FNm9YNmpfQTZnaWpVVnRv?oc=5",
          "date": "09-04 14:49"
        },
        {
          "title": "오늘(9월 4일) 커피 가격: 베트남은 올해 첫 8개월 동안 60억 달러 상당의 커피를 수출했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQaFJfMDUzQ29fZTdpNDZuaUdqQm91dTdlUXNoT0ZGdDRCYktnU0J6eEtBQXMtYy1JQU1pWVlXNnVhaHVqNDl2U3pWdk1EMTZwelQ0VUhaaHNOWnZDaDI4bkRreDJwZnlXU0RJYUx6MWlMcVl1OW50SFQwQUQ1U3pQTy1OYWpnUl8ybllFM1Q0Y3NtYm5wRmR2dmZfdXRyRURBckhreklBWk8?oc=5",
          "date": "09-04 18:16"
        },
        {
          "title": "오늘 9월 3일 커피 가격: 급격한 하락 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMihwFBVV95cUxQSTEwUXNJT1o0QTRMQWdYeC1IVmZWZWRxaEJHdUFobUVNZVZpcFc1QTAzX1RWeXZVLTFQS2VEVVZYbE1fVnJUWG5SRHVtdzNoektuRE1JWmVkTmZpVjdIMW0xcXMxamRqWXJha0JZRTdON1A4UEtTaVlGOWpfTkhMLU9HSDRDa0E?oc=5",
          "date": "09-03 16:13"
        },
        {
          "title": "공급량 증가로 세계 커피 가격이 3일 연속 하락세를 보였습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOdy1CcFl3T2JVMzBvcTFlU3VYQjhaa2xsSEhHSDRkMjBuR3Q3dUZMM1g4eW1jNjVKUDh6TzVVOEQ0MnU3SnVjM0lQNzl3cURZUUs4czdtVkZyam9fMk1WZ3Q4N1dyNkY1LVdlRnpMTWtBWjZ5amlWWG1jaW5Wc0wtY2NTN1NGZzNIM3ZzTWF3TWRRLURQdzRFYnhB?oc=5",
          "date": "09-03 18:15"
        }
      ],
      "original_price_lb": 292.9
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
            "time": "07:41",
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
          "title": "Coffee futures prices continue to fall amid an improving global outlook, more details on the StoneX estimate - Comunicaffe International",
          "source": "Comunicaffe International",
          "link": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxNLV9QbjE5NE5CVmlsQ2NpdFIxT2FHS19CeUJSNm9Uc2w3aHRwenJaYTVhdEEwdjBVel90SWlsYTZaQ0I2ZEQ3M3dUcVNXaTRPcnZHTVpjS08zdHE2RWttMjZpMmdILVdfMms0ZFlGQ3B1WW5talhDT3NWRlJCRWVhVnVTVWtRY29ldVVuWHloay16Z1pyT3JPOGk4SFNaYWx5dDU5X0kxeFdEUWIyQUtPQ3dGSnZuTWVqal82MFdseTJrdVhOSTBscFBTYVpzY1ZL?oc=5",
          "date": "09-04 20:09"
        },
        {
          "title": "Vietnam Coffee Prices Tepid Post-Holiday, Higher Premiums In Indonesia - ESM Magazine",
          "source": "ESM Magazine",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQR2dlYTBJYUJvd2xNWTRuNXdITFlNeXp4enhVeTAxSklnck5iTDZVWE5xcjhRdmhGV1VJX0FWMDR3YjFlM2RJX1FTSjFMRkVMSVI3WE5LbW9BUUZsVHBTT0dibmI2aHIzZ290bVNaMFprdmVqcTVzdDY0dHVVWGZ5NHNyajVKUHFTTkluTUNKbkl2SHNDRjRXVUw1Rlg4Ny1OVEU5QUd3U3FzTG9mSVo4UmctbklKeDJ2?oc=5",
          "date": "09-03 20:35"
        },
        {
          "title": "Coffee: How to read Coffee market moves - equiti.com",
          "source": "equiti.com",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxNOURkdnllLTZvTnBOWWQzbnVHSzNQYVdvRm51clFZR3lwbFpRS0VNclZkOGsyVG5nazRrMjVfN25KVk9GR3RlRG8zbHNRNnVic3EyQzdKZTdkdTZNTTlUWU9zcm0wRmVYM1JtZk1nUjVTUjQzWmpDZldJaWw4UHVMNmRNWE1yS0RPNjBwNDRKQkRBZw?oc=5",
          "date": "09-04 06:07"
        },
        {
          "title": "Agric. & Environment: Coffee prices fall further in Ibanda a - NewVision.co.ug",
          "source": "NewVision.co.ug",
          "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQVG5FcHZ3RU9mR3RKZkdMbjYtRXNvdWhXQjc3MkVkd2ZJSmliSjJvWUdEZk1uUEcyUkRjbklTeEMta3pyQ1FDWVhRUjhobFMtcGZ1TzFsWlpKYUN5aVdXR0c2cV9BbGRyNGxtZ2hyVkhXaTlHTUFyd1doNDJWQ05GWmUwc2JuYk5LeEhmTFRDYlFXQ1Uyb2x3QURpQVdHLXQwaU5OMEZYSW9LSkZ3OWdQVw?oc=5",
          "date": "09-04 20:00"
        }
      ],
      "newsKr": [
        {
          "title": "커피 가격은 9월 4일 오늘도 계속 하락하여 로부스타 가격은 톤당 거의 3,400달러까지 떨어졌습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPeFIxelpSY1M3MlpFYW43SDdoRm52eWdyalhuY1RNZXdrY1NWVVJwZF9MUWlxcTZCRDZHS24wSS1GN0xXbDAwN2thRlZCeTVyRmpFQ2Q0LWJTNlcyNGxsSmxzUWlSZGpVcE1DZndwcFhrRHZiRGxmc0ROWFFNWHdDYlNxRXd3SWtMbHRUR3hzOHU5VUIwb1lFVV9CemlLUQ?oc=5",
          "date": "09-04 08:30"
        },
        {
          "title": "2026년 9월 4일 오늘 농산물 가격: 전 세계적으로 커피 가격이 급락했지만 작황 전망은 긍정적입니다. 베트남 상품 거래소에 대한 새로운 규정이 시행됩니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMigwJBVV95cUxPNVdkNFNrRUFzMlhzOXZNdERCdmVzbEhfbk9Jb3lCdzFsSV9pZVRfQkZfbzlmc01uSl9TX3dwZnQ4ZFdHTXFwdWdma0w0aHU0UGNMY3VRd0d0T2hUbUZ6Qk9UV2liYmNFeUp1Vlowc2xRZUdqVTlRMzhyUzNndWJpaGRGMHRnemFYbnR0cURCRW9ZM1lGLVNtV1dvY0Fic3V4aFdLUDdZcVIxdEt6dmRIQXJSWjlfM0hSZE5HeWY1UkoxUzNNUGstSEZ4Mm03X3ktZ2RwaGhCN0djWWlNTkt6RWtNbElxZ3Z1ODlmNHpqWDVlZ29FNm9YNmpfQTZnaWpVVnRv?oc=5",
          "date": "09-04 14:49"
        },
        {
          "title": "오늘(9월 4일) 커피 가격: 베트남은 올해 첫 8개월 동안 60억 달러 상당의 커피를 수출했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQaFJfMDUzQ29fZTdpNDZuaUdqQm91dTdlUXNoT0ZGdDRCYktnU0J6eEtBQXMtYy1JQU1pWVlXNnVhaHVqNDl2U3pWdk1EMTZwelQ0VUhaaHNOWnZDaDI4bkRreDJwZnlXU0RJYUx6MWlMcVl1OW50SFQwQUQ1U3pQTy1OYWpnUl8ybllFM1Q0Y3NtYm5wRmR2dmZfdXRyRURBckhreklBWk8?oc=5",
          "date": "09-04 18:16"
        },
        {
          "title": "오늘 9월 3일 커피 가격: 급격한 하락 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMihwFBVV95cUxQSTEwUXNJT1o0QTRMQWdYeC1IVmZWZWRxaEJHdUFobUVNZVZpcFc1QTAzX1RWeXZVLTFQS2VEVVZYbE1fVnJUWG5SRHVtdzNoektuRE1JWmVkTmZpVjdIMW0xcXMxamRqWXJha0JZRTdON1A4UEtTaVlGOWpfTkhMLU9HSDRDa0E?oc=5",
          "date": "09-03 16:13"
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
      "price": 3910.0,
      "change": 38.9,
      "changePercent": 0.9,
      "high52w": 4350.81,
      "low52w": 3407.56,
      "high24h": 3910.0,
      "low24h": 3910.0,
      "high7d": 3910.0,
      "low7d": 3778.0,
      "high1m": 3910.0,
      "low1m": 3758.0,
      "volume": 43976,
      "sparkline": [
        3880.0,
        3820.0,
        3758.0,
        3815.0,
        3778.0,
        3871.1,
        3910.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3871.1
          },
          {
            "time": "2026-09-01 (Event 411)",
            "price": 3910.0
          }
        ],
        "7D": [
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
            "price": 3910.0
          }
        ],
        "1M": [
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
            "price": 3910.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-19",
            "price": 4350.81
          },
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
            "price": 3910.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Skim Milk Powder Lifted the Global Dairy Trade Index - Dairynews.today",
          "source": "Dairynews.today",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOZWZfUVg5c2RGd0Q4eF9RX2ZxcEgwTGxxY0UxZ21DV1U5ODlzN3lMaEZXYmVlUXZuTDlMRDFqc1VDVVY1VF9lcTlhNUhMQ1VIU2ZaMUZIVmtNY0RMMzloazV3VlBDY0pSYTRaaXpPSTVDN01GVC1jTE14eW5lYlY5T3FKb005N294TTFiMnFKYXMzd3VMTXFsY2lielpULWVUSWNN?oc=5",
          "date": "09-02 18:14"
        },
        {
          "title": "Domestic milk intake down over 22 million litres in year to July - Agriland",
          "source": "Agriland",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxObjNKZWJ2b2Q1NXVKRktNTVR4Rk1TeWJQOFAyWDJuZ1AwVGx2Z3VjVVpweVh4dzBxWmtpM21CVzJwNG9Pdjc1Y3VtTWxwTEk4Mi1fWXozWGE5OVVTYlVQLUlPREYxOTlyLWlwU2NFbjBiNEVZWXcxc0JoNVlieGd0NU9pZFJJY0FzYW5Hb3l0MlFoWXJZTXljbkloZW82VmhWcTdmXw?oc=5",
          "date": "09-04 18:46"
        },
        {
          "title": "NZX 50 rallies as RBNZ plays down future rate hikes - nbr.co.nz",
          "source": "nbr.co.nz",
          "link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxPY3BCM3RYR21lUGRiUTRNWXZPV2Q1UlFFN1J2RnZrUy1pRVEtRGlReE92MDMzVXgycV9HRnR3dTV4TjEybG13WjcteWZfbkJIYmhXY3lkbjhXaENYaW5fb2I2UzZVREpzSVZIVFVqSml0aW96Q0xQSmdaRTRIQ3FIcHVVUVBkbEtzdGM4RS1TOXc?oc=5",
          "date": "09-02 15:34"
        },
        {
          "title": "GDT Event 411 Shows Asia Sustaining Dairy Demand - Dairynews.today",
          "source": "Dairynews.today",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPMHNhLTJsMmktdjR1aW1wc0xwRTM1VVZ4RFAwWlJIbGFwa0QwVXNSNElZdUptMXdGSjBVQ0I4ZjNJa19pOXFaVVYtcG5VeWNweVF3UkRselVtS2dTa1huZkktdklGc3F0c0x4OWpGakgtV3BlUFhCbTc2QllwRGlpVW9VdXdzWFkyWUtGZzlfcXRiR0x3OU8tWGFWVmZEUQ?oc=5",
          "date": "09-04 02:10"
        }
      ],
      "newsKr": [
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - ebc.com",
          "source": "ebc.com",
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
      "price": 3585.0,
      "change": -6.0,
      "changePercent": -0.17,
      "high52w": 4036.0,
      "low52w": 3161.0,
      "high24h": 3585.0,
      "low24h": 3585.0,
      "high7d": 3591.0,
      "low7d": 3483.0,
      "high1m": 3591.0,
      "low1m": 3425.0,
      "volume": 28500,
      "sparkline": [
        3706.0,
        3589.0,
        3425.0,
        3486.0,
        3483.0,
        3591.0,
        3585.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3591.0
          },
          {
            "time": "2026-09-01 (Event 411)",
            "price": 3585.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-19",
            "price": 4036.0
          },
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Skim Milk Powder Lifted the Global Dairy Trade Index - Dairynews.today",
          "source": "Dairynews.today",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOZWZfUVg5c2RGd0Q4eF9RX2ZxcEgwTGxxY0UxZ21DV1U5ODlzN3lMaEZXYmVlUXZuTDlMRDFqc1VDVVY1VF9lcTlhNUhMQ1VIU2ZaMUZIVmtNY0RMMzloazV3VlBDY0pSYTRaaXpPSTVDN01GVC1jTE14eW5lYlY5T3FKb005N294TTFiMnFKYXMzd3VMTXFsY2lielpULWVUSWNN?oc=5",
          "date": "09-02 18:14"
        },
        {
          "title": "Fonterra farmgate milk price outlook | Global Dairy Prices Holding Steady Despite Increase in Seasonal Supply - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPRVQxNmRjMnBES1dwVU9RbmhHWnVtTk9sV1RIbzlLbXlqZWYzVXhBX3ZWdWhCWTZGeWpJZ29ncjc4RVpBaVdYZ3ViaFJsY3RGR1hxbFBzOWR1QWdhWmFKd3BwaFh3NFNnMEdaWktIUDBmclMwT0t5RnpQNGduZWVCYUdfTHk5YVZVYjVDMEV5ODc5d282V3UtdE1PYWp5UQ?oc=5",
          "date": "09-04 04:54"
        },
        {
          "title": "Protein demand keeps dairy prices resilient - SunLive",
          "source": "SunLive",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxOR0syM0ZTRHc1UFVVVlRLYlUyZFh2THB6S1BJV0x2ZDNOdy1JYmFtQnJmbW80V1NnY1VFUGlKR3BoYmc4S3hFMjQwMnJSeEE3bGM4SGkwcjk5SGtxVmp3M2lNWDVLY3cyRjB6NXRrV2ZheEVVRTQyN2tyUnZBYmlzMEpsU2IzY0JvUm1GLXhrUQ?oc=5",
          "date": "09-03 14:00"
        },
        {
          "title": "ByHeart And Dairy Industry Fund Botulism Report: 22 Recommendations, No Parents, And No Mandatory Rules - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPcmx2SEdyWFJISjVUVUZqbWMxZk90eDFka1hEczVVcmxSbENiaXlXX1RTOTJKNXZVaHVieDlZcEdxTjlmYkVoOU1FU282RlVuNjZtbjhEMmczaTRYRGFMaHFlRkY3SndZUUxYLW5rOVVXOTEyZkozN0d6c01POTNYQlF5M2E5R0FiMzQ2TEpmSGItYWpXQ3lPTjBKcTJ2aXFMV0J3VzlCVV9NZHJKQ3EyNHV0c2RVVUxjVU4xQWYtUTFXdnZtLWc?oc=5",
          "date": "09-04 19:39"
        }
      ],
      "newsKr": [
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
      "price": 3695.0,
      "change": 193.0,
      "changePercent": 5.51,
      "high52w": 3695.0,
      "low52w": 2431.0,
      "high24h": 3695.0,
      "low24h": 3695.0,
      "high7d": 3695.0,
      "low7d": 3261.0,
      "high1m": 3695.0,
      "low1m": 3135.0,
      "volume": 18200,
      "sparkline": [
        3457.0,
        3368.0,
        3135.0,
        3234.0,
        3261.0,
        3502.0,
        3695.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3502.0
          },
          {
            "time": "2026-09-01 (Event 411)",
            "price": 3695.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-19",
            "price": 2756.0
          },
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Fonterra farmgate milk price outlook | Global Dairy Prices Holding Steady Despite Increase in Seasonal Supply - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPRVQxNmRjMnBES1dwVU9RbmhHWnVtTk9sV1RIbzlLbXlqZWYzVXhBX3ZWdWhCWTZGeWpJZ29ncjc4RVpBaVdYZ3ViaFJsY3RGR1hxbFBzOWR1QWdhWmFKd3BwaFh3NFNnMEdaWktIUDBmclMwT0t5RnpQNGduZWVCYUdfTHk5YVZVYjVDMEV5ODc5d282V3UtdE1PYWp5UQ?oc=5",
          "date": "09-04 04:54"
        },
        {
          "title": "Skim Milk Powder Lifted the Global Dairy Trade Index - Dairynews.today",
          "source": "Dairynews.today",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOZWZfUVg5c2RGd0Q4eF9RX2ZxcEgwTGxxY0UxZ21DV1U5ODlzN3lMaEZXYmVlUXZuTDlMRDFqc1VDVVY1VF9lcTlhNUhMQ1VIU2ZaMUZIVmtNY0RMMzloazV3VlBDY0pSYTRaaXpPSTVDN01GVC1jTE14eW5lYlY5T3FKb005N294TTFiMnFKYXMzd3VMTXFsY2lielpULWVUSWNN?oc=5",
          "date": "09-02 18:14"
        },
        {
          "title": "Skim Milk Powder Gains a Premium Over Whole Milk Powder - Dairynews.today",
          "source": "Dairynews.today",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxObkxtVFBrUW1JakRIZV9LZjRWSjJDUUNkT251MkR4cFV0bVpWNk9NM21kMVFtbENGRnJjQVlwQ3BTRGFoUzhOUzU3UDdXbTVkV2J0RnlqTkhTYmxpLXRQaTJ1OVdWckwwWi1RRFdCQXljMUM2dTRWM1lCUDIzazl3dE1jYmRhVExMLTIzSFJ4ZFNNbWJJVWxQUDAxUnlnQQ?oc=5",
          "date": "09-02 09:18"
        },
        {
          "title": "GDT auction holds at US$3910 as powders defy supply - B2B News",
          "source": "B2B News",
          "link": "https://news.google.com/rss/articles/CBMihAFBVV95cUxPMmdZZExqaEZFaFNWM2VqR3JhYndvMkd3eXZNYWh0V05nYVZTSEFtdzYxb2R4OUxFa0s3THpqNXVSelRXUDdFU04tR25TTjBNQWtpQ05GeUtTVDE3YWRRa3loRENrOW1HUnVaUjdiRnZKR0VhVDZZVXpyUGcyaXVHSWlXVjY?oc=5",
          "date": "09-03 09:46"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
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
      "price": 5028.0,
      "change": -62.0,
      "changePercent": -1.22,
      "high52w": 7144.0,
      "low52w": 5012.0,
      "high24h": 5028.0,
      "low24h": 5028.0,
      "high7d": 5225.0,
      "low7d": 5028.0,
      "high1m": 5516.0,
      "low1m": 5028.0,
      "volume": 14300,
      "sparkline": [
        5734.0,
        5516.0,
        5336.0,
        5303.0,
        5225.0,
        5090.0,
        5028.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-18 (Event 410)",
            "price": 5090.0
          },
          {
            "time": "2026-09-01 (Event 411)",
            "price": 5028.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-19",
            "price": 7144.0
          },
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Global Dairy Giants Bet $267B on Consolidation and Specialization as Industry Reshapes - Dairy Herd",
          "source": "Dairy Herd",
          "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxObVE4WnA0dXdxM0xXT1ZEUE8xMTRtamZOSm1qeHZSbDdVejR4aW1raFJOUVVyWkdXeWJ0VURGMlM5Mk9PSVJpS2IyZFVxaDgxTmpBdnkyYTN3amtGTmpwS2R2YV9WUjQ4T2M5dWhTSi1vSmZjRFlNeTJaRldUVTktQTV2TmlyR3RDcFRWV0FwTzZjSjlPOG5qRDlWenk0UUlvalQ1WUVjNDNxVktjU3BR?oc=5",
          "date": "09-05 00:17"
        },
        {
          "title": "Butter rebounds while cheese holds steady in Wednesday CME dairy trade - Brownfield Ag News",
          "source": "Brownfield Ag News",
          "link": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQa0tOeFY1ejUxM2tFSXVSbFQxNktRbTM0UUhBeVkxdW9FbXJYYlJJb1E3WlBXa2VpQTdNU1JtdHR4dFk2U3V6Z0x2RENqTklZWFZGN0Y5T1otUDZ1R0Z0TXJJUlJVMmMyeHFlWkt3S1E0TTdodThHcFU1RmxGSXdaanowMGFlbXdSVGJzbksyRWl6VDhtOG5pbnphdjM2WVp6TFZEeWxnV2pXNDZCamllcUUySDdKOXc?oc=5",
          "date": "09-03 04:58"
        },
        {
          "title": "Fonterra farmgate milk price outlook | Global Dairy Prices Holding Steady Despite Increase in Seasonal Supply - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPRVQxNmRjMnBES1dwVU9RbmhHWnVtTk9sV1RIbzlLbXlqZWYzVXhBX3ZWdWhCWTZGeWpJZ29ncjc4RVpBaVdYZ3ViaFJsY3RGR1hxbFBzOWR1QWdhWmFKd3BwaFh3NFNnMEdaWktIUDBmclMwT0t5RnpQNGduZWVCYUdfTHk5YVZVYjVDMEV5ODc5d282V3UtdE1PYWp5UQ?oc=5",
          "date": "09-04 04:54"
        },
        {
          "title": "Skim Milk Powder Lifted the Global Dairy Trade Index - Dairynews.today",
          "source": "Dairynews.today",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOZWZfUVg5c2RGd0Q4eF9RX2ZxcEgwTGxxY0UxZ21DV1U5ODlzN3lMaEZXYmVlUXZuTDlMRDFqc1VDVVY1VF9lcTlhNUhMQ1VIU2ZaMUZIVmtNY0RMMzloazV3VlBDY0pSYTRaaXpPSTVDN01GVC1jTE14eW5lYlY5T3FKb005N294TTFiMnFKYXMzd3VMTXFsY2lielpULWVUSWNN?oc=5",
          "date": "09-02 18:14"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
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
      "price": 1229.5,
      "change": -10.0,
      "changePercent": -0.81,
      "high52w": 1244.25,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1244.25,
      "low7d": 1177.0,
      "high1m": 1244.25,
      "low1m": 1150.0,
      "volume": 10,
      "sparkline": [
        1177.75,
        1177.0,
        1178.0,
        1178.0,
        1244.25,
        1239.5,
        1229.5
      ],
      "history": {
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "08-04",
            "price": 1150.0
          },
          {
            "date": "08-05",
            "price": 1153.5
          },
          {
            "date": "08-06",
            "price": 1151.25
          },
          {
            "date": "08-07",
            "price": 1150.0
          },
          {
            "date": "08-10",
            "price": 1160.0
          },
          {
            "date": "08-11",
            "price": 1163.75
          },
          {
            "date": "08-12",
            "price": 1157.0
          },
          {
            "date": "08-13",
            "price": 1161.75
          },
          {
            "date": "08-14",
            "price": 1162.0
          },
          {
            "date": "08-17",
            "price": 1164.5
          },
          {
            "date": "08-18",
            "price": 1172.0
          },
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
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1222.12
          },
          {
            "time": "11:00",
            "price": 1224.58
          },
          {
            "time": "13:00",
            "price": 1227.04
          },
          {
            "time": "07:41",
            "price": 1229.5
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
            "price": 1229.5
          }
        ]
      },
      "newsEn": [
        {
          "title": "Palm oil prices rise on concerns over El Niño impact on production - ukragroconsult.com",
          "source": "ukragroconsult.com",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOLTQzbHVJZUV4aTdWTndwbnVyLTROaW1qcWlONTVCYkUyN0NBaFZ0RXlVcDROTkQwdVlyZzkyVDROdG1HbE45QVpjeW5uN1VXUWo2X1BRazhUY2llb1BtaXhPQkxESHl6WWV0NDVBdm9iLW1LWDJESGhwYkV1Ykg3ZzJDanUzWkFnNGNyTWxtZkV6VTEzbEtvb09ucmRnUDhfWkpHRA?oc=5",
          "date": "09-04 22:46"
        },
        {
          "title": "Indonesia's global commodities price-setting ambition risks backfiring - reuters.com",
          "source": "reuters.com",
          "link": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOLVNXT19yWF82RnNzMU93clBCaS1MTHZnRkhtQXFRLUU5Q0kxWll2MW1Sb2JuYnc3Mm45NE0taUpqRlppd0RSNnZpeFlIUjFjalRnOFdlaFVfMlFlN1VyLTFJc3lseTBCR3ZKUlQ3eWxjLWpETVJ0LUpFczJGTkpvdnNhZDFwclI1Uk1JTV91MGNKWTZxTHRZd2c5TEkyUHlnZEZJRHByWjlxR0pWTlk5U0s3VDByNWhteGhCYkkxaHNtZw?oc=5",
          "date": "09-03 14:41"
        },
        {
          "title": "CPO Futures Mostly Higher As Soybean Oil Prices Strengthen - BernamaBiz",
          "source": "BernamaBiz",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1jYXplV1p1X0xWU2JBUEdqelZvYW9MTTNEbnl6RVpBcnY3MG15Qi1UM21hTFhIcEtTT2NWa01hWk9NU1l4ZmtBQ2FFM1BLVXVJZlZtQQ?oc=5",
          "date": "09-05 03:16"
        },
        {
          "title": "US Crude Palm Oil Prices Rise 1.46% in Late August on Tight Supply and Strong Demand - chemanalyst.com",
          "source": "chemanalyst.com",
          "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPQ3c0a0JxbDU5UE1nMWVGN0dGa215TVBWQUdBYVRVclU1SHU5a2o5MWxkOVNhQzV0bVRiUlQtMU9YOWFwaU5SbTdNNlZTdlpmVko1czhkRTNaRlJQNHAxRFNaVmNLY2Uwcmlxa01RUWlLcUJGajRMV0hqbThhZXNrODg4UTljMkZvSElwamhvdjBvQ3RNN3lrVmRUNGl2UzBXMENBNXJBbUlURkxZ?oc=5",
          "date": "09-02 16:12"
        }
      ],
      "newsKr": [
        {
          "title": "밀가루·팜유에 용기까지 뛰었다…식품업계, 가격 인상 '궁여지책' - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE8zSnQ4UkszR1psQ0tpLVpfTmIzODYwaWx6UGlkbURQRWZBSDYxbnZwNjhZc2t0OHM0aVEwV1JGY29ZdGJoOHJvOUhTSEd2LWM0b3VHZzRTUExxOWpWSzlHLdIBeEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1ncw?oc=5",
          "date": "08-19 16:00"
        },
        {
          "title": "FAO 7월 세계식량가격지수 131.1포인트 기록… 곡물·유지류·설탕 상승세 주도 - 기계신문",
          "source": "기계신문",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1mT2pzSERFb1dCV3hmbkRjQjFyM2NlSXdUUXFnYjlSN3pZZDN6dEM0RmREMndxQ0ZwUXVmN2NzU1JrS1B3dkx0TTVUc0RkSDQyZFBheWR4aHZoQXZ6MGYxaTBQNktEczQ?oc=5",
          "date": "08-08 16:00"
        },
        {
          "title": "“팜유 시세 궁금해? AI가 알려줘”···식품·외식업계, AI 도입 가속도 - 매일경제",
          "source": "매일경제",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE8tOEVEUU1qYURMZXI2djZoZmdyUFZzNFhYZHdKT2l1UmtYb183c0x3OE1zTVJpVzhmOERZWDRIbXRnSU5YS2U2ajdPV2I3ZEUyNElDck53?oc=5",
          "date": "09-28 16:00"
        },
        {
          "title": "롯데웰푸드, AI로 원재료 시세 읽는다… 팜유 예측 정확도 90% - 글로벌이코노믹",
          "source": "글로벌이코노믹",
          "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxPZjBKT25SSmo0cmlQMTJFQzRoZFhNejJ2Rll1SF9rd0RoYzZWSDAweVlwQkdSbGpuYVFJRnZvR3d3WDVVeThxcVhDdkFjZ2d2aG9zams5dWdYbF93cFpFU2V2aS1BbXQtRkh2N01XaDluZ01GWTBWSGF0aWpyRjVVS1ZybXJsNkZCYm1z?oc=5",
          "date": "09-25 16:00"
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
            "date": "08-29",
            "price": 1930.0
          },
          {
            "date": "08-30",
            "price": 1931.93
          },
          {
            "date": "08-31",
            "price": 1933.86
          },
          {
            "date": "09-01",
            "price": 1935.79
          },
          {
            "date": "09-02",
            "price": 1937.72
          },
          {
            "date": "09-03",
            "price": 1939.65
          },
          {
            "date": "09-04",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "08-06",
            "price": 1930.0
          },
          {
            "date": "08-07",
            "price": 1930.96
          },
          {
            "date": "08-08",
            "price": 1931.93
          },
          {
            "date": "08-09",
            "price": 1932.9
          },
          {
            "date": "08-10",
            "price": 1933.86
          },
          {
            "date": "08-11",
            "price": 1934.82
          },
          {
            "date": "08-12",
            "price": 1935.79
          },
          {
            "date": "08-13",
            "price": 1936.76
          },
          {
            "date": "08-14",
            "price": 1937.72
          },
          {
            "date": "08-15",
            "price": 1938.68
          },
          {
            "date": "08-16",
            "price": 1939.65
          },
          {
            "date": "08-17",
            "price": 1940.62
          },
          {
            "date": "08-18",
            "price": 1941.58
          },
          {
            "date": "08-19",
            "price": 1942.54
          },
          {
            "date": "08-20",
            "price": 1943.51
          },
          {
            "date": "08-21",
            "price": 1944.48
          },
          {
            "date": "08-22",
            "price": 1945.44
          },
          {
            "date": "08-23",
            "price": 1946.4
          },
          {
            "date": "08-24",
            "price": 1947.37
          },
          {
            "date": "08-25",
            "price": 1948.34
          },
          {
            "date": "08-26",
            "price": 1949.3
          },
          {
            "date": "08-27",
            "price": 1950.26
          },
          {
            "date": "08-28",
            "price": 1951.23
          },
          {
            "date": "08-29",
            "price": 1952.2
          },
          {
            "date": "08-30",
            "price": 1953.16
          },
          {
            "date": "08-31",
            "price": 1954.12
          },
          {
            "date": "09-01",
            "price": 1955.09
          },
          {
            "date": "09-02",
            "price": 1956.06
          },
          {
            "date": "09-03",
            "price": 1957.02
          },
          {
            "date": "09-04",
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
            "time": "07:41",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Desiccated coconuts: high supply weighs on prices - Mundus Agri",
          "source": "Mundus Agri",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOSzBxNlpldUhhTjdaNFhEQ1BYOWYxeVlVaFRoSE9NXy1xdnYwVXVjdi0zQ3lmZElLeEI2ZWYxWjhrTGhnUEdkY0pMd2pRUkVqV1NKN3BhX2V3VUkxLWdPa09FcjRIZU5sMFRjOUZXa2RvWnN1ejZzVmpOeUxJLWltTDc0UEZtTG8yQVA0MDduZFRES1U?oc=5",
          "date": "06-30 16:00"
        },
        {
          "title": "Desiccated coconuts: weather and energy costs weigh on the markets - Mundus Agri",
          "source": "Mundus Agri",
          "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQdWdMdnpYejMtS3BrX1BONGthX0xQYWpVa09DRWVkTVJldXRjSnN2OC10Y2h0aUxOOUVzbVhJbGJ5ZFpZUG50LTZ2YVI4OG1laDlzZTdwZHpqWmxsNHZ5Y1ZGNVlnbEVRSmpPSHNfeWgtV1hyNEd3aDdBSFh2a0MtVm0tUktzZ0czQ2pRWnFYWTcwSUMtRGV2Ym1jdVpOYzA?oc=5",
          "date": "05-13 16:00"
        },
        {
          "title": "Buyers are clamoring for coconut oil - Food Business News",
          "source": "Food Business News",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPRENjSllUeERtdXI3NWVBdEdJRW9YMGRjQkluZm1DZkt2VzNJYjlBT0FmM3JtVUtnNFVfcm40NmN1OWZFN1N6Wjh0MmZJSXBvWU5ZUjVhWGdvWFJMT1l5VHYxSUVDUDdxYTNoTXM1MDh5SW1Na05sRkowamJrSU9GRTh0MEdfb0t5UVpmbQ?oc=5",
          "date": "04-29 16:00"
        },
        {
          "title": "Global vegetable oil markets set to tighten through 2027 on aggressive biofuel mandates - The Sun Malaysia",
          "source": "The Sun Malaysia",
          "link": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQa285ekZqRTRreWpvZXhDTWhiUlUxSVMtTlcxMER6WHRzc0VzdXlhSWZ3bE14WnRER3o3aFVaY09uVnZXX25nbEQ3MWxabGd2NldkREY4ZWxQVk9WLWVUcUxxd0RLMjJmR3NqQmR5MUk3V2JWOXdUaGltTFFycC1wWjNrRk1uVWpfYU1qM1pLLXNnM09sdEpxdmZ6MlBJYmpkcUMtc2hjSUF3U0U3a2l4RER1b2xWd1g2RE5KNDRQZ0pFQ3ZoeV8yRmtn?oc=5",
          "date": "02-10 17:00"
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
          "title": "DS단석, 글로벌 행사서 바이오디젤 공정 고도화 방향 제시 - electimes.com",
          "source": "electimes.com",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9valNza2JQLW5XeHRlRWhaNUJ5bWh5QXpIaHlCbjNFbTRsdkkzc0plUkUzbjhRa2V6cklNbnB1aTZGdUpNUThNaTk4cllETEhzTjFPa3VGNlhHVTcyWXdmaXJJYzBnaV9FbmNwZtIBcEFVX3lxTE9zbVJLQURvVmN4Y1RqVXhUbTdXVlpKOHpBN1Q5S3hKQXhQRUFlZ1FWMU1GbXQ3ZndjY2hVNW5iSXA0cEFMeldMZlJWamVMZVY4NklvQmI0YmF0SzZHbkFlRGNReFNuY1ZSVk5mV0NDV3M?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 말레이시아 'POC 2026' 참가…해외 판로 확대 박차 - 전자신문",
          "source": "전자신문",
          "link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9TcVlCLW90bkJGSkxHZUstODJvUlQ5emIxNzVWRzl3c2Y2WWUzS3VXeFM5VktQcDhWSTdGZF92Nk42aDhXREs3YlVRZFp0Zw?oc=5",
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
      "price": 1345.99,
      "change": -9.42,
      "changePercent": -0.69,
      "high52w": 1587.7,
      "low52w": 1322.42,
      "high24h": 1359.28,
      "low24h": 1343.18,
      "high7d": 1380.45,
      "low7d": 1345.99,
      "high1m": 1428.5,
      "low1m": 1345.99,
      "volume": 0,
      "sparkline": [
        1380.45,
        1377.11,
        1366.62,
        1372.86,
        1358.39,
        1355.41,
        1345.99
      ],
      "history": {
        "7D": [
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
            "date": "09-04",
            "price": 1345.99
          }
        ],
        "1M": [
          {
            "date": "08-03",
            "price": 1428.5
          },
          {
            "date": "08-04",
            "price": 1428.43
          },
          {
            "date": "08-05",
            "price": 1421.16
          },
          {
            "date": "08-06",
            "price": 1422.3
          },
          {
            "date": "08-09",
            "price": 1407.0
          },
          {
            "date": "08-10",
            "price": 1417.31
          },
          {
            "date": "08-11",
            "price": 1412.18
          },
          {
            "date": "08-12",
            "price": 1416.46
          },
          {
            "date": "08-13",
            "price": 1416.85
          },
          {
            "date": "08-16",
            "price": 1415.37
          },
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
            "date": "09-04",
            "price": 1345.99
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1337.91
          },
          {
            "time": "11:00",
            "price": 1340.61
          },
          {
            "time": "13:00",
            "price": 1343.3
          },
          {
            "time": "07:41",
            "price": 1345.99
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
            "price": 1358.39
          },
          {
            "date": "2026-09",
            "price": 1345.99
          }
        ]
      },
      "newsEn": [
        {
          "title": "South Korean Won Rises to Over 1-Year High - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOdFA4WjZ4YU12VUQ3Q2JMYmtSbDVaR05rckEzbXNSdUNRRXpubGZGVml5UHgwMEtsZENZR0d6bGRWTmI3TlBxalpJalBSdG1jTTRLYURQb09mdlR3MktQbjFvSmVsYkhZTkNiUlhjdEVWekZFNmhyVHBIWFZOVG80TEpwd1dBT0I0TWdjQ3VIbDFsbE5venp3Nw?oc=5",
          "date": "09-04 13:03"
        },
        {
          "title": "Risks in the South Korean stock market? Goldman Sachs: Retail investors have withdrawn, share buyback ammunition will be exhausted by October, leaving foreign capital as the only remaining support. - Moomoo",
          "source": "Moomoo",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOOWM1T2xhN0lOSUdwUTRhWnBGRFU3T0NCVEdCTV9LcmU3ZThjNzc4UHFlemhQeWlla194YXhua293NVhoRTVHZ1E1ajBIWk5nTndFQ2Q1dmhxelhZQzkzVDUtbzFRVzdWWnpZTldUWjA2VHRMSTAzV1Y4RTFYYUlTb1o5WmFPZG9wZ0Q5eGVpekFLZEZfZndrem1KQWExMldNRUdn?oc=5",
          "date": "09-04 12:11"
        },
        {
          "title": "This is Asia’s best-performing currency so far in 2026 - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPY05wbDR6Y3lvX3VZZnJqaTdvTkE4YlVGeXFlV0dmZi1QelZETmZMaXozN2RKelY3d0lnT3lzMHY0THBGM3BYUF9xaTlweTZiVEhRR2pjdjJ5dG1pZWpRSlNVbHRieHNGTHJxUHIzdXV6VHE3eUxkMGlTNHotWDhMS0VFRkRxRTA5eVlKQW0xVTg4ZXQ1T2w1elJ6b05JSWhYbFIxY01NZ0pnVE0?oc=5",
          "date": "09-03 15:50"
        },
        {
          "title": "Korean won hits 14-month high against US dollar as Japan's yen strengthens - koreatimes.co.kr",
          "source": "koreatimes.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQczFBaWFBYlpCLXFyb1NQVS1SSXZxOUdmUDVMekRrZy0wVm93bW9iMWk4N2FEMlJ5Z0JWZGQ0bHU4LTU0Q0hUdTM4M1Jid3pfN1NyZzdOc21McG9BU1l2V0hfRkRfSF81eXVDVDdieTU4Tkg3T0NhQjZmYzFxa1hGZ1BnOUhqZl9iaHlPWkFZQmZ5aHBEVVNMT0o3amw4a18wbmZnWkFDaDBNRnhWa0wySktKNlVwTFlCNEdF0gHAAUFVX3lxTE43THpxMU1kWWdEUEUyb0M5TU1rNFlOM0hJSFB3cml3dTRnX1N5U0t6c2ZNN1Q3Vk10X0p1MWRmdWxmd2R1Nkp4N01qSFJBemhSeE5RUXl4NjdZb1p5VUZjRGwyWmE0WmtwVUVOSDNUR3pkUTU1WTdIVEhObHhQUU9vX3E2NkZPUi1LUGFXallwOW5FWE5HZ20tV08tWmlLNlFlWmJwR2gyOFFhU0JmeDVNUUpxYmJsZUZjcThvMjlEdQ?oc=5",
          "date": "09-03 16:27"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 달러 잡는 월러, 원화는 한 발짝 더 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE5VaUFaZzZuN05fVVNQT1RHcUEtUWxmVG5iTm1FNzVFMUtlMXp1Z0RnYVc5MVNhTFZYNlZacHJRcVU1bWFKdUhTY0NJZ2pWazQwQ3Mtb252WF9uT2p5VE5aTg?oc=5",
          "date": "09-04 08:01"
        },
        {
          "title": "\"환율 이달 단기 반등... 연말엔 1340원까지 내릴 수도\" - chosun.com",
          "source": "chosun.com",
          "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxOMmFZVEVuLU9qbjFmWlpzZV9sd1M2eS0zdVM3ZzRtZkFOQTJiZjhobDhjal9qblJEQVZiM3N3NmtkRnhMTWpmRjNKdTFKWnFWNERuck1Qdk8zb2hrQUpnNmV0bjNweVZxVk5uX1NNWHVzbFZSNHd0TTBZOXk3MHdveWJ5eGdEV05RLVZZ?oc=5",
          "date": "09-02 17:21"
        },
        {
          "title": "[오늘 외환딜러 환율 예상레인지] - news.einfomax.co.kr",
          "source": "news.einfomax.co.kr",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTFBQV3dqZXZ1dEJuU0VqQzBpTGtISmIwR3pNU1dlSktVX2stUTUtaklZMWc4RWhLWmV0Y3FoUmNXZEFuQ0NtNGIyNENXSWFqRkxPY3l4RGFIWnF5VnJtdUVvR2VkMzhYdnEtSG5yaG1Sc0U?oc=5",
          "date": "09-04 10:31"
        },
        {
          "title": "NH증권, \"원/달러 환율, 4분기 평균 1,380원 전망\" - KBC광주방송",
          "source": "KBC광주방송",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFBkOGdxLUJYZlZ5OXdkQTkxazRqQjRvZmRCWkVObzJaakFYOXpXSFE1aDhjbXAwVDRDX0YwblB2bXdTZjFULUdWZE0xaG0wMmlwR0tXUmNZT05QcFc5UTNSSA?oc=5",
          "date": "09-04 08:52"
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
      "price": 1562.4,
      "change": -12.99,
      "changePercent": -0.82,
      "high52w": 1807.42,
      "low52w": 1560.5,
      "high24h": 1579.4,
      "low24h": 1560.5,
      "high7d": 1607.13,
      "low7d": 1562.4,
      "high1m": 1647.17,
      "low1m": 1562.4,
      "volume": 0,
      "sparkline": [
        1607.13,
        1579.97,
        1587.47,
        1592.22,
        1573.29,
        1575.39,
        1562.4
      ],
      "history": {
        "7D": [
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
            "date": "09-04",
            "price": 1562.4
          }
        ],
        "1M": [
          {
            "date": "08-03",
            "price": 1643.36
          },
          {
            "date": "08-04",
            "price": 1647.17
          },
          {
            "date": "08-05",
            "price": 1642.01
          },
          {
            "date": "08-06",
            "price": 1638.82
          },
          {
            "date": "08-09",
            "price": 1618.62
          },
          {
            "date": "08-10",
            "price": 1635.36
          },
          {
            "date": "08-11",
            "price": 1628.62
          },
          {
            "date": "08-12",
            "price": 1632.86
          },
          {
            "date": "08-13",
            "price": 1634.19
          },
          {
            "date": "08-16",
            "price": 1582.09
          },
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
            "date": "09-04",
            "price": 1562.4
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1553.03
          },
          {
            "time": "11:00",
            "price": 1556.15
          },
          {
            "time": "13:00",
            "price": 1559.28
          },
          {
            "time": "07:41",
            "price": 1562.4
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
            "price": 1573.29
          },
          {
            "date": "2026-09",
            "price": 1562.4
          }
        ]
      },
      "newsEn": [
        {
          "title": "Azerbaijani currency to world currency rates for September 4 - trend.az",
          "source": "trend.az",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE8xdkFKQmtldEdzNkc4RDBXcUpaYWd4dlpOV1htSU40amt0b2Naa1A0c2pZd09YWTdqTktoYWJEUjdqTkoxaEp6UTMtei05eDgwdnctbQ?oc=5",
          "date": "09-04 14:22"
        },
        {
          "title": "CBA currency exchange rates (04.09.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMidkFVX3lxTFB3SkRNYjZuUE9HbWNlY0g4ZW03MGxCSGtpU3RuRlNCWXUzMTZSd0xud3NjbVcxdzJ3cUpydWNoQjhXWkRFYmVZNW01QkNoNEY5NFNIV2hkYjBleG5VeFJrTExFNTY3a1N2MW1qclhOamd1cG9EUHfSAXtBVV95cUxNenNlYi1wbkdaVmQ0NTJBbUFLRml5aFdlZWUwRV9YektPRk5aMTY1dVN4Vzl2eDROQm4xWHBhcFBPb0hMYXFjbm14UFl0Q3RMa2F4QXdHY0FXUERlaEctNVNDa05EbzdQQUJTN0gzSzhZaEJGQkQ5U1NFdE0?oc=5",
          "date": "09-04 14:21"
        },
        {
          "title": "Today's Exchange Rate - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNZWZEb3JNbUhXQUdPM0JDNXJZUXpSWVNObm5JNHhXY19NdXRYQWFoTENrb20ybFlVMWVGc3M3cDB3d0UtaG1wNzE0ZjMybFl4aFJ5YjNyNjc1dF96Mi1BOXpKMmJxX0FXY19lZ19CS2gwc1BBR3l5Z1QtWVZzenBnU3pZOTdLd3g1cTU5UjRfcw?oc=5",
          "date": "09-02 08:39"
        },
        {
          "title": "Azerbaijani currency to world currency rates for September 3 - trend.az",
          "source": "trend.az",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE50TnlMTWNoMVNTOWtfWGFUcmxLYXlSOHF6UVJIdllWNnFxUkpaRUlkYmxqcmZua2czMTJhNDh1Q29zV1dDa29TOU5GRmFLVDdVdDkxOQ?oc=5",
          "date": "09-03 14:15"
        }
      ],
      "newsKr": [
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - LiteFinance",
          "source": "LiteFinance",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "09-04 15:14"
        },
        {
          "title": "[환율 전망] 원화는 괴로워: 외인 이탈에 중동 불안까지 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFB6Zk1qbHY4VTF5blljbWdYVmRZRmRwaXB2akxRcmdiLVY4b1I3RlFJME1iSWFBQ1ZRQTlQM2M5ZGZxM1lQX3dBZmVSR1RfSEE0Y3FGZzRMNl9kNXlaZVBYYQ?oc=5",
          "date": "05-22 16:00"
        },
        {
          "title": "유로 환율 전망 4월 이렇게 갑니다 - 네이버 프리미엄콘텐츠",
          "source": "네이버 프리미엄콘텐츠",
          "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxOTFZ3WlhWNjdPTnRoOFBicjBFandEQWd4NFhQWkhON3E0THJ6enNzZFBlNTVnWDYtcHpMUGFsRmMyc25XeERPN0NKbXgyanJBNWpGX2V5d0JPVWtBa1NiUmJsXzFEYTIwcGpZUUZUbUV6WnhnVVlHa0xZQTRyWDRYcjVIX1BzRUpHYks0?oc=5",
          "date": "04-01 16:00"
        },
        {
          "title": "달러만이 아니다⋯원·유로환율도 들썩 '금융위기 이후 최고' - 이투데이",
          "source": "이투데이",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTFBvV0VVQ0ljY0hQSVlHV05DNk5la1RWeXEwMGs5c0lDVmtHRXlsWUwxQlF6NUUxVTRsNDhNdWFaUXRkcXV5NUNQLTBiZUtmc2RzNHNZaw?oc=5",
          "date": "07-05 16:00"
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
