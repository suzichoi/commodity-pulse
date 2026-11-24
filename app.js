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
  "fetch_status": "success",
  "last_updated": "2026-11-24 15:38:56",
  "weekly_report": {
    "title": "[2026 Week 48 Report]",
    "week_number": 48,
    "week_date_range": "2026.11.23 ~ 2026.11.27",
    "weekly_price_title": "[W48 주요품목가격]",
    "date": "2026.11.24",
    "report_date": "2026.11.24, 15:38",
    "top_gainer": "코코아 : $5,281.00 (▲3.04%)",
    "top_loser": "GDT 버터 : $4,205.00 (▼6.62%)",
    "weekly_price_list": [
      "코코아 : $5,281.00 (▲4.74%)",
      "아라비카 커피 : $5,894.05 (▼4.76%)",
      "로부스타 커피 : $2,854.00 (▼9.22%)",
      "GDT 지수 : $4,182.00 (▼2.31%)",
      "GDT 전지분유 : $4,081.00 (▲2.77%)",
      "GDT 탈지분유 : $4,187.00 (▲1.90%)",
      "GDT 버터 : $4,205.00 (▼6.62%)",
      "팜유 : $1,059.25 (▼3.86%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,281.00 (▲4.74%)",
      "아라비카 커피 : $5,894.05 (▼4.76%)",
      "로부스타 커피 : $2,854.00 (▼9.22%)",
      "GDT 지수 : $4,182.00 (▼2.31%)",
      "GDT 전지분유 : $4,081.00 (▲2.77%)",
      "GDT 탈지분유 : $4,187.00 (▲1.90%)",
      "GDT 버터 : $4,205.00 (▼6.62%)",
      "팜유 : $1,059.25 (▼3.86%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,344.11원 (▼0.20원)",
    "fx_eur": "1,464.70원 (▼7.81원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "\"코코아 가격 하락에 글로벌 수요 반등 조짐\"닛케이아시아"
  },
  "daily_briefing": {
    "title": "[2026 Week 48 Report]",
    "week_number": 48,
    "week_date_range": "2026.11.23 ~ 2026.11.27",
    "weekly_price_title": "[W48 주요품목가격]",
    "date": "2026.11.24",
    "report_date": "2026.11.24, 15:38",
    "top_gainer": "코코아 : $5,281.00 (▲3.04%)",
    "top_loser": "GDT 버터 : $4,205.00 (▼6.62%)",
    "weekly_price_list": [
      "코코아 : $5,281.00 (▲4.74%)",
      "아라비카 커피 : $5,894.05 (▼4.76%)",
      "로부스타 커피 : $2,854.00 (▼9.22%)",
      "GDT 지수 : $4,182.00 (▼2.31%)",
      "GDT 전지분유 : $4,081.00 (▲2.77%)",
      "GDT 탈지분유 : $4,187.00 (▲1.90%)",
      "GDT 버터 : $4,205.00 (▼6.62%)",
      "팜유 : $1,059.25 (▼3.86%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,281.00 (▲4.74%)",
      "아라비카 커피 : $5,894.05 (▼4.76%)",
      "로부스타 커피 : $2,854.00 (▼9.22%)",
      "GDT 지수 : $4,182.00 (▼2.31%)",
      "GDT 전지분유 : $4,081.00 (▲2.77%)",
      "GDT 탈지분유 : $4,187.00 (▲1.90%)",
      "GDT 버터 : $4,205.00 (▼6.62%)",
      "팜유 : $1,059.25 (▼3.86%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,344.11원 (▼0.20원)",
    "fx_eur": "1,464.70원 (▼7.81원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "\"코코아 가격 하락에 글로벌 수요 반등 조짐\"닛케이아시아"
  },
  "lastUpdated": "2026-11-24T15:38:56.596771+09:00",
  "usdKrwRate": 1343.97,
  "eurKrwRate": 1464.7,
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
      "price": 5281.0,
      "change": 156.0,
      "changePercent": 3.04,
      "high52w": 6675.0,
      "low52w": 2798.0,
      "high24h": 5356.0,
      "low24h": 5174.0,
      "high7d": 5281.0,
      "low7d": 4847.0,
      "high1m": 5577.0,
      "low1m": 4742.0,
      "volume": 0,
      "sparkline": [
        5119.0,
        5042.0,
        5030.0,
        4847.0,
        5063.0,
        5125.0,
        5281.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5249.31
          },
          {
            "time": "11:00",
            "price": 5259.88
          },
          {
            "time": "13:00",
            "price": 5270.44
          },
          {
            "time": "15:38",
            "price": 5281.0
          }
        ],
        "7D": [
          {
            "date": "11-13",
            "price": 5119.0
          },
          {
            "date": "11-16",
            "price": 5042.0
          },
          {
            "date": "11-17",
            "price": 5030.0
          },
          {
            "date": "11-18",
            "price": 4847.0
          },
          {
            "date": "11-19",
            "price": 5063.0
          },
          {
            "date": "11-20",
            "price": 5125.0
          },
          {
            "date": "11-23",
            "price": 5281.0
          }
        ],
        "1M": [
          {
            "date": "10-26",
            "price": 5490.0
          },
          {
            "date": "10-27",
            "price": 5577.0
          },
          {
            "date": "10-28",
            "price": 5456.0
          },
          {
            "date": "10-29",
            "price": 5456.0
          },
          {
            "date": "10-30",
            "price": 5453.0
          },
          {
            "date": "11-02",
            "price": 5435.0
          },
          {
            "date": "11-03",
            "price": 5414.0
          },
          {
            "date": "11-04",
            "price": 5456.0
          },
          {
            "date": "11-05",
            "price": 5181.0
          },
          {
            "date": "11-06",
            "price": 5155.0
          },
          {
            "date": "11-09",
            "price": 5004.0
          },
          {
            "date": "11-10",
            "price": 4742.0
          },
          {
            "date": "11-11",
            "price": 4907.0
          },
          {
            "date": "11-12",
            "price": 5066.0
          },
          {
            "date": "11-13",
            "price": 5119.0
          },
          {
            "date": "11-16",
            "price": 5042.0
          },
          {
            "date": "11-17",
            "price": 5030.0
          },
          {
            "date": "11-18",
            "price": 4847.0
          },
          {
            "date": "11-19",
            "price": 5063.0
          },
          {
            "date": "11-20",
            "price": 5125.0
          },
          {
            "date": "11-23",
            "price": 5281.0
          }
        ],
        "1Y": [
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
            "price": 5367.0
          },
          {
            "date": "2026-10",
            "price": 5453.0
          },
          {
            "date": "2026-11",
            "price": 5281.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Cocoa prices could surge by over 50% in six months as supply risks mount - FoodNavigator.com",
          "source": "FoodNavigator.com",
          "link": "https://news.google.com/rss/articles/CBMivgFBVV95cUxObUs0bE5MSWY5ZlZ2bmpZVUZjbk5hSEhfZ3BvOGJJMU96dTZtQ2NuS2JGOWYyNnZKSDQ5a1VSR3gtTFNwNElkektRV0h4bWNpRjJHbFNyU2tWa18xQ2RZZkM2bElBNXZYUDhFc3hUZjlUcHp5V2FJZHdFRlFRVHFwdkVpeTBmZDYtUko1MjBGR1VLY1dhVFpoRXhTZ1lvY0duSTVyQm1pbFUyZXVycnhGNjdsNmFxdUZBeHJrajVn?oc=5",
          "date": "11-23 21:47"
        },
        {
          "title": "Cocoa Prices Supported by Reduced Ivory Coast Shipments - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQMzJaVi0ydXhxOTMwbVdCWTdmWXd5XzNHOVhoUk91dENwYTBvRHpYODc2V2ttSFBiMWU3SG5hNkF1M1lrRUR6Y0J0R0RtZHV0ODRya0Nyb1dubnhvaGZKWF9WRU43RVhDUFUtUE93VUtQd2c2SVltN2RRUm1ZSEtFTFpCaW9pRTBHbXNiUm5HM0NmVTFBd05BdlNTRnhCTV9ZLTdkVV9nVWk1WklHa1pGaHBsbHE?oc=5",
          "date": "11-24 04:52"
        },
        {
          "title": "Cocoa price forecast: Sideways movement expected with $5,229 support and $5,406 resistance - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOaU8zNXgzX0d3MkNKVEJVN29kUE1abnp0UnBFYWkyUGh6aGdFdG5RaDVBYnJMbHQwckxMZ0ZUc3ZaVGV2ci13RHVtdlB5TmZOQkhwb0IxSHU3S1VkeHBHS0FJeHBLdnBRa1o3VmV5U2M5MW5OdTJlU0ZZQy1ET1F6Vy1TSFRCWHRzUmxRZlZEUjNXVFU?oc=5",
          "date": "11-23 23:07"
        },
        {
          "title": "European hunger for chocolate is killing West African rainforests - The Africa Report",
          "source": "The Africa Report",
          "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNaXBEbDJHbWd3UEFHZFE3QnlmVlUwVDl0T01tY2tKV1FhcXRQbkprZm13Q2RoRWo5czl6OHNXV3piVV9WWHNPeEx4NVRNbVFvSmw3MllKZHJhWHlxNGhqb1h4akIwRWVrRkhENk1TRUl2QmFtZlNXc3pPajE4alJlaWtzOWVmcTVnWkZxUUtpdUpwb2lGWFRVTUhuYk1QMThKcmJlRk5uT00?oc=5",
          "date": "11-23 18:51"
        }
      ],
      "newsKr": [
        {
          "title": "\"코코아 가격 하락에 글로벌 수요 반등 조짐\"닛케이아시아 - CNews",
          "source": "CNews",
          "link": "https://news.google.com/rss/articles/CBMid0FVX3lxTE9nVk9IVzVHNWJLZUg5bTJiM2JtSmxSWllCRUZwNGhzaFlJemVSMjdzanRyb3Q0bXVHSW4wWEVxNl9NYVo4eTZhM01JRFAyOUR4TUlfYXI0aUw3cUo4NmY5NVdMTTlydlRnMGxzalB3T25rTzV2czRJ?oc=5",
          "date": "11-22 14:01"
        },
        {
          "title": "코코아값 내리자···오리온 4분기 원가 부담 완화 전망 - 뉴스웨이",
          "source": "뉴스웨이",
          "link": "https://news.google.com/rss/articles/CBMiakFVX3lxTFBqTGMyOVk3U0Jic0FWNWRfZTY1b1cycUxkVjc5c0Z5U1UzaUpxVXo1Q1JNLXlGWHBBN2YyYzFZSGZUUHhsN3MwVmtteVZJdTdmWktiWTBWejJIbDRwRnAzWDZyYjBLYXcwYmc?oc=5",
          "date": "11-23 08:34"
        },
        {
          "title": "\"롯데웰푸드 2026년 코코아 원가 절감액 150억 이른다\"하나證 - CNews",
          "source": "CNews",
          "link": "https://news.google.com/rss/articles/CBMid0FVX3lxTE9FdTRIdC1HXzJXWE5NZDVwNmQ5WURoRXlSUVZVVlNoa2tEVWZiNTdNVXUzQTNWcEU5dE5EYWpZSkVEYVVvMm1TQkJhaGpFWkZzV1phR0Jjb1ZVUXR0b3YyLVpjRDBnREtySVdjVE1INl9xbVFVZ1VJ?oc=5",
          "date": "11-22 15:28"
        },
        {
          "title": "오늘 11월 23일 농산물: 커피 가격 계속 하락 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPVkYwSnh6dEhKd2xZeHlzbnhBZ2JLcmtUQTdfZmh2WGhTNjZPU095ZW4zZUduSEpIRzcxcVhwcE5ZNjRZaHF1bl8tZGM2Z2tGR29aOU5JVkF1Z0tiMTZpZklNb09XVGRHWFhJZlRGOFV2NExPaldEcW53ZFZfbWtxa2F2RmJ6dDYyUHgtaHhoaVA4N3VPUkswVUlMelY?oc=5",
          "date": "11-23 17:17"
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
      "price": 5894.05,
      "change": -165.35,
      "changePercent": -2.73,
      "high52w": 9150.28,
      "low52w": 5350.61,
      "high24h": 6072.63,
      "low24h": 5856.57,
      "high7d": 6318.44,
      "low7d": 5894.05,
      "high1m": 6634.8,
      "low1m": 5894.05,
      "volume": 0,
      "sparkline": [
        6143.17,
        6188.37,
        6318.44,
        6193.88,
        6218.13,
        6059.4,
        5894.05
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5858.69
          },
          {
            "time": "11:00",
            "price": 5870.47
          },
          {
            "time": "13:00",
            "price": 5882.26
          },
          {
            "time": "15:38",
            "price": 5894.05
          }
        ],
        "7D": [
          {
            "date": "11-13",
            "price": 6143.17
          },
          {
            "date": "11-16",
            "price": 6188.37
          },
          {
            "date": "11-17",
            "price": 6318.44
          },
          {
            "date": "11-18",
            "price": 6193.88
          },
          {
            "date": "11-19",
            "price": 6218.13
          },
          {
            "date": "11-20",
            "price": 6059.4
          },
          {
            "date": "11-23",
            "price": 5894.05
          }
        ],
        "1M": [
          {
            "date": "10-26",
            "price": 6634.8
          },
          {
            "date": "10-27",
            "price": 6476.07
          },
          {
            "date": "10-28",
            "price": 6321.75
          },
          {
            "date": "10-29",
            "price": 6293.09
          },
          {
            "date": "10-30",
            "price": 6331.67
          },
          {
            "date": "11-02",
            "price": 6439.7
          },
          {
            "date": "11-03",
            "price": 6260.02
          },
          {
            "date": "11-04",
            "price": 6167.42
          },
          {
            "date": "11-05",
            "price": 6110.1
          },
          {
            "date": "11-06",
            "price": 6172.94
          },
          {
            "date": "11-09",
            "price": 6031.84
          },
          {
            "date": "11-10",
            "price": 5983.34
          },
          {
            "date": "11-11",
            "price": 5930.43
          },
          {
            "date": "11-12",
            "price": 6177.35
          },
          {
            "date": "11-13",
            "price": 6143.17
          },
          {
            "date": "11-16",
            "price": 6188.37
          },
          {
            "date": "11-17",
            "price": 6318.44
          },
          {
            "date": "11-18",
            "price": 6193.88
          },
          {
            "date": "11-19",
            "price": 6218.13
          },
          {
            "date": "11-20",
            "price": 6059.4
          },
          {
            "date": "11-23",
            "price": 5894.05
          }
        ],
        "1Y": [
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
            "price": 6408.83
          },
          {
            "date": "2026-10",
            "price": 6331.67
          },
          {
            "date": "2026-11",
            "price": 5894.05
          }
        ]
      },
      "newsEn": [
        {
          "title": "Coffee Prices Fall as ICE Inventories Rise and Brazilian Real Falls to 1.75-Year Low - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMi2wFBVV95cUxNRjZvRk9vWTJzUG9fd2k5WFlxaExvVGRDS2h1ZkxhczBrWjlDZ1ZXdjJMT1A4d2t4NmJOSTlwTWZxS210bTdRUlJreUhBRlFYTFp0VGl3cXF0T3g4TURrY1Z6VTE3emlTRGwwVjVnU0ZRdDZDU25TNVI5X083MGluMVhhanpuelhYRVcwbTBmZHdZcnFTQVN2QWxNeGZPdUVINDZURS13MHZNMFMtNmZkSVluUGlzdEZod0IxZG5wZzg5bnRDSmdMNVdfMWdmaGlBd05uNGxQMTk2M0U?oc=5",
          "date": "11-24 04:46"
        },
        {
          "title": "Robusta coffee prices have fallen by nearly 10%, reaching their lowest level in almost three years. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNZW5YSVcweFNuNTNHLUhOdU9lN2p5dUlTU091eVlxTzA1bzNZTUFjcG1aMjJCM0otOFJVRXBjbzdYT3FnVWx5VWdGaGdVVkZLMWlCQ1k0X0pNZjd1cWhMRWVjcFp6dk0wWElvX3BSOFpmN2tMZXVGSk1lZzM5VS1nM2ozdjVaenl3ak84c3c0Zw?oc=5",
          "date": "11-23 15:22"
        },
        {
          "title": "Coffee prices plummet by nearly 10%, forecast to continue to be under pressure in the short term - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQN19xeWVBVXd0SVdNem41TmxTU3hjVDRSdTZJMTZudkIzM2FaN1NfUHVabjZPWFpGWUotZE5CUDVDc3A2Zm00bHYxa09TNWtTVjR3dzlrcHFDLV93LXlmLUoyMUxrdzFjNFNXX0FZRGxtRHBhdnRtdmplVHhHdTEwakhidjkzdU1jYVE5TDBta2pVZFQyVDhJbTQ4RzRDdUZWY1BBRGJJbVMtYUxSVE5xUmVrcVp6Zw?oc=5",
          "date": "11-23 17:09"
        },
        {
          "title": "Coffee prices today, November 22nd: Both domestic and international markets experience sharp declines. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxOLVQ3SFBuUFpBOGtrMXVuak5NLTlxcVViQXdBenJPNm5IZGFvd1I3dUQwQmF2MXpVanJfV2RNZk16bmVCWVpYOGlNUmFGV0R1M3RqRGVpcy1RQkpOZ05wR2xpLWF2WUhXNjJlcnZZelQzT0JyT0dheUZkREdzWmtCUUNtZC1YYXlESDhTX1VfSk8zdw?oc=5",
          "date": "11-22 10:45"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(11월 24일) 커피 가격: 한 주간의 급락 이후, 시장이 회복될 가능성이 있을까요? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPeUd0SGpFMUZ2WGxodHlzTHhaMFhCN2JDbmNEbkxJZTAxZWdxTmhvVHZNNGdwRmo4Qk1yWVNPRXNERncxb1cydXo0NWJqV3VEbHdXS1V4Q0xTaEVWYXZCOW41S1JYOGk1MnM1Ulh1b3pPV1hGT0tMUDhQR3NqOGlLczljTUtybEE3TWlseWxWM3JPaVl0SWZNekE4VFkyQQ?oc=5",
          "date": "11-24 09:40"
        },
        {
          "title": "오늘(11월 24일) 커피 가격: 로부스타 가격이 11거래일 연속 하락하며 3년 만에 최저치를 기록했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQQXJ1QTJXaTVvWWR2OGNIcXlweUs5ZXVJVkkxSDBpbVhzc3VhM1daRlFWRjNYNEx3MEdzN1lYZHhoQ1pkNU9RZFVTVDlVZGh5bjFIYXplMGx6NlhFLVR2eTctaXEzckZqNVB4WGhpeUtQVmh4NWxic3FzeDhqOEVtT2ZVeGoxNEd4ejMtYVVWcEo1MzhJTVFxZFhYQUluU2ZqYUtN?oc=5",
          "date": "11-24 08:42"
        },
        {
          "title": "커피 가격 거의 10% 급락, 단기적으로 계속 압박 받을 것으로 예상 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPekI0dU9jcDlwN0dfdVA0LVo0Vm56VDVmbUZKcVdtZ2JnemttaGdGU1FSOXM4SDFheFJ5MmZtOUJabEJINWJKVWFlTFNBNnJZcEJNdmxqa19GWHgwZzVnNjQyTGJCcFNXVTQ5a1pId250Z0lCai1sNDkxdW8tVlZJYTgxS0xkNWpFdTVLdlJteW9POTNFTW1oNzduLW5kX3NFb2w4ZlBybnlTaFc3TzJXSl93MA?oc=5",
          "date": "11-23 17:09"
        },
        {
          "title": "오늘 농산물 가격(11월 24일): 지아라이 커피는 계속 하락세이며, 후추는 kg당 128,000 VND를 유지하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNVUxnTV9BTXA1QXdCUl9HOWJwVWg2b0NPUUlRVEY3MmJFQWNVVUJxMjZ1N0draElnUlZwWjZsZEJBTjI0ZC0tZFVWZGNIR3I0azlkcTFyRTVsQXQyc2RtZWVZckFOVTk5X0Y5Zm5iM2VxZ2VScFVKTzdBdUQzQkE2QWF4SXJ1XzN1S1ZRWlYxekJCVEdJUVhVdlFoTTBsSEVFU3RnRFB3V05XcG1LUkhGVlNZVQ?oc=5",
          "date": "11-24 12:33"
        }
      ],
      "original_price_lb": 267.35
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
      "price": 2854.0,
      "change": -27.0,
      "changePercent": -0.94,
      "high52w": 3322.0,
      "low52w": 2825.0,
      "high24h": 2910.0,
      "low24h": 2825.0,
      "high7d": 3196.0,
      "low7d": 2854.0,
      "high1m": 3270.0,
      "low1m": 2854.0,
      "volume": 12850,
      "sparkline": [
        3196.0,
        3144.0,
        3071.0,
        3019.0,
        2978.0,
        2881.0,
        2854.0
      ],
      "history": {
        "7D": [
          {
            "date": "11-13",
            "price": 3196.0
          },
          {
            "date": "11-16",
            "price": 3144.0
          },
          {
            "date": "11-17",
            "price": 3071.0
          },
          {
            "date": "11-18",
            "price": 3019.0
          },
          {
            "date": "11-19",
            "price": 2978.0
          },
          {
            "date": "11-20",
            "price": 2881.0
          },
          {
            "date": "11-23",
            "price": 2854.0
          }
        ],
        "1M": [
          {
            "date": "10-26",
            "price": 3194.0
          },
          {
            "date": "10-27",
            "price": 3220.0
          },
          {
            "date": "10-28",
            "price": 3199.0
          },
          {
            "date": "10-29",
            "price": 3176.0
          },
          {
            "date": "10-30",
            "price": 3204.0
          },
          {
            "date": "11-02",
            "price": 3241.0
          },
          {
            "date": "11-03",
            "price": 3210.0
          },
          {
            "date": "11-04",
            "price": 3228.0
          },
          {
            "date": "11-05",
            "price": 3241.0
          },
          {
            "date": "11-06",
            "price": 3270.0
          },
          {
            "date": "11-09",
            "price": 3267.0
          },
          {
            "date": "11-10",
            "price": 3250.0
          },
          {
            "date": "11-11",
            "price": 3245.0
          },
          {
            "date": "11-12",
            "price": 3207.0
          },
          {
            "date": "11-13",
            "price": 3196.0
          },
          {
            "date": "11-16",
            "price": 3144.0
          },
          {
            "date": "11-17",
            "price": 3071.0
          },
          {
            "date": "11-18",
            "price": 3019.0
          },
          {
            "date": "11-19",
            "price": 2978.0
          },
          {
            "date": "11-20",
            "price": 2881.0
          },
          {
            "date": "11-23",
            "price": 2854.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 2836.88
          },
          {
            "time": "11:00",
            "price": 2842.58
          },
          {
            "time": "13:00",
            "price": 2848.29
          },
          {
            "time": "15:38",
            "price": 2854.0
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
          "title": "Coffee Prices Fall as Brazilian Real Posts New 1.75-Year Low - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQV2IzZDRfWWxfdS0wU0Jfb09BV0ZyTkNWZE1FS1BFaDVzdGRrQVFPZXFSQ0JqeTNEcjdjdHFISF85eVNOV0hCM0c3NEFLYWFUUnp6MklDekVrYmRJaGdyN01JYnJ4Q0FWaHU0czBhSGNWbTBaQ3BGckt3TW9id2RVTUtEaExVeGJzRjlaY2tiMy1lZDR4TmlLUk1nTG1xNS1KVEZLVl9YMGZXRS1GNlFhSFJmWE1BbHY2MGJr?oc=5",
          "date": "11-24 02:30"
        },
        {
          "title": "Robusta coffee sets fresh 3-year low, raw sugar recovers - The Economic Times",
          "source": "The Economic Times",
          "link": "https://news.google.com/rss/articles/CBMi5gFBVV95cUxQNTgxbUpEdjUxUDdieGdadFU3UnF1X2JiMFFDUnhxZ01ndWs0MWFNTTVUNFJKYjZWSW1RMDMyV3RMbmUyR0FuQmh2M3RJdnMwRHpOTHJ3aEFXNDNybENiUWZYZHFWRVZoQmF1SGVDX3Nwem9WNmkyekNmenh0SVhUZVpjV0toTlFxdVBGelpiWHVXdDNEZWtJNS00Uk9xNmI0RGxsbTN1Tmpjc25jSjZvOVJsdFJYcFM5MkRsYllnbmVQYlUzSW9LbnhDTVg3U3k3TVYzX1YtZHFyVjlOVmg2c0w0Zkxld9IB3wFBVV95cUxOM2RIQ0M1VXFtZFhFbk5XYW5PeTc2NGZfSEZQZThtMmdIZldBTC1QSkpTeTBVenI4Uy1CUkFsVEllNEFTaDhHeHlMTXMyNUpoMUJ6RzRHSTY4RW9mb09tX0FET0w4YmFvVTBuN0FfUk1UT3NsMGx5WVZLZGJpdlJaR09MNDRxTWtpX25jQU9iWDA2cDkxX1FsTDJuXzZpVHpqSlRYTHdJZ0lGSHBkLXQ2YlJBSVgtNFpZYlpOMHdSNTVxTFpNRld4R2Jtc0xXSzl2MDJkSGNibzl3YndHUGE4?oc=5",
          "date": "11-24 14:01"
        },
        {
          "title": "Robusta coffee prices have fallen by nearly 10%, reaching their lowest level in almost three years. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNZW5YSVcweFNuNTNHLUhOdU9lN2p5dUlTU091eVlxTzA1bzNZTUFjcG1aMjJCM0otOFJVRXBjbzdYT3FnVWx5VWdGaGdVVkZLMWlCQ1k0X0pNZjd1cWhMRWVjcFp6dk0wWElvX3BSOFpmN2tMZXVGSk1lZzM5VS1nM2ozdjVaenl3ak84c3c0Zw?oc=5",
          "date": "11-23 15:22"
        },
        {
          "title": "Commotion in foreign markets affects coffee growers - Deccan Herald",
          "source": "Deccan Herald",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPUlJTY0tmOWtaVEoyc3MtT0E1aDNiYzZEdWxJWHdCaEp0b09ndEVKWlVVS1ZULTVNZmFvM2o5SzZDZ0J6clZJaUxyQlZhN1AzUEJaanhnN3ZWcW9vWk5iVUFob1c1S0s2NkJfUGJIYWhBZVZ5QzJlRGlQWUhiWUNyMmEyU3htMHpiZlVaeXJ4Zk5CdHQwMzFCMFNBVUp1d29hVlJncHUtc25XTHRsWDBEMmFZdy3SAbQBQVVfeXFMT1JSU2NLZjlrWlRKMnNzLU9BNWgzYmM2RHVsSVh3QmhKdG9PZ3RFSlpVVUtWVC01TWZhbzNqOUs2Q2dCenJWSWlMckJWYTdQM1BCWmp4Zzd2VnFvb1pOYlVBaG9XNUtLNjZCX1BiSGFoQWVWeUMyZURpUFlIYllDcjJhMlN4bTB6YmZVWnlyeGZOQnR0MDMxQjBTQVVKdXdvYVZSZ3B1LXNuV0x0bFgwRDJhWXct?oc=5",
          "date": "11-23 02:19"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(11월 24일) 커피 가격: 한 주간의 급락 이후, 시장이 회복될 가능성이 있을까요? - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPeUd0SGpFMUZ2WGxodHlzTHhaMFhCN2JDbmNEbkxJZTAxZWdxTmhvVHZNNGdwRmo4Qk1yWVNPRXNERncxb1cydXo0NWJqV3VEbHdXS1V4Q0xTaEVWYXZCOW41S1JYOGk1MnM1Ulh1b3pPV1hGT0tMUDhQR3NqOGlLczljTUtybEE3TWlseWxWM3JPaVl0SWZNekE4VFkyQQ?oc=5",
          "date": "11-24 09:40"
        },
        {
          "title": "오늘(11월 24일) 커피 가격: 로부스타 가격이 11거래일 연속 하락하며 3년 만에 최저치를 기록했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQQXJ1QTJXaTVvWWR2OGNIcXlweUs5ZXVJVkkxSDBpbVhzc3VhM1daRlFWRjNYNEx3MEdzN1lYZHhoQ1pkNU9RZFVTVDlVZGh5bjFIYXplMGx6NlhFLVR2eTctaXEzckZqNVB4WGhpeUtQVmh4NWxic3FzeDhqOEVtT2ZVeGoxNEd4ejMtYVVWcEo1MzhJTVFxZFhYQUluU2ZqYUtN?oc=5",
          "date": "11-24 08:42"
        },
        {
          "title": "오늘의 농업 뉴스(11월 24일): 커피 가격 하락. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMifEFVX3lxTE0yRUotelhjcHZNUE9QenhqLUdPSFVmM09Pb18yeFp6TFJ5ZUpXdk1SYTFwc1ZvbzV5aWlqanZOS2NJbmVTN2xQZ0ZDTDUzU1Y1LVBnYmZyZUgtcWFPNEI1ODBRUkM1dEZMaTRiZjhuUW1GTVRsOGJ6WkVLY0I?oc=5",
          "date": "11-24 09:48"
        },
        {
          "title": "오늘 농산물 가격(11월 24일): 지아라이 커피는 계속 하락세이며, 후추는 kg당 128,000 VND를 유지하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNVUxnTV9BTXA1QXdCUl9HOWJwVWg2b0NPUUlRVEY3MmJFQWNVVUJxMjZ1N0draElnUlZwWjZsZEJBTjI0ZC0tZFVWZGNIR3I0azlkcTFyRTVsQXQyc2RtZWVZckFOVTk5X0Y5Zm5iM2VxZ2VScFVKTzdBdUQzQkE2QWF4SXJ1XzN1S1ZRWlYxekJCVEdJUVhVdlFoTTBsSEVFU3RnRFB3V05XcG1LUkhGVlNZVQ?oc=5",
          "date": "11-24 12:33"
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
      "price": 4182.0,
      "change": -98.74,
      "changePercent": 0.0,
      "high52w": 4280.74,
      "low52w": 3407.56,
      "high24h": 4182.0,
      "low24h": 4182.0,
      "high7d": 4280.74,
      "low7d": 4053.28,
      "high1m": 4280.74,
      "low1m": 3843.07,
      "volume": 39777,
      "sparkline": [
        3871.1,
        3864.63,
        3843.07,
        3886.19,
        4053.28,
        4280.74,
        4182.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-11-03 (Event 415)",
            "price": 4280.74
          },
          {
            "time": "2026-11-17 (Event 416)",
            "price": 4182.0
          }
        ],
        "7D": [
          {
            "date": "2026-10-20",
            "price": 4053.28
          },
          {
            "date": "2026-11-03",
            "price": 4280.74
          },
          {
            "date": "2026-11-17",
            "price": 4182.0
          }
        ],
        "1M": [
          {
            "date": "2026-09-01",
            "price": 3864.63
          },
          {
            "date": "2026-09-15",
            "price": 3843.07
          },
          {
            "date": "2026-10-06",
            "price": 3886.19
          },
          {
            "date": "2026-10-20",
            "price": 4053.28
          },
          {
            "date": "2026-11-03",
            "price": 4280.74
          },
          {
            "date": "2026-11-17",
            "price": 4182.0
          }
        ],
        "1Y": [
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
            "price": 3843.07
          },
          {
            "date": "2026-10-06",
            "price": 3886.19
          },
          {
            "date": "2026-10-20",
            "price": 4053.28
          },
          {
            "date": "2026-11-03",
            "price": 4280.74
          },
          {
            "date": "2026-11-17",
            "price": 4182.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Chinese Milk Powder Demand Drives Fonterra’s Stronger 2026/27 Milk Price Outlook - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOY1dwN1RiVlFxcTU1b3dsS2dXcnAySTBGdGxZU2V4aVZYbWhCWTR1aFFxdlpqU0xYSnRxVWdvbDlVNlF3bU8wdnJzZnRNaTBrdXVPQ19hVHdHMThyQ09hQ2lSSmJWdnkzbzRYX0g5Z2xITVVmUGpuS3RuX2JKQzl0U1dWZjE0V1VEeHdBaVd5a1N6TGZPSkUxVmwzMHRuemhEeFRCMlFrYmJ2Zw?oc=5",
          "date": "11-22 22:47"
        },
        {
          "title": "Butter Market Analysis – Christmas Demand vs. Weak Fat Prices — CMB News - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQZ2ZPNDNkd2hMN1E2VkYwaDV3bHA1R1NNU1Z0d2lGQm1qZWttTkRzRHdtSFAxRXFLSk5QWUxjLWh3LURjYUhreHM2amRTZVlPa3dCb0NUb0FrdDBCMElOVmRqWkhWVjRzeHhvYjlQbWloS3NyQ2M1NXprSWZ6VHJ5d29iQ1EzVHNEVjZzWXdaYWRVV1Q2R19v?oc=5",
          "date": "11-23 16:51"
        },
        {
          "title": "What mattered last week and a preview of the week ahead 1st July - FOREX.com",
          "source": "FOREX.com",
          "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNRlJiRGl1YjdKSDdrMFFkMU1WaHlnNzViQlBPUTlvcy1RUjJDd3FpQTBfcUJNWVVnNExBdnc1eEFKNzBWMHZ1YkdrYlNzRTltUkhZcjRNemd5a2s1NVV6VTJQSTIzQkVBbmhLT1VhMUk4a05lRDZrZk1EMHpxa19iREhudjZTQjh2NDFPTDUtWi1Gbi1yeWxqaHJnZDkySlN0VlJEal9TUm1ib25K?oc=5",
          "date": "11-23 11:01"
        },
        {
          "title": "White Milk Powdered Market To 2035: Bakery Demand and Dairy Solids Sourcing Support Growth - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPam1rTWhvckxNVUZFSVBLam5FLURTSXdfakYwUWY5TThqT3UtUzhKTmhqVHlXTi16ZlBUWFRaUUVuOW9yLXNFSVVqU2F0a1lSOWdqeVV0YnBjQUZFUFhiYlI4aUJrbU4xQWFFWmJhR1ZFRUtnVXlYN3Vld2w0SENBbXJxUC1PR2ZEbHFIaUoyUThwRG96SkVWYV83aTVBTFA1dXNNSXBRdEM5M1MwR2xSWDMzZnBJLTZ2S1Vhb05OQkFSV2pMRXpRaDVJTTUxWC1i?oc=5",
          "date": "11-22 20:21"
        }
      ],
      "newsKr": [
        {
          "title": "글로벌 낙농 시장 엇갈려: 유럽은 타이트, 오세아니아 버터는 하락 - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQYW1hdHoyRGNZbzR5clhPX082dzFnS1JmdnlUSEQ2WHJZcFo2dHpnbXZKNWhUWHAxSTBjTkVEZHFTdjZGUURJMGFZc0dKM1h3SEVPclF0YmhvV2ZnblRub1JXeHExb205Zjg2cGJZSy1EcHBFYzFFVGpseV9SbWM4c25XZG9lalhpTVVHRFFDMnBIemp3eWw2bl96eXFQQTQy?oc=5",
          "date": "11-21 02:40"
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
      "price": 4081.0,
      "change": 110.0,
      "changePercent": 2.77,
      "high52w": 4081.0,
      "low52w": 3161.0,
      "high24h": 4081.0,
      "low24h": 4081.0,
      "high7d": 4081.0,
      "low7d": 3760.0,
      "high1m": 4081.0,
      "low1m": 3565.0,
      "volume": 28500,
      "sparkline": [
        3591.0,
        3585.0,
        3565.0,
        3605.0,
        3760.0,
        3971.0,
        4081.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-11-03 (Event 415)",
            "price": 3971.0
          },
          {
            "time": "2026-11-17 (Event 416)",
            "price": 4081.0
          }
        ],
        "7D": [
          {
            "date": "2026-10-20",
            "price": 3760.0
          },
          {
            "date": "2026-11-03",
            "price": 3971.0
          },
          {
            "date": "2026-11-17",
            "price": 4081.0
          }
        ],
        "1M": [
          {
            "date": "2026-09-01",
            "price": 3585.0
          },
          {
            "date": "2026-09-15",
            "price": 3565.0
          },
          {
            "date": "2026-10-06",
            "price": 3605.0
          },
          {
            "date": "2026-10-20",
            "price": 3760.0
          },
          {
            "date": "2026-11-03",
            "price": 3971.0
          },
          {
            "date": "2026-11-17",
            "price": 4081.0
          }
        ],
        "1Y": [
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
          },
          {
            "date": "2026-10-06",
            "price": 3605.0
          },
          {
            "date": "2026-10-20",
            "price": 3760.0
          },
          {
            "date": "2026-11-03",
            "price": 3971.0
          },
          {
            "date": "2026-11-17",
            "price": 4081.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "GDT milk-powder prices rise as butter falls 6.5% - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQay1jWmZ1cnMzNDNuUk9VNVp2Wk5TdFBiR0tCTE1EajJ1aW1Vc1ZYcEN6Z1FHVUxOQm9FOGdkaXZCMlphSDV1enZDZ25NSW9MRWwydDFfa2U0cW9hNTF2VHUwYkhWdHFIU1R5VjF5TnhBNmQ4NUI4dWRzWUkzaEkxTFBndFg3R1pmWWtBaWhFUHF1Mk1OUUF2UW42TUo?oc=5",
          "date": "11-24 04:58"
        },
        {
          "title": "Chinese Milk Powder Demand Drives Fonterra’s Stronger 2026/27 Milk Price Outlook - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOY1dwN1RiVlFxcTU1b3dsS2dXcnAySTBGdGxZU2V4aVZYbWhCWTR1aFFxdlpqU0xYSnRxVWdvbDlVNlF3bU8wdnJzZnRNaTBrdXVPQ19hVHdHMThyQ09hQ2lSSmJWdnkzbzRYX0g5Z2xITVVmUGpuS3RuX2JKQzl0U1dWZjE0V1VEeHdBaVd5a1N6TGZPSkUxVmwzMHRuemhEeFRCMlFrYmJ2Zw?oc=5",
          "date": "11-22 22:47"
        },
        {
          "title": "Milk Powder Prices Surge on GDT as Butter Slumps 6.5% - Rural News Group",
          "source": "Rural News Group",
          "link": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNY1VlbUZYd05TMXh0OHZVQmMxODdxZkUyT3RXOVNPWElSdDhsY1c3UHpMUGdWQ2V5bXRaREszbng1R3JqbWFTU2NBdTZYN2oyQWdQS1VvWnA5dXFNSDB3cHFkclQ1Q3pSNXNCeE54RDljZTJtNGZzazRIdmtWa29GVjMxOGMwelpYODE2cnA4ZENGVGdmTFpNRzEyOUh1RkRubXU2Z3c1clUtbFJmZ2l4eTlBSF9KWVcyVFE?oc=5",
          "date": "11-24 06:48"
        },
        {
          "title": "Export Demand Continues to Drive Success for Dairy Producers - Farms.com",
          "source": "Farms.com",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPNHNZcmhzSGN6emtYS3RmUGNQcmgzTnFzMHFPY1hEa3RaZmxOTVkzR3lfczgyT0RBQTNpTFJvOXRlNWFjd05MX255eDFpWEgzSUFCYU5DZmxGeVpnOEZfQ0kyNWp5cHk1Nlp5RDdwakpvSXVhWFN2alFFNVhQQVFuN2QyN3Axb2dYdTZkS0pJbEJLWE5vTjV3czdhUHFLSHJa?oc=5",
          "date": "11-23 18:47"
        }
      ],
      "newsKr": [
        {
          "title": "전지분유 시장: 뉴스와 분석 - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE1RTldxMWFzYVNHWGNrQVRiZ0tKZGsyLUZ6T2NrSUV6TEg0NzgySEM4UHlJTC1RTVBSaXM0MEM4d2hJLUtQeUZYcEJ6SlU1WmUydkh5b2hQQkRKd004TzF4b0JTS2FIRlM0NzBPdA?oc=5",
          "date": "11-21 05:22"
        },
        {
          "title": "글로벌 낙농 시장 엇갈려: 유럽은 타이트, 오세아니아 버터는 하락 - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQYW1hdHoyRGNZbzR5clhPX082dzFnS1JmdnlUSEQ2WHJZcFo2dHpnbXZKNWhUWHAxSTBjTkVEZHFTdjZGUURJMGFZc0dKM1h3SEVPclF0YmhvV2ZnblRub1JXeHExb205Zjg2cGJZSy1EcHBFYzFFVGpseV9SbWM4c25XZG9lalhpTVVHRFFDMnBIemp3eWw2bl96eXFQQTQy?oc=5",
          "date": "11-21 02:40"
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
      "price": 4187.0,
      "change": 78.0,
      "changePercent": 1.9,
      "high52w": 4187.0,
      "low52w": 2431.0,
      "high24h": 4187.0,
      "low24h": 4187.0,
      "high7d": 4187.0,
      "low7d": 3975.0,
      "high1m": 4187.0,
      "low1m": 3689.0,
      "volume": 18200,
      "sparkline": [
        3502.0,
        3695.0,
        3689.0,
        3847.0,
        3975.0,
        4109.0,
        4187.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-11-03 (Event 415)",
            "price": 4109.0
          },
          {
            "time": "2026-11-17 (Event 416)",
            "price": 4187.0
          }
        ],
        "7D": [
          {
            "date": "2026-10-20",
            "price": 3975.0
          },
          {
            "date": "2026-11-03",
            "price": 4109.0
          },
          {
            "date": "2026-11-17",
            "price": 4187.0
          }
        ],
        "1M": [
          {
            "date": "2026-09-01",
            "price": 3695.0
          },
          {
            "date": "2026-09-15",
            "price": 3689.0
          },
          {
            "date": "2026-10-06",
            "price": 3847.0
          },
          {
            "date": "2026-10-20",
            "price": 3975.0
          },
          {
            "date": "2026-11-03",
            "price": 4109.0
          },
          {
            "date": "2026-11-17",
            "price": 4187.0
          }
        ],
        "1Y": [
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
          },
          {
            "date": "2026-10-06",
            "price": 3847.0
          },
          {
            "date": "2026-10-20",
            "price": 3975.0
          },
          {
            "date": "2026-11-03",
            "price": 4109.0
          },
          {
            "date": "2026-11-17",
            "price": 4187.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Milk Powder Prices Surge on GDT as Butter Slumps 6.5% - Rural News Group",
          "source": "Rural News Group",
          "link": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNY1VlbUZYd05TMXh0OHZVQmMxODdxZkUyT3RXOVNPWElSdDhsY1c3UHpMUGdWQ2V5bXRaREszbng1R3JqbWFTU2NBdTZYN2oyQWdQS1VvWnA5dXFNSDB3cHFkclQ1Q3pSNXNCeE54RDljZTJtNGZzazRIdmtWa29GVjMxOGMwelpYODE2cnA4ZENGVGdmTFpNRzEyOUh1RkRubXU2Z3c1clUtbFJmZ2l4eTlBSF9KWVcyVFE?oc=5",
          "date": "11-24 06:48"
        },
        {
          "title": "White Milk Powdered Market To 2035: Bakery Demand and Dairy Solids Sourcing Support Growth - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPam1rTWhvckxNVUZFSVBLam5FLURTSXdfakYwUWY5TThqT3UtUzhKTmhqVHlXTi16ZlBUWFRaUUVuOW9yLXNFSVVqU2F0a1lSOWdqeVV0YnBjQUZFUFhiYlI4aUJrbU4xQWFFWmJhR1ZFRUtnVXlYN3Vld2w0SENBbXJxUC1PR2ZEbHFIaUoyUThwRG96SkVWYV83aTVBTFA1dXNNSXBRdEM5M1MwR2xSWDMzZnBJLTZ2S1Vhb05OQkFSV2pMRXpRaDVJTTUxWC1i?oc=5",
          "date": "11-22 20:21"
        }
      ],
      "newsKr": [
        {
          "title": "글로벌 낙농 시장 엇갈려: 유럽은 타이트, 오세아니아 버터는 하락 - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQYW1hdHoyRGNZbzR5clhPX082dzFnS1JmdnlUSEQ2WHJZcFo2dHpnbXZKNWhUWHAxSTBjTkVEZHFTdjZGUURJMGFZc0dKM1h3SEVPclF0YmhvV2ZnblRub1JXeHExb205Zjg2cGJZSy1EcHBFYzFFVGpseV9SbWM4c25XZG9lalhpTVVHRFFDMnBIemp3eWw2bl96eXFQQTQy?oc=5",
          "date": "11-21 02:40"
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
      "price": 4205.0,
      "change": -298.0,
      "changePercent": -6.62,
      "high52w": 6868.0,
      "low52w": 4205.0,
      "high24h": 4205.0,
      "low24h": 4205.0,
      "high7d": 4721.0,
      "low7d": 4205.0,
      "high1m": 5028.0,
      "low1m": 4205.0,
      "volume": 14300,
      "sparkline": [
        5090.0,
        5028.0,
        4760.0,
        4740.0,
        4721.0,
        4503.0,
        4205.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-11-03 (Event 415)",
            "price": 4503.0
          },
          {
            "time": "2026-11-17 (Event 416)",
            "price": 4205.0
          }
        ],
        "7D": [
          {
            "date": "2026-10-20",
            "price": 4721.0
          },
          {
            "date": "2026-11-03",
            "price": 4503.0
          },
          {
            "date": "2026-11-17",
            "price": 4205.0
          }
        ],
        "1M": [
          {
            "date": "2026-09-01",
            "price": 5028.0
          },
          {
            "date": "2026-09-15",
            "price": 4760.0
          },
          {
            "date": "2026-10-06",
            "price": 4740.0
          },
          {
            "date": "2026-10-20",
            "price": 4721.0
          },
          {
            "date": "2026-11-03",
            "price": 4503.0
          },
          {
            "date": "2026-11-17",
            "price": 4205.0
          }
        ],
        "1Y": [
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
          },
          {
            "date": "2026-10-06",
            "price": 4740.0
          },
          {
            "date": "2026-10-20",
            "price": 4721.0
          },
          {
            "date": "2026-11-03",
            "price": 4503.0
          },
          {
            "date": "2026-11-17",
            "price": 4205.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "GDT milk-powder prices rise as butter falls 6.5% - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQay1jWmZ1cnMzNDNuUk9VNVp2Wk5TdFBiR0tCTE1EajJ1aW1Vc1ZYcEN6Z1FHVUxOQm9FOGdkaXZCMlphSDV1enZDZ25NSW9MRWwydDFfa2U0cW9hNTF2VHUwYkhWdHFIU1R5VjF5TnhBNmQ4NUI4dWRzWUkzaEkxTFBndFg3R1pmWWtBaWhFUHF1Mk1OUUF2UW42TUo?oc=5",
          "date": "11-24 04:58"
        },
        {
          "title": "Export Demand Continues to Drive Progress for Dairy Producers - Morning Ag Clips",
          "source": "Morning Ag Clips",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxObXdrdHczM0YzdTBlTWRvRDFJcFNWbkpMc1ViclpESWZxb284MFJ2eXYyTDVHUEFjaG16MmJOUFdTb1JpVnlfSm1iVXowMi1nNzBHLWI0YS1HQUN3SWpyazd4Z011OXJmV0ptSGY3UEQwMG5NeC1OdkdvTWhTTzNDU0ZHZUlobHEta1h0Nmx2RjFLSlpFSUpoUA?oc=5",
          "date": "11-24 11:22"
        },
        {
          "title": "Butter Price Poland, 24 Nov 2026: EUR 3.96/kg FCA — CMB News - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPdENVYUpxUGREVlZEWERBSE9mMmIxeHV3S2NwTnQ2eHdnYW1IM0d6YzVLVlZLaUFqOW5zQkFlRlM2QnBhMk1JNXo4dEtIcmM2YlllV3JjM1BGYnVsMDR1V0VLUkpQMDNJaV9ESEFLczBNdkFtSktJZVVPODhnM1JVbDR3ODh4MVZkSGI0MEFrM016REloTlZINHl5VnA?oc=5",
          "date": "11-24 11:00"
        },
        {
          "title": "EU Trade Barriers Cost U.S. Dairy Farmers up to $2.6B Annually - AGDAILY",
          "source": "AGDAILY",
          "link": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOTDVFek1SWGpxcU9fSm4wNFozaHhFamxNZGJhQ2UzTU5sOTVSb0hOazN2aXNwTUk5Z1dnWktvRWlobmk2Ni1LSXk1TVFmTnY0TjZud3RTYnA0ZlF3UWRtYllFNzdVb01QWmY0TWtrZ1FaWWFqempPaUxRVHpnXzdyUWdKemVhbEp0T09NM01JaTVmc2xPNnhHRVBn?oc=5",
          "date": "11-24 02:38"
        }
      ],
      "newsKr": [
        {
          "title": "전지분유 시장: 뉴스와 분석 - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE1RTldxMWFzYVNHWGNrQVRiZ0tKZGsyLUZ6T2NrSUV6TEg0NzgySEM4UHlJTC1RTVBSaXM0MEM4d2hJLUtQeUZYcEJ6SlU1WmUydkh5b2hQQkRKd004TzF4b0JTS2FIRlM0NzBPdA?oc=5",
          "date": "11-21 05:22"
        },
        {
          "title": "글로벌 낙농 시장 엇갈려: 유럽은 타이트, 오세아니아 버터는 하락 - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQYW1hdHoyRGNZbzR5clhPX082dzFnS1JmdnlUSEQ2WHJZcFo2dHpnbXZKNWhUWHAxSTBjTkVEZHFTdjZGUURJMGFZc0dKM1h3SEVPclF0YmhvV2ZnblRub1JXeHExb205Zjg2cGJZSy1EcHBFYzFFVGpseV9SbWM4c25XZG9lalhpTVVHRFFDMnBIemp3eWw2bl96eXFQQTQy?oc=5",
          "date": "11-21 02:40"
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
      "price": 1059.25,
      "change": -6.0,
      "changePercent": -0.56,
      "high52w": 1244.25,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1105.0,
      "low7d": 1059.25,
      "high1m": 1154.5,
      "low1m": 1059.25,
      "volume": 10,
      "sparkline": [
        1105.0,
        1101.75,
        1088.0,
        1080.75,
        1075.0,
        1065.25,
        1059.25
      ],
      "history": {
        "7D": [
          {
            "date": "11-13",
            "price": 1105.0
          },
          {
            "date": "11-16",
            "price": 1101.75
          },
          {
            "date": "11-17",
            "price": 1088.0
          },
          {
            "date": "11-18",
            "price": 1080.75
          },
          {
            "date": "11-19",
            "price": 1075.0
          },
          {
            "date": "11-20",
            "price": 1065.25
          },
          {
            "date": "11-23",
            "price": 1059.25
          }
        ],
        "1M": [
          {
            "date": "10-26",
            "price": 1149.75
          },
          {
            "date": "10-27",
            "price": 1145.75
          },
          {
            "date": "10-28",
            "price": 1145.5
          },
          {
            "date": "10-29",
            "price": 1144.25
          },
          {
            "date": "10-30",
            "price": 1145.25
          },
          {
            "date": "11-02",
            "price": 1154.5
          },
          {
            "date": "11-03",
            "price": 1129.25
          },
          {
            "date": "11-04",
            "price": 1117.5
          },
          {
            "date": "11-05",
            "price": 1098.25
          },
          {
            "date": "11-06",
            "price": 1075.0
          },
          {
            "date": "11-09",
            "price": 1075.0
          },
          {
            "date": "11-10",
            "price": 1076.5
          },
          {
            "date": "11-11",
            "price": 1100.25
          },
          {
            "date": "11-12",
            "price": 1104.25
          },
          {
            "date": "11-13",
            "price": 1105.0
          },
          {
            "date": "11-16",
            "price": 1101.75
          },
          {
            "date": "11-17",
            "price": 1088.0
          },
          {
            "date": "11-18",
            "price": 1080.75
          },
          {
            "date": "11-19",
            "price": 1075.0
          },
          {
            "date": "11-20",
            "price": 1065.25
          },
          {
            "date": "11-23",
            "price": 1059.25
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1052.89
          },
          {
            "time": "11:00",
            "price": 1055.01
          },
          {
            "time": "13:00",
            "price": 1057.13
          },
          {
            "time": "15:38",
            "price": 1059.25
          }
        ],
        "1Y": [
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
            "price": 1191.0
          },
          {
            "date": "2026-10",
            "price": 1145.25
          },
          {
            "date": "2026-11",
            "price": 1065.25
          }
        ]
      },
      "newsEn": [
        {
          "title": "Indonesia’s B50 Biodiesel Policy Review Raises Questions for Global Palm Oil and Vegetable Oil Markets - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMiygFBVV95cUxPUEt2X1dhS05zT0hwLWI3WDQwZDZla1RNLXY5bHR2QmFnUFR0cmhQbExLRXVjTFlWbV96TU9GY3B4NjZ6NkxwWTZYeWtBWVp2RTk1QzVtc1U5OGF0ZUFFVjh5X1dJazlEd0ZGbldCRFRlVVdObFBMWkRxTzh3ckNsaHZZTFpQUVh4b2ZwQWVzY2I5Z09xc3dkeDFPeEQwTGlYaWJpV3pCdGQ2cENoaTBGNTFaZTk4RkE5YW9HYUZBX19oTUZQU0tyVDVn?oc=5",
          "date": "11-24 14:04"
        },
        {
          "title": "Palm oil prices fall 18% amid Malaysian supply glut - УкрАгроКонсалт",
          "source": "УкрАгроКонсалт",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQOHBIRmYxUjVqd2pjaERydmZBam43N1ZObU1QM1djVmNfLTJXQm83WDluc2VJdHVzcjVidzZQLWNaN1JVYnd5SGVLdVpPMEpLNnFLdlhVRlkwTzByNVJUanBRUDdKLVQzLU9BS29OdjJBNl9WU2pUcU03eUNXMVROaGZfelI0QlhhcG8tMWdMNA?oc=5",
          "date": "11-23 18:55"
        },
        {
          "title": "Palm Oil Supply Outlook 2027: Indonesia Output Drop, B50 Biodiesel, Tighter Exports - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiywFBVV95cUxOZXlSYkJxMXpFYUZaWXhSLVNEQnZWWWVwbEFjc2MxTTQ0amotRDA2SnhpblRmWUFFbmxiQk9DX3NMUEJRWG45UnBvZC16QkJ5TUtFVm9wU19mM29VQjdGWVNwUmdCYXVObzc3ZDJYVHNPRDB2RWlIWWlJbWw5YmFISkZsRE9WQXlqMWg5bHcxUnVQR0VFNzBFT0pkaGtWNTdmUUhEZjJoRlBFVXEtdmhPaVV5T1YyZ2RWV2xmVUppN19GQ2h5X196cWo2aw?oc=5",
          "date": "11-24 13:20"
        },
        {
          "title": "Palm extends losses, nears 9-month low on weak Dalian, Chicago oils - Investify",
          "source": "Investify",
          "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNckxwQnplaEoxWlUwVG55b3pqNXk1ckVqU29SR2NaaW5rR1VoVDlSQ1RNSDE4dXN2NGItejlpd29WYTB1ZmZSR0F2aHVrZnNWNlNlazJzbFcwT0ljQkZPM2J3c0lOUnFvWTdOVHBGNkN4aVJZcmJCQ0lIcjJNM29KYmNFTkJ3YTJ3WjZzYm9FcmZCcjE0c2syYTNSd3BSSEp5T0twN21FOW8zYTFB?oc=5",
          "date": "11-23 20:01"
        }
      ],
      "newsKr": [
        {
          "title": "인니 “팜유 가격 결정자 되겠다”… 말레이 아성에 도전장 - 아시아투데이",
          "source": "아시아투데이",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTFBsTGdWYkVpRVlfSDJOelRhQ1pjVUMtVUdYV0YzOEt2TFNlaEZjQ292ZW16b29BcDJzNUVDZlZZODJPRnBicnZNbTV5ck5ITVRSTTdENklQU2VrMFhieXZpY24weW44T1VOZTlkXzdR?oc=5",
          "date": "08-24 16:00"
        },
        {
          "title": "롯데웰푸드, 카카오·팜유 등 원재료 시세 예측 AI 시스템 도입 - 식품음료신문",
          "source": "식품음료신문",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTE5PbTB1RGhTamttTjRLd1R0ejRJQ2FlVUlQOXpiUndzNExPbUczZEtKOTdDQk11dUFRc1NOd2NIVU9WUHJZeGhMQWJ3SEY0QzNLRHdhTGlSdDZfX2xtYmlsZFNzQzRTaERVcTBmLUtGUQ?oc=5",
          "date": "09-25 16:00"
        },
        {
          "title": "밀가루·팜유에 용기까지 뛰었다…식품업계, 가격 인상 '궁여지책' - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE8zSnQ4UkszR1psQ0tpLVpfTmIzODYwaWx6UGlkbURQRWZBSDYxbnZwNjhZc2t0OHM0aVEwV1JGY29ZdGJoOHJvOUhTSEd2LWM0b3VHZzRTUExxOWpWSzlHLdIBeEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1ncw?oc=5",
          "date": "08-19 16:00"
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
            "date": "11-18",
            "price": 1930.0
          },
          {
            "date": "11-19",
            "price": 1931.93
          },
          {
            "date": "11-20",
            "price": 1933.86
          },
          {
            "date": "11-21",
            "price": 1935.79
          },
          {
            "date": "11-22",
            "price": 1937.72
          },
          {
            "date": "11-23",
            "price": 1939.65
          },
          {
            "date": "11-24",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "10-26",
            "price": 1930.0
          },
          {
            "date": "10-27",
            "price": 1930.96
          },
          {
            "date": "10-28",
            "price": 1931.93
          },
          {
            "date": "10-29",
            "price": 1932.9
          },
          {
            "date": "10-30",
            "price": 1933.86
          },
          {
            "date": "10-31",
            "price": 1934.82
          },
          {
            "date": "11-01",
            "price": 1935.79
          },
          {
            "date": "11-02",
            "price": 1936.76
          },
          {
            "date": "11-03",
            "price": 1937.72
          },
          {
            "date": "11-04",
            "price": 1938.68
          },
          {
            "date": "11-05",
            "price": 1939.65
          },
          {
            "date": "11-06",
            "price": 1940.62
          },
          {
            "date": "11-07",
            "price": 1941.58
          },
          {
            "date": "11-08",
            "price": 1942.54
          },
          {
            "date": "11-09",
            "price": 1943.51
          },
          {
            "date": "11-10",
            "price": 1944.48
          },
          {
            "date": "11-11",
            "price": 1945.44
          },
          {
            "date": "11-12",
            "price": 1946.4
          },
          {
            "date": "11-13",
            "price": 1947.37
          },
          {
            "date": "11-14",
            "price": 1948.34
          },
          {
            "date": "11-15",
            "price": 1949.3
          },
          {
            "date": "11-16",
            "price": 1950.26
          },
          {
            "date": "11-17",
            "price": 1951.23
          },
          {
            "date": "11-18",
            "price": 1952.2
          },
          {
            "date": "11-19",
            "price": 1953.16
          },
          {
            "date": "11-20",
            "price": 1954.12
          },
          {
            "date": "11-21",
            "price": 1955.09
          },
          {
            "date": "11-22",
            "price": 1956.06
          },
          {
            "date": "11-23",
            "price": 1957.02
          },
          {
            "date": "11-24",
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
            "time": "15:38",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Palm Oil Market Split as Palm Kernel Oil Rallies and Palm Oil Slips - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOdHoycFloblRNRmZjWmFBTjAzUmhsX0R2WHo2WklDQllNTGtKNmpvN2hTMmtHcVpTOTZwM2VXMllMLVktMjRSYnNqLUFRYWF6eHNidVlZWW5rRG1iOWN5R1Q0VmlXWjN2aDFpNWlCLWRtZzE4ai10MHZpMXRuSnZma21fZHVZQnV1bExweE1EaEZ0Yms?oc=5",
          "date": "08-06 16:00"
        },
        {
          "title": "Desiccated coconuts: weather and energy costs weigh on the markets - Mundus Agri",
          "source": "Mundus Agri",
          "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQdWdMdnpYejMtS3BrX1BONGthX0xQYWpVa09DRWVkTVJldXRjSnN2OC10Y2h0aUxOOUVzbVhJbGJ5ZFpZUG50LTZ2YVI4OG1laDlzZTdwZHpqWmxsNHZ5Y1ZGNVlnbEVRSmpPSHNfeWgtV1hyNEd3aDdBSFh2a0MtVm0tUktzZ0czQ2pRWnFYWTcwSUMtRGV2Ym1jdVpOYzA?oc=5",
          "date": "05-13 16:00"
        },
        {
          "title": "Desiccated coconuts: demand drives market trends - Mundus Agri",
          "source": "Mundus Agri",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQa0dpV3lETUtvZnlyZWxYaDRiVlRobjE3MVVFS29RaE9xcXRFSkpBUFJyS0ZMRlJtMUVuZkFjRDRsMDk0ZUJLanJ2LVNhZWt5MzhLMzFBUnQ0SGdYX3NWQ181YmNORjE2aG1OcEJCLUVTZzJOejBtQTRwZ0NnYjVldlNuMElGd1NWWHFtMm13cFJ3TnphY3c?oc=5",
          "date": "07-08 16:00"
        },
        {
          "title": "Buyers are clamoring for coconut oil - Food Business News",
          "source": "Food Business News",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPRENjSllUeERtdXI3NWVBdEdJRW9YMGRjQkluZm1DZkt2VzNJYjlBT0FmM3JtVUtnNFVfcm40NmN1OWZFN1N6Wjh0MmZJSXBvWU5ZUjVhWGdvWFJMT1l5VHYxSUVDUDdxYTNoTXM1MDh5SW1Na05sRkowamJrSU9GRTh0MEdfb0t5UVpmbQ?oc=5",
          "date": "04-29 16:00"
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
          "title": "DS단석, 바이오원료 글로벌 판로 확대·협력방안 논의 - 에너지플랫폼뉴스",
          "source": "에너지플랫폼뉴스",
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
      "price": 1344.11,
      "change": -0.2,
      "changePercent": -0.01,
      "high52w": 1587.7,
      "low52w": 1319.52,
      "high24h": 1348.38,
      "low24h": 1337.44,
      "high7d": 1344.31,
      "low7d": 1330.4,
      "high1m": 1362.7,
      "low1m": 1321.76,
      "volume": 0,
      "sparkline": [
        1333.25,
        1335.67,
        1333.01,
        1330.4,
        1334.79,
        1344.31,
        1344.11
      ],
      "history": {
        "7D": [
          {
            "date": "11-16",
            "price": 1333.25
          },
          {
            "date": "11-17",
            "price": 1335.67
          },
          {
            "date": "11-18",
            "price": 1333.01
          },
          {
            "date": "11-19",
            "price": 1330.4
          },
          {
            "date": "11-20",
            "price": 1334.79
          },
          {
            "date": "11-23",
            "price": 1344.31
          },
          {
            "date": "11-24",
            "price": 1344.11
          }
        ],
        "1M": [
          {
            "date": "10-26",
            "price": 1321.76
          },
          {
            "date": "10-27",
            "price": 1324.77
          },
          {
            "date": "10-28",
            "price": 1326.81
          },
          {
            "date": "10-29",
            "price": 1340.34
          },
          {
            "date": "10-30",
            "price": 1337.98
          },
          {
            "date": "11-02",
            "price": 1325.52
          },
          {
            "date": "11-03",
            "price": 1344.81
          },
          {
            "date": "11-04",
            "price": 1342.9
          },
          {
            "date": "11-05",
            "price": 1340.07
          },
          {
            "date": "11-06",
            "price": 1356.34
          },
          {
            "date": "11-09",
            "price": 1362.7
          },
          {
            "date": "11-10",
            "price": 1343.84
          },
          {
            "date": "11-11",
            "price": 1341.91
          },
          {
            "date": "11-12",
            "price": 1336.26
          },
          {
            "date": "11-13",
            "price": 1333.78
          },
          {
            "date": "11-16",
            "price": 1333.25
          },
          {
            "date": "11-17",
            "price": 1335.67
          },
          {
            "date": "11-18",
            "price": 1333.01
          },
          {
            "date": "11-19",
            "price": 1330.4
          },
          {
            "date": "11-20",
            "price": 1334.79
          },
          {
            "date": "11-23",
            "price": 1344.31
          },
          {
            "date": "11-24",
            "price": 1344.11
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1336.05
          },
          {
            "time": "11:00",
            "price": 1338.73
          },
          {
            "time": "13:00",
            "price": 1341.42
          },
          {
            "time": "15:38",
            "price": 1344.11
          }
        ],
        "1Y": [
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
            "price": 1350.5
          },
          {
            "date": "2026-09",
            "price": 1324.52
          },
          {
            "date": "2026-11",
            "price": 1344.09
          },
          {
            "date": "2026-11",
            "price": 1344.11
          }
        ]
      },
      "newsEn": [
        {
          "title": "Asia FX subdued as dollar holds near 20-mth high on AI rally - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOTzlEZFBxaXFXY0tBZk4yTDR5OFBPRWNMYzFIU2xVWk5JZXBMSnNaQVVzTVFWWmRFdl9FY3FHZzlhelVoVTFyRnhXWlhGejRpT3FhcGt6ei1kd0FtMGxxeHZLRVpfakxxcnVQS0lRVzhlNWN4bWlhTnBCalp0N252LWtZZHBzQ1NocFpGV1JUazFaSWR6TDhqeE1JY0YwTE92MUl1VlVuWThPZ0NhWFE?oc=5",
          "date": "11-24 12:42"
        },
        {
          "title": "US futures climb as technology recovers from brutal sell-off last week - KSN-TV",
          "source": "KSN-TV",
          "link": "https://news.google.com/rss/articles/CBMipgFBVV95cUxONzRKN24zRkVwMEdGM0x2QmdQM1VlSm5PMUI1dV9RVmptT3JYWGloeW5aYkN0a1NXMlhza2k4ai1HM3VmUTYyQkJ2a21iRTBuR0h5X2VZOUhOcVN1VXdyek96UUF0b0gwbF9QSmxRUFRaZ1k5Y3l4SmhOMTYtSXZGT1BfSkhUQ19BQzFfYk1yNGp3bkNHYjZHcU44RGZxWkZkMWxmVTJB0gGrAUFVX3lxTE9EZzJRYWF6Q2ZHdkc0dkl4NDRsRFJXdGZaOXhpS25Xc0dBYWRxbURNbVdjYUtaS1hBd3VJay1PWTFGUnhHblR2MFY3S21fTHJtWFluYTNJQmtUOWdhWWFfTkRYWF9ETTVOYnZLX2tqQUV1c2RQYlpaakhlT2NOdGdpVThzVGd0QXExeUJqeUlXUXNRcTNOUmJLeU5aaXM4MmNYdDhTaWxoRnUtQQ?oc=5",
          "date": "11-23 21:43"
        },
        {
          "title": "US Dollar vs South Korean won stays under pressure as capital outflows challenge short-term technical support - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQdzlJMWNQak9CcW1feHEzTDk5eWdsb0ItX0EtTzNJcHVKN1dwSGNNTmdCWXU0MTJrQ2NSRk1HNGN3LTBMRVY5YUo4N2dLRGtsWlR6MHhxMXo4TkM3NDJpcjBPOHVTdy1mVEd1QVU4VVc4eUlhdzh1SXJYbHRMV2tBdTQ5ZjlPb002MWV6Nkt1TWNYYU5XaXVPdw?oc=5",
          "date": "11-23 15:31"
        },
        {
          "title": "Asian shares mostly fall after S&P 500 drops 3.7% into a correction - WOWK 13 News",
          "source": "WOWK 13 News",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPOXd0TXg1Ml9IQ2d2Mi1oV05rVlM1SUZjZ1QwajM3cFdlY1hVRUpiN1VTNk5rX0cyNEFYeWlSSWdoaFR0QVhWT2o5eG1ZNnlFR01CRi1WWmpwYzQ5cTBhLUFRMnpwVFZUYkdFQVVXb1hhSXdacjhUa3BtM2ZObDZQWjgyc2lPb0MxdGc2U2MzYjN6WkRYLXRnVmdveV81OWJ4OEpoWG11TXF3eGfSAbABQVVfeXFMTzV5ZWx5WFNZU2sxTDZab2FYMFFUUUgtc0pFS0tMRmVtRFNIQk5mRDJsZ0JzQlRiWk1ZLWNka2NRWHRtNjlQZ3E4S0puWjZTUGN6dzRZbzZqZEhhZHZsOFRCV1hwUWY2cjBTOTJJLXdDN21RR3NENmRPaEJHSThlZ2ZHVUdGTXVqTzhMdVYtTHdyX1luZzVPWTVvOXFhcmRtdTFjS2JrUDNxc2VOWjNPQjM?oc=5",
          "date": "11-23 13:23"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 돌아온 탕아, 환호하는 위험자산 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFBoS0g2XzlsTmtpcGFUdk52andEOXRDUEY4ekxuMnpCSXZFUjEtMWZYVDlUbWh5ZURHOU5pd0ZUcE9QZ1pNMXFsRnVWdC05c1NHYlNNQU9LbkVuazZ6SXNldg?oc=5",
          "date": "11-24 09:51"
        },
        {
          "title": "“달러 강세에도 원화는 상승”…한국투자證, 내년 환율 1320원 전망 - 디지털데일리",
          "source": "디지털데일리",
          "link": "https://news.google.com/rss/articles/CBMiZEFVX3lxTE83YTNmb2stbXEyMTJmb2FLNXV0cDFlNldtYk9LdGxfVVQ4VzNhMk1oQlBpLXJSRVhjT0xLcG95MWtkRDhiRmNESXN1SjJTY3VfLW53N0lnUktqY2MzX1VuQmNKejc?oc=5",
          "date": "11-24 13:44"
        },
        {
          "title": "한투증권 \"주가 하락에 외인 매도 둔화…환율 상승 압력 완화\" - 연합뉴스",
          "source": "연합뉴스",
          "link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTFBGWUlsbXZlTXRTcGgtS19sSXE0aGpBWk5NckFRN1JVOVc5clVwWXJobVoxWjhuT0Rzb01hSFliZ0NsVmxTZUtxanFZMzJZdjRCSndKSFktakxGekXSAWBBVV95cUxPRFZiaVVzd0RSTVZfSk5LUGRzcWdWbEk3VG10Yk10d2ZGVmNERUU2NnotTkhoRFdCcXFFREdMc1RiN0FKMTFLM1lISWtyaENjZGZZOUJmWnZmRE5FWkk4cFg?oc=5",
          "date": "11-24 08:38"
        },
        {
          "title": "골드만삭스, 원-달러 환율 내년 1280원까지 하락 전망...\"원화 환전 수요, 올해보다 3배가량 늘어날 것\" - 비욘드포스트",
          "source": "비욘드포스트",
          "link": "https://news.google.com/rss/articles/CBMifEFVX3lxTFBIaE5IU2ZTNm9BcGN1bmZLTFBCU0FBX01TT3Awd281TDdEakdjbzFRWHZMNU9lS1R1Vm9CUUpBWWw0STJtTzZMbXl2Z29XTTVaOUM0MXFzdGd1VUpmMng5bHFNMlFPX3lXVnl2Y3lsdmxtejhEa2hLUmNfdjM?oc=5",
          "date": "11-24 15:17"
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
      "price": 1464.7,
      "change": -7.81,
      "changePercent": -0.53,
      "high52w": 1807.42,
      "low52w": 1417.52,
      "high24h": 1470.2,
      "low24h": 1459.3,
      "high7d": 1472.51,
      "low7d": 1459.53,
      "high1m": 1522.67,
      "low1m": 1459.53,
      "volume": 0,
      "sparkline": [
        1471.08,
        1467.45,
        1464.4,
        1459.53,
        1462.41,
        1472.51,
        1464.7
      ],
      "history": {
        "7D": [
          {
            "date": "11-16",
            "price": 1471.08
          },
          {
            "date": "11-17",
            "price": 1467.45
          },
          {
            "date": "11-18",
            "price": 1464.4
          },
          {
            "date": "11-19",
            "price": 1459.53
          },
          {
            "date": "11-20",
            "price": 1462.41
          },
          {
            "date": "11-23",
            "price": 1472.51
          },
          {
            "date": "11-24",
            "price": 1464.7
          }
        ],
        "1M": [
          {
            "date": "10-26",
            "price": 1475.7
          },
          {
            "date": "10-27",
            "price": 1478.76
          },
          {
            "date": "10-28",
            "price": 1474.64
          },
          {
            "date": "10-29",
            "price": 1494.46
          },
          {
            "date": "10-30",
            "price": 1495.9
          },
          {
            "date": "11-02",
            "price": 1486.41
          },
          {
            "date": "11-03",
            "price": 1504.69
          },
          {
            "date": "11-04",
            "price": 1503.96
          },
          {
            "date": "11-05",
            "price": 1505.26
          },
          {
            "date": "11-06",
            "price": 1522.67
          },
          {
            "date": "11-09",
            "price": 1518.11
          },
          {
            "date": "11-10",
            "price": 1504.57
          },
          {
            "date": "11-11",
            "price": 1498.01
          },
          {
            "date": "11-12",
            "price": 1481.23
          },
          {
            "date": "11-13",
            "price": 1474.01
          },
          {
            "date": "11-16",
            "price": 1471.08
          },
          {
            "date": "11-17",
            "price": 1467.45
          },
          {
            "date": "11-18",
            "price": 1464.4
          },
          {
            "date": "11-19",
            "price": 1459.53
          },
          {
            "date": "11-20",
            "price": 1462.41
          },
          {
            "date": "11-23",
            "price": 1472.51
          },
          {
            "date": "11-24",
            "price": 1464.7
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1455.91
          },
          {
            "time": "11:00",
            "price": 1458.84
          },
          {
            "time": "13:00",
            "price": 1461.77
          },
          {
            "time": "15:38",
            "price": 1464.7
          }
        ],
        "1Y": [
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
            "price": 1531.43
          },
          {
            "date": "2026-09",
            "price": 1486.26
          },
          {
            "date": "2026-11",
            "price": 1473.81
          },
          {
            "date": "2026-11",
            "price": 1464.7
          }
        ]
      },
      "newsEn": [
        {
          "title": "Nepal Rastra Bank Sets Foreign Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxPaWFmbjJ2dzdyUFpNNXVsVHRHcVpjZ3FNSmN0TEZSOUYtZkx5bW1DM1h4RDdSR3BkaFNFMnh5TzFFb2hvYTZDbnFSZ2UxZDFWNDFtUUxtMGUxenBtelpvVXZvc09Jd0JxTnEwNW5lRURQTmJGYlU4OGpfVmRnU19naWdqMVlxZy0xTTBZTmNR?oc=5",
          "date": "11-24 08:46"
        },
        {
          "title": "Iran releases currency exchange rates for November 24 - Trend News Agency",
          "source": "Trend News Agency",
          "link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTE9wcVhaYk43ZFYxa3R2TDBhamFwcnVxcHJvc0lSWGM5S0doXzU0Wm5KREhGaEhCNnRYS05pZTh3VmhSQmNxcDU5ckdYcGVTS3c?oc=5",
          "date": "11-24 15:16"
        },
        {
          "title": "Nepal Rastra Bank Sets Today's Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQeWwzMVUtQWJidkVIdmREcEMwd29GSXp6U1RfN2l6aGRkLTFBRU9UZlZrS1FDUmk0cWNTTTY3TnZyMzg2NGs1ZmhDUmZMNC1yLUIyTGdCemdiN1pnRFE1U3NURUtBN3NNX2p0dTRyamlYaDQ0OUFxSDdsN3JrSm04SFhoTHpveWtnMHl2S0lHcw?oc=5",
          "date": "11-23 17:47"
        },
        {
          "title": "Nepal Rastra Bank Sets Today's Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxOQVZNUWdiS21CdXFYdUtDU1hRMkRLWTFKQm8yay1oQ0lFT3ZoTl9NSVBXVnVQS280T200RUh3NzZ1VzJTaHQ3bk43aW0yZkZXUTAxZnItZW82Nnl3YjNYWlFjQVF1WEpmVXhKRWNxNWJqOFN5VlRTRXhyYjlkb0hMTnUzTFdVajlNaV9jbA?oc=5",
          "date": "11-23 08:39"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 돌아온 탕아, 환호하는 위험자산 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFBoS0g2XzlsTmtpcGFUdk52andEOXRDUEY4ekxuMnpCSXZFUjEtMWZYVDlUbWh5ZURHOU5pd0ZUcE9QZ1pNMXFsRnVWdC05c1NHYlNNQU9LbkVuazZ6SXNldg?oc=5",
          "date": "11-24 09:51"
        },
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - LiteFinance",
          "source": "LiteFinance",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "11-22 08:39"
        },
        {
          "title": "USD/CAD 환율 전망: 1.4300 부근으로 하락했지만 100일 단순이동평균선 위에서 강세 구조 유지 - www.tmgm.com",
          "source": "www.tmgm.com",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxPME1QOWpTQ25uMGpCOUxFc3BwX1FuOTB0eEhVbFNhQWRDRU44UEZka2Y0cTM0M0xiY1lONUVReUEyQ1FlNXN5ajRtN2VNX2dqN0JxX3hSZ1VfMVdVdGpRNDNnM1BseGR4RlBDTFFCOFN5aVk4Z3Znek1lYmNiNFRibzhGeDI4N3ZaN0R4ZXVobGl2cEEzTENWcGpfaFZPM1pzazhRNDZBVDJGdlgyRVRaY1BwZDlvcUZaWjZpZkdMSWFHbTBjTHpfWWg1bGZXNmpBcTJBcXRoM2hHeGNzaUI5N0VWcFIzYmk2UHpXM21OZXUzQQ?oc=5",
          "date": "11-23 16:16"
        },
        {
          "title": "수출 1조달러에도 연말 환율 1380원 전망…美 긴축·외국인 역송금 변수 - 뉴스1",
          "source": "뉴스1",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5mbEJWVS1Dd25QX0F3aS1UNHZjYW5HOTJ4T0dxajZaVVRiaVJMT2F0YUNWaklpQkdIWkZWVHlJdUdTZnpQZjQzMm1xSjUwYWVSWlhsbw?oc=5",
          "date": "11-22 07:30"
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
