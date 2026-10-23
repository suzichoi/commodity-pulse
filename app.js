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
  "last_updated": "2026-10-23 19:48:47",
  "weekly_report": {
    "title": "[2026 Week 43 Report]",
    "week_number": 43,
    "week_date_range": "2026.10.19 ~ 2026.10.23",
    "weekly_price_title": "[W43 주요품목가격]",
    "date": "2026.10.23",
    "report_date": "2026.10.23, 19:48",
    "top_gainer": "GDT 전지분유 : $3,760.00 (▲4.30%)",
    "top_loser": "코코아 : $5,548.00 (▼0.61%)",
    "weekly_price_list": [
      "코코아 : $5,548.00 (▲0.19%)",
      "아라비카 커피 : $6,880.62 (▲8.64%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $4,021.00 (▲3.47%)",
      "GDT 전지분유 : $3,760.00 (▲4.30%)",
      "GDT 탈지분유 : $3,975.00 (▲3.33%)",
      "GDT 버터 : $4,721.00 (▼0.40%)",
      "팜유 : $1,150.00 (▲0.15%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,548.00 (▲0.19%)",
      "아라비카 커피 : $6,880.62 (▲8.64%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $4,021.00 (▲3.47%)",
      "GDT 전지분유 : $3,760.00 (▲4.30%)",
      "GDT 탈지분유 : $3,975.00 (▲3.33%)",
      "GDT 버터 : $4,721.00 (▼0.40%)",
      "팜유 : $1,150.00 (▲0.15%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,324.61원 (▼0.98원)",
    "fx_eur": "1,483.20원 (▼5.93원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까?"
  },
  "daily_briefing": {
    "title": "[2026 Week 43 Report]",
    "week_number": 43,
    "week_date_range": "2026.10.19 ~ 2026.10.23",
    "weekly_price_title": "[W43 주요품목가격]",
    "date": "2026.10.23",
    "report_date": "2026.10.23, 19:48",
    "top_gainer": "GDT 전지분유 : $3,760.00 (▲4.30%)",
    "top_loser": "코코아 : $5,548.00 (▼0.61%)",
    "weekly_price_list": [
      "코코아 : $5,548.00 (▲0.19%)",
      "아라비카 커피 : $6,880.62 (▲8.64%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $4,021.00 (▲3.47%)",
      "GDT 전지분유 : $3,760.00 (▲4.30%)",
      "GDT 탈지분유 : $3,975.00 (▲3.33%)",
      "GDT 버터 : $4,721.00 (▼0.40%)",
      "팜유 : $1,150.00 (▲0.15%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,548.00 (▲0.19%)",
      "아라비카 커피 : $6,880.62 (▲8.64%)",
      "로부스타 커피 : $3,728.00 (▼1.30%)",
      "GDT 지수 : $4,021.00 (▲3.47%)",
      "GDT 전지분유 : $3,760.00 (▲4.30%)",
      "GDT 탈지분유 : $3,975.00 (▲3.33%)",
      "GDT 버터 : $4,721.00 (▼0.40%)",
      "팜유 : $1,150.00 (▲0.15%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,324.61원 (▼0.98원)",
    "fx_eur": "1,483.20원 (▼5.93원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까?"
  },
  "lastUpdated": "2026-10-23T19:48:47.633957+09:00",
  "usdKrwRate": 1324.49,
  "eurKrwRate": 1483.2,
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
      "price": 5548.0,
      "change": -34.0,
      "changePercent": -0.61,
      "high52w": 6675.0,
      "low52w": 2798.0,
      "high24h": 5687.0,
      "low24h": 5517.0,
      "high7d": 5843.0,
      "low7d": 5548.0,
      "high1m": 5867.0,
      "low1m": 5367.0,
      "volume": 2408,
      "sparkline": [
        5831.0,
        5645.0,
        5687.0,
        5801.0,
        5843.0,
        5582.0,
        5548.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5514.71
          },
          {
            "time": "11:00",
            "price": 5525.81
          },
          {
            "time": "13:00",
            "price": 5536.9
          },
          {
            "time": "19:48",
            "price": 5548.0
          }
        ],
        "7D": [
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
            "price": 5548.0
          }
        ],
        "1M": [
          {
            "date": "09-23",
            "price": 5528.0
          },
          {
            "date": "09-24",
            "price": 5590.0
          },
          {
            "date": "09-25",
            "price": 5619.0
          },
          {
            "date": "09-28",
            "price": 5589.0
          },
          {
            "date": "09-29",
            "price": 5408.0
          },
          {
            "date": "09-30",
            "price": 5367.0
          },
          {
            "date": "10-01",
            "price": 5381.0
          },
          {
            "date": "10-02",
            "price": 5670.0
          },
          {
            "date": "10-05",
            "price": 5867.0
          },
          {
            "date": "10-06",
            "price": 5700.0
          },
          {
            "date": "10-07",
            "price": 5582.0
          },
          {
            "date": "10-08",
            "price": 5665.0
          },
          {
            "date": "10-09",
            "price": 5665.0
          },
          {
            "date": "10-12",
            "price": 5676.0
          },
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
            "price": 5548.0
          }
        ],
        "1Y": [
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
            "price": 5367.0
          },
          {
            "date": "2026-10",
            "price": 5843.0
          },
          {
            "date": "2026-10",
            "price": 5548.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Cocoa Prices Fall Sharply on Rising ICE Inventories - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQTXJqZDA3aDZBMXVSTUwxRDZFRVR5NFRVSHJBQUNzZl8yYmljako4NWtTaHJfX2h1cFd5Skk1aVZ5Z3pCTEluT3AzM3BUM3hxaWVBUExMdXdibjNUSmhUT2xpWHR3SnJidVZHSEVOOVp2NjFFYU5GaXpreGtEV21lQ0xuZ2hBbXpKd0thNnVlcjZmN0h5ODgxQXdhZw?oc=5",
          "date": "10-23 03:34"
        },
        {
          "title": "Cocoa Prices Fall Sharply on Rising ICE Inventories - Yahoo Finance",
          "source": "Yahoo Finance",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPd1lMcVZWTUhpV3p6cEM2UjZQclFzOVQ0aGFJeTVqNkdVWl83b1RJVmlwNjU2M2xxQnRCd3g4TlEyQ01XSDg2N1ZwZHBFRnZ6eTZFYUlVdjY5ckpZbWpRU1pPMVFxWFg5T2dhb2l4UWROVjZQQmZvU1otQ2Y5M0E4dUQyTklhcWlYWmlMTko0ajB5UzJMT0d5NjhvQzdrbHRGTzlsZg?oc=5",
          "date": "10-23 01:44"
        },
        {
          "title": "Sector study shows cocoa and chocolate markets to top $216 billion by 2031 - Confectionery Production",
          "source": "Confectionery Production",
          "link": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxOM0YwRFl1TTVuc2gzLUVST1hFVnMzMzAzcm1pc0FhNHB6STUtdk1oX2Q0bXRpNDNIOHFiZWJoUTduQ3doSmlIMlQ2bGg2SXVoMW4zbExLTTBjXy1mUWVnbnBYZHBtc3ZZenhKSkhhYVJKZVFSaWEwUXBGYVJRMEZCNjlOQmszMDhxNU9LOFF6Rkt6aXVYVzV1aWZud1hlUDM5VjE2SnhHV2gzR3NBeUY1TVlJejZfYkw2NnhxLUJBeWlEMFE?oc=5",
          "date": "10-23 00:00"
        },
        {
          "title": "Ghana Cocoa Prices Expected to Fall 2.5% in October as Main-Crop Arrivals Weigh - ChemAnalyst",
          "source": "ChemAnalyst",
          "link": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNbVREbmRxeW5vQjY1MnNFQkRtMDBnWVlDemVFMlpIZmp0VDloZG1TbGJ5VUItb0tPVm5nRDdtU240QjJMT3dCQ1dFMDJnQ0JSbHQ2ckMyTXdWUWZDeWhRdDl2cGFtcGY0bkVLb09GODNjTmI3WFRvZ3FtWVNSSkZYaU9XckhOdThzWlE0Y3RiZjJiWDVTNmJ4Q1NTeWtwVmxIVnFzWkF5V0w0Uzd2QVE?oc=5",
          "date": "10-22 23:10"
        }
      ],
      "newsKr": [
        {
          "title": "미국 코코아 선물(COCOA-F) 종목이 10월21일에 2.00% 하락했습니다. 주목해야 할 핵심 요인을 살펴보세요 - TradingKey",
          "source": "TradingKey",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNejFIOXVNeWZSRHdwT24tMjdjTXNSdmNvTlppOXl3b1NRYkRHYWdDRzNRallSMVNzcFRHRFNRS1JoakE5T0RLUC1mZVo1Y1JTc3p2dHoyMm5ma1FsWjdsUlc5blBjNkVQbmxfT3M5N3U3a0FQc2xMZnJzSUlCYnByRDZzWi1VTm5WZlYzNWROWDN2blE?oc=5",
          "date": "10-21 18:35"
        },
        {
          "title": "할로윈 사탕값 5년 새 78% 껑충…물가 상승률의 3배 - 시애틀코리안데일리",
          "source": "시애틀코리안데일리",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTE05YU1wNGpsRGVpUE1TbEhmaEl3VUNHWU1nZko4M0JmMHpzYUI0YnByOGZlWXZrdU13Q28yb1ExX1dIN3ZhYWRKUXpxMDNZai1PY0lSOEpncndMc2hrZFBScnZqM0RBbkhfSXV6TGZQUkXSAXNBVV95cUxQd1RzUGpoelVqSUQ4OWdrdHM1WnN4VGtIdDlUYW5kS2ZDWGNxRTJSZFhOQ0lhV3h4eVg3dDFiSVB5cW83QllpV09GamNyY1dEaXVWcUE3N0owR3VNSVMxeWJaTjVQOFNIVW1paVFtclZjYzJr?oc=5",
          "date": "10-22 07:32"
        },
        {
          "title": "오늘 23.10 농산물: 커피 가격 계속 하락세 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNcTNVQ2txMXQ4SzBzaVlxamt5SVE3VEVqYXFVWllscV8zQy1zOFJfVEZQVUJNbDNxcGFqUVN1cW1QSElDaGNqbkV3Znl4amxpSkw1YlNzUFQ5ZTQ2anJMLVI4eTBCUm5UMThhejJLVzFjb3NHbG9YVXo3RHZHQ3QzN0ZHMzdaMUlnaUl5UTR0NU1zLVNPUWNtcUltYw?oc=5",
          "date": "10-23 14:51"
        },
        {
          "title": "오늘 10월 22일 농산물: 커피 가격 하락, 후추 및 코코아 가격 급등 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQbThNUWlMZl96RmwyYzlmc3BWY2tkZ3ZMdTV6TTg4VjR4c2ZQRjhlcDZUeng3Qnl2VVZkcVFBQ3ktcnV4aXl4SUxQZGtaU0lZSG9nYTYxYmNDRXJpTmlFUEQwQXdwdTAxWHNOVW9CTzE3QllHdWlZejNseGdweFFlTk9iTHltelJJMzUzX0JwTFdTMGxtSkp1eG9zY1hING5xeHdoUWhqdHUwS0FpaXRjY1ZB?oc=5",
          "date": "10-22 14:17"
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
      "price": 6880.62,
      "change": -7.72,
      "changePercent": -0.11,
      "high52w": 9655.13,
      "low52w": 5350.61,
      "high24h": 6922.51,
      "low24h": 6817.79,
      "high7d": 6969.91,
      "low7d": 6499.22,
      "high1m": 6969.91,
      "low1m": 6070.42,
      "volume": 1840,
      "sparkline": [
        6499.22,
        6737.32,
        6959.99,
        6862.98,
        6969.91,
        6888.34,
        6880.62
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 6839.34
          },
          {
            "time": "11:00",
            "price": 6853.1
          },
          {
            "time": "13:00",
            "price": 6866.86
          },
          {
            "time": "19:48",
            "price": 6880.62
          }
        ],
        "7D": [
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
            "price": 6880.62
          }
        ],
        "1M": [
          {
            "date": "09-23",
            "price": 6082.55
          },
          {
            "date": "09-24",
            "price": 6070.42
          },
          {
            "date": "09-25",
            "price": 6142.07
          },
          {
            "date": "09-28",
            "price": 6365.84
          },
          {
            "date": "09-29",
            "price": 6381.27
          },
          {
            "date": "09-30",
            "price": 6408.83
          },
          {
            "date": "10-01",
            "price": 6354.82
          },
          {
            "date": "10-02",
            "price": 6365.84
          },
          {
            "date": "10-05",
            "price": 6449.62
          },
          {
            "date": "10-06",
            "price": 6711.97
          },
          {
            "date": "10-07",
            "price": 6452.92
          },
          {
            "date": "10-08",
            "price": 6372.45
          },
          {
            "date": "10-09",
            "price": 6326.16
          },
          {
            "date": "10-12",
            "price": 6406.63
          },
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
            "price": 6880.62
          }
        ],
        "1Y": [
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
            "price": 6408.83
          },
          {
            "date": "2026-10",
            "price": 6969.91
          },
          {
            "date": "2026-10",
            "price": 6880.62
          }
        ]
      },
      "newsEn": [
        {
          "title": "Where Are ICE Arabica Coffee Futures Heading in 2027? - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxNbW55bDIyTTV6OW1qVDdUWFRxZkU5ZVlhRjNJNjcyVktUYzNNMEtBbzlMVUZRTlQzSndDa21BU0p1WWRmSHphalNsSjF6ZjZJenM0RkNhWU1YX2s4ZEZlTGUzbVM3WUxPSE90cDNRc2pqdmVuSkx3Q2VISDRpbEQtMzFCdGVuTnU5UTl4MGt4VHV6VkZlWTEwTWlOalE?oc=5",
          "date": "10-23 04:00"
        },
        {
          "title": "Coffee prices today, October 23, 2026: Prices in the Central Highlands decreased by up to 600 VND/kg, with the highest price now at 91,000 VND/kg. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNMGlDWTFEbHhYVm1OMHlBZlRtb0hzcUN0NElmU1h1dWpxMkZXN1N4NnFWMGIyVmtNRHhQbmpOdk9GSWgtaTBabzBCWGF6R3RzMlFQTXgzUEpHQ1Rya2tmVEt5Ul9xR0ZMWjV4MWhGSVJ6TFRPekFacHlmN2c0R0p2dVNtd21GLUUySXFkU1RuNFJJYUV5ZmxKaXBaVGxxXzhES3V0YWhtZFEyMXVTcnphQ0p3alV4Zw?oc=5",
          "date": "10-23 14:25"
        },
        {
          "title": "Coffee prices today, October 22nd: Arabica inventories are low, Robusta faces pressure from the harvest in Vietnam. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPYmh2bGJVRkpWOHJYNjFwQkVLS3l5WHdQZTBIVFVyY1pxMXZDbV8wWUlqSVNJaXlmQlJ6bEpQRXU1UEdsem5iaEVucEZTdWFaYl84YUJWcm1ZTU9leXdEQ3BOOVZkZFNLU0YtX3lRTUFJX3d5Skc2WklSQ0FER2VFdGx6Rk1YRHdvYmxBWDR6TG52ZXlSbi1VdmxITFRZSlFiYXplM1o2TGdWSkpXeWVBZVBOOHVSSzktZW1xMms2X2hMVjZP?oc=5",
          "date": "10-22 15:03"
        },
        {
          "title": "Coffee Prices Fall as ICE Coffee Inventories Rise - Yahoo Finance",
          "source": "Yahoo Finance",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPMGZkOHU1RFhXS29VYWhyN3haUWJoOHg2QnJKZzc5QUZsQXlaZE92ZHhSam5PRS1mbTlkZzFkazVvSVdLWThsVDNMaEY4Z3ZpMWtVQUhJYW80bFRsQUpjeU1YbFNlZmJrcEZuNG1QS0hWdXdOc2NIcXpqQlRjSXpmNzk1eHozVHJQbnpQeFgtNV85azhjdDhwZUhUeEkxN0hF?oc=5",
          "date": "10-23 01:33"
        }
      ],
      "newsKr": [
        {
          "title": "2026년 10월 23일 현재 커피 가격: 로부스타와 아라비카 가격은 상반된 추세를 보이고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQbW5ZcEs2Nm41Yl9Ndk5xR042cm9mZldIb25XU3dxSktyOVhYUlBoTDU3eXNvMldVUTU2M2d0MF9hWlAtdzdGTVltc1JNTWN2TG1wbERVQjFlY01vVllwdUtudmYzT2JJYnh5NzhkVU9VMGpjcGI1LXJqWHd5dDk0clNJWkYzemN2MUxTYzRB?oc=5",
          "date": "10-23 12:37"
        },
        {
          "title": "2026년 10월 23일 오늘 커피 가격: 중부 고원 지역의 가격은 kg당 최대 600 VND까지 하락했으며, 최고 가격은 현재 kg당 91,000 VND입니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNOUgtYmxjTXBVQ1d5LVhDek02NEpNNTdhYkgzRW4tZDVRTjdxNG1OYWlFVGJjSnA2VFJZNjdXTE5sWGZQQ3I4Z1ZscGRzN1VZVDB2dnk0UW9sUzgzTVJKVUctNzNFdjRRNF9NaEM3WHNFU04zY0Vsb3YyeFB1aThqTlJsNGx5RXR5b0o0ZVd4TmdnMmRuOV90dWFNZWxUZzN2ZkdrcVdneE5jc0gwdUVFU2lvYzlJQQ?oc=5",
          "date": "10-23 14:04"
        },
        {
          "title": "오늘 23.10 농산물: 커피 가격 계속 하락세 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNcTNVQ2txMXQ4SzBzaVlxamt5SVE3VEVqYXFVWllscV8zQy1zOFJfVEZQVUJNbDNxcGFqUVN1cW1QSElDaGNqbkV3Znl4amxpSkw1YlNzUFQ5ZTQ2anJMLVI4eTBCUm5UMThhejJLVzFjb3NHbG9YVXo3RHZHQ3QzN0ZHMzdaMUlnaUl5UTR0NU1zLVNPUWNtcUltYw?oc=5",
          "date": "10-23 14:51"
        },
        {
          "title": "10월 23일 오늘 농산물 가격: 커피 가격은 계속 하락하고 있으며, 후추 가격은 안정세를 유지하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxOSDdseXR1TWdLMGVUNU1XdFRXWGJYdG9nblEtektqNENCMlFxOU5hanRLS0UyeDROMUNjVlFNVjdNUXpsZFFzUk8zQkRpOURfS3dXRkdaU3B0TlRveUJlWkN0M0NGMXNpc1VfVF9kSENlTGo1dFB3VF80eDdtN3k0NjZwSVpJTFFQb1BYRjZR?oc=5",
          "date": "10-23 11:08"
        }
      ],
      "original_price_lb": 312.1
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
            "time": "19:48",
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
          "title": "Coffee Prices Buffeted by ICE Inventory Fluctuations - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPRlJ4S2VtQUFLQlVCank4eXBxYnNBUHhfYVZWMklfRnRpX3RRRUdJalVfeUh1ZnZEWk90MWVaNk5HWG9YMWh5bm91aVRuMi04a3JIeGIzakZnclRLWll3dU9BbUhjN0xHME9pd0ozRGE1anlnOEprMTFnSXFmZXNLQWE2UGtncmlucnY5U0hCdEFUcC1IZU1RNDhOaVllamZUZjVBYXA4MEtzVUViS2dr?oc=5",
          "date": "10-22 03:30"
        },
        {
          "title": "Vietnam coffee prices edge down - Business Recorder",
          "source": "Business Recorder",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE44dy1NN1FtVV9FSnZOYjFYY2VGalhFMGd0V2wxM1dmOG9rV2p5d01CM24zRUlmM3JINTZLa3NLZFBDLVQyUlVrUDBTbG81NFhPdjhaaE9B0gFWQVVfeXFMTjh3LU03UW1VX0VKdk5iMVhjZUZqWEUwZ3RXbDEzV2Y4b2tXanl3TUIzbjNFSWYzckg1Nktrc0tkUEMtVDJSVWtQMFNsbzU0WE92OFpoT0E?oc=5",
          "date": "10-23 09:47"
        },
        {
          "title": "Coffee prices today, October 23rd: Robusta continues to fall as ICE inventories increase. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOSmoySHFwNTZ0NEstNWtrNldFVkxSUHJzMkttN0xsSF9kLTVvUUhybUdJLUMwLUFGM2JFS0tSdF9RZ01TWDl4WE1JZXp5MXJkR0wyUnJOcEJOQTdwT2xBcmpFMTN2TTFVX3Myc3B5REFmSjU4OHR5QmwxeWdsOVgtMjY3enFxQzFRU2lKbkZtNUJiaS1IZl8ycA?oc=5",
          "date": "10-23 08:25"
        },
        {
          "title": "Coffee prices today, October 23, 2026: Prices in the Central Highlands decreased by up to 600 VND/kg, with the highest price now at 91,000 VND/kg. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNMGlDWTFEbHhYVm1OMHlBZlRtb0hzcUN0NElmU1h1dWpxMkZXN1N4NnFWMGIyVmtNRHhQbmpOdk9GSWgtaTBabzBCWGF6R3RzMlFQTXgzUEpHQ1Rya2tmVEt5Ul9xR0ZMWjV4MWhGSVJ6TFRPekFacHlmN2c0R0p2dVNtd21GLUUySXFkU1RuNFJJYUV5ZmxKaXBaVGxxXzhES3V0YWhtZFEyMXVTcnphQ0p3alV4Zw?oc=5",
          "date": "10-23 14:25"
        }
      ],
      "newsKr": [
        {
          "title": "2026년 10월 23일 현재 커피 가격: 로부스타와 아라비카 가격은 상반된 추세를 보이고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQbW5ZcEs2Nm41Yl9Ndk5xR042cm9mZldIb25XU3dxSktyOVhYUlBoTDU3eXNvMldVUTU2M2d0MF9hWlAtdzdGTVltc1JNTWN2TG1wbERVQjFlY01vVllwdUtudmYzT2JJYnh5NzhkVU9VMGpjcGI1LXJqWHd5dDk0clNJWkYzemN2MUxTYzRB?oc=5",
          "date": "10-23 12:37"
        },
        {
          "title": "2026년 10월 22일 오늘 농산물 가격 동향: 로부스타 커피 가격은 계속 하락하고 있는데, 후추 가격은 연말까지 회복될까요? 러시아-우크라이나 협상 전망 덕분에 유가는 하락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi_wFBVV95cUxNUEFSeGZ1d3EzQ1hTd1lfd1RVenlnNjI3b292Sm5nWDNsaDIzUjY4OTJOeUFQajdhZEhvTXBqNjloT2tiWmktM2pfdVBYa1I5VWhnYkFacWRlamZJWkhGYnJNdFl6SjBnaDlDWDJaTF9KdVhhbDhMbUk3THdFU2ZLUDZ5M0NCWXY0WGZnWE4ycHlLRXdWVF95cTJxdkFUNWRfbmdzaERQMV9na2wyZFFLVm12WlRPbHI4MWlPT3lNcXFkTWRjTHZWVUpUMTNHV1lyVk1GMzFkUHg0SVhGSFowdzFQYlZ4M3NwMGkwTjZkcEJfOXJJTVRXZERpMElOVWM?oc=5",
          "date": "10-22 14:04"
        },
        {
          "title": "오늘 23.10 농산물: 커피 가격 계속 하락세 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNcTNVQ2txMXQ4SzBzaVlxamt5SVE3VEVqYXFVWllscV8zQy1zOFJfVEZQVUJNbDNxcGFqUVN1cW1QSElDaGNqbkV3Znl4amxpSkw1YlNzUFQ5ZTQ2anJMLVI4eTBCUm5UMThhejJLVzFjb3NHbG9YVXo3RHZHQ3QzN0ZHMzdaMUlnaUl5UTR0NU1zLVNPUWNtcUltYw?oc=5",
          "date": "10-23 14:51"
        },
        {
          "title": "2026년 10월 23일 오늘 커피 가격: 중부 고원 지역의 가격은 kg당 최대 600 VND까지 하락했으며, 최고 가격은 현재 kg당 91,000 VND입니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNOUgtYmxjTXBVQ1d5LVhDek02NEpNNTdhYkgzRW4tZDVRTjdxNG1OYWlFVGJjSnA2VFJZNjdXTE5sWGZQQ3I4Z1ZscGRzN1VZVDB2dnk0UW9sUzgzTVJKVUctNzNFdjRRNF9NaEM3WHNFU04zY0Vsb3YyeFB1aThqTlJsNGx5RXR5b0o0ZVd4TmdnMmRuOV90dWFNZWxUZzN2ZkdrcVdneE5jc0gwdUVFU2lvYzlJQQ?oc=5",
          "date": "10-23 14:04"
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
      "price": 4021.0,
      "change": 134.81,
      "changePercent": 2.5,
      "high52w": 4164.31,
      "low52w": 3407.56,
      "high24h": 4021.0,
      "low24h": 4021.0,
      "high7d": 4021.0,
      "low7d": 3843.07,
      "high1m": 4021.0,
      "low1m": 3778.0,
      "volume": 42088,
      "sparkline": [
        3815.0,
        3778.0,
        3871.1,
        3864.63,
        3843.07,
        3886.19,
        4021.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-06 (Event 413)",
            "price": 3886.19
          },
          {
            "time": "2026-10-20 (Event 414)",
            "price": 4021.0
          }
        ],
        "7D": [
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
            "price": 4021.0
          }
        ],
        "1M": [
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
            "price": 4021.0
          }
        ],
        "1Y": [
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
            "price": 3843.07
          },
          {
            "date": "2026-10-06",
            "price": 3886.19
          },
          {
            "date": "2026-10-20",
            "price": 4021.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Global Dairy Prices Post Biggest Gain in 7 Months - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQY0xCYnBORjdyczk4d1YyZm5yZ1FzMXUxNjd2N3VPYjhNcHdvYzNxUGRpZkUybHlENVI0NFhTNVQwdzI4NGpicmt0T1d1LUw5dHFCMVFsRDBuZFgtSmJoOXlBZzl2bkxKQW5aMW5hNWxtWEwtcTN5Y0FCa2tzbEVKcVZDWGF6ejdjSE5jMlMzWkM2SUNQVkRxRGxzV183RE9fbWc?oc=5",
          "date": "10-21 10:13"
        },
        {
          "title": "Dairy Commodity Markets | Milk powder gains trigger global dairy trade price surge - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxQYXlqZmpxOEVCcFEtUDZTcC1YRWd5UmU1V3I0LWdGZFJIUHJhOVd5SVF5OG1mNHdUUlA1dW9MdnBZSkRya1FGQlVCYkJldloxRGhrZ0V0M09CT3lKWlNTTm9Sak9LQ09OaG0tdHphVTlNMG1sMGZJMVVJWk9ybEE0RzJYcXFvMEJ6Q0lJ?oc=5",
          "date": "10-21 06:14"
        },
        {
          "title": "CME cash dairy prices mostly higher - Brownfield Ag News",
          "source": "Brownfield Ag News",
          "link": "https://news.google.com/rss/articles/CBMiekFVX3lxTE94Ykk2VERmUjJHVFZvU2NvRnFQU1BsYkNWVHIzSUR5c1JmUWI4X0k3aUVjWXFib2NhekJqeFNtbHZkeE9pVTBINndLR21pRU14aUQtdk5lYi04V1ZpN3U3cWV3SFB6cHg3cE9Vdl96bGJ1emx4N2lBbTRB?oc=5",
          "date": "10-21 04:14"
        },
        {
          "title": "Buttermilk powder and milk powders record price gains at GDT auction - UkrAgroConsult",
          "source": "UkrAgroConsult",
          "link": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPbXVvX2xKWk8zLXFXTXIxREd1Ty03bzE3aE9Udm9BSnJoUmwyMWw5NFRSQlFfWFp4cmFLVERHVzBXLUtCM0t6dC1lczNSdDNUaTI2NTFKUWdRTHBrcUFTTVdYZ1hkajdHaUZxMnBydGF2OHlJVHlnZ2hsNGhkR255LTNjNWNQTm4zYWZocVh3WWxvWWJ6bFo2N2VKWk8yaHZSTE4tN040aw?oc=5",
          "date": "10-21 17:38"
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
      "price": 3760.0,
      "change": 155.0,
      "changePercent": 4.3,
      "high52w": 3863.0,
      "low52w": 3161.0,
      "high24h": 3760.0,
      "low24h": 3760.0,
      "high7d": 3760.0,
      "low7d": 3565.0,
      "high1m": 3760.0,
      "low1m": 3483.0,
      "volume": 28500,
      "sparkline": [
        3486.0,
        3483.0,
        3591.0,
        3585.0,
        3565.0,
        3605.0,
        3760.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-06 (Event 413)",
            "price": 3605.0
          },
          {
            "time": "2026-10-20 (Event 414)",
            "price": 3760.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
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
          },
          {
            "date": "2026-10-06",
            "price": 3605.0
          },
          {
            "date": "2026-10-20",
            "price": 3760.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Dairy Commodity Markets | Milk powder gains trigger global dairy trade price surge - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxQYXlqZmpxOEVCcFEtUDZTcC1YRWd5UmU1V3I0LWdGZFJIUHJhOVd5SVF5OG1mNHdUUlA1dW9MdnBZSkRya1FGQlVCYkJldloxRGhrZ0V0M09CT3lKWlNTTm9Sak9LQ09OaG0tdHphVTlNMG1sMGZJMVVJWk9ybEE0RzJYcXFvMEJ6Q0lJ?oc=5",
          "date": "10-21 06:14"
        },
        {
          "title": "Global Dairy Trade Event 414 Report: Mixed Prices Across Dairy Commodities - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPNUp0ZnQ4bldUMms5ZUFyYlFxWG1oUk80VTVlVnFDZDUtcmRZNmR3UFBuZ2hoRElJcW12RFFGZTJBRHVTQmpJTm5ja1MzdlI3eTNpQUUxQW53dzI3UTBUYkFQSHFxUzdBemQtZVhYLWNILWN3RkNMUUdjdXZnNTRLYXRfQjVKVkp1cjVpcGpSSU9Bbk1IeFFnb0FxanFNVERLcFBid1o5QUNXVXBmUDdSeU1xNkdWcDlO?oc=5",
          "date": "10-21 01:20"
        },
        {
          "title": "Buttermilk powder and milk powders record price gains at GDT auction - UkrAgroConsult",
          "source": "UkrAgroConsult",
          "link": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPbXVvX2xKWk8zLXFXTXIxREd1Ty03bzE3aE9Udm9BSnJoUmwyMWw5NFRSQlFfWFp4cmFLVERHVzBXLUtCM0t6dC1lczNSdDNUaTI2NTFKUWdRTHBrcUFTTVdYZ1hkajdHaUZxMnBydGF2OHlJVHlnZ2hsNGhkR255LTNjNWNQTm4zYWZocVh3WWxvWWJ6bFo2N2VKWk8yaHZSTE4tN040aw?oc=5",
          "date": "10-21 17:38"
        },
        {
          "title": "GDT rises 2.5% after latest trading event - Agriland",
          "source": "Agriland",
          "link": "https://news.google.com/rss/articles/CBMidEFVX3lxTFBJcFhKb0FESmtVX3NCZHhTbFJGUG1Ra0Fic1EyNVJ0Mm84Z3VKeUtrVUhRajVEZTc1VFF2UFZvQWI1MHJZZE5QNU9uUzQ0Z2Y0OXdHRzFKdXZYZ1JFNm1ia25jM0oycnRrNi1KalczTUdaVnRE?oc=5",
          "date": "10-21 01:30"
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
      "price": 3975.0,
      "change": 128.0,
      "changePercent": 3.33,
      "high52w": 3975.0,
      "low52w": 2431.0,
      "high24h": 3975.0,
      "low24h": 3975.0,
      "high7d": 3975.0,
      "low7d": 3689.0,
      "high1m": 3975.0,
      "low1m": 3261.0,
      "volume": 18200,
      "sparkline": [
        3234.0,
        3261.0,
        3502.0,
        3695.0,
        3689.0,
        3847.0,
        3975.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-06 (Event 413)",
            "price": 3847.0
          },
          {
            "time": "2026-10-20 (Event 414)",
            "price": 3975.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
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
          },
          {
            "date": "2026-10-06",
            "price": 3847.0
          },
          {
            "date": "2026-10-20",
            "price": 3975.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Buttermilk powder and milk powders record price gains at GDT auction - UkrAgroConsult",
          "source": "UkrAgroConsult",
          "link": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPbXVvX2xKWk8zLXFXTXIxREd1Ty03bzE3aE9Udm9BSnJoUmwyMWw5NFRSQlFfWFp4cmFLVERHVzBXLUtCM0t6dC1lczNSdDNUaTI2NTFKUWdRTHBrcUFTTVdYZ1hkajdHaUZxMnBydGF2OHlJVHlnZ2hsNGhkR255LTNjNWNQTm4zYWZocVh3WWxvWWJ6bFo2N2VKWk8yaHZSTE4tN040aw?oc=5",
          "date": "10-21 17:38"
        },
        {
          "title": "Milk powders increase again as GDT index continues to move upwards 20 October 2026 Free - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPdHZmdER6V2ZESWxDR0I0d2RkT3RIOEdNS3ZXWjBRTGF2V3ItOTFxZ04zMkhOai1KUlhwSUNwOFkwRFljYjJUMTFMLTYyR08xcWNFblR1bC1nT2l4YUlIMXhrMlZqekc3cHlQQkVqejVOUVpfY0JZd3NJaXI4V2Q4OGw0eXQ1bHN0bExzSE83bDZsaW9yV1VVV0tiU2tuQ2Qteko5Rzd4RWtBLU5vSnItd3VpZEtDUzNi?oc=5",
          "date": "10-21 02:40"
        },
        {
          "title": "Mielke Market Weekly: Milk Price Facing Headwinds as Feed Prices Climb - TheLandOnline",
          "source": "TheLandOnline",
          "link": "https://news.google.com/rss/articles/CBMi6gFBVV95cUxOMUs5WkMwcnpkNm04R3VIUks1M2FHSmo0RkNlY3VxeDAwbG5pYmVqdDJkM29KdncwbFRiOWo4S1dib09yQ2lRN1R1Q3pXdjc2WkRsMnBCOE1zUE40NEhjRUtheUc3RzZkLXpMemczWTFjbEZhWnB5bnJuYTNQRDRKd2JMMHNrQUlTMWdGNUw5dy1obWp6bkxVRVRtQ1VtcmI0R3F1VF9yUFoyQl9aOWZ6TU9OMEFWRk05SlZvb1lLRlJTeklXTC14V2diNXBoWXdqLXB3aW8wNlFxbndwRURMVFhrOHZmRHFGdEE?oc=5",
          "date": "10-22 10:51"
        },
        {
          "title": "US Milk Prices Face Margin Squeeze As Feed Costs Rally And Beef Values Soften - https://en.edairynews.com/",
          "source": "https://en.edairynews.com/",
          "link": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNNWxEQUE2R0FLRXZkX3NOS1FvOV8tcHZiaXNxR3Nnbm10b0RoUlNodkVfeDMya2ZqQ01jQ1dpNkU2NHlrOEJoUFNwMmk0cHFYcnF5c01pVkZ5RGNvMklCUi1sYzF6ZnVzbHdrbm5OWlI0cEdDME5rZ0RnRTFlZjlkVm9iWExBWUFkdzRnbFRuVXhNQlRHcUtNTlB4eloyd05MMnVMV1F0QQ?oc=5",
          "date": "10-22 21:06"
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
      "price": 4721.0,
      "change": -19.0,
      "changePercent": -0.4,
      "high52w": 6868.0,
      "low52w": 4721.0,
      "high24h": 4721.0,
      "low24h": 4721.0,
      "high7d": 4760.0,
      "low7d": 4721.0,
      "high1m": 5225.0,
      "low1m": 4721.0,
      "volume": 14300,
      "sparkline": [
        5303.0,
        5225.0,
        5090.0,
        5028.0,
        4760.0,
        4740.0,
        4721.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-10-06 (Event 413)",
            "price": 4740.0
          },
          {
            "time": "2026-10-20 (Event 414)",
            "price": 4721.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
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
          },
          {
            "date": "2026-10-06",
            "price": 4740.0
          },
          {
            "date": "2026-10-20",
            "price": 4721.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Global Dairy Protein Prices Rise as Milk-Fat Markets Weaken - Dairynews.today",
          "source": "Dairynews.today",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOOUxNei1xdXdBbVFXS1lXZmVfXzFBLWtscFJ5VUVrYWVRNlY0VWdNUHBhb01LZGwtNVdSSGZHdUtxVzNOOVRQYmxOMEQ1YjFucEFQalcxTG5iYk9XYjBLVkhGdVJlZVh4bjhENWgyZENlMzFwNUhXQUJKa0RwWEVkX0FWYndadlAzbG5ibFRPd0NMUXdZazI2RDYwU3Y5YldsZklR?oc=5",
          "date": "10-23 19:45"
        },
        {
          "title": "Global Dairy Trade Event 414 Report: Mixed Prices Across Dairy Commodities - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPNUp0ZnQ4bldUMms5ZUFyYlFxWG1oUk80VTVlVnFDZDUtcmRZNmR3UFBuZ2hoRElJcW12RFFGZTJBRHVTQmpJTm5ja1MzdlI3eTNpQUUxQW53dzI3UTBUYkFQSHFxUzdBemQtZVhYLWNILWN3RkNMUUdjdXZnNTRLYXRfQjVKVkp1cjVpcGpSSU9Bbk1IeFFnb0FxanFNVERLcFBid1o5QUNXVXBmUDdSeU1xNkdWcDlO?oc=5",
          "date": "10-21 01:20"
        },
        {
          "title": "Mielke Market Weekly: Agriculture Department lowered its 2026 and 2027 Milk Production Forecasts - TheLandOnline",
          "source": "TheLandOnline",
          "link": "https://news.google.com/rss/articles/CBMijAJBVV95cUxQbkwzclQxblhrc01ZOFFEMDNESDN4R0Q5OGhPaXNyZk1YY2RPR05Hd2Zmc2toWkswSTB4RDluWXRtSkp4NUFDenJ4N3dacGpVNFpxZklhc3VDOEI2R3BDYXA4cThaUm9jZjRTaVZXaUxKcUh3Y2tkcmJNMHFLM3lJQUp2eXhhdmdLaVFvbnhDSEJpZllkcm0zY0FwZmhtZXVvWWk2bjNwWUpCVTRZOC1zZ21nVmUxQ1duN2hIYXBiLURtWENGUE9WWjVuSUNCMDc1amRoaFRubm5jS0o4RnNkOGUzMnI0cGprb285a3BKaXNlNWdpbzZJR2otZ0JBMHk4QVhRdjRKVDBwYlZ0?oc=5",
          "date": "10-23 17:00"
        },
        {
          "title": "Global Dairy Prices Post Biggest Gain in 7 Months - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQY0xCYnBORjdyczk4d1YyZm5yZ1FzMXUxNjd2N3VPYjhNcHdvYzNxUGRpZkUybHlENVI0NFhTNVQwdzI4NGpicmt0T1d1LUw5dHFCMVFsRDBuZFgtSmJoOXlBZzl2bkxKQW5aMW5hNWxtWEwtcTN5Y0FCa2tzbEVKcVZDWGF6ejdjSE5jMlMzWkM2SUNQVkRxRGxzV183RE9fbWc?oc=5",
          "date": "10-21 10:13"
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
      "price": 1150.0,
      "change": 2.0,
      "changePercent": 0.17,
      "high52w": 1244.25,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1153.5,
      "low7d": 1142.25,
      "high1m": 1197.5,
      "low1m": 1121.25,
      "volume": 10,
      "sparkline": [
        1153.5,
        1142.25,
        1147.25,
        1147.25,
        1152.25,
        1148.0,
        1150.0
      ],
      "history": {
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "09-23",
            "price": 1197.5
          },
          {
            "date": "09-24",
            "price": 1196.75
          },
          {
            "date": "09-25",
            "price": 1192.5
          },
          {
            "date": "09-28",
            "price": 1192.0
          },
          {
            "date": "09-29",
            "price": 1191.0
          },
          {
            "date": "09-30",
            "price": 1191.0
          },
          {
            "date": "10-01",
            "price": 1126.5
          },
          {
            "date": "10-02",
            "price": 1121.25
          },
          {
            "date": "10-05",
            "price": 1131.25
          },
          {
            "date": "10-06",
            "price": 1128.5
          },
          {
            "date": "10-07",
            "price": 1122.5
          },
          {
            "date": "10-08",
            "price": 1147.5
          },
          {
            "date": "10-09",
            "price": 1136.0
          },
          {
            "date": "10-12",
            "price": 1145.5
          },
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
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1143.1
          },
          {
            "time": "11:00",
            "price": 1145.4
          },
          {
            "time": "13:00",
            "price": 1147.7
          },
          {
            "time": "19:48",
            "price": 1150.0
          }
        ],
        "1Y": [
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
            "price": 1191.0
          },
          {
            "date": "2026-10",
            "price": 1148.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Palm Oil Market Outlook: MDEX Futures, El Niño and Export Dynamics — CMB News - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNVW1jYUN4MS1HRkd6RkJWUzh4RHBhNF9qT09HcHJuM1JOYnFabEY0SWlvV3Jmams3MEFkTDhsMnpXc1N6Z1FxMExIcHI0eHc0YjFDQmc0VHkxMVExTXk4UFkwNDl0UElOQzZWYVhMZTAwbnpWUFNmR0dOUXJaaDdhdlIzSWdDRkxBMm1rN2ROTmNDS2lrZjZzZllVRlNHUHB3OUE?oc=5",
          "date": "10-23 15:38"
        },
        {
          "title": "Palm Oil Glut Lures Indian Buyers as Price Gap to Rivals Widens - Bloomberg.com",
          "source": "Bloomberg.com",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNX3ZIc29lLWMxLURTSTVSc2F0Y1lmLTVkaHRVbXR0aE9wLTZEVGJTbnpxY0lXN1FRTlN0bWprRXN6bUlKeFg3N3RQckZWZ19fVjl5SE1USHdvNmNZbEt2dVBWM0ZqUzducmRmOFNhRVRaSkttMGgzNXM1UTlMT3c5UmdON29LRTJmbWJwUUNqdTBVMlZYN2tiRWVsQmhFcERPSzF1WG5TcGUwUTU2MDNpSmMyWjg?oc=5",
          "date": "10-22 17:32"
        },
        {
          "title": "Palm oil prices to stay high next year on Southeast Asia drought - Nikkei Asia",
          "source": "Nikkei Asia",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPWUFQMWs5LUxSRlNpSDkzS2RQeU9oYzd2NnBzS2N6QnZBOHY5ZzNRSloyYzU5ZWFwTDQ1aGVxU3V6eXdOd1BQRXVXWUwtQmVIRUxtVlhxWHllRDFmQmM1RkRjMHhQRllRT3FPM01lNEV5YXEyQ3VjS1pTTms5RTc2YUVyZmM4akRBZjI1MXlWUXlfbkdwSTlhZ1ozZmNnVlcxSUl1c0RaQ3pPMUppbk5MaVAyS1VaN1hX?oc=5",
          "date": "10-22 10:45"
        },
        {
          "title": "Palm oil prices rise amid strong Malaysian exports and higher soybean oil prices - UkrAgroConsult",
          "source": "UkrAgroConsult",
          "link": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPS3EwY0c1NGwwRi1aNkJsZXRmZEV1TGxLUVFIaUtuaG5FaWxPNGliQU5iQmxwUHl4dXBWTHZUMDhTZGRwb05ZQkJ3X3FZTy1tbFRpczJWZ0dxMkt2ZGc4WDc5R2I2cVFSRENYWmp1ajVERmRicU80Um9jTUVxTERQM0lBMmtKbi1qcTM0TVNpZEgzMm8xVzZtLUFPcmVZaW15T3pmcWxicHJyV01tSFotc3RCbUpta1E?oc=5",
          "date": "10-22 22:59"
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
          "title": "밀가루·팜유에 용기까지 뛰었다…식품업계, 가격 인상 '궁여지책' - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE8zSnQ4UkszR1psQ0tpLVpfTmIzODYwaWx6UGlkbURQRWZBSDYxbnZwNjhZc2t0OHM0aVEwV1JGY29ZdGJoOHJvOUhTSEd2LWM0b3VHZzRTUExxOWpWSzlHLdIBeEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1ncw?oc=5",
          "date": "08-19 16:00"
        },
        {
          "title": "해바라기유도 ‘껑충’…유지류 가격 초비상 [푸드360] - 헤럴드경제",
          "source": "헤럴드경제",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE14VjRvazRSVFdoc1RyclRjZWtudlozWm1ESDd4ay14amtHTkllclducHRFYXR5RlVEdVRCbDRZWjJvbExwUlJtbndlVFA0WGZzZk9Ic2V3?oc=5",
          "date": "08-10 16:00"
        },
        {
          "title": "롯데웰푸드, 카카오·팜유 등 원재료 시세 예측 AI 시스템 도입 - 식품음료신문",
          "source": "식품음료신문",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTE5PbTB1RGhTamttTjRLd1R0ejRJQ2FlVUlQOXpiUndzNExPbUczZEtKOTdDQk11dUFRc1NOd2NIVU9WUHJZeGhMQWJ3SEY0QzNLRHdhTGlSdDZfX2xtYmlsZFNzQzRTaERVcTBmLUtGUQ?oc=5",
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
            "date": "10-17",
            "price": 1930.0
          },
          {
            "date": "10-18",
            "price": 1931.93
          },
          {
            "date": "10-19",
            "price": 1933.86
          },
          {
            "date": "10-20",
            "price": 1935.79
          },
          {
            "date": "10-21",
            "price": 1937.72
          },
          {
            "date": "10-22",
            "price": 1939.65
          },
          {
            "date": "10-23",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "09-24",
            "price": 1930.0
          },
          {
            "date": "09-25",
            "price": 1930.96
          },
          {
            "date": "09-26",
            "price": 1931.93
          },
          {
            "date": "09-27",
            "price": 1932.9
          },
          {
            "date": "09-28",
            "price": 1933.86
          },
          {
            "date": "09-29",
            "price": 1934.82
          },
          {
            "date": "09-30",
            "price": 1935.79
          },
          {
            "date": "10-01",
            "price": 1936.76
          },
          {
            "date": "10-02",
            "price": 1937.72
          },
          {
            "date": "10-03",
            "price": 1938.68
          },
          {
            "date": "10-04",
            "price": 1939.65
          },
          {
            "date": "10-05",
            "price": 1940.62
          },
          {
            "date": "10-06",
            "price": 1941.58
          },
          {
            "date": "10-07",
            "price": 1942.54
          },
          {
            "date": "10-08",
            "price": 1943.51
          },
          {
            "date": "10-09",
            "price": 1944.48
          },
          {
            "date": "10-10",
            "price": 1945.44
          },
          {
            "date": "10-11",
            "price": 1946.4
          },
          {
            "date": "10-12",
            "price": 1947.37
          },
          {
            "date": "10-13",
            "price": 1948.34
          },
          {
            "date": "10-14",
            "price": 1949.3
          },
          {
            "date": "10-15",
            "price": 1950.26
          },
          {
            "date": "10-16",
            "price": 1951.23
          },
          {
            "date": "10-17",
            "price": 1952.2
          },
          {
            "date": "10-18",
            "price": 1953.16
          },
          {
            "date": "10-19",
            "price": 1954.12
          },
          {
            "date": "10-20",
            "price": 1955.09
          },
          {
            "date": "10-21",
            "price": 1956.06
          },
          {
            "date": "10-22",
            "price": 1957.02
          },
          {
            "date": "10-23",
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
            "time": "19:48",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Palm Oil Market Split as Palm Kernel Oil Rallies and Palm Oil Slips — CMB News - CMB News",
          "source": "CMB News",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOdHoycFloblRNRmZjWmFBTjAzUmhsX0R2WHo2WklDQllNTGtKNmpvN2hTMmtHcVpTOTZwM2VXMllMLVktMjRSYnNqLUFRYWF6eHNidVlZWW5rRG1iOWN5R1Q0VmlXWjN2aDFpNWlCLWRtZzE4ai10MHZpMXRuSnZma21fZHVZQnV1bExweE1EaEZ0Yms?oc=5",
          "date": "08-06 16:00"
        },
        {
          "title": "Coconut Oil Prices 2026: Latest Chart, Trends & Forecast - IMARC Group",
          "source": "IMARC Group",
          "link": "https://news.google.com/rss/articles/CBMiY0FVX3lxTE5zUGEyc3ItSUdQTHBOWGMzUkIzYkQwTnU1aDlUTkttbmJRcGhBVDQxODlHdnVHeGhBZXF6QUFMTEtVT1VydllGWkNDMXY2MXgtSEtXSkJmMWs3S3F5d1ZsOTkyMA?oc=5",
          "date": "10-14 16:00"
        },
        {
          "title": "Desiccated coconuts: high supply weighs on prices - Mundus Agri",
          "source": "Mundus Agri",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOSzBxNlpldUhhTjdaNFhEQ1BYOWYxeVlVaFRoSE9NXy1xdnYwVXVjdi0zQ3lmZElLeEI2ZWYxWjhrTGhnUEdkY0pMd2pRUkVqV1NKN3BhX2V3VUkxLWdPa09FcjRIZU5sMFRjOUZXa2RvWnN1ejZzVmpOeUxJLWltTDc0UEZtTG8yQVA0MDduZFRES1U?oc=5",
          "date": "06-30 16:00"
        },
        {
          "title": "Does Coconut Oil Benefit Your Skin? Experts Explain — Plus Products to Shop - TODAY.com",
          "source": "TODAY.com",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTFBQRUtma2JheTljOU9uX09lTVFQcWZhei05X2JMdEhsellRdHl5TS1QVk93ZWdOb3FHOVM5eFFFbVhBYms3Uk5DVE5fOUszczJ6b2pYdkxZSkFvTU9vYVpMZkpVSUtSUktQbFpsR0VHaW4?oc=5",
          "date": "02-04 17:00"
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
      "price": 1324.61,
      "change": -0.98,
      "changePercent": -0.07,
      "high52w": 1587.7,
      "low52w": 1319.52,
      "high24h": 1327.86,
      "low24h": 1321.15,
      "high7d": 1340.95,
      "low7d": 1323.94,
      "high1m": 1367.36,
      "low1m": 1323.94,
      "volume": 0,
      "sparkline": [
        1339.35,
        1340.95,
        1333.43,
        1330.0,
        1323.94,
        1325.59,
        1324.61
      ],
      "history": {
        "7D": [
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
            "date": "10-23",
            "price": 1324.61
          }
        ],
        "1M": [
          {
            "date": "09-22",
            "price": 1350.36
          },
          {
            "date": "09-23",
            "price": 1362.5
          },
          {
            "date": "09-24",
            "price": 1367.36
          },
          {
            "date": "09-27",
            "price": 1354.51
          },
          {
            "date": "09-28",
            "price": 1359.56
          },
          {
            "date": "09-29",
            "price": 1350.5
          },
          {
            "date": "09-30",
            "price": 1356.84
          },
          {
            "date": "10-01",
            "price": 1360.59
          },
          {
            "date": "10-04",
            "price": 1342.56
          },
          {
            "date": "10-05",
            "price": 1343.75
          },
          {
            "date": "10-06",
            "price": 1339.74
          },
          {
            "date": "10-07",
            "price": 1339.08
          },
          {
            "date": "10-08",
            "price": 1342.99
          },
          {
            "date": "10-11",
            "price": 1340.84
          },
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
            "date": "10-23",
            "price": 1324.61
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1316.66
          },
          {
            "time": "11:00",
            "price": 1319.31
          },
          {
            "time": "13:00",
            "price": 1321.96
          },
          {
            "time": "19:48",
            "price": 1324.61
          }
        ],
        "1Y": [
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
            "price": 1350.5
          },
          {
            "date": "2026-09",
            "price": 1325.59
          },
          {
            "date": "2026-10",
            "price": 1324.61
          }
        ]
      },
      "newsEn": [
        {
          "title": "Asia FX steadies as oil surge weighs on risk appetite, yen holds gains - Yahoo Finance UK",
          "source": "Yahoo Finance UK",
          "link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxQeWNzdFoxNDdGaEhxbnJnRDlGR29pR2ZYakstb2lJRGhQbzZpYXBZNlB6dWFSb205VkNlMDdUWWVWS0FabHk5SjVwS1lEdUhtaEJ5aF9xSVlkSnFCem54N002RFRMQkV6dU0zTFU5WWhNcjhsRTJ5b1h5WGNqaUdEcg?oc=5",
          "date": "10-23 13:32"
        },
        {
          "title": "South Korean Won: Hawkish BoK hold supports gains against US Dollar – Societe Generale - FXStreet",
          "source": "FXStreet",
          "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOdUdkRGFqQzZ3UngtS3hDQzZWenBvY0Iyb3VVbUhHb2lpWDZuYXpJZXIySGdaSVU2TGV3XzVDbFBNU0Fka2dIX0doNlU2RmpnSmZuVV9teTlITUhOUVctOUxiUHQ2LWN0bDNuaVRJbVZudzhpcEotR2xOVFo4WHFrYVdROXpGQWJLcmN2aUxRamNZYlQ2YmJxVEhhTHZRaE9SQ1R0N0RxVVNYSVFsUldfT0R5UThwdU9keUZlUDlVeTRXNGlu?oc=5",
          "date": "10-23 03:32"
        },
        {
          "title": "The Semiconductor Selloff Could Be About To Get Much Worse - Mott Capital Management",
          "source": "Mott Capital Management",
          "link": "https://news.google.com/rss/articles/CBMizwJBVV95cUxPdnpoSk10Q3JpNUYtaHIwcW9fUkRfaDJkTU5pdkM3Z09uMG9TaXVKNlluVGE5TzJtWnZYMVo5LWZvRVVJN2FqOWw2Ymh0R3FhYzlOOVhQbE1iUGV4bXpFd1FkeVEtWjNJUTVlTFZqMUJILVRzMU5lOWNlZFZjeHVDYlJPbVRROXpiMHA5bDk2UXZrZ0xBelhXVEJFS05CTFJvQjBpMzIteWlGLVN4Z3RKaEU4S3M3N3NidFpTWHdnUl90T19QMnJ6LVRSSlNtTlpuMXhQT3BGV29GM256amJER2pJZ09MRmh0NHRDazNWRHBPTF9YbFlzUEw5V3NQUk9vODY0Nm9tb2FicGVEUGhmZFV6R2UybEtraUpRS0Z0UzF6eTJPNkczV3lGdkpseEs5bWxHM0hPSENPMWNlakprUWV0WXduOXhwcjdFeEhMZw?oc=5",
          "date": "10-23 07:44"
        },
        {
          "title": "New York Chip Stocks Plunge on AI Investment Jitters; Won-Dollar Exchange Rate Opens in Mid-1,320s - BigGo Finance",
          "source": "BigGo Finance",
          "link": "https://news.google.com/rss/articles/CBMidkFVX3lxTE1RSEpFU2tBMGVvZVNQYmdsUXFIQ0dpWktManYzT25ZQlBFUGlSaDAtRWx2UkpzSTFabDAweG5HdjJvTG9XcHo1WHhtdlo5ZVVSQnhWSXpoOThsVzU3NnRWd1dQcWIxSWowenZDQ2NZLVYxTURiVFE?oc=5",
          "date": "10-23 10:05"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 기술주 불안 고조, 위험회피에 환율 반등 예상 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE5TYldrRmxwMHpGQ0Z3VTdkdkJGc09PNXNReUlKem1OUEZOU0djcWRocEZGM3laVDVQeF9ycDNBdi1NMzQyTHlySVIwWGlEWHJEUTR6WjhUb1RrOHdjckpHMQ?oc=5",
          "date": "10-23 08:08"
        },
        {
          "title": "원화 '전강후약' 흐름 반복 중⋯\"1320원대 중심 등락\" [환율전망] - 이투데이",
          "source": "이투데이",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE0tdHNScXVPdmxnVFMzUkZ0NVVfQkl0MUZwaThvUm1GRVZOMjNvOU9HX3ZNMVIyWjJIV0xqc0NOTkR4by1pc3dDZUl3U0ZQZWYzTk44cw?oc=5",
          "date": "10-23 08:25"
        },
        {
          "title": "KB證 “피에스케이, 사상 최대 실적 전망에도 환율 부담…목표가 36% ↓” - 조선비즈 - Chosunbiz",
          "source": "Chosunbiz",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPUEFXOXJicl9OQm9QVE12dVBZZkRfQTU2VFB4amx0RVRZOW50MmVZU3dVaG9qQlptNnBHdmJZNHJjOUs5OTNDSTFXN2pwUHExSU9zY3NxOHh2eWszWl9ZblYzOWtQb2RYZnRrN0ExVGVnZWVnaG1BXzZocUtTbHkwWGpDazI5dXZ60gGcAUFVX3lxTE5vNTVDaXo5bFZkU3E4dS1iY282WUhtTjZlRmhkYkFaSEJwMGxfcVdBQjRQQnB5QmhNWWNkTnd2YVBRTzdYbUxpUTN1b21KYlFsOXV4Z29xcHpZTFdHQ3JLUHp4VGRfSDRMUk5Nem96NTg2WXVvYURrNG9vTEVzeWExeUJLVHQwcHJFR2ZuUzFOdkw2azhGOS1Bbk1OUw?oc=5",
          "date": "10-23 07:50"
        },
        {
          "title": "[환율 전망] 변동성 줄어든 시장, 여전히 환율 하락에 무게 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE9hT1BUdWxOQTlETTdlS3hMWVVNRlJncFozYkNMM29QVWdnSzV5RC1EWm9JTnRMaXZkMVdTeW50T0NLUG5JQng2OTk0NG1tbUxWNkJUTGozbkw4d2xlakpmTw?oc=5",
          "date": "10-22 08:10"
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
      "price": 1483.2,
      "change": -5.93,
      "changePercent": -0.4,
      "high52w": 1807.42,
      "low52w": 1480.63,
      "high24h": 1487.3,
      "low24h": 1481.5,
      "high7d": 1501.45,
      "low7d": 1483.2,
      "high1m": 1555.87,
      "low1m": 1483.2,
      "volume": 0,
      "sparkline": [
        1499.15,
        1501.45,
        1498.22,
        1490.66,
        1485.7,
        1489.13,
        1483.2
      ],
      "history": {
        "7D": [
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
            "date": "10-23",
            "price": 1483.2
          }
        ],
        "1M": [
          {
            "date": "09-22",
            "price": 1548.51
          },
          {
            "date": "09-23",
            "price": 1552.71
          },
          {
            "date": "09-24",
            "price": 1555.87
          },
          {
            "date": "09-27",
            "price": 1545.78
          },
          {
            "date": "09-28",
            "price": 1544.98
          },
          {
            "date": "09-29",
            "price": 1531.43
          },
          {
            "date": "09-30",
            "price": 1536.13
          },
          {
            "date": "10-01",
            "price": 1528.21
          },
          {
            "date": "10-04",
            "price": 1507.81
          },
          {
            "date": "10-05",
            "price": 1506.39
          },
          {
            "date": "10-06",
            "price": 1506.13
          },
          {
            "date": "10-07",
            "price": 1499.4
          },
          {
            "date": "10-08",
            "price": 1503.66
          },
          {
            "date": "10-11",
            "price": 1502.28
          },
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
            "date": "10-23",
            "price": 1483.2
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1474.3
          },
          {
            "time": "11:00",
            "price": 1477.27
          },
          {
            "time": "13:00",
            "price": 1480.23
          },
          {
            "time": "19:48",
            "price": 1483.2
          }
        ],
        "1Y": [
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
            "price": 1531.43
          },
          {
            "date": "2026-09",
            "price": 1489.13
          },
          {
            "date": "2026-10",
            "price": 1483.2
          }
        ]
      },
      "newsEn": [
        {
          "title": "EUR/USD - CME Group",
          "source": "CME Group",
          "link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTE5TOHhsc003RkJFbkd3V1RWbUhmY1BacUR5anNONTZiR29xbmZ2Umx0RDVWNEdwRWZmY2EyNUloclZXYVZLWWVTTGNNYjRwNFB1NHJ1Zk5kbWExZGs?oc=5",
          "date": "10-22 09:00"
        },
        {
          "title": "Earnings call transcript: Atlas Copco Q3 2026 orders hit record as stock falls - Investing.com UK",
          "source": "Investing.com UK",
          "link": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxQX1ZydFRLdWRFZmxqNzB5aE9pZXg2N3NSekMyNTVkTUlQS1JhQ1ctNTVORUtxNWxXMXowWlBsOU1faFVVOXhzVDJGbzhhQmEwTGwtendEZXNIXzIycXFYd0ZWQjRadzR4Z201MFJxRjJpTlVQSkw2ak81a3dZN3dPZjZndUIyZlctcFUxVzJCSlpIS2hUU1JBZ0NNalRuZHl0d05mSVdUSVQxVmg0bWJySDdxUjZmaE80R0RCREJhOFVmaV9UYkJmN19wNE9kSXJoMDR6dA?oc=5",
          "date": "10-22 22:06"
        },
        {
          "title": "CBA currency exchange rates (23.10.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMidkFVX3lxTE01RDd1WFhkY1FxSEptelpyeVdwU3A2VTZnUXZqZlgzQmVUSktmTEZBTk5wYTVKaDlHTy1mZkp6dXpuWElQS05CbDJZRFhYS0hEcFBOR3JxSm1pVnVHamNzSFBPNzFJcXdIMTlnNmZ6NG91ZjJZdkE?oc=5",
          "date": "10-23 14:20"
        },
        {
          "title": "Iran releases currency exchange rates for October 22 - Trend News Agency",
          "source": "Trend News Agency",
          "link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTE1JdUNxR1R3cThMUFZrbENHb3RteEZvcWo3QWE2Q3RZM3RPTEFMd0kwZlFyZXRDci1maENJLTJCVzhIbXNySkV4cXJEMUdIajg?oc=5",
          "date": "10-22 14:25"
        }
      ],
      "newsKr": [
        {
          "title": "[단독] “자동차 주식은 좋은 일이 아예 없나요?”…환율까지 안도와준다는데 - 매일경제",
          "source": "매일경제",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTFBqV0ctMWx3U21tVzRBSGZRaEJiSmdESUNpd0otNFRxNXhLSWMxX200Y3VDeldNYjJoRExHQzhMVzFkU2JvcmdsV1FBdVpHVE9odnc?oc=5",
          "date": "10-22 20:38"
        },
        {
          "title": "美 반도체주 급락·유가 급등…환율 1320원대 공방[외환 브리핑] - 이데일리",
          "source": "이데일리",
          "link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxPOWlyYVBpRUl4anVGRW5ITEVqaGtJdmVyUFRkMnFUeFdDbzR5d0UyWlhENjc3MU4xRGpmVkRVWm9XSU5veVZoS1JCa1I5T1I2WjlNME54ZUdmajlWbWxUZkZKT05US2k2OVU4RFZZTHoyNVlwSURXdTl1UVM3UFlZNg?oc=5",
          "date": "10-23 08:04"
        },
        {
          "title": "USD/CAD 환율 전망: 1.4100 하회했지만 핵심 지지선 위에서 완만한 강세 기조 유지 - www.tmgm.com",
          "source": "www.tmgm.com",
          "link": "https://news.google.com/rss/articles/CBMi7gFBVV95cUxQSVFNa25ZdFgxX3JiYkppbmVJVHZHaGwwalJuUUlrcXJXc1ljOTRmOWR2dHVIYXpDaUhtUGw2RzBnYzZlUWNHSnZtMFRmRU1wWHBKVzNTd2U3dS1SY3E5b1pfM1phVExnZkNHNWRuSmpXUDJrNk16cGpFcnZxMnFrQnNqOTdmV2ZaQVlDWTg1eUJzbGtaQ21WcmE1X1ZRZTJjSURWcEJBczg1VHpMZENTblNYQUlJaDYwX1hQUnRXbXBudVZvY1gwd1p2RjdYbTVEWHAzT3FvaUxxY1VVSkhFQ3dibEUwYS1qT29oc0V3?oc=5",
          "date": "10-21 04:09"
        },
        {
          "title": "USD/JPY 환율 전망: 미 달러, 200일 단순이동평균선 돌파에 재차 실패한 뒤 하락 - www.tmgm.com",
          "source": "www.tmgm.com",
          "link": "https://news.google.com/rss/articles/CBMi2wFBVV95cUxOd3VPZHlIcnRNeXRSWDloQU5uN2Y1cVhreWNRYl9wSUNXV0hDd1g1UWhSdUluX05pc05MSHRDalJQVU5BX25CLVVmV2JvVU9YR3hMclBDNllFY0M5TGNwN0IteUFBd29yQVBRczI2eVBNNUE1ZEgyZEZoWllFQ0VHQXB1SmJOaTBEeXZVUk5LQ0h6TU9xQkhWNndKTWtBWVlLZ1RUVXdCMTR1ZWZtbnFLaEFHbHVMTU1Kdk5xc3Y2OVNteHVHRUhaUVdrUXhGd0x5OGoycVM4dTg4blk?oc=5",
          "date": "10-21 06:47"
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
