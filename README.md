# COVID-19 Early Outbreak Dashboard

## Project description
An interactive web dashboard for exploring the supplied COVID-19 historical time-series dataset from 1 February to 31 March 2020.

## Features
- Country selector for China, Italy, South Korea, United States and South Africa.
- Metric cards for confirmed cases, deaths, recoveries and active cases.
- Cumulative line chart.
- Bar chart of average daily confirmed-case increases between recorded observations.
- Start/end date filters and reset button.
- Responsive desktop and tablet layout.

## Technologies
HTML5, CSS3, JavaScript, JSON and Chart.js.

## Project structure
```text
covid-19-dashboard/
├── index.html
├── README.md
├── data/
│   └── covid-19.json
├── css/
│   └── style.css
└── js/
    └── dashboard.js
```

## Run locally
1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Keep an internet connection available so Chart.js can load from its CDN.

Do not open `index.html` directly using `file://`; the browser must serve the JSON file over HTTP for `fetch()` to work.

## Calculation notes
**Active cases** = latest confirmed cases − latest deaths − latest recoveries.

The supplied data has observations only on selected dates, not every calendar day. For each pair of consecutive observations:

- Interval increase = current cumulative confirmed − previous cumulative confirmed.
- Average daily increase = interval increase ÷ number of calendar days between observations.

The bar chart labels each interval and reports its total increase and average per day in the tooltip. These averages must not be interpreted as exact daily reported case counts. The first observation has no preceding observation, so no interval increase is calculated for it.

The dashboard does not invent values for missing dates. The line chart displays the available observations only. Metric cards show the latest available observation inside the selected date range.

## Testing checklist
- Confirm JSON loads (check browser developer console).
- Check all five countries in the dropdown.
- Verify 31 March totals against the supplied dataset:
  - China: 81,554 confirmed
  - Italy: 105,792 confirmed
  - South Korea: 9,786 confirmed
  - United States: 188,172 confirmed
  - South Africa: 1,353 confirmed
- Check South Africa's first supplied observation is 5 March 2020 with one confirmed case.
- Check Italy's rapid March growth and China's large February increase.
- Change date filters and test reset.
- Resize browser to tablet and desktop widths.

## Data source
COVID-19 Data Repository by Johns Hopkins CSSE, as identified in the supplied project dataset. The dashboard presents the supplied sample observations and does not independently verify or supplement them.
