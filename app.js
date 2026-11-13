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
  "last_updated": "2026-11-13 17:57:21",
  "weekly_report": {
    "title": "[2026 Week 46 Report]",
    "week_number": 46,
    "week_date_range": "2026.11.09 ~ 2026.11.13",
    "weekly_price_title": "[W46 주요품목가격]",
    "date": "2026.11.13",
    "report_date": "2026.11.13, 17:57",
    "top_gainer": "GDT 전지분유 : $3,971.00 (▲5.61%)",
    "top_loser": "GDT 버터 : $4,503.00 (▼4.62%)",
    "weekly_price_list": [
      "코코아 : $5,051.00 (▼7.93%)",
      "아라비카 커피 : $6,186.16 (▼6.33%)",
      "로부스타 커피 : $3,207.00 (▲0.80%)",
      "GDT 지수 : $4,166.00 (▲2.78%)",
      "GDT 전지분유 : $3,971.00 (▲5.61%)",
      "GDT 탈지분유 : $4,109.00 (▲3.37%)",
      "GDT 버터 : $4,503.00 (▼4.62%)",
      "팜유 : $1,104.25 (▼6.89%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,051.00 (▼7.93%)",
      "아라비카 커피 : $6,186.16 (▼6.33%)",
      "로부스타 커피 : $3,207.00 (▲0.80%)",
      "GDT 지수 : $4,166.00 (▲2.78%)",
      "GDT 전지분유 : $3,971.00 (▲5.61%)",
      "GDT 탈지분유 : $4,109.00 (▲3.37%)",
      "GDT 버터 : $4,503.00 (▼4.62%)",
      "팜유 : $1,104.25 (▼6.89%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,337.24원 (▲0.98원)",
    "fx_eur": "1,478.40원 (▼2.83원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까?"
  },
  "daily_briefing": {
    "title": "[2026 Week 46 Report]",
    "week_number": 46,
    "week_date_range": "2026.11.09 ~ 2026.11.13",
    "weekly_price_title": "[W46 주요품목가격]",
    "date": "2026.11.13",
    "report_date": "2026.11.13, 17:57",
    "top_gainer": "GDT 전지분유 : $3,971.00 (▲5.61%)",
    "top_loser": "GDT 버터 : $4,503.00 (▼4.62%)",
    "weekly_price_list": [
      "코코아 : $5,051.00 (▼7.93%)",
      "아라비카 커피 : $6,186.16 (▼6.33%)",
      "로부스타 커피 : $3,207.00 (▲0.80%)",
      "GDT 지수 : $4,166.00 (▲2.78%)",
      "GDT 전지분유 : $3,971.00 (▲5.61%)",
      "GDT 탈지분유 : $4,109.00 (▲3.37%)",
      "GDT 버터 : $4,503.00 (▼4.62%)",
      "팜유 : $1,104.25 (▼6.89%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,051.00 (▼7.93%)",
      "아라비카 커피 : $6,186.16 (▼6.33%)",
      "로부스타 커피 : $3,207.00 (▲0.80%)",
      "GDT 지수 : $4,166.00 (▲2.78%)",
      "GDT 전지분유 : $3,971.00 (▲5.61%)",
      "GDT 탈지분유 : $4,109.00 (▲3.37%)",
      "GDT 버터 : $4,503.00 (▼4.62%)",
      "팜유 : $1,104.25 (▼6.89%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,337.24원 (▲0.98원)",
    "fx_eur": "1,478.40원 (▼2.83원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까?"
  },
  "lastUpdated": "2026-11-13T17:57:21.486926+09:00",
  "usdKrwRate": 1336.94,
  "eurKrwRate": 1478.4,
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
      "price": 5051.0,
      "change": 144.0,
      "changePercent": 2.93,
      "high52w": 6675.0,
      "low52w": 2798.0,
      "high24h": 5267.0,
      "low24h": 5008.0,
      "high7d": 5456.0,
      "low7d": 4742.0,
      "high1m": 5843.0,
      "low1m": 4742.0,
      "volume": 0,
      "sparkline": [
        5456.0,
        5181.0,
        5155.0,
        5004.0,
        4742.0,
        4907.0,
        5051.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5020.69
          },
          {
            "time": "11:00",
            "price": 5030.8
          },
          {
            "time": "13:00",
            "price": 5040.9
          },
          {
            "time": "17:57",
            "price": 5051.0
          }
        ],
        "7D": [
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
            "price": 5051.0
          }
        ],
        "1M": [
          {
            "date": "10-13",
            "price": 5733.0
          },
          {
            "date": "10-14",
            "price": 5735.0
          },
          {
            "date": "10-15",
            "price": 5831.0
          },
          {
            "date": "10-16",
            "price": 5645.0
          },
          {
            "date": "10-19",
            "price": 5687.0
          },
          {
            "date": "10-20",
            "price": 5801.0
          },
          {
            "date": "10-21",
            "price": 5843.0
          },
          {
            "date": "10-22",
            "price": 5582.0
          },
          {
            "date": "10-23",
            "price": 5592.0
          },
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
            "price": 5051.0
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
            "price": 5051.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Excessive Ivory Coast Rains Disrupt Cocoa Supplies and Boost Prices - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNTTVPLVlidUtWRmZJV1owUDJtQTM1WmRibjRIa1Nwc2UtazFwSk5QOEpLMHJKTWhfcWVNMDgxM3VwWmdkMkpqS1dUckh6SnJZajBHcHU2b0NwWFdHejN1VTY0UGJQdlhXYmJ0OXFZY0RDOVlSZngtS1dOVElZRC1hV3lXcjVJQnFhN3QtcE9fNkoyNjd6b3F6Y1MxRHdIM1JmZWRJS3dQbzZ2Tmhlcy1CXw?oc=5",
          "date": "11-13 04:20"
        },
        {
          "title": "Cocoa Prices Retreat on Supply Optimism - Yahoo Finance",
          "source": "Yahoo Finance",
          "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQZDR0eVZNSkNvZk41S2JLMFN4UmJhMmp5TXBzaXp0bGwzOVAydXZSY2dNd0VXblVjY2xpUER0NmI0NkplYVlNYzA3UmhDVzBBWmRJTnoxejRlWVJjdWExU3pCVmJRaktfcFFBUXZyMWgxWHZCZmtYYjNEdHpMU1JzOGVwdlQtQWZtQmVNeXhvZUxGNk5PZExPS0JuSlQ3UkM5NWNOeEhRX2p6dw?oc=5",
          "date": "11-11 04:22"
        },
        {
          "title": "Cocoa Prices Push Higher on Short Covering - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxPUTlkc3V3b1lJOU9VeGpfZ29XYnEtOWhRMUg3Y0Q4MU5QY0dESl91aC1WWEFVTzFaYlRZbmN4QXJkOTlfT2VHY2JtSnYxVHB2Sk5hR3FnalJXMTZqQm56YlE5VHkxank0VE9uZ0xaaDB0SFlOdWx4M0J0UkRpRWJEQ3J0dXBSQkdyZ0g1dmZraw?oc=5",
          "date": "11-12 04:21"
        },
        {
          "title": "Cocoa price rallies amid strong buyer dominance and overbought signals - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNR1ZEZmFxTWpQMGY2UUU2SU15eW04SXhHTzBhWWlNZUFMY3dGM1VxS2hZc1dwZUd1LVFIaG1Oa05iRDd4LXBpWDJUX21lSDItLU1uR1BRZnhOcGxJb1VfMGxWalRfUWtFNm9jdUVuWTU4M0doa1B0Q0NZQUFDbFR1UU5wcHg5VEVTeEwzc1FFVVhBcU12?oc=5",
          "date": "11-11 23:08"
        }
      ],
      "newsKr": [
        {
          "title": "강한 매수 우위와 과매수 신호 속 코코아 가격 급등 - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPVzAxTURMeXltcDV4YnJXa0d1V1dfSTcwWEtmRE14THhVZEZTSHZkajZ6MEIxMUlBemg1NlRoc1V6a1pVeVV0TDAwLVNYdVVSMElGTmtNeDYyd1R0Y1ktOFNiWFBIVFo0VENtaHZTY3BJclpiMHQ3dGF1WC1oVktscVhDdllzLXdRajRCbWY2RW9LVTk2b0E4Vg?oc=5",
          "date": "11-11 23:08"
        },
        {
          "title": "MXV 지수가 계속 하락하면서 구리와 코코아 가격도 떨어지고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxQT193VW1jRE9wOUhVQ21Ha2VlbWhlX0ZjR241b3NRblZocWE4bHB6RTlUeXdEaXV3V0R2UFI0SXoyQTBUS0kzc0JoNUxKMDVFRnhQZ3pOeHpNY2RtNjFueURwOXQyR2swVXA0TmVZbUFuVWFVTFNlTktDZjI3eU9IelFwYw?oc=5",
          "date": "11-11 17:27"
        },
        {
          "title": "상품 시장: MXV 지수가 9거래일 연속 하락하며 2,700포인트 선을 하향 돌파했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNRkZPc2pZYi1VVGpyWUNlR25hNVZVdkRhdEtsV21BUGw2ejM1OEFhZ2UweWtYYW9JMG9POFZjQ3Vmcng1eW9GUzJMZ016eTBITVdfNEktaVBCWU1RelZmcjFfcVJ4V2lUZkFIVDNQdktOTDUzWXVJaXlTUmpyZ1RRSGtfUjUxWVY5QjlyR3lsSHFJZFN2MHBTSmNMdTdINzdVc1dV?oc=5",
          "date": "11-11 16:04"
        },
        {
          "title": "오늘 농산물 11월 12일: 커피 가격 하락세 지속 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNNlctY291STlrbHpKVnZhYmJsTzJrYnMyeGgwWmkwRXlaS2diLXRFb1ZUdnYyMTF6TnhMNnpPV2xTOXFGa2pCU2VPb2VHV0RlSC1McDJjOEhwTTBlcDNjSmN0VUpESmZwM0F6X1psVWxGcmdBSGhjYTdfRzFpc0JkcjlfZUpPTklnaU5oNU00VGNxUzd2Zks1Zg?oc=5",
          "date": "11-12 18:09"
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
      "price": 6186.16,
      "change": 255.74,
      "changePercent": 4.31,
      "high52w": 9225.23,
      "low52w": 5350.61,
      "high24h": 6212.62,
      "low24h": 5879.72,
      "high7d": 6186.16,
      "low7d": 5930.43,
      "high1m": 6969.91,
      "low1m": 5930.43,
      "volume": 0,
      "sparkline": [
        6167.42,
        6110.1,
        6172.94,
        6031.84,
        5983.34,
        5930.43,
        6186.16
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 6149.04
          },
          {
            "time": "11:00",
            "price": 6161.42
          },
          {
            "time": "13:00",
            "price": 6173.79
          },
          {
            "time": "17:57",
            "price": 6186.16
          }
        ],
        "7D": [
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
            "price": 6186.16
          }
        ],
        "1M": [
          {
            "date": "10-13",
            "price": 6452.92
          },
          {
            "date": "10-14",
            "price": 6570.87
          },
          {
            "date": "10-15",
            "price": 6499.22
          },
          {
            "date": "10-16",
            "price": 6737.32
          },
          {
            "date": "10-19",
            "price": 6959.99
          },
          {
            "date": "10-20",
            "price": 6862.98
          },
          {
            "date": "10-21",
            "price": 6969.91
          },
          {
            "date": "10-22",
            "price": 6888.34
          },
          {
            "date": "10-23",
            "price": 6778.1
          },
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
            "price": 6186.16
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
            "price": 6186.16
          }
        ]
      },
      "newsEn": [
        {
          "title": "Tightness in ICE Inventories Lifts Arabica Coffee Prices - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQU1UzMmx3aXFUUUwwYUgxancxX3YtQU9fZnNaS0JjSTg3dzJmUW0wem9BbGVXd19Lbk1WY0J1NklDZkpUSm80UUI1YVJrNGZ6ZHNJWWNNQXUzZU5UT1Z4SzdJWlZzcVQzTjRRdDZuODdYbVJWd2NoLVpiWHZPS3pXSEhSbnQxWWNqa2Q3Y2hpamRCeDlqclFQN3J4UktLRmxLclE?oc=5",
          "date": "11-13 04:19"
        },
        {
          "title": "Arabica coffee prices fall to four-month low on improving Brazilian supply outlook - Global Coffee Report",
          "source": "Global Coffee Report",
          "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNYXFoek9ZWklBa0lRWnc4QkRfV0hGbjc3OXMzd0dzVFdyam1YZXlEc3VBTGx0NlhsNlM3OGpjMjUxSXJlSmV4NmtwSEJ6al9hSFVlaWozQUFCZ2dCR1FfSHRGSENCZXVEbnMzcGRRSDRsbnJzOEswdVM2UnNheldKMWNSWnJCLTVXNEpOamdOWnBoVEI3U2xFLUFVdnU0WHFqNGFZUXZFalBaZw?oc=5",
          "date": "11-12 13:25"
        },
        {
          "title": "ICO reports contrasting Arabica and Robusta performances in October - Tea & Coffee Trade Journal",
          "source": "Tea & Coffee Trade Journal",
          "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOYTFyb2I3ZEZRdFU1OG1KNjlXbDk4dHZmdFBHQWM5eTV5TW1sVXhtOTljaE1GLXBJcG96LXVFQ2lTbjJJMW9VdGZfRlJGU005LXM0UGNkOV9HM0hLTmRma0tLLU1aWG90SU9pb0dOMFY5Q3M4dF9EZjZBQ09GajJ1ME1uc09DS3JFeUJobGFPWTBBM3BPdUE4STV2aUhBYlN0ZlNDV3paYWlsdnRJ?oc=5",
          "date": "11-12 19:06"
        },
        {
          "title": "Coffee prices today, November 13th: Robusta slightly lower, Arabica continues to face pressure. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOTDFFZUhtdS1GQTNXSWtVQTdmd09HV0kxSnVaaDF4UmVHUEZCeXhnQ05va0JhLVhzRC1ESVNzaklRY0dUMFJGQ091OUZqaUpydWFFLW1XVjNZWXoydzBjb01zVlI5ZHdFaWZmUUdnbGl3TG1aTU80WTNqd2RCcjF6RTBSemUxTWFVdkJPRmM3T283X1BYMjgzSlMzT1o?oc=5",
          "date": "11-13 11:44"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(11월 13일) 커피 가격: 로부스타는 소폭 하락했고, 아라비카는 계속해서 하락 압력을 받고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxNRHFZWHhreC01ZGZtX3ZtcXM0MTN6UGRGQmdZU0hSM2F0STQzTWh6TkxOWTJBOW1nM1gtLW5qdEMzUWJ6ZXp6YlhoV3l1UWpVOTVTVDRydzdvZmFZb3l3Z1l5ZG9Temc1ZFlVbGFDNUZIU2trMHh6Z1JyZTZndFNoMFNSZ0ZPUzU0VWJZMHdQbWpjTXVpb3F1ZWxDajI?oc=5",
          "date": "11-13 09:30"
        },
        {
          "title": "2026년 11월 12일 오늘 커피 가격: 국내 가격이 kg당 85,000 VND 아래로 떨어졌습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNUEFXSEFyejJZcW0tUTIxY291eUFOX0E2d3l3RGNmVy16WFhmTVpMS0ZBWVpTNWU4YURNR0loMzkxOExrVFRyaFUzUmdiREFqNmtpdERvdHNlZ2dLUXlDU0wxU2dZNUJUUWNlcjJtdENtWTVJOXNyLThFaU1qa01XWDRHWk9QVktZdlFYOHl1NkxtaG8?oc=5",
          "date": "11-13 12:53"
        },
        {
          "title": "2026년 11월 13일 오늘 커피 가격: 국내 시장은 두 국제 거래소의 결과를 기다리고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQYWRfSUVURk9FekpaT2hJUllPN1hUZWd6a1duLWZLS2MzLUVuSGdtZnc4QUdOQ3RDSF8wYmp5NGxkWVZZR2ZLYlFDbEtHbkVMZl9xRndGV3F5bXFVVmRJOTdWMHI0RzZDXzlXbFhkNlRxS2NHc0dYS29oV1JxQXpuZDl5ZU5TOWlUZjRLT3NyN0FsYk9zMHc?oc=5",
          "date": "11-13 10:19"
        },
        {
          "title": "오늘 농산물 가격(11월 13일): 커피 가격은 계속 하락하여 현재 지아라이 지역에서 kg당 83,700 VND에 거래되고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNZW1nU2tneTBQdnlBRndndkE4VHo0S3d5em1TVUxjYnVTU2szT3pUUzBOd0lrWkxMYy1jdlA0c3RZQW5oMjF4OWtPdFF2UjYybHBRbTRvSkFPZWFYQ2xFSnlqV1lpODVKVzM1dUxGMGhXRWUxRnVBWXZkWTN2S0hOVThDS3BQZno0ZEV5NDAweVlYSmpFYkpBSUg5QmVwRmR1dmo3QlBiSXlsZnM?oc=5",
          "date": "11-13 14:51"
        }
      ],
      "original_price_lb": 280.6
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
      "price": 3207.0,
      "change": -38.0,
      "changePercent": -1.17,
      "high52w": 3530.0,
      "low52w": 3113.0,
      "high24h": 3250.0,
      "low24h": 3184.0,
      "high7d": 3270.0,
      "low7d": 3207.0,
      "high1m": 3484.0,
      "low1m": 3176.0,
      "volume": 12850,
      "sparkline": [
        3228.0,
        3241.0,
        3270.0,
        3267.0,
        3250.0,
        3245.0,
        3207.0
      ],
      "history": {
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "10-13",
            "price": 3459.0
          },
          {
            "date": "10-14",
            "price": 3483.0
          },
          {
            "date": "10-15",
            "price": 3375.0
          },
          {
            "date": "10-16",
            "price": 3414.0
          },
          {
            "date": "10-19",
            "price": 3484.0
          },
          {
            "date": "10-20",
            "price": 3410.0
          },
          {
            "date": "10-21",
            "price": 3352.0
          },
          {
            "date": "10-22",
            "price": 3288.0
          },
          {
            "date": "10-23",
            "price": 3228.0
          },
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
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 3187.76
          },
          {
            "time": "11:00",
            "price": 3194.17
          },
          {
            "time": "13:00",
            "price": 3200.59
          },
          {
            "time": "17:57",
            "price": 3207.0
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
          "title": "ICO reports contrasting Arabica and Robusta performances in October - Tea & Coffee Trade Journal",
          "source": "Tea & Coffee Trade Journal",
          "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOYTFyb2I3ZEZRdFU1OG1KNjlXbDk4dHZmdFBHQWM5eTV5TW1sVXhtOTljaE1GLXBJcG96LXVFQ2lTbjJJMW9VdGZfRlJGU005LXM0UGNkOV9HM0hLTmRma0tLLU1aWG90SU9pb0dOMFY5Q3M4dF9EZjZBQ09GajJ1ME1uc09DS3JFeUJobGFPWTBBM3BPdUE4STV2aUhBYlN0ZlNDV3paYWlsdnRJ?oc=5",
          "date": "11-12 19:06"
        },
        {
          "title": "Coffee Prices Slide as the Brazilian Real Weakens and Supplies Build - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNUzk2bFlHNUJDTmEta1h2NG9sWTZvbVgzYWQ2bUpGdUd2dWNYN1VpV2ZURUVpanRfREg1OGJVVlRJWEEwaHlhTzVvZEhlWl8temMzTjhOVXB4d2x0VzYyNHpUYk5xZW9uSUFKbUpUNHRLcmo3N0wyc3h5d2lCalN6MUczM0t2NEhHbFdGUVhvN2M2WUhyRVpOd0V1elZVVVBWNVJZczFHNmFlZVBwakRxM3B4Rzg5N1ctZEwwbWJIUUtRaDNO?oc=5",
          "date": "11-11 04:22"
        },
        {
          "title": "Coffee prices today, November 13th: Mixed trends, robusta hits a 1.5-week low. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxPRlRKdHJUUlE1QXBEYVNLRHBpeEJlenc0YkFhOHhMMW00RGtCOUZ0X2VrOTU2SEZ5U1NodHNmTHJtVVptek9YdURkeWpJTS0zd3RBWkVMVVZZTnFMeFQ1TFh4T1A5dnFKcTRHR1ljQXUxT1d0dWwwMUZmZWI1OUJMTXZBTDkxTFZZNncyM095TlpxT0o4ekQwWmppdlhRQQ?oc=5",
          "date": "11-13 09:49"
        },
        {
          "title": "Tightness in ICE Inventories Lifts Arabica Coffee Prices - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQU1UzMmx3aXFUUUwwYUgxancxX3YtQU9fZnNaS0JjSTg3dzJmUW0wem9BbGVXd19Lbk1WY0J1NklDZkpUSm80UUI1YVJrNGZ6ZHNJWWNNQXUzZU5UT1Z4SzdJWlZzcVQzTjRRdDZuODdYbVJWd2NoLVpiWHZPS3pXSEhSbnQxWWNqa2Q3Y2hpamRCeDlqclFQN3J4UktLRmxLclE?oc=5",
          "date": "11-13 04:19"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(11월 13일) 커피 가격: 로부스타는 소폭 하락했고, 아라비카는 계속해서 하락 압력을 받고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxNRHFZWHhreC01ZGZtX3ZtcXM0MTN6UGRGQmdZU0hSM2F0STQzTWh6TkxOWTJBOW1nM1gtLW5qdEMzUWJ6ZXp6YlhoV3l1UWpVOTVTVDRydzdvZmFZb3l3Z1l5ZG9Temc1ZFlVbGFDNUZIU2trMHh6Z1JyZTZndFNoMFNSZ0ZPUzU0VWJZMHdQbWpjTXVpb3F1ZWxDajI?oc=5",
          "date": "11-13 09:30"
        },
        {
          "title": "2026년 11월 12일 오늘 커피 가격: 국내 가격이 kg당 85,000 VND 아래로 떨어졌습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNUEFXSEFyejJZcW0tUTIxY291eUFOX0E2d3l3RGNmVy16WFhmTVpMS0ZBWVpTNWU4YURNR0loMzkxOExrVFRyaFUzUmdiREFqNmtpdERvdHNlZ2dLUXlDU0wxU2dZNUJUUWNlcjJtdENtWTVJOXNyLThFaU1qa01XWDRHWk9QVktZdlFYOHl1NkxtaG8?oc=5",
          "date": "11-13 12:53"
        },
        {
          "title": "오늘 농산물 가격(11월 13일): 커피 가격은 계속 하락하여 현재 지아라이 지역에서 kg당 83,700 VND에 거래되고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNZW1nU2tneTBQdnlBRndndkE4VHo0S3d5em1TVUxjYnVTU2szT3pUUzBOd0lrWkxMYy1jdlA0c3RZQW5oMjF4OWtPdFF2UjYybHBRbTRvSkFPZWFYQ2xFSnlqV1lpODVKVzM1dUxGMGhXRWUxRnVBWXZkWTN2S0hOVThDS3BQZno0ZEV5NDAweVlYSmpFYkpBSUg5QmVwRmR1dmo3QlBiSXlsZnM?oc=5",
          "date": "11-13 14:51"
        },
        {
          "title": "2026년 11월 13일 오늘 커피 가격: 국내 시장은 두 국제 거래소의 결과를 기다리고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQYWRfSUVURk9FekpaT2hJUllPN1hUZWd6a1duLWZLS2MzLUVuSGdtZnc4QUdOQ3RDSF8wYmp5NGxkWVZZR2ZLYlFDbEtHbkVMZl9xRndGV3F5bXFVVmRJOTdWMHI0RzZDXzlXbFhkNlRxS2NHc0dYS29oV1JxQXpuZDl5ZU5TOWlUZjRLT3NyN0FsYk9zMHc?oc=5",
          "date": "11-13 10:19"
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
      "price": 4166.0,
      "change": 112.72,
      "changePercent": 3.0,
      "high52w": 4166.0,
      "low52w": 3407.56,
      "high24h": 4166.0,
      "low24h": 4166.0,
      "high7d": 4166.0,
      "low7d": 3886.19,
      "high1m": 4166.0,
      "low1m": 3843.07,
      "volume": 39806,
      "sparkline": [
        3778.0,
        3871.1,
        3864.63,
        3843.07,
        3886.19,
        4053.28,
        4166.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-20 (Event 414)",
            "price": 4053.28
          },
          {
            "time": "2026-11-03 (Event 415)",
            "price": 4166.0
          }
        ],
        "7D": [
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
            "price": 4166.0
          }
        ],
        "1M": [
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
            "price": 4166.0
          }
        ],
        "1Y": [
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
            "price": 4166.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Cash Cheese Barrels Slip While Butter, Nonfat Dry Milk, Class III Futures, And Global Dairy Trade Index Rally - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPQmg3OUhhRGk0NU1ITVp5UEs3S09seTgtSUZrSnNYSWxfSDZDS3FEeHhzbVoyRnFOVUQxR1A4OWxjb2hsTGFfOC1GYnlkWm9Ybm5nbHVuWTFvdkJNNXBMeVNBYk05eUhhWHhBeE92ZFk1Si1wa2lBRkZXRUtIeTBfR0FiS2xmeGNuaUprMkNvMzFQN1ktZzE2R0tfWjYtWmhaX1hQMlBnYlc5M1RKWnRJcnFUdVJ3dVN2dDNsS250SHo3TDN5LUIyaHBGVWVhdw?oc=5",
          "date": "11-12 19:56"
        },
        {
          "title": "Global Dairy Trade index rises 9.4% as CME barrel cheese prices fall - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOT3FpeGlsTldvNmlHOGdKSHlNREh4SDhwc0NaR0NZdm5WLXJ3aUE2bHBIUDBJNkVTVkdIa3dJVkpzZTBfd1J6clEtRS1VcGZWWWJkNlNBR2RmbWhHbTJCQ1hvbU51UTRmQUlOM2dWQzd5Vl8zWF9qZk95a09Gd2JWZnk5Y0czTldHNjBqZEttWTk5My1YTlhfLWkxaUFxQkRfWDd2MmktN2ZvRXpNaFE?oc=5",
          "date": "11-12 21:26"
        },
        {
          "title": "Skimmed Milk Powder Market To 2035: Demand Accelerates on Protein-Enriched Food Trends - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQbklIXzZDZDVYeVFqbVQ0UGpIN0thSGV4Njhra2MzcGx3VndJdjdKSTlWelZnVm82enNHbnhZNUh1ZUxyZkZlN0JDSF9FX1I4cXBTU0pfV0J1OVRrYmk4ZHoxZ3BHVnprNEl4SkRwdjVZb3p0VWZFaUhLamtkalBWMTlibzA5WVNOcF8wR08yTGo4ajFoQldWeVZPS3dIUGJ1aVg0RVpGUTJLQnlPTlVsUDRNbkVkU2lOVU5z?oc=5",
          "date": "11-13 06:41"
        },
        {
          "title": "New Zealand Shares Flat; Auckland International Airport Says Emergency Services Staff to Hold Strike Action - Yahoo Finance Australia",
          "source": "Yahoo Finance Australia",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOMEx5azlzNlBDaEs5VzJkY2lyVFJaOG15Rm92Y19MNVR5aHRJdXJNWlU1dVBhZGJQUGswNk5vckhQWkV4VE1fLWRJN1diOFRqS1NUdk5BMEJ5M3djRU9KM1RHVDZXdWkzc1RERHg0dWxRMURRc2lzdWdHSmlwU0xIcldjLTdIVk1JTUFJVXRhOTlvXzhRVUE?oc=5",
          "date": "11-11 14:38"
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
      "price": 3971.0,
      "change": 211.0,
      "changePercent": 5.61,
      "high52w": 3971.0,
      "low52w": 3161.0,
      "high24h": 3971.0,
      "low24h": 3971.0,
      "high7d": 3971.0,
      "low7d": 3605.0,
      "high1m": 3971.0,
      "low1m": 3565.0,
      "volume": 28500,
      "sparkline": [
        3483.0,
        3591.0,
        3585.0,
        3565.0,
        3605.0,
        3760.0,
        3971.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-20 (Event 414)",
            "price": 3760.0
          },
          {
            "time": "2026-11-03 (Event 415)",
            "price": 3971.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Cash Cheese Barrels Slip While Butter, Nonfat Dry Milk, Class III Futures, And Global Dairy Trade Index Rally - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPQmg3OUhhRGk0NU1ITVp5UEs3S09seTgtSUZrSnNYSWxfSDZDS3FEeHhzbVoyRnFOVUQxR1A4OWxjb2hsTGFfOC1GYnlkWm9Ybm5nbHVuWTFvdkJNNXBMeVNBYk05eUhhWHhBeE92ZFk1Si1wa2lBRkZXRUtIeTBfR0FiS2xmeGNuaUprMkNvMzFQN1ktZzE2R0tfWjYtWmhaX1hQMlBnYlc5M1RKWnRJcnFUdVJ3dVN2dDNsS250SHo3TDN5LUIyaHBGVWVhdw?oc=5",
          "date": "11-12 19:56"
        },
        {
          "title": "Global Dairy Trade index rises 9.4% as CME barrel cheese prices fall - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOT3FpeGlsTldvNmlHOGdKSHlNREh4SDhwc0NaR0NZdm5WLXJ3aUE2bHBIUDBJNkVTVkdIa3dJVkpzZTBfd1J6clEtRS1VcGZWWWJkNlNBR2RmbWhHbTJCQ1hvbU51UTRmQUlOM2dWQzd5Vl8zWF9qZk95a09Gd2JWZnk5Y0czTldHNjBqZEttWTk5My1YTlhfLWkxaUFxQkRfWDd2MmktN2ZvRXpNaFE?oc=5",
          "date": "11-12 21:26"
        },
        {
          "title": "Skimmed Milk Powder Market To 2035: Demand Accelerates on Protein-Enriched Food Trends - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQbklIXzZDZDVYeVFqbVQ0UGpIN0thSGV4Njhra2MzcGx3VndJdjdKSTlWelZnVm82enNHbnhZNUh1ZUxyZkZlN0JDSF9FX1I4cXBTU0pfV0J1OVRrYmk4ZHoxZ3BHVnprNEl4SkRwdjVZb3p0VWZFaUhLamtkalBWMTlibzA5WVNOcF8wR08yTGo4ajFoQldWeVZPS3dIUGJ1aVg0RVpGUTJLQnlPTlVsUDRNbkVkU2lOVU5z?oc=5",
          "date": "11-13 06:41"
        },
        {
          "title": "Fonterra Targets “perfect Bucket Of Milk” To Maximize Shareholder Returns As Global Dairy Demand Shifts From Liquid To Functional Foods - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxQUGt1QzdXVUJtd2kwTnRHdDdvRHlmbm9PUU42QWgyODJCWXlwMW43WG5IQUNuYmNIVTZuT1djaFJwZkNISXhKTXR1OVhsUXQ4SEFzMEN4S3FRUDBjbzlNNG1PU2FtTEF3dnFUcjk5QTVGdUxMVHJfcUEtRDdzSGhaSWItbGx5Q0hSTmNsa00xRWI5cElBdDNNb3dCR1pkM2hKNmg0LW0zc2tjUGlPc2VXYVlVb0NIRHZsaEFXU0pxV0JQWlZMcnJ4SVR3b1RrSDZZUjBNSEFJUnVyN1c0VWw4ZDZRc2ZiVDZEVGJjUGZ0TTBnQQ?oc=5",
          "date": "11-13 07:30"
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
      "price": 4109.0,
      "change": 134.0,
      "changePercent": 3.37,
      "high52w": 4109.0,
      "low52w": 2431.0,
      "high24h": 4109.0,
      "low24h": 4109.0,
      "high7d": 4109.0,
      "low7d": 3847.0,
      "high1m": 4109.0,
      "low1m": 3502.0,
      "volume": 18200,
      "sparkline": [
        3261.0,
        3502.0,
        3695.0,
        3689.0,
        3847.0,
        3975.0,
        4109.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-20 (Event 414)",
            "price": 3975.0
          },
          {
            "time": "2026-11-03 (Event 415)",
            "price": 4109.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Skimmed Milk Powder Market To 2035: Demand Accelerates on Protein-Enriched Food Trends - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQbklIXzZDZDVYeVFqbVQ0UGpIN0thSGV4Njhra2MzcGx3VndJdjdKSTlWelZnVm82enNHbnhZNUh1ZUxyZkZlN0JDSF9FX1I4cXBTU0pfV0J1OVRrYmk4ZHoxZ3BHVnprNEl4SkRwdjVZb3p0VWZFaUhLamtkalBWMTlibzA5WVNOcF8wR08yTGo4ajFoQldWeVZPS3dIUGJ1aVg0RVpGUTJLQnlPTlVsUDRNbkVkU2lOVU5z?oc=5",
          "date": "11-13 06:41"
        },
        {
          "title": "Cash Cheese Barrels Slip While Butter, Nonfat Dry Milk, Class III Futures, And Global Dairy Trade Index Rally - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPQmg3OUhhRGk0NU1ITVp5UEs3S09seTgtSUZrSnNYSWxfSDZDS3FEeHhzbVoyRnFOVUQxR1A4OWxjb2hsTGFfOC1GYnlkWm9Ybm5nbHVuWTFvdkJNNXBMeVNBYk05eUhhWHhBeE92ZFk1Si1wa2lBRkZXRUtIeTBfR0FiS2xmeGNuaUprMkNvMzFQN1ktZzE2R0tfWjYtWmhaX1hQMlBnYlc5M1RKWnRJcnFUdVJ3dVN2dDNsS250SHo3TDN5LUIyaHBGVWVhdw?oc=5",
          "date": "11-12 19:56"
        },
        {
          "title": "Global Dairy Trade index rises 9.4% as CME barrel cheese prices fall - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOT3FpeGlsTldvNmlHOGdKSHlNREh4SDhwc0NaR0NZdm5WLXJ3aUE2bHBIUDBJNkVTVkdIa3dJVkpzZTBfd1J6clEtRS1VcGZWWWJkNlNBR2RmbWhHbTJCQ1hvbU51UTRmQUlOM2dWQzd5Vl8zWF9qZk95a09Gd2JWZnk5Y0czTldHNjBqZEttWTk5My1YTlhfLWkxaUFxQkRfWDd2MmktN2ZvRXpNaFE?oc=5",
          "date": "11-12 21:26"
        },
        {
          "title": "EU Butter Market Softens as SMP Firms – November 2026 Outlook - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQMFd0emY1eHVPcWlnZnlSNjBSdGtXX202aVFKTUd3MUFNR21XSlF0VXBxSWFxRmdubmpYc094a3VFS09fM2FqMVpPb3BnZU1peXJOdWh1SUxTYnZacG9iNWNMV1B6aUFkUjRTYXhKaUcxWEF6anZ1cm0zdGprZjNyenR4MTVCQm5jTWZlaGZSS1ozU21oaGI0U2RB?oc=5",
          "date": "11-12 17:29"
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
      "price": 4503.0,
      "change": -218.0,
      "changePercent": -4.62,
      "high52w": 6868.0,
      "low52w": 4503.0,
      "high24h": 4503.0,
      "low24h": 4503.0,
      "high7d": 4740.0,
      "low7d": 4503.0,
      "high1m": 5090.0,
      "low1m": 4503.0,
      "volume": 14300,
      "sparkline": [
        5225.0,
        5090.0,
        5028.0,
        4760.0,
        4740.0,
        4721.0,
        4503.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-20 (Event 414)",
            "price": 4721.0
          },
          {
            "time": "2026-11-03 (Event 415)",
            "price": 4503.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Cash Cheese Barrels Slip While Butter, Nonfat Dry Milk, Class III Futures, And Global Dairy Trade Index Rally - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPQmg3OUhhRGk0NU1ITVp5UEs3S09seTgtSUZrSnNYSWxfSDZDS3FEeHhzbVoyRnFOVUQxR1A4OWxjb2hsTGFfOC1GYnlkWm9Ybm5nbHVuWTFvdkJNNXBMeVNBYk05eUhhWHhBeE92ZFk1Si1wa2lBRkZXRUtIeTBfR0FiS2xmeGNuaUprMkNvMzFQN1ktZzE2R0tfWjYtWmhaX1hQMlBnYlc5M1RKWnRJcnFUdVJ3dVN2dDNsS250SHo3TDN5LUIyaHBGVWVhdw?oc=5",
          "date": "11-12 19:56"
        },
        {
          "title": "Cheese blocks, butter lead drops Thursday at CME - Brownfield Ag News",
          "source": "Brownfield Ag News",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNOXViT3NEN0lPaHhKSzZTSzRGSmQzYVBvY2V5OU5fN0FLYkxQd0JwNlpySU5lSzVDYnpHdkVXbFJUb3I5UHZDdV9paEhiZS1NTXZ0UVpMYjNDbUdnckU0NEVDTDN3UUJHLUhaUWE3U3I2NjU5Ym1GWm9tejB6TjdYUUJTNEtTcmxLenc?oc=5",
          "date": "11-13 04:51"
        },
        {
          "title": "Global Dairy Trade index rises 9.4% as CME barrel cheese prices fall - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOT3FpeGlsTldvNmlHOGdKSHlNREh4SDhwc0NaR0NZdm5WLXJ3aUE2bHBIUDBJNkVTVkdIa3dJVkpzZTBfd1J6clEtRS1VcGZWWWJkNlNBR2RmbWhHbTJCQ1hvbU51UTRmQUlOM2dWQzd5Vl8zWF9qZk95a09Gd2JWZnk5Y0czTldHNjBqZEttWTk5My1YTlhfLWkxaUFxQkRfWDd2MmktN2ZvRXpNaFE?oc=5",
          "date": "11-12 21:26"
        },
        {
          "title": "Cacao Butter Market Forecast to 2035, Driven by Premium Chocolate Demand and Clean-Label Cosmetics Growth - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMizwFBVV95cUxQLVgyS3pGZm9SOF8zbXQxb2xBSWNaSnE2Mk1xS0YzWnFERkdnWGZKRk1DekV0TFJRNGJtMHJyVEJYblhyeHpNNDlzTVU5RklRdU1pa3pYM1Y2elVuQnJoeFNRa00tWE45UlJPSERaajhhOC1RZDF4a05UektKX0xMRDFSVUNldFY0MHRoLWdrcV9QNWZGVDJ1TS11eXVJQTlGcWVIYWJuUkRiQ25TeThGRzhKeWszMGdvM0RHeVZsQmk1aE5faHFBSTNRVXU5VkU?oc=5",
          "date": "11-13 04:46"
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
      "price": 1104.25,
      "change": 4.0,
      "changePercent": 0.36,
      "high52w": 1244.25,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1117.5,
      "low7d": 1075.0,
      "high1m": 1154.5,
      "low1m": 1075.0,
      "volume": 10,
      "sparkline": [
        1117.5,
        1098.25,
        1075.0,
        1075.0,
        1076.5,
        1100.25,
        1104.25
      ],
      "history": {
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "10-13",
            "price": 1149.75
          },
          {
            "date": "10-14",
            "price": 1153.5
          },
          {
            "date": "10-15",
            "price": 1142.25
          },
          {
            "date": "10-16",
            "price": 1147.25
          },
          {
            "date": "10-19",
            "price": 1147.25
          },
          {
            "date": "10-20",
            "price": 1152.25
          },
          {
            "date": "10-21",
            "price": 1148.0
          },
          {
            "date": "10-22",
            "price": 1150.0
          },
          {
            "date": "10-23",
            "price": 1151.5
          },
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
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1097.62
          },
          {
            "time": "11:00",
            "price": 1099.83
          },
          {
            "time": "13:00",
            "price": 1102.04
          },
          {
            "time": "17:57",
            "price": 1104.25
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
            "price": 1104.25
          }
        ]
      },
      "newsEn": [
        {
          "title": "Palm Oil Market Update: CPO Futures Ease, Curve Flattens Mid-November 2026 - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPRjZHTk1rUjJuSlBIRmRkekcwU19hYkpsWGF4QlVLT01aSDJwcGlNb0dCVTY0YkpIV0hndnpDR1M2S250R282bTNiekl5aTdvNVlBZFJDelA2ekJDdnhuU2hzSW9DVzJQWXhZR3NWMURxMl80Ylhfd0NPVE1KMW02YVJ5MjFmckN1VGdlRXFBLUMwTXZEbjhNY2pBZVFIVFpyR1Y3OA?oc=5",
          "date": "11-13 16:45"
        },
        {
          "title": "Global edible oil prices decline amid falling crude oil prices and rising stocks - UkrAgroConsult",
          "source": "UkrAgroConsult",
          "link": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQRFR5NkxWY3JRS2hKbmo0djV3T0hJaFVhNl9MakREdkxxVEF4bFROSDNVNkwxR18tU2hyT3Y0OVJwWXRwMy1DanJybmg5WnliUUJIR24tLUZBTlRyRUppdTFlR3VDQV9FaUE5QV9fb25uYnFkMFdiSlpvN1NYMk9ES2dERG9uUjVTVXJwM3ZWdW85OEFNZ2JWRlJlQU9KaWdQZEtlQmJTYkpjX01QNlhxUHk0Z3JzUzQ?oc=5",
          "date": "11-12 19:22"
        },
        {
          "title": "Palm Oil Market: High Stocks, India’s Import Shifts and Volatile Outlook - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOY09RQW1vN1QzQUZ5NFI2cmIta1UtamtITF84LXNGQU9aNi1ta2xacEFRdEJjNXdvdzZUby12UnZ3TEVtMXpyNDNxb3pfODBQNnN1MTFxSXV0NDhrX2h1ZWJUWXg2UmxMODM1b2RjVUdXQ2hXYWZMOW8yNHo1M2J4WDdCNjdreFdkcndRMkdTZUpvVmlRckUwNnlhOWdhQkRJWlJPekM5YUhZdTA5WTRB?oc=5",
          "date": "11-13 14:39"
        },
        {
          "title": "Palm oil prices rise 3.5% amid stronger soybean oil market and growing stocks - UkrAgroConsult",
          "source": "UkrAgroConsult",
          "link": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOODRTRHY1Qk8xODFxWmphd0FDZmRFTXJ3RUh1czduTTRJRDZfN2FidVo0eG5CT2pVZGZSMV9jTFBGSjRTQWlJcm9weDE5azIzY2h4NUtRMmtCUGEyNnJ5WGZrWDB2RzZZUVE2S1V6cFRDZWpncDgtNDZOa0drT0lEMExwTmUtMVB2N0JTcG5fb1lvRHJsQkZ6eTE1eGFzUFk1SzQ0bk5LM1ZaZXFRMEoybDl3?oc=5",
          "date": "11-11 23:41"
        }
      ],
      "newsKr": [
        {
          "title": "농심, 3분기 매출 6.7% 늘어 9296억…해외 법인·수출이 끌었다 - 매일경제",
          "source": "매일경제",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTFBGQUp4ZWx5MXdzTEZ6Uk5tWHA3NFJ3WWlRR2ZaUkFJY2d3WHktUkJyU3hqRjlOWWFGZUNieXJmVXl1R2VYcGRER2w2UmZUX0xBeUhYYnR3?oc=5",
          "date": "11-13 14:39"
        },
        {
          "title": "원자재 거래 역사 속 7가지 사건, 가격보다 먼저 확인할 거래 규칙 - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE1iUUpYYzNDbjltOTV5UUtpajl3S3BXOFZ3cXJUejBnS2ZZS1hpUWR1SnI4OTdtNHduRWt5MmxadEVHdlJpQnBLV0NGaGZXU19fSEE?oc=5",
          "date": "11-12 18:20"
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
            "date": "11-07",
            "price": 1930.0
          },
          {
            "date": "11-08",
            "price": 1931.93
          },
          {
            "date": "11-09",
            "price": 1933.86
          },
          {
            "date": "11-10",
            "price": 1935.79
          },
          {
            "date": "11-11",
            "price": 1937.72
          },
          {
            "date": "11-12",
            "price": 1939.65
          },
          {
            "date": "11-13",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "10-15",
            "price": 1930.0
          },
          {
            "date": "10-16",
            "price": 1930.96
          },
          {
            "date": "10-17",
            "price": 1931.93
          },
          {
            "date": "10-18",
            "price": 1932.9
          },
          {
            "date": "10-19",
            "price": 1933.86
          },
          {
            "date": "10-20",
            "price": 1934.82
          },
          {
            "date": "10-21",
            "price": 1935.79
          },
          {
            "date": "10-22",
            "price": 1936.76
          },
          {
            "date": "10-23",
            "price": 1937.72
          },
          {
            "date": "10-24",
            "price": 1938.68
          },
          {
            "date": "10-25",
            "price": 1939.65
          },
          {
            "date": "10-26",
            "price": 1940.62
          },
          {
            "date": "10-27",
            "price": 1941.58
          },
          {
            "date": "10-28",
            "price": 1942.54
          },
          {
            "date": "10-29",
            "price": 1943.51
          },
          {
            "date": "10-30",
            "price": 1944.48
          },
          {
            "date": "10-31",
            "price": 1945.44
          },
          {
            "date": "11-01",
            "price": 1946.4
          },
          {
            "date": "11-02",
            "price": 1947.37
          },
          {
            "date": "11-03",
            "price": 1948.34
          },
          {
            "date": "11-04",
            "price": 1949.3
          },
          {
            "date": "11-05",
            "price": 1950.26
          },
          {
            "date": "11-06",
            "price": 1951.23
          },
          {
            "date": "11-07",
            "price": 1952.2
          },
          {
            "date": "11-08",
            "price": 1953.16
          },
          {
            "date": "11-09",
            "price": 1954.12
          },
          {
            "date": "11-10",
            "price": 1955.09
          },
          {
            "date": "11-11",
            "price": 1956.06
          },
          {
            "date": "11-12",
            "price": 1957.02
          },
          {
            "date": "11-13",
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
            "time": "17:57",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Lauric Oil Market To 2035: Green Chemistry and Personal Care Drive Forward Growth - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMixgFBVV95cUxQUHVuOTJTMzN0VFA0TzZYZVZnakk3OXFTVzZhYmtKa2JpdTliLW84U3B6VzhxQ0hVcmkyXzlUN2R2SExyWlUtYWVGVjBkMUNOZEZMM0tja181cGtvUk1UMlFwYzhQVEJORVlOQnVadGdBYmRqOHMybnJrVWZrTDFtRVpRV3o4ZFBsMzZkYWxzUG5vWkZWNXRQM1UyWENPcWtGbEMyUU9UejdrRXJlZk14V0g2c1VHOUpxSU9KSG1STko5X0dmVmc?oc=5",
          "date": "11-08 07:36"
        },
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
          "title": "Coconut Oil Prices 2026: Latest Chart, Trends & Forecast - IMARC Group",
          "source": "IMARC Group",
          "link": "https://news.google.com/rss/articles/CBMiY0FVX3lxTE5zUGEyc3ItSUdQTHBOWGMzUkIzYkQwTnU1aDlUTkttbmJRcGhBVDQxODlHdnVHeGhBZXF6QUFMTEtVT1VydllGWkNDMXY2MXgtSEtXSkJmMWs3S3F5d1ZsOTkyMA?oc=5",
          "date": "10-14 16:00"
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
      "price": 1337.24,
      "change": 0.98,
      "changePercent": 0.07,
      "high52w": 1587.7,
      "low52w": 1319.52,
      "high24h": 1338.38,
      "low24h": 1330.08,
      "high7d": 1362.7,
      "low7d": 1336.26,
      "high1m": 1362.7,
      "low1m": 1321.76,
      "volume": 0,
      "sparkline": [
        1340.07,
        1356.34,
        1362.7,
        1343.84,
        1341.91,
        1336.26,
        1337.24
      ],
      "history": {
        "7D": [
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
            "price": 1337.24
          }
        ],
        "1M": [
          {
            "date": "10-12",
            "price": 1334.13
          },
          {
            "date": "10-13",
            "price": 1340.31
          },
          {
            "date": "10-14",
            "price": 1339.35
          },
          {
            "date": "10-15",
            "price": 1340.95
          },
          {
            "date": "10-18",
            "price": 1333.43
          },
          {
            "date": "10-19",
            "price": 1330.0
          },
          {
            "date": "10-20",
            "price": 1323.94
          },
          {
            "date": "10-21",
            "price": 1325.59
          },
          {
            "date": "10-22",
            "price": 1325.99
          },
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
            "price": 1337.24
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1329.22
          },
          {
            "time": "11:00",
            "price": 1331.89
          },
          {
            "time": "13:00",
            "price": 1334.57
          },
          {
            "time": "17:57",
            "price": 1337.24
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
            "price": 1336.26
          },
          {
            "date": "2026-11",
            "price": 1337.24
          }
        ]
      },
      "newsEn": [
        {
          "title": "Asia FX Outlook 2027: Rotation underway but tech currencies should lead - ing think",
          "source": "ing think",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPVzg3NVRiTUw3UEQzdTgxdzktTnFxUTFHbHRaV2tudWl2Z3k5R0FBVGhBS0tvUWVKbjlxYlRiZUxnVTh2eDZ5YVl6SXA1MFFrTWRaZTFOeEtCQ3gxTUl5NEFpQy1vSzhWQzVQT2Z1OTFlaDBUdVFGWU92ODJzSUM4bHhBdkxoVVdURjR6SFhIeVktYW1BUzI3dnBXemJFTWFCd1NSZg?oc=5",
          "date": "11-13 03:08"
        },
        {
          "title": "Asia FX: yen intervention in focus as rate hike bets put dollar near 19-mth high - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMixwFBVV95cUxPM1czMHR3QUtMSXlZM2lmREt2T1pvcjBQTG1ZWHdBaUdrX0l2SmJYU2VreWdXMkNWMkM0Ul9ydG9xMnNkdmh1SlprRnZsVTNSMmVaTGE3ZFRKTjI0NU1ianJhR1RYNDkyaVJlV3NCWGotbW9JY1Z5XzZ0VGctVFluWk9ON3VZaW9fbGsyb3RYV1FZc0VEQ3kwQndxTzRXeWxyVGxadndOMGNicDd5UjJnd0plOEdNZ0lqWWVnbkxCRHpqbG9wWTkw?oc=5",
          "date": "11-13 12:26"
        },
        {
          "title": "USD/KRW technical analysis: Consolidation near ₩1,320 support as momentum stays weak - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMihAFBVV95cUxPNlFQTC0xWkVvNEZBUWszbzdRTjh1dFdQVVpISzNLOHd3NnJKTzdYVXRpdEpUd3h5NDJ2VVU5M2pKcFhMX182dHhNMTNYUVg0RjROcHZRbnF5X29sUE83ZHVhNGJrMjJSemZpNDFmVU5pQl9UNEJpazVqT3RXZVQ1WVRrbDE?oc=5",
          "date": "11-12 15:17"
        },
        {
          "title": "USD/KRW: AI drives reversal towards 1400 – TD Securities - www.tmgm.com",
          "source": "www.tmgm.com",
          "link": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNaFFlbXpCUy11bzVLRFV2QTdfc2hqajBPYlZNLWRTMEhJc3VrNG44T2JLZlVDNkY2elBFa2xSTjdnU0xPTDZRV3RUS3FSSjkxME4xWUZGaUdMOWJvSElmSnVhV094OHYySjZyWlNOU2N3N081bjE1elYzdlhnR0dkcndRVVlWTktLVEZhd1BZT0NkZzNqMVpSN0VOU29GYlB0cXE2TFppd0tSMXR3bVpndjNaZ2Z5MllwYXZucFh3?oc=5",
          "date": "11-11 00:50"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 미국 빅스텝 우려에 금리 급등, 달러 연일 강세 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE4wdktyb2FNQlhPNGhmVHNEOGRrbTVyeC01TUhldmpfOHVpLXpJT05pLS1BdGl0QzZVQ2R2YmFqYURjak1MdGNTRUlLMF91a041N29SRjZYX3JVM2JqaG9MOQ?oc=5",
          "date": "11-13 08:11"
        },
        {
          "title": "유가 상승이 촉발한 강달러 압박⋯\"1340원 터치 시도\" [환율전망] - 이투데이",
          "source": "이투데이",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5POThTZTBYQkZtX080S3ZRR3NwLVZfR3lWeWNpMEpVQzdDdzNyWU5RZ0NjdXdYVnA5TGZqYmhoODZYYUNPMEYwUVNpcEpWZFJnNTl3Mw?oc=5",
          "date": "11-13 08:10"
        },
        {
          "title": "환율 하락폭보다 컸던 원화 절상 압력…'EMP' 뭐길래 | - 연합인포맥스",
          "source": "연합인포맥스",
          "link": "https://news.google.com/rss/articles/CBMidEFVX3lxTE9wQ1A1cEcxQlVhLThlVkNSTU5ROHNYVUlubXVSVFZfOF9WOUltaEo4MC1lS3lpZFFodGUxNkwxTFNNUk1GTjh6aUExeVFTWVZvVmtsbnpFemdWR2JRWm44clVEQnhzdk5WMXgxWXg5MjZnUk5p?oc=5",
          "date": "11-12 10:21"
        },
        {
          "title": "[환율 전망] 반도체 주도의 수출 호황, 여전히 풍부한 달러 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE1LR0Z3LTFQZjFLSng1RmFyckdrY1pIVlZzMjZ5eFQzWm5CVGhMajFlcEpXY3JpX3J3VUJyYjRQVC1HcUI4cXZmZERJUklLeFl6WTlzd05NdjZ2NXJrM0pPWg?oc=5",
          "date": "11-12 08:11"
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
      "price": 1478.4,
      "change": -2.83,
      "changePercent": -0.19,
      "high52w": 1807.42,
      "low52w": 1433.23,
      "high24h": 1479.4,
      "low24h": 1470.9,
      "high7d": 1522.67,
      "low7d": 1478.4,
      "high1m": 1522.67,
      "low1m": 1474.64,
      "volume": 0,
      "sparkline": [
        1505.26,
        1522.67,
        1518.11,
        1504.57,
        1498.01,
        1481.23,
        1478.4
      ],
      "history": {
        "7D": [
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
            "price": 1478.4
          }
        ],
        "1M": [
          {
            "date": "10-12",
            "price": 1488.11
          },
          {
            "date": "10-13",
            "price": 1499.92
          },
          {
            "date": "10-14",
            "price": 1499.15
          },
          {
            "date": "10-15",
            "price": 1501.45
          },
          {
            "date": "10-18",
            "price": 1498.22
          },
          {
            "date": "10-19",
            "price": 1490.66
          },
          {
            "date": "10-20",
            "price": 1485.7
          },
          {
            "date": "10-21",
            "price": 1489.13
          },
          {
            "date": "10-22",
            "price": 1485.48
          },
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
            "price": 1478.4
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1469.53
          },
          {
            "time": "11:00",
            "price": 1472.49
          },
          {
            "time": "13:00",
            "price": 1475.44
          },
          {
            "time": "17:57",
            "price": 1478.4
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
            "price": 1481.23
          },
          {
            "date": "2026-11",
            "price": 1478.4
          }
        ]
      },
      "newsEn": [
        {
          "title": "Azerbaijan announces official exchange rates for November 13 - Trend News Agency",
          "source": "Trend News Agency",
          "link": "https://news.google.com/rss/articles/CBMiV0FVX3lxTE96bkE2MFJoVFVtdEpnNXdPb0dad05ZZUlkWnp6aEZ6Y3IwRW1fNkFFLUh5Q2FxUEhZaUxCTWVUdjNRRGV6a3ZTbGRCekhjU1Q1Zk1Gcmk2SQ?oc=5",
          "date": "11-13 14:16"
        },
        {
          "title": "Nepal Rastra Bank Publishes Foreign Currency Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxNYXV6YXE3RW5iY0xSOHdGWXc2cW9CLXpKblNHYS1lNFZhWXJvX04tdUtMYnZ0b09HVzNtY2RXcWR0cFBNN21xVk5VQ2I4Z1ZHWDY5VmwxdjB4SG5kcVZMWmFOazRZamVlS3dtSl9VX2hFWU14cTlMdnFhcEVzSWlFdDY5U0wtUFZ1bTVPM3FUd0FISnllbzNrS05PeGdPZw?oc=5",
          "date": "11-13 10:35"
        },
        {
          "title": "CBA currency exchange rates (13.11.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMidkFVX3lxTE9nVFBCQldtRFVWVTZWTzdmNU5Vd1JwbkVfNzBxZkpHMXZPVWpEQmhPdW44M1BYSHZITXd6dVhOQjRyeW0yaURkNHhwQUNDODAybW9tNURnUThTOHRtTzVndEpyeG1XdDBRZmFsZngyNVpIVzFoa1E?oc=5",
          "date": "11-13 14:43"
        },
        {
          "title": "d’Alba Global Q3 2026 slides: record profit, currency weighs on revenue - Investing.com UK",
          "source": "Investing.com UK",
          "link": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxNM24xeW9xekVqbFhIN2YtR29TaFN4aFQ3TlAwTWZySU5uSmxKSW9xa3Z1c2lZd3VralVkUTllRHpIWll4SnRyX2pRdVZSZjJOalprLUwyekkxcVZGb2FSX1psN3Q0ZXpodV9DLXNnRi0xN0R4QU55VW94czZLTVp4Sy1KMWpzbWd5NU1JVWc2eXhocEF2cmpMTnZTY1FGRDBKRG0zYVcxa3phUnA0OURfRFU2RUdJaDEzaDc5VGRUSXc4ckVkMU5vaQ?oc=5",
          "date": "11-12 13:22"
        }
      ],
      "newsKr": [
        {
          "title": "환율·유가 내리자 수입물가 1.8% 하락 - 스트레이트뉴스",
          "source": "스트레이트뉴스",
          "link": "https://news.google.com/rss/articles/CBMic0FVX3lxTFBuLVBOdFNqUHlOeDRZRTBGZTlNeEJucUZyaVo3ckRQN0E4VUgwT3ZmMjAzUlRtLWtqSWxxckp6dlREVExNdVVlNGpuazdfVkVEVU4zOGRGLVZDcTJNUHJuUzNncDBGY0xKN2hmMG1TTDZTNkU?oc=5",
          "date": "11-13 07:01"
        },
        {
          "title": "유가·환율 동반 하락에 10월 수입물가 1.8%↓…한 달 만에 하락 전환 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMickFVX3lxTFByR2IzaDNjWXhxa290cm52ODkyQjVCMkhHUm9JblJqZmg4ZmNiM1hZa0FCNVIxRzFrOE1nazVwbC1GYzM3a3JFYm1rclQzc3hVZ0hDeUswQ05UeF9EV29LNXAxa1pnN1RfWFl0UFQ0cTZnQQ?oc=5",
          "date": "11-13 06:00"
        },
        {
          "title": "WTI 가격 전망: 23.6% 피보나치 되돌림 수준과 200시간 단순이동평균선(SMA) 아래서 매도세 우위 - www.tmgm.com",
          "source": "www.tmgm.com",
          "link": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxQVUVua2JDYXZXall2T2pBcFFRZXhYaUFpRS1ET1ZZaDFaaTZraVNJZkR5cDdpUWYyLUluOUY4S1diR0lwWmh4Wm5GdGFDR2I2MlF2TmNkdFY3RXhhRk5TbGU1ZWN0UTdnT29MdzVvSVV4WTNmQ1NNTHNKcUR0eXZEMGVKTGM2NWdmaUxJaUdVaEdCNW1taWhMcjFOVjJwZFMzV0g0UnJ0ZHR6MmJaTFgtd0lLYkxySEtKU1FBSm9QRG5FNGNyQVRGVm9LNHFPRTg2ZEo2bWFMR3RRQQ?oc=5",
          "date": "11-13 17:23"
        },
        {
          "title": "환율·유가 동반 하락에 수입물가 1.8% 내려 - 스페셜경제",
          "source": "스페셜경제",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE5iOExPU0tzY3Q4a3QwMGFqZ2N4WGFzQ2VxbDIwc2NsQXhMUVd0bDlyanpMYWhibWhMQU1VdEhhdGp3VTZMMFpERFlFNk1iMVJadlBqQ1FSdmxpUG9kVEdBSTZRekthdnFFUDJZbA?oc=5",
          "date": "11-13 10:42"
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
