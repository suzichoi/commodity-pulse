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
  "last_updated": "2026-08-26 13:32:45",
  "weekly_report": {
    "title": "[2026 Week 35 Report]",
    "week_number": 35,
    "week_date_range": "2026.08.24 ~ 2026.08.28",
    "weekly_price_title": "[W35 주요품목가격]",
    "date": "2026.08.26",
    "report_date": "2026.08.26, 13:32",
    "top_gainer": "GDT 탈지분유 : $3,502.00 (▲7.39%)",
    "top_loser": "아라비카 커피 : $7,382.17 (▼11.36%)",
    "weekly_price_list": [
      "코코아 : $5,844.00 (▼3.71%)",
      "아라비카 커피 : $7,382.17 (▲9.46%)",
      "로부스타 커피 : $3,728.00 (▲2.31%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,181.00 (▲1.42%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,844.00 (▼3.71%)",
      "아라비카 커피 : $7,382.17 (▲9.46%)",
      "로부스타 커피 : $3,728.00 (▲2.31%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,181.00 (▲1.42%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,384.58원 (▲3.82원)",
    "fx_eur": "1,614.70원 (▲3.93원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "GDT 유제품 가격 5회 연속 하락세"
  },
  "daily_briefing": {
    "title": "[2026 Week 35 Report]",
    "week_number": 35,
    "week_date_range": "2026.08.24 ~ 2026.08.28",
    "weekly_price_title": "[W35 주요품목가격]",
    "date": "2026.08.26",
    "report_date": "2026.08.26, 13:32",
    "top_gainer": "GDT 탈지분유 : $3,502.00 (▲7.39%)",
    "top_loser": "아라비카 커피 : $7,382.17 (▼11.36%)",
    "weekly_price_list": [
      "코코아 : $5,844.00 (▼3.71%)",
      "아라비카 커피 : $7,382.17 (▲9.46%)",
      "로부스타 커피 : $3,728.00 (▲2.31%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,181.00 (▲1.42%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,844.00 (▼3.71%)",
      "아라비카 커피 : $7,382.17 (▲9.46%)",
      "로부스타 커피 : $3,728.00 (▲2.31%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,181.00 (▲1.42%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,384.58원 (▲3.82원)",
    "fx_eur": "1,614.70원 (▲3.93원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "GDT 유제품 가격 5회 연속 하락세"
  },
  "lastUpdated": "2026-08-26T13:32:45.933796+09:00",
  "usdKrwRate": 1384.48,
  "eurKrwRate": 1614.7,
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
      "price": 5844.0,
      "change": 24.0,
      "changePercent": 0.41,
      "high52w": 7738.0,
      "low52w": 2798.0,
      "high24h": 5980.0,
      "low24h": 5722.0,
      "high7d": 6088.0,
      "low7d": 5820.0,
      "high1m": 6088.0,
      "low1m": 5100.0,
      "volume": 0,
      "sparkline": [
        6044.0,
        5905.0,
        6046.0,
        6088.0,
        5990.0,
        5820.0,
        5844.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5808.94
          },
          {
            "time": "11:00",
            "price": 5820.62
          },
          {
            "time": "13:00",
            "price": 5832.31
          },
          {
            "time": "13:32",
            "price": 5844.0
          }
        ],
        "7D": [
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
            "price": 5844.0
          }
        ],
        "1M": [
          {
            "date": "07-27",
            "price": 5100.0
          },
          {
            "date": "07-28",
            "price": 5201.0
          },
          {
            "date": "07-29",
            "price": 5185.0
          },
          {
            "date": "07-30",
            "price": 5112.0
          },
          {
            "date": "07-31",
            "price": 5397.0
          },
          {
            "date": "08-03",
            "price": 5939.0
          },
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
            "price": 5844.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 6749.0
          },
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
            "price": 5759.0
          },
          {
            "date": "2026-08",
            "price": 5844.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Mondelez Stock: Quality At A Reasonable Price, Regardless Of Cocoa Noise (NASDAQ:MDLZ) - Seeking Alpha",
          "source": "Seeking Alpha",
          "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOMmE4bDU5WXFwVmFDbDhWeE51QTd6SnpEUVI1YWtad3ctZjNJUE55M2x2RDBBeE9UanV3MHRRWEs4T0N1bnd1QzVsNUM3d1oyY0p6cURFcUM5eVdOemFvRXRJYVVUMWZFMGFoN3FsZFV3cVRkR0RrNlFSSnNUZVZ3dEdVRDBVZUdPMlktYUg3Z1M5c3NwbE5aZHNRanZNdmp3M0FMTzRUZ1E?oc=5",
          "date": "08-26 12:15"
        },
        {
          "title": "Cocoa price drop \"saves\" profits; Suan Zong's Q2 net profit surges more than fourfold - Moomoo",
          "source": "Moomoo",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNeGlIdWNnRUpIQl9UX0hjZmtQbkprMVJPVHVoSXRyd1lfUDh6TDA4NW9FTDliblhoRTduVHNlbmpNSE1yR2ZIRlJDZjZodlVtR3B0dTlNWFVjaG9ucnMtcFJjRy1MWG5LM0F1SndJSWxIWU15a2JXVUZaZmRKRzh5OUEwaWdjalNjQVVPdXVOSVVsb2s2cGk0Qm1hX2V5WnV4TlN3cHF4UjN0MktkQ1ZSYmxIMA?oc=5",
          "date": "08-25 15:57"
        },
        {
          "title": "Cocoa Prices Fall as Supply Concerns Ease - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNLTlJX3B0S0cxUy1ucWJZOWRzMVBjbDk5X0V0MFRybERhS3l2djhmblU4Mllsaml3S01TdUhwem5oT3VQNjd6S09FTkJwLVdqNk9Wdmo3LWctTEtIenc5TXZrY3g2VU9rMXo3SkEyUTB0UWl5VG5GaTl5QVVIb0cwYkoxVXpxaG5CazdDdDlR?oc=5",
          "date": "08-25 03:31"
        },
        {
          "title": "Signs of Abundant Cocoa Supplies Undercut Prices - Yahoo Finance",
          "source": "Yahoo Finance",
          "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNY3N3LVg4YWY4ZzNFcUlaVWFCQjcyU21WWnVNMk5PbXVGeWc2SmlKYUZvaDQ1OFlIMWlkSUFJRnRVZjM4Mk1PanRBRHFsZlZmZDEtWkVfUmM0YV9SR3pTTUt5RUZVSDUxakJ5REl6QTlXUUNsc2JMOTdPUHdaYnFIY2NvQUhCbW5pclFEYmx5elZnYm04UnV4Nlh1ZzZ5b3ROTXc1LVBDaEtKWUNF?oc=5",
          "date": "08-25 01:06"
        }
      ],
      "newsKr": [
        {
          "title": "코코아값 반년 새 두 배 급등…제과업계, 하반기 원가 '경고등' - 뉴스1",
          "source": "뉴스1",
          "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE1YTExZSmx3UlNGZTloOXhBMzBiVXRJOXB5TGloS0ctNHAtZmxMcDQzUkNEUWRsSXFJRjFQeHVPYVFucXhwUUlwcWNKSS1iN29Qd2JaUjNfOElPYUdMODlV0gFkQVVfeXFMT19Yd0VlQVR0anJPQkNMOENKN2tDc0had3ZlX3ZvSjJ2Xy1ORnZ2X05meWU0OVRRdDJzWGg3UnBRcTR2S3RJd1F5YXFtUnJyaTY1ZnluejRxX2REOVJPUTlYX0hoTQ?oc=5",
          "date": "08-26 06:30"
        },
        {
          "title": "[능곡고] 편의점 초콜릿이 비싸진 이유 - 우리학교신문",
          "source": "우리학교신문",
          "link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTFBDWW16YkVEWHJ4bmw4bVN4b3FfTTdPVzRFMWdIbHlmRjNWUlh4a055NlBPb0xqR1B5Y0tQM1pscjJUQ0FsRUdaQ2RSR1h3UHVF?oc=5",
          "date": "08-25 21:47"
        },
        {
          "title": "나이지리아 7월 코코아 수출 18% 증가 후 코코아 가격 하락 - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQTmZNV1NuLUt4T0NFMmVPV3Z1LWF2SzgyOVV3ZVpyT1JjQ1NxblFrUkRoTEdBN010eVJnSmlaNE5VZnBIcWpQaUdGbE5BY3NoZUY1d2dTRHlNUG1iVGRfcUdpakhsMUFEa2tCV01pbzk5d2Jaa3Q1RDF0RUswQnl3ck12Y19FaE4xaWgxalkwRURYSGR0WVpZZQ?oc=5",
          "date": "08-26 01:09"
        },
        {
          "title": "코코아 선물 가격 급락: 기술적 전망 - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQZmtEZ1hpU3Rzd2p3bm51OUVqVC1nNmdLQk1PRkdvOU45LUJ0OEkxUl92NGpWcjVDbWtJTlRKY0wtRTNiRV80T1lfaUtvMFlQeThNZUtZUnZhTFdFblFGYVdTTDBhY2szbXJlOXpZc0ctRkVpcUhSTXZWNHlsWUtpY3BzREYyQWZHdjRneVNFU2RlQUkyakR1eUM0OEc?oc=5",
          "date": "08-25 21:19"
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
      "price": 7382.17,
      "change": -945.78,
      "changePercent": -11.36,
      "high52w": 9655.13,
      "low52w": 5350.61,
      "high24h": 7620.27,
      "low24h": 7253.2,
      "high7d": 8327.95,
      "low7d": 7382.17,
      "high1m": 8327.95,
      "low1m": 7043.76,
      "volume": 0,
      "sparkline": [
        7608.14,
        8011.59,
        7925.61,
        8016.0,
        7909.07,
        8327.95,
        7382.17
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 7337.88
          },
          {
            "time": "11:00",
            "price": 7352.64
          },
          {
            "time": "13:00",
            "price": 7367.41
          },
          {
            "time": "13:32",
            "price": 7382.17
          }
        ],
        "7D": [
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
            "price": 7382.17
          }
        ],
        "1M": [
          {
            "date": "07-27",
            "price": 7155.09
          },
          {
            "date": "07-28",
            "price": 7482.48
          },
          {
            "date": "07-29",
            "price": 7182.65
          },
          {
            "date": "07-30",
            "price": 7122.02
          },
          {
            "date": "07-31",
            "price": 7321.54
          },
          {
            "date": "08-03",
            "price": 7043.76
          },
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
            "price": 7382.17
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 8264.02
          },
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
            "price": 8187.96
          },
          {
            "date": "2026-08",
            "price": 7382.17
          }
        ]
      },
      "newsEn": [
        {
          "title": "Coffee Prices Soar as Supplies Tighten - Yahoo Finance",
          "source": "Yahoo Finance",
          "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNSm85ZURLbC1fRW0zdGJqSmNPbkRiRVNodS1yNHFOdmFBMDZGN0gtMXNVaThYa3Q2c3FuR1BELXRwbXpUX21BbGZtYzNPU3VTcXdRd3F5YTRvNEtpZFpmQzNralRoNTRscWhEbFBBSjhWR1ZWZEhYTlFVNUZpeGlXZUtFQmRWUUR6NE9VWW11SHh6V1dHQTJQWnE5MUtwYUFpcjlJTDNmN2k?oc=5",
          "date": "08-25 03:30"
        },
        {
          "title": "Arabica Coffee Price Presses the Flag amid Harvest Delays and Low Inventories - FXEmpire",
          "source": "FXEmpire",
          "link": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQNG5rQVZ2SzIxalozdVVFWnZBQ05TTnVfcHFDUHAtQ3E4Nm8wMlItUEdCd1c4dFBwenV3OVRWTzZENlBwSHFLVmNmT2hUc3I3dGpLbVI0NUVCWnJfdTNPV1J0Z0syb3NvcEZLUmk5Z3RYSlRSVWFRNjdXbXJJS3djRjFtZVpXZTdFMXd5enVtczRGRmlzeERCMzNtaE1ONGg0SzNDS2ZOWHplbE4xcmdVYXNIZVdUR0h1UTNSR1BpTkhPaFNhYnIw?oc=5",
          "date": "08-25 01:24"
        },
        {
          "title": "Slow Pace of Brazil Harvest and Tight Inventories Boost Coffee Prices - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQX0xmWVJmNnNURE95UEFpcWxQa01tdm9Nbkt6YS1yVEZJZUxIUkhqMkplYkc3UWUydWRMX3Z1TzkzWGJUc2dxR1FZTU50S21VMDNQdXJIWjlZRVFueUdwc0ZBTThpVmlmc1RMX3Y0dUtrSE8xQ0tYZ05GWW1uNW9kSTVEWVNVb3F0aEYyNGEwMTBJRkpLdS14R2NaWkZhNDVZYU5yVHBBVnJ3a2s3R3FtYzE3dw?oc=5",
          "date": "08-25 00:43"
        },
        {
          "title": "Rain-Soaked Brazil Pushes Arabica Coffee Prices Upward - Briefs Finance",
          "source": "Briefs Finance",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxOVzhEV28zRXNFd3U1MGR6al81eWJ3N2F0czdvSVVaRFNGZWVTRW8za3VJY0RRSVFLWmdQN3FRUHktZEtIOExkZGphOUtLRGFWdXZiZUY3MUo1VUlFSUtuRkZucVBibHYtczM4c2EyeEtjZ05tRm13OE1ucnVXX3VWVnlPSU9GLWJLZ0E?oc=5",
          "date": "08-24 06:37"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(8월 26일) 커피 가격: 하락 추세 반전, 로부스타 가격 2주 만에 최고치에서 하락. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQYURGSW1LbU14anNMS3FkTDYyOVVwRlVvY1g1Z1hpbW5hUE9UR1R0d0dza1NiRW9JLXJwa0IyOWszajdpaGxaVlpza25aekdWTVZnUkcxNGk3XzRVWDZpNDExVmFHdDRrS2lsSHhZZHdmSHVDdG5XZUcwLThpTGFVc25jalk1cnJoM1BGS09tMDhocWR0NEVYMg?oc=5",
          "date": "08-26 11:15"
        },
        {
          "title": "아라비카 커피, 인도 기간 시작하며 6주 최고가 경신 - Investing.com 한국어",
          "source": "Investing.com 한국어",
          "link": "https://news.google.com/rss/articles/CBMihgFBVV95cUxNaWRHdXR0aDU2c2VkNTROaXZSVTk0bnZsZEZSb0tiRDd4ampnVmwtbG52b0RLWC16UVBwS1A1dDFxTTNzNmd1TjhpZm5FeEdhYVFhMkJQV3ZqSDdTYWNVb0VYdlE0cUtBZUdXWUctYkRKdFBWWHdTWjVKZVFjMEVKTzZiRVNZQQ?oc=5",
          "date": "08-25 05:37"
        },
        {
          "title": "2026년 8월 25일 오늘 농산물 가격: 커피 가격 급등, 새로운 상승 사이클의 확실한 신호일까? 베트남 커피 가격이 점차 kg당 10만 VND 선으로 돌아가고 있는 것일까? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiggJBVV95cUxOQUJSMWRHdVg5WHdpQjRmczBwT1dtUGQ5WFRLeWRuem0tLU41bzczdzg5T1B1bUtWUUlmZEtOWm9KS0ItZ2d0Rms2UWZMdzlzV1ByMVRCZmhLOXpJQ1JOcE1zOWFLMUxodDhSVWZCTC1aQjZfQ2UwLWdtS3Itbm9xd1N2aVY2N1JpNUZBZVJrOGhFalQ5dU9uNnlmQl8tOEs1Z2kyV1NBR2ZwclFEYXNwY2J6VWs5eENkUEdETWVKQ1ZMaEQzOC1rRFQtanUzNUlTdjhhX041UVFBbFhwUU00TVB2V2VPTFJqSmZQRDh4VGtGZHZ2N1ZDN0VjSUpJcXF0OGc?oc=5",
          "date": "08-26 05:15"
        },
        {
          "title": "2026년 8월 26일 오늘 커피 가격이 급등하여 kg당 97,700 VND까지 치솟았습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPM2JERFJtaG4wRmFXbjZYUlRJaVUxaDVFOGZtZDVZQm9MMktqX1JSaHhleDUyZWoyZ1FEUzVvVXJNUFhQclgwZTRYS19LMjZJUVdrUmNOUGxiakZfM2JVUzZ5bGRXaHM0UjN5Q0VXZWxhYVN4b3VsSUdhX1VIWS12QmxnYmoyT25pc2tSaVJkOVktQQ?oc=5",
          "date": "08-26 11:58"
        }
      ],
      "original_price_lb": 334.85
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
            "time": "13:32",
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
          "title": "Coffee Prices Erase Early Gains as Brazil’s Coffee Warehouses Fill - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNOEVSbjJ5VXZzekJtRE5Zd0tocXJMSS1PSTBfMmhRUHI3cElLSk9qMlM4Ni1TeVMtNjhmckdDd2lyUWpJVWl1T0tEVFd6M3lOWGVNNWR1cFRDc3hnSkZTU3RmbFpRRG5vdWYzRjdJOHllWjNVV1VKWTRvd1pqcldWTUw5MzdDbUw3b2FLZGJpYkFUS0loYjhVdkx3TjdpWTRCbFM0WGRPTkpuMzFxampmVFpCci1uekJqb2lKemNOYTJXaTg?oc=5",
          "date": "08-26 03:26"
        },
        {
          "title": "Coffee Prices Retreat on the Outlook for Bigger Brazil Exports - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNSXF0aVV3MFFHZndkWVhIMGE4cTc2ejcxZkZ6eEZaSVA3Vmw3ZGZXMkQ0MUJUcnZUY0tTdVdPc0J1alZiTkRxcXBueWJsc1NtZUN3TFVFM3lOVUVsMlY5TUd2d0RJNzFTdVVia0NEOTg4V0xGamFZaW83V0hKVC1EaWdyREJDRmtUTDdHRWpmYzVaLUd6SGZuUktiLV90TVR0RnlIZUp5WFJldw?oc=5",
          "date": "08-26 00:45"
        },
        {
          "title": "Another sharp rise in the coffee markets: New York and London are up 5.9% and 5.1% respectively - Comunicaffe International",
          "source": "Comunicaffe International",
          "link": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxNajZzS1B5VzFQeGh1RXBHRDNibjh3VlFhSm5vNGdPQnc3bW41cFVjWk5Zbk9qTkVweC1qNGE2Mk9BZksxOXFQSzlMdENzRVVvempiNEt4U0ViV3l4d3l5X3B1a19FWFdCbkpnZExYSjg4aGR1Sm12aXpZQnVZR2NGalR6M0lnZTNjWnE1Z0ktZzVSNUluNU9hLURZRS1CYkVUTnhyRVNpM2JSRlZUMzFDdDRwLUxtdHJ6SV9BcVkwQnB2U3gzVFhBRVdCbjlFU1JqajNHN0Zn?oc=5",
          "date": "08-25 07:59"
        },
        {
          "title": "Vintage Coffee to CCL Products: Coffee stocks surge on high global prices, supply concerns; what investors should know - Upstox",
          "source": "Upstox",
          "link": "https://news.google.com/rss/articles/CBMihAJBVV95cUxOckpibnV3djJLQWJZYnpDb0hCLWM4MHdPSkI4R3dsM3hEdjJDSGJZeVpiSHlqell3MXh1dUZUMmtEUzlLRGhXbDlEUXVCY1lObG1OMFVmRDJTYkJXRUtmNmhGclVQcng3RFVwcHBPSi1Mck5iUFIwb2VaMlNLWDh5Rm1JdWxwYkJvaDNUdEF2M1JWNTg5RGYwVDVSX00yY1JOenZSY2t0bWNzMXlaNXRqQVJBbVNISDdfR0pGSW9JVjN2ZHFoVGNtaGdIMXpnaDdTQXlLZnBLakwzSzRuOXdpa25aa01VbXVrejAwWVQzRFhBTzBSTU96MWdyTVlQMFFNOGFjeA?oc=5",
          "date": "08-25 18:44"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(8월 26일) 커피 가격: 하락 추세 반전, 로부스타 가격 2주 만에 최고치에서 하락. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQYURGSW1LbU14anNMS3FkTDYyOVVwRlVvY1g1Z1hpbW5hUE9UR1R0d0dza1NiRW9JLXJwa0IyOWszajdpaGxaVlpza25aekdWTVZnUkcxNGk3XzRVWDZpNDExVmFHdDRrS2lsSHhZZHdmSHVDdG5XZUcwLThpTGFVc25jalk1cnJoM1BGS09tMDhocWR0NEVYMg?oc=5",
          "date": "08-26 11:15"
        },
        {
          "title": "2026년 8월 26일 오늘 커피 가격이 급등하여 kg당 97,700 VND까지 치솟았습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPM2JERFJtaG4wRmFXbjZYUlRJaVUxaDVFOGZtZDVZQm9MMktqX1JSaHhleDUyZWoyZ1FEUzVvVXJNUFhQclgwZTRYS19LMjZJUVdrUmNOUGxiakZfM2JVUzZ5bGRXaHM0UjN5Q0VXZWxhYVN4b3VsSUdhX1VIWS12QmxnYmoyT25pc2tSaVJkOVktQQ?oc=5",
          "date": "08-26 11:58"
        },
        {
          "title": "2026년 8월 25일 오늘 농산물 가격: 커피 가격 급등, 새로운 상승 사이클의 확실한 신호일까? 베트남 커피 가격이 점차 kg당 10만 VND 선으로 돌아가고 있는 것일까? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiggJBVV95cUxOQUJSMWRHdVg5WHdpQjRmczBwT1dtUGQ5WFRLeWRuem0tLU41bzczdzg5T1B1bUtWUUlmZEtOWm9KS0ItZ2d0Rms2UWZMdzlzV1ByMVRCZmhLOXpJQ1JOcE1zOWFLMUxodDhSVWZCTC1aQjZfQ2UwLWdtS3Itbm9xd1N2aVY2N1JpNUZBZVJrOGhFalQ5dU9uNnlmQl8tOEs1Z2kyV1NBR2ZwclFEYXNwY2J6VWs5eENkUEdETWVKQ1ZMaEQzOC1rRFQtanUzNUlTdjhhX041UVFBbFhwUU00TVB2V2VPTFJqSmZQRDh4VGtGZHZ2N1ZDN0VjSUpJcXF0OGc?oc=5",
          "date": "08-26 05:15"
        },
        {
          "title": "오늘 8월 25일 커피 가격: kg당 1,000동 상승 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxOcTl6MXJ1YmlFbF9PLWVIQ3hGejhyX012cVR6YmgySkxiQ2FQVGRfMWlSRi1TVmNFUWphN0RTVFFvMkJoV3NvbUk0ZFZwZGdlT0QyR2dudnRjRDFvMkNTVG8zbGxpTjNrVlVYOHdmRVc5Sk9iV1lmRmhjcHZJT0tKc0RxbEtCejQ5S1pkSQ?oc=5",
          "date": "08-25 15:22"
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
      "price": 3873.0,
      "change": 95.0,
      "changePercent": 2.3,
      "high52w": 4350.81,
      "low52w": 3407.56,
      "high24h": 3873.0,
      "low24h": 3873.0,
      "high7d": 3873.0,
      "low7d": 3778.0,
      "high1m": 3880.0,
      "low1m": 3758.0,
      "volume": 41054,
      "sparkline": [
        4066.22,
        3880.0,
        3820.0,
        3758.0,
        3815.0,
        3778.0,
        3873.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3778.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3873.0
          }
        ],
        "7D": [
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
            "price": 3873.0
          }
        ],
        "1M": [
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
            "price": 3873.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 4324.94
          },
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
            "price": 3873.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "NZ Dairy Positioned To Benefit As US–Canada Trade War Escalates Over Cheese And Tariffs - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQNjVGMzBGUG1yRWdQT3hsZVNVTlV5LV9GZGxucmF1WDluWS1mWjFEakFHMEg3SFgzZFRuV19lc0M5NC1sVklvcV9VQXFlUDItb0I0TndlN3Jvdk1QbmNyLUFDckZMMzNRVENHXzF1OWUydFp0QndvOWVRYXkxYnZrZThQOUFHMVpXYW9FYlhWMERFQnh3NmdSSnk4UXNKaV9MbmNBOUZpX2xsWnYxMlI1bGhscTE?oc=5",
          "date": "08-25 06:19"
        },
        {
          "title": "Taranaki Dairy Farm Lifts Milk Solids By 30,000kg And Extends Milking Season With $500K Herd Home - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMivwFBVV95cUxOWVBIU05mUTM5ZlJwLVJSNGx2SHpndjY0eElLWUlmZnpDMUtOT0c5R0dnZ2hQZ045ei1USG1iTC1FNXl3YUtZMUJrNmUwazhxSE55T3k0bHBfMzA5aktOQnoza2RXcVh0NklmZGhnRkh6MWpMdk5BQ1NYVzRNbzNYMTBBR2FRellUcTVjNUJycXVmMzZLRnZBdWtoY0VVTUEwWUJ5eVRSYkgxS0sxZzlOTFRmQ3loNDRDcmpTRjFQQQ?oc=5",
          "date": "08-25 05:51"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
        },
        {
          "title": "버터값 최고치…베이커리업계 직격탄 - 한국경제",
          "source": "한국경제",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBzTXJKcDFiaXJnSUpFX1AxMGc0eEFuTTkwckVDR3lZRTJYQjNKQnFUWW91TGxwUFNkcXlMaE5DMm9meGpzbzZXX21JOUU0U1RkVG5Cd1FLeGNxQQ?oc=5",
          "date": "08-18 16:00"
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
      "price": 3591.0,
      "change": 108.0,
      "changePercent": 3.1,
      "high52w": 4036.0,
      "low52w": 3161.0,
      "high24h": 3591.0,
      "low24h": 3591.0,
      "high7d": 3591.0,
      "low7d": 3483.0,
      "high1m": 3706.0,
      "low1m": 3425.0,
      "volume": 28500,
      "sparkline": [
        3772.0,
        3706.0,
        3589.0,
        3425.0,
        3486.0,
        3483.0,
        3591.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3483.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3591.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 4012.0
          },
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Chile imported 472.8m litres equivalent as cheese gained ground - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxPN3BLTWJzZ0NHV2RwTndqSWhreXZWZTE1WGZSRTJSelZ0WTBjT0NOR3JEcVA4WE1Ia1dKUnNzU3ZMVlVVVGJQVmpabmk1TWt0cHQtem5ITnp2WWJjV0xacmM3QzVZUmVETEwyUWJxMTgzWmI1T2lYSjR6OHpSSFJXTW9Jel9jNnlUV0VhOExhdk5HakpVaUJ4RmFQRUpOUHhwVUFFa29kdkM?oc=5",
          "date": "08-24 22:09"
        },
        {
          "title": "Dairy industry meets commitment to remove artificial colors from school dairy products - Dairy Foods Magazine",
          "source": "Dairy Foods Magazine",
          "link": "https://news.google.com/rss/articles/CBMixwFBVV95cUxNNEJWNTk1cHJ0UmYzenNZY3p1VkN3aWhDdW85ZGY3UWw3UXdLdXhOQ2NMNkFEVkpOVi1WMHA2RnFBenYxVkpBVHdwbjd2VkdLQjYzaFBpRjJWXzBaOU41dGVGeFFvWXZDaFd3VUd5MENQN1JmNmdlMTFEY0lfVElFUkdoSUo5dGRMQkoxY0tEdGc5SC1tM2FLN2FPdV9CVnZ0Yk5EUHhVZVp1T0hwWE9YNF9sWS1lc1Z6MTQ4dHhoRFZBMkxWVDYw?oc=5",
          "date": "08-25 01:31"
        },
        {
          "title": "UK Cheese Exports Reach All-Time High In Q2 2026 As Powders Gain But Overall Dairy Shipments Drop 25% - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMixgFBVV95cUxNSWJQWEo3Y3ZPRm9NWElvWTJkMUZzMUtwVUFMdEdJQi1qSlRrSGp1bVJLWFc4WEdzRmxfMUtHdEsxWTFIWExacDUzM3VQM3hpUTR3Tlp0eWdJOUxmeF9oQ0duUjc2Q2VUV1ZQNTdoTW84aWc5NWdLRjJxUW43YjFIdDcybU1nZXBZZWNoazIwZjZtbmNDRERnWWhuX0YwaVU2ai1yR3l2Q3FPbmFzbkUyUkxsT1N6WUdWaUxpcHNPcTlZem5XMWc?oc=5",
          "date": "08-24 06:46"
        },
        {
          "title": "Switzerland’s Reconstituted Milk Market Is Set to Grow - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOTGo2ZXY3TUtXRTFzekhCSTBPX3Q3Y0o4eWg2bW1jWGM5bzZwOXVxcGFaM2l0eWt6ZmlLdGdrRzVGTV9IQVBNUG1qaWhiNXN6TU9ubnNTV2M4V1pXWVhWZVkySzdDZVliUmJXaGZIdXVWUDhpYjJwaU0yNi1uTXYta2hNZG9feHoxcEU1M2tWVG1KVlpHVk9VQlZFV2I?oc=5",
          "date": "08-24 17:13"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
        },
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5PWTZ4b0NfZDlwckpnTF9yN3RMajUySkE4R1VidUpKaUZDYkVlWHZtYjlTaTFGLXd6VWpYY1pQOENxbkVBNUMwaUpNTjhQdlFKWEE?oc=5",
          "date": "06-12 16:00"
        },
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
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
      "price": 3502.0,
      "change": 241.0,
      "changePercent": 7.39,
      "high52w": 3552.0,
      "low52w": 2431.0,
      "high24h": 3502.0,
      "low24h": 3502.0,
      "high7d": 3502.0,
      "low7d": 3234.0,
      "high1m": 3502.0,
      "low1m": 3135.0,
      "volume": 18200,
      "sparkline": [
        3552.0,
        3457.0,
        3368.0,
        3135.0,
        3234.0,
        3261.0,
        3502.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3261.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3502.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 2805.0
          },
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "New Zealand GDT Price Index Jumps 2.3% in Latest Auction - CryptoRank",
          "source": "CryptoRank",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE5LN1lNdlBCeEs2ODEzV003OHM4TGZ4Rmt2dHVic2RvWjU0Y0VPSzI1c1RjNUREcVdfQ3oxV1p3OW9YMDRydEhKeTRrLXVxMXNuZTBtR0dOVHdxOGZRSnNTMnVNOWpsQll1Mkl2eElPRmVZWGxuSzNHVmtYZw?oc=5",
          "date": "08-19 12:21"
        },
        {
          "title": "Mielke Market Weekly: Estimates raised in most recent WASDE report - TheLandOnline",
          "source": "TheLandOnline",
          "link": "https://news.google.com/rss/articles/CBMi5AFBVV95cUxOLXJZOS1mLU1QcHBWV254eWNiaUVnQkthYk5vbjB2bV9yQ2oxWWFvajdkamVuczBLQTV1cFJqZWd2QzdaamwzbFc4QVgzUlYwMDl1M0NrVWQyR3RqQ09SYVduTDRPRXZtVnNPRXNOdm9PVDhrNVBoVWFaUVJWTU9OQi1yeVZZaHpwUWVOYnV5Wm1qTEl0ZnlScmR1eUdZOUV1NjZzQUN3N1ZHY0J0cEtYZjN1Yk5lWXdCSkI5UXVtUWo4b3FJaHY2dDl0MzE4WVUtVzBPR2VuMGZSQS13ekh2ZVI3RnU?oc=5",
          "date": "07-23 16:00"
        },
        {
          "title": "Fonterra farmgate milk price forecast | Global Dairy Prices Crash 5% in Biggest Drop in Two Years! - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxOUUV4NXZQdHNzc1Utb01VSnVnd044STJxZ3pDM2JjYlRnaGs1dmoxclM4dEotbnNVbmM2WDBRODhaMG5EWXZhcnpqY2lSaWhid2hER1lnalVWNmJrYTJLQnVNNzRZZjVWYmRFR1JmTzBxeU5VMkZkcGhJeTJuRFlSby13SU11WEwxTWY0?oc=5",
          "date": "07-09 16:00"
        },
        {
          "title": "Dairy markets update: Some milk price rises likely for May - Farmers Guardian",
          "source": "Farmers Guardian",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxPX3h0TjllanNQMVVDZDltRjV4MjFvZWx3bWlvanNfeTlCODhLTjktTkdhN2xKZmpwSDQtYnBuNW1uSHVPanNkN0p0RWxXMlNuLUh4OWY4YS1kcjEteGdLSGNDVC1IYW5hdXMzVG1WUVZFYWRYdmFPLU9RMHdSVU9BWExRbkhwdTJGWFE?oc=5",
          "date": "03-20 16:00"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
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
      "price": 5090.0,
      "change": -135.0,
      "changePercent": -2.58,
      "high52w": 7214.0,
      "low52w": 5012.0,
      "high24h": 5090.0,
      "low24h": 5090.0,
      "high7d": 5303.0,
      "low7d": 5090.0,
      "high1m": 5734.0,
      "low1m": 5090.0,
      "volume": 14300,
      "sparkline": [
        5674.0,
        5734.0,
        5516.0,
        5336.0,
        5303.0,
        5225.0,
        5090.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 5225.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 5090.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 7214.0
          },
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Butter falls while cheese barrels climb Monday in mixed CME dairy trade - Brownfield Ag News",
          "source": "Brownfield Ag News",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOMjhEQkNFOEprb0RCN2tpdGplYVUyZ3VhLUF0UUFhY09BYUpJYXRLWmRmcjhrdE50TG1qbFY5SU9mdFJ5WEpMUU1hanVDT0FzUEtoOXVjb2E5cl9ydUswcjVFWjd4dEZIT2xfQ21wT28yVDFteWZSbkFneXphMjNwMnVySjdDS3h5Ny1KX3pXQS0xRmV5TWVYa3daOENwa1VocFowMDFZT0hieUhHRHZ0VmdPcklqd29D?oc=5",
          "date": "08-25 03:10"
        },
        {
          "title": "Feed and Fuel Costs Could Stand in the Way of a Fall Milk Rally - Dairy Herd",
          "source": "Dairy Herd",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNa21McVlvWE9NQWkyQmZ4NFNIc1FaQm01SmlZV1pBLUJtQW1EUHR3ZEdaMDU2bHFvbVJxMm9qelhvZUFVcVNqZnN2MnhaUEVJQmNPcGhRUV9ReUJLaGRmSWJ0ZjF3eUF0OEhGa1VMRnB1YXhvSnNsLTlGQU1pbGRaY1B1amJyTWVmVnc?oc=5",
          "date": "08-26 02:35"
        },
        {
          "title": "USDA Dairy Market News: CME Butter Cash Trading Update (Aug 24, 2026) - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxOMjNPZThMNUdqYTVYaHVZSEJablhpVnRENzdoMlo3enVNeEtpaUJzbnB0dWZNOG1aSFA1V0w4LXc0djNnbTZSLUFpSlJvYmt2VTFydWRkaENUY0gwVGZYWHY0a1NrQ2FocmZMN205NVNPaFFsczloN3Z3MXBTZTQ4YQ?oc=5",
          "date": "08-25 02:00"
        },
        {
          "title": "USDA Lowers 2026 Butter Forecast as Dairy Product Prices Shift USDA Dairy Price Forecasts for 2026 - AgNet West",
          "source": "AgNet West",
          "link": "https://news.google.com/rss/articles/CBMiZEFVX3lxTE9UVkY2WmlVTjUwOUp0MWxIUHJXX0IwZG43WlZTaWVtVHJDNlRmWFdoSVVTc3pJeHZtTUptdFZsZENITUhQMUJDS2dtYTM2eGJUdW1rRmxDNUgtR0R0aVVCbmY0QnI?oc=5",
          "date": "08-25 03:30"
        }
      ],
      "newsKr": [
        {
          "title": "버터값 최고치…베이커리업계 직격탄 - 한국경제",
          "source": "한국경제",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBzTXJKcDFiaXJnSUpFX1AxMGc0eEFuTTkwckVDR3lZRTJYQjNKQnFUWW91TGxwUFNkcXlMaE5DMm9meGpzbzZXX21JOUU0U1RkVG5Cd1FLeGNxQQ?oc=5",
          "date": "08-18 16:00"
        },
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
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
      "price": 1181.0,
      "change": 0.0,
      "changePercent": 0.0,
      "high52w": 1193.5,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1184.5,
      "low7d": 1164.5,
      "high1m": 1184.5,
      "low1m": 1127.0,
      "volume": 10,
      "sparkline": [
        1164.5,
        1172.0,
        1173.5,
        1181.25,
        1184.5,
        1181.0,
        1181.0
      ],
      "history": {
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "07-27",
            "price": 1128.25
          },
          {
            "date": "07-28",
            "price": 1127.0
          },
          {
            "date": "07-29",
            "price": 1127.5
          },
          {
            "date": "07-30",
            "price": 1128.0
          },
          {
            "date": "07-31",
            "price": 1127.5
          },
          {
            "date": "08-03",
            "price": 1136.5
          },
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
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1173.91
          },
          {
            "time": "11:00",
            "price": 1176.28
          },
          {
            "time": "13:00",
            "price": 1178.64
          },
          {
            "time": "13:32",
            "price": 1181.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 1051.25
          },
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
            "price": 1181.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Germany Hydrogenated Palm Oil - Market Analysis, Forecast, Size, Trends and Insights - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQTlVKdjhKbnljZGtVaTZWcWJfelE5VmduYjdwU2JtOS1KemlpU0RzbFJwQnhrY0NxVnJHZFB2RnFwSzZJNmVtMEplOXVhcEZ0VjVBaUp6Rkd0UjBlZm5fcUhCTG5qdExOSmJoTWRPT05fMlJkQ05Ickt6Nnk0eXFyZGJiOTVQNS1taTNqMEp2SDZNaGw1TVNUQ3E0a3ZBc25ubEwyeXZoU0VDblBPMFd3?oc=5",
          "date": "08-26 03:17"
        },
        {
          "title": "Palm oil prices steady amid projections of bigger stockpile - The Edge Malaysia",
          "source": "The Edge Malaysia",
          "link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTE9VQWlzd204b2otZWEwN1FRbUVNbE5WMVpjMkJKZFBUSElXNUFTRzQ2OVgwTVNaTk13aVNFdkdMTThET09ydXdtSy1ob0tGdUFz?oc=5",
          "date": "08-25 17:30"
        },
        {
          "title": "Indonesia takes on Malaysia in battle over palm oil pricing - South China Morning Post",
          "source": "South China Morning Post",
          "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxObmhOZFR2RDlHU1NOdGlrclc4dUZ4TXhvU0lmdmN1UGg3ZXp5UWEzMzRmZGRMMGdhTjMzRlFNNDlTRDFvYlpxUnhLU19GcGNWTlhYMlo3ejVmLVEyYTV5WUZkMno0bVcxdUpXU0VuZldESHo5dWRuN2V0LUw1WVA5NW4tVFJvQldFak4wd3BXWHkzUVROQV9QbG04ZXBiYkJqUDJzeDRBVTlVb29ZRktn0gGvAUFVX3lxTE83Smp1cFZEa2FPX3RSbENIT2x6a3huX0RSZjlOU3BVMGtIM1NnRlU2eFpiUWl3UWpsZVZLN1BacnhGNEJ3Tnlya2J5bFFLM0o5NGZENHhScHpyYXZKN0E4Y2tPcXE1YmR3M2t5aEM4YkdQUW1KVllndUszUzNFX1Jwa2tWYTBwdkVTSVBkZkF5ZnpPRmJBb3JZZ3hnMXBHWmJyc2JMNHVnWHhheV8teW8?oc=5",
          "date": "08-24 09:00"
        },
        {
          "title": "United Kingdom Hydrogenated Palm Oil - Market Analysis, Forecast, Size, Trends and Insights - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOa05zRHRWMWZBNHN0NWEzbXY0TEtDV0Uzem55QzNQajl5cVBRaEZWTkx0cHpHWkx3NnJkM3BCVFBTcE01TjdYbFVDNW04ckRiTno0Z3g5STBTWmlZWTdoeFE4QTNXS3EwanI4UmM3RmZldXNiLUFzdnM0T2EzWU9ENzFTSFdyZnFkWEc4d25QMUhhRDlyVDdZV2xXekRlS0tQY0tTNWlpWFQtcDRWWUNNak85Vzgxd2NE?oc=5",
          "date": "08-26 03:17"
        }
      ],
      "newsKr": [
        {
          "title": "인니 “팜유 가격 결정자 되겠다”… 말레이 아성에 도전장 - 아시아투데이",
          "source": "아시아투데이",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTFBsTGdWYkVpRVlfSDJOelRhQ1pjVUMtVUdYV0YzOEt2TFNlaEZjQ292ZW16b29BcDJzNUVDZlZZODJPRnBicnZNbTV5ck5ITVRSTTdENklQU2VrMFhieXZpY24weW44T1VOZTlkXzdR?oc=5",
          "date": "08-24 11:16"
        },
        {
          "title": "해바라기유도 ‘껑충’…유지류 가격 초비상 [푸드360] - 헤럴드경제",
          "source": "헤럴드경제",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE14VjRvazRSVFdoc1RyclRjZWtudlozWm1ESDd4ay14amtHTkllclducHRFYXR5RlVEdVRCbDRZWjJvbExwUlJtbndlVFA0WGZzZk9Ic2V3?oc=5",
          "date": "08-10 11:52"
        },
        {
          "title": "밀가루·팜유에 용기까지 뛰었다…식품업계, 가격 인상 '궁여지책' - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE8zSnQ4UkszR1psQ0tpLVpfTmIzODYwaWx6UGlkbURQRWZBSDYxbnZwNjhZc2t0OHM0aVEwV1JGY29ZdGJoOHJvOUhTSEd2LWM0b3VHZzRTUExxOWpWSzlHLdIBeEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1ncw?oc=5",
          "date": "08-19 14:13"
        },
        {
          "title": "세계식량가격지수 3개월 연속 오름세…4월 130.7포인트 - 식품음료신문",
          "source": "식품음료신문",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTE1fbEljWDY1OFROSXRmNDlPS1RTb1JHWFliLUVNekpWM0J4aHk0TlM2RkprcV9aUUh4QjVkeFVUaVZucWxmZlBsSWZaSlg1SS12VlFzWkpsWnZGc1AtLVVkb0xMZjNxQ2JnYlNFS2NJZw?oc=5",
          "date": "05-15 16:00"
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
            "date": "08-20",
            "price": 1930.0
          },
          {
            "date": "08-21",
            "price": 1931.93
          },
          {
            "date": "08-22",
            "price": 1933.86
          },
          {
            "date": "08-23",
            "price": 1935.79
          },
          {
            "date": "08-24",
            "price": 1937.72
          },
          {
            "date": "08-25",
            "price": 1939.65
          },
          {
            "date": "08-26",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "07-28",
            "price": 1930.0
          },
          {
            "date": "07-29",
            "price": 1930.96
          },
          {
            "date": "07-30",
            "price": 1931.93
          },
          {
            "date": "07-31",
            "price": 1932.9
          },
          {
            "date": "08-01",
            "price": 1933.86
          },
          {
            "date": "08-02",
            "price": 1934.82
          },
          {
            "date": "08-03",
            "price": 1935.79
          },
          {
            "date": "08-04",
            "price": 1936.76
          },
          {
            "date": "08-05",
            "price": 1937.72
          },
          {
            "date": "08-06",
            "price": 1938.68
          },
          {
            "date": "08-07",
            "price": 1939.65
          },
          {
            "date": "08-08",
            "price": 1940.62
          },
          {
            "date": "08-09",
            "price": 1941.58
          },
          {
            "date": "08-10",
            "price": 1942.54
          },
          {
            "date": "08-11",
            "price": 1943.51
          },
          {
            "date": "08-12",
            "price": 1944.48
          },
          {
            "date": "08-13",
            "price": 1945.44
          },
          {
            "date": "08-14",
            "price": 1946.4
          },
          {
            "date": "08-15",
            "price": 1947.37
          },
          {
            "date": "08-16",
            "price": 1948.34
          },
          {
            "date": "08-17",
            "price": 1949.3
          },
          {
            "date": "08-18",
            "price": 1950.26
          },
          {
            "date": "08-19",
            "price": 1951.23
          },
          {
            "date": "08-20",
            "price": 1952.2
          },
          {
            "date": "08-21",
            "price": 1953.16
          },
          {
            "date": "08-22",
            "price": 1954.12
          },
          {
            "date": "08-23",
            "price": 1955.09
          },
          {
            "date": "08-24",
            "price": 1956.06
          },
          {
            "date": "08-25",
            "price": 1957.02
          },
          {
            "date": "08-26",
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
            "time": "13:32",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Desiccated coconuts: stable prices amid subdued trading - Mundus Agri",
          "source": "Mundus Agri",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPZGhjaWhXYXhZbzd1d3hqdkFQU2ZaMTluVF81M1lNUHdaRGhJYzVSMTNha2RaWTlqNGFfUU94eWtCY0ZINEVNaWNPdUpkaWpqQ2VMT3p1U3ZmR2VqT280THk3Y1N4M3pQcjNvbnRSdEk1aURMajRBQ0cxQkJPb2k2bWZHeWdvNWJKazVKcXk5ejYtNUx2YXlrZA?oc=5",
          "date": "08-25 23:43"
        },
        {
          "title": "From mud to molecules: The kernel matters - The Star",
          "source": "The Star",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOOUV0dXc0aDJFSmk1RkNtUlVuMXpud0Z0NVRURnE1UzdTakJETEtpX3pqYV9Kd3paRDlncGhQVW9Cbm9TVXhsVjdHM2xTVkZ4QV9XcVJHWXZ5dUt2c0VLQlpyYVZwa0VNT3JIekxhZjlkbVFwNS1GdE40cE1WdE5odGVhUU1MSXRodlpTMlE1dXAybTlKeVNMQ1QtYw?oc=5",
          "date": "08-24 08:33"
        }
      ],
      "newsKr": [
        {
          "title": "DS단석, 글로벌 행사서 바이오디젤 공정 고도화 방향 제시 - 전기신문",
          "source": "전기신문",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9valNza2JQLW5XeHRlRWhaNUJ5bWh5QXpIaHlCbjNFbTRsdkkzc0plUkUzbjhRa2V6cklNbnB1aTZGdUpNUThNaTk4cllETEhzTjFPa3VGNlhHVTcyWXdmaXJJYzBnaV9FbmNwZtIBcEFVX3lxTE9zbVJLQURvVmN4Y1RqVXhUbTdXVlpKOHpBN1Q5S3hKQXhQRUFlZ1FWMU1GbXQ3ZndjY2hVNW5iSXA0cEFMeldMZlJWamVMZVY4NklvQmI0YmF0SzZHbkFlRGNReFNuY1ZSVk5mV0NDV3M?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 바이오원료 글로벌 판로 확대·협력방안 논의 - e-platform.net",
          "source": "e-platform.net",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBZN0J6ck9ITFA4dUh2SVl3cWd4QzZEUUlNMzlFYS1qWVFoQUhNblVFUG5ybVM2UGRfeVVlX2ctdkZ5aXVrQWFCVEwzZ3FZdm1nYy1jUlVfMHdFMEdJZC1WTVRBRGZWX0ExUHMxU9IBcEFVX3lxTE0tekNYcm1sZ1IzejBsc2MtRllZQ1BpbDBVWmg2M0Q3ME9VTFA2YUFtdnNVY2hTaG1oUGxyUTQ4a0JBTnRQZ2h3V3lmaXlqaDNkWHZYVXRIWFBXa1lzMXppYnBCbDZTWGZ5amc1Q0VCS3U?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 말레이시아 'POC 2026' 참가…해외 판로 확대 박차 - 전자신문",
          "source": "전자신문",
          "link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9TcVlCLW90bkJGSkxHZUstODJvUlQ5emIxNzVWRzl3c2Y2WWUzS3VXeFM5VktQcDhWSTdGZF92Nk42aDhXREs3YlVRZFp0Zw?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 글로벌 바이오원료 조달 다변화 · 해외 판로 확대 주력 - todayenergy.kr",
          "source": "todayenergy.kr",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE8tSExIOXJ6ZjhGUmJKVVF6RW52U0pnUE5NVi1kMndNQ3hPdEtBS2xDaWRBS0FNemdFQUgweEREOE5jUTZ0dkhHNWpidGdnOXVWelNYTTFMU2gxa1ViVzhxZlI2cVN1U002UE1wSTdn?oc=5",
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
      "price": 1384.58,
      "change": 3.82,
      "changePercent": 0.28,
      "high52w": 1587.7,
      "low52w": 1322.42,
      "high24h": 1388.09,
      "low24h": 1380.88,
      "high7d": 1414.73,
      "low7d": 1380.76,
      "high1m": 1464.44,
      "low1m": 1380.76,
      "volume": 0,
      "sparkline": [
        1414.73,
        1413.58,
        1389.4,
        1390.79,
        1384.98,
        1380.76,
        1384.58
      ],
      "history": {
        "7D": [
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
            "date": "08-26",
            "price": 1384.58
          }
        ],
        "1M": [
          {
            "date": "07-26",
            "price": 1458.01
          },
          {
            "date": "07-27",
            "price": 1464.44
          },
          {
            "date": "07-28",
            "price": 1453.16
          },
          {
            "date": "07-29",
            "price": 1442.28
          },
          {
            "date": "07-30",
            "price": 1420.6
          },
          {
            "date": "08-02",
            "price": 1435.7
          },
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
            "date": "08-26",
            "price": 1384.58
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1376.27
          },
          {
            "time": "11:00",
            "price": 1379.04
          },
          {
            "time": "13:00",
            "price": 1381.81
          },
          {
            "time": "13:32",
            "price": 1384.58
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1399.33
          },
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
            "price": 1380.76
          },
          {
            "date": "2026-08",
            "price": 1384.58
          }
        ]
      },
      "newsEn": [
        {
          "title": "South Korean Won: Strength backed by tech flows against US Dollar – Societe Generale - FXStreet",
          "source": "FXStreet",
          "link": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxONzJHS3ktX053Q1NrRmV2LXJ5clRxMGxqdlpmRjU3S0RERTBfWnk5NE9iMERmdU55RTZFeGc0UnB2WGFrZU0yMV9QMDFTdkgzd08tVDZNbWp2MlRMSTBPLWxvM2FtRTNtN1NReXA5V3NzVFdrS3NjZ3FmdjdPMTVCVEZYS3lKSFJCYVZ0MUl3MmpBbzZsMEpjaFAybjVPTUFOX0xkM2otM1VQczVQN29qU3hjdkNZSURGNHAyNllFcVJEZw?oc=5",
          "date": "08-26 04:54"
        },
        {
          "title": "USD/KRW Set for Consolidation, Commerzbank Analysts Say - CryptoRank",
          "source": "CryptoRank",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE1VcnhoWWo4WEk3UnJmQWxUVzBFVWFkbjF4WnRyc2IyNExTVG9oNXFGTWdYdmdDVFJmajRNZThVazFsWHJtNjNDOHRwaTIzTHhEQmRETk5SblNDakVuVXBnQVhrazBtMkZPWlA1bkNoaXBoT3JNeVFXQ25qYw?oc=5",
          "date": "08-25 13:09"
        },
        {
          "title": "USD/KRW Rebounds to 1,386.1 Won After Dipping to 1,370s on Month-End Negotiation Selling - finance.biggo.com",
          "source": "finance.biggo.com",
          "link": "https://news.google.com/rss/articles/CBMidkFVX3lxTE1RUWZ1V09vQ2VTeE0wMEh5d3N6U2dyUWFucS1MWVNtbzRudU5KLU1PTkJEMjRCOUhrSVFBU3BXZzFLTmlXZ0FaVU9wS0JFQTd5TnNNMVNTNmtQeWhEQ2p3NnZETHFsWjJla21uN01uMW02N0tGWVE?oc=5",
          "date": "08-25 17:26"
        },
        {
          "title": "Asian shares mostly rise as oil prices fall and hope grows for AI - WOWK 13 News",
          "source": "WOWK 13 News",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQOHdoSFp1VnFkeXBVX0F2VlVXdnZ4Ukd4Tzh3WW55MGpkR2ZPVklrODJGclhpTUVzMFZabTRkZXBrUkJSRmpaa1FSVldCQ1d1QVA5SnF4eEJ1RHh0N0JicjJKdFBoMFJyd3ppVG5mSjNONy1BVVhyQWg1Mm5wY082dzNCMzNaQ2x4V25mRDJfLTNwY0JheTNPSGVlQzl3WkEzaFp5UmdSYUVWS2fSAbABQVVfeXFMTnhqZ3otT3o3V3VaOHZTUXhKTjZhTTRuMmhnTGVjQ0hoZGJLSlNQVGMzX3ZKT1hUdXdDMGNnRjhOLVpBZkVBUHZ4UWxVMGoxVkNyTUJpaFpwRXAxVGROV3ljT1NoaDh5X3hDYUd3TS1nRUhXdnpyRUhOYmFDUnpVVm5yMkN5bTNTUUJWZlBCdUpVRTVsd0VuOXZaQWNLeGlKbklrZkhMd215dENGek5ycmY?oc=5",
          "date": "08-26 12:59"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 유가와 금리 하락, 원화에는 더욱 긍정적 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE01LVZqNExGdmlkWmZ2V2RMRnA5NW1PdjZDRjc3Vzh2V1U0cjFQU1BfTEVXVDd5dFBUbDl4eER1UkRsVk4yd0NVMUY0dy1SZFlJb2JuYkgyQTQwQjMtMVlPOQ?oc=5",
          "date": "08-26 12:49"
        },
        {
          "title": "[속보]“삼전닉스 덕분에” 원달러 환율 추가 하락 전망 - 한경매거진&북",
          "source": "한경매거진&북",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE1kM0hyckFJNHRKeHpUc3JlT3FNRE5vYktrdzIxdWU0N0tYUEZOdEdYOFBEdGZOZ1E3Yl9xYTJTTTJFQzBBaXpvaG53eFFEbVl5LTZnQ2F3Yzg4c0E4NWVKYUc4djZ6ZVo4WlJxdg?oc=5",
          "date": "08-26 12:35"
        },
        {
          "title": "중동 불확실성 완화ㆍ월말 네고 영향⋯\"1370원 진입 가능성\"[환율전망] - 이투데이",
          "source": "이투데이",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5wXzVyN09YTmNlUEpmTVhaLW5oZHhtLTdPR0ZzX1NiaktyckkyWGdwT25YU1dpdDRrTUtyT1JFajRUVDk3ZzZ2QXp3TDFjVUtQcjZXUg?oc=5",
          "date": "08-26 08:18"
        },
        {
          "title": "원∙달러 환율 1300원대 하락 이유와 영향∙전망 총정리 💵🧐 - 뉴닉",
          "source": "뉴닉",
          "link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE5ycDZ2Tjd2SEd6STkxUUZGRUFkU1FkcWl0ZGR0WEJCbWRIcDBjOG9tNjlpUmZSeC12c19hWWdYWWpyNnB5S2hoWVBEZ25hRXNPRkpV?oc=5",
          "date": "08-25 15:15"
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
      "price": 1614.7,
      "change": 3.93,
      "changePercent": 0.24,
      "high52w": 1807.42,
      "low52w": 1582.09,
      "high24h": 1618.2,
      "low24h": 1611.3,
      "high7d": 1638.16,
      "low7d": 1610.77,
      "high1m": 1665.16,
      "low1m": 1582.09,
      "volume": 0,
      "sparkline": [
        1638.16,
        1634.92,
        1620.23,
        1626.37,
        1616.97,
        1610.77,
        1614.7
      ],
      "history": {
        "7D": [
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
            "date": "08-26",
            "price": 1614.7
          }
        ],
        "1M": [
          {
            "date": "07-26",
            "price": 1657.74
          },
          {
            "date": "07-27",
            "price": 1665.16
          },
          {
            "date": "07-28",
            "price": 1654.43
          },
          {
            "date": "07-29",
            "price": 1652.79
          },
          {
            "date": "07-30",
            "price": 1636.68
          },
          {
            "date": "08-02",
            "price": 1663.51
          },
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
            "date": "08-26",
            "price": 1614.7
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1605.01
          },
          {
            "time": "11:00",
            "price": 1608.24
          },
          {
            "time": "13:00",
            "price": 1611.47
          },
          {
            "time": "13:32",
            "price": 1614.7
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1640.49
          },
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
            "price": 1610.77
          },
          {
            "date": "2026-08",
            "price": 1614.7
          }
        ]
      },
      "newsEn": [
        {
          "title": "USD/KRW Set for Consolidation, Commerzbank Analysts Say - CryptoRank",
          "source": "CryptoRank",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE1VcnhoWWo4WEk3UnJmQWxUVzBFVWFkbjF4WnRyc2IyNExTVG9oNXFGTWdYdmdDVFJmajRNZThVazFsWHJtNjNDOHRwaTIzTHhEQmRETk5SblNDakVuVXBnQVhrazBtMkZPWlA1bkNoaXBoT3JNeVFXQ25qYw?oc=5",
          "date": "08-25 13:09"
        },
        {
          "title": "Nepal Rastra Bank Sets Foreign Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQWmNESVYyV0tPa1A3ZDdWNVgzcHA3RkpBQUFzSlM3NVpwRU1IVE5UUWlBNktRR2g5S3pLRENEU3NRYS1sd0JqUm9SV295TGVpbXNVU2V6bG9odzgyX3Z2NkFFU2pVZlZWWEg0NlJOTndMWGNPck1pcUY1MTNQVTdTcnI4LXU3aEQzRU55TjM3QnVYRmN3TjJ4ag?oc=5",
          "date": "08-26 09:36"
        },
        {
          "title": "CBA currency exchange rates (25.08.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE1yS3dfU29DRzcwUzE1bk5DMW12US1rUGZTTnJ0dzhxZGdZdHBpbmxwenJIQ045bXU5alR3ZDE0VFFyZFJsTjNSTUlKZW1vMmFkMlFjajVGSlotYjMzTG5oZE00VmJZTHM2dF9fNGdYeHc5T1hqM09OMk5tVdIBe0FVX3lxTE1yS3dfU29DRzcwUzE1bk5DMW12US1rUGZTTnJ0dzhxZGdZdHBpbmxwenJIQ045bXU5alR3ZDE0VFFyZFJsTjNSTUlKZW1vMmFkMlFjajVGSlotYjMzTG5oZE00VmJZTHM2dF9fNGdYeHc5T1hqM09OMk5tVQ?oc=5",
          "date": "08-25 14:29"
        },
        {
          "title": "Nepal Rastra Bank Sets Today's Foreign Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNWWlHRU9FbC0xdUkxVUp2WmdpdWpXeWhCMmJnbVZ4Y3NmWXNFcHJfTzFsaEFQbkljRncyN1hxdVVuLUpyLWVLN3pEbGJtOVpSazhpdG53alpWY1BNbUZfRXR5Nl8yVkk2REhuWXBsRm5qdzI1eGc0WEZWZTlzRUJGOEtyR0JxMXBKc3V5cFkxQzA3eWhsRWFDOQ?oc=5",
          "date": "08-25 08:41"
        }
      ],
      "newsKr": [
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - LiteFinance",
          "source": "LiteFinance",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "08-26 07:35"
        },
        {
          "title": "환율, 1380원대 초반으로 하락…1370원대로 저점 낮출 전망 - 아주경제",
          "source": "아주경제",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE9iNC1kU2JBTllqTlJYOXFhRHFKM0o5RExURGFwTEI5ZW9nYXViel9DM3ZxWEd0ajNJazRlVnR5dHRNbnZHb3JLVlZneFlydkpRUDRwWlFWclYyZ9IBWEFVX3lxTE1mRUlOaWFDTFZOSjZPaDRBcjdYaXF1cFBxal9uRnVRWFlhMjJ3cWZiMnVUMDB2VTRMeFZTdVJfOGYtY1ZiM0NpdHRtdF9BUXJING9vemNUUG4?oc=5",
          "date": "08-26 10:36"
        },
        {
          "title": "[주간환율전망] 원·달러 1360~1400원 전망…삼성·SK 환전 기대에 하방 우위 - 자본시장뉴스",
          "source": "자본시장뉴스",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1WdlZYU01oeG41Z2h1b3hEcXRoalVTMVhpRlc5b1VGUUM2ZmdVWGNFMmNRdTUtM1J0VHlUYWQya1Z0OXotRXZxYnl1eGlnLWgza01uMGlTUldYdFA2RVhSakp5azlRNm8?oc=5",
          "date": "08-24 07:30"
        },
        {
          "title": "[주간환율전망] 1380원대로 떨어진 환율···수급·이벤트 모두 하방 지지 - 서울파이낸스",
          "source": "서울파이낸스",
          "link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE1Ja0ZKakZxOXRla2ZhN3owNDZ0WUZUdFNZdmc2UGZwX05EaUZSWXZMREpmWm9LUUFHWi1xVzhqUDVOb1JnT2dpNjB5MlZxeDJkQUNCZ1NaZUZUcHNsWTBnS2thZmZrNTlTaVE?oc=5",
          "date": "08-23 17:00"
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
