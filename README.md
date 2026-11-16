# COVID-19 Interactive Dashboard

## Project Description

An interactive web dashboard for exploring the supplied COVID-19 historical time-series dataset from 1 February to 31 March 2020.

## Features

- Country selector for China, Italy, South Korea, United States and South Africa.
- Metric cards for confirmed cases, deaths, recoveries and active cases.
- Cumulative line chart.
- Bar chart showing average daily confirmed-case increases between recorded observations.
- Start and end date filters with a reset button.
- Responsive desktop and tablet layout.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- Chart.js

## Project Structure

```text
covid-19-dashboard/
├── index.html
├── README.md
├── data/
│   └── covid-19.json
├── css/
│   └── style.css
├── js/
│   └── dashboard.js
├── spec/
├── tests/
├── package.json
└── package-lock.json
```

## How to Run the Application

Follow these steps to run the COVID-19 dashboard locally on your computer.

### Prerequisites

Before running the application, make sure you have:

- Visual Studio Code installed.
- Google Chrome or another modern web browser.
- The Live Server extension installed in Visual Studio Code.
- An active internet connection to load Chart.js from its CDN.

### Step 1: Download or Clone the Repository

Clone the project from GitHub using the following command:

```bash
git clone https://github.com/aphelele-bojana/Dashboard-Covid-19-.git
```

Alternatively, download the repository as a ZIP file from GitHub and extract it to your computer.

### Step 2: Open the Project in Visual Studio Code

1. Launch Visual Studio Code.
2. Select File → Open Folder.
3. Navigate to the extracted `covid-19-dashboard` project folder.
4. Select the folder and open it.

### Step 3: Install Live Server

1. Open the Extensions panel in Visual Studio Code.
2. Search for Live Server.
3. Install the extension.
4. Wait for the installation to finish.

### Step 4: Run the Application

1. Locate `index.html` in the project folder.
2. Right-click the file.
3. Select Open with Live Server.
4. Your default browser will automatically open the dashboard.

The application should now be running locally.

### Step 5: Explore the Dashboard

Once the dashboard opens, you can:

- Select a country from the country dropdown.
- View confirmed cases, deaths, recoveries and active cases.
- Explore cumulative COVID-19 trends using the line chart.
- Examine average daily confirmed-case increases using the bar chart.
- Select a start and end date to filter the displayed information.
- Use the reset button to restore the default date range.

Important: Do not open `index.html` directly using the `file://` protocol. The application uses JavaScript `fetch()` to load the JSON dataset, so it must run through a local web server such as Live Server.

## Calculation Notes

Active cases = latest confirmed cases − latest deaths − latest recoveries.

The supplied dataset contains observations on selected dates rather than every calendar day.

For each pair of consecutive observations:

- Interval increase = current cumulative confirmed cases − previous cumulative confirmed cases.
- Average daily increase = interval increase ÷ number of calendar days between observations.

The bar chart labels each interval and reports its total increase and average per day in the tooltip.

These averages should not be interpreted as exact daily reported case counts. The first observation has no preceding observation, so no interval increase is calculated for it.

The dashboard does not invent values for missing dates. The line chart displays only the available observations. Metric cards show the latest available observation within the selected date range.

## Testing Checklist

- Confirm that the JSON dataset loads successfully.
- Check all five countries in the dropdown.
- Verify 31 March 2020 totals against the supplied dataset:

| Country | Confirmed Cases |
|---|---:|
| China | 81,554 |
| Italy | 105,792 |
| South Korea | 9,786 |
| United States | 188,172 |
| South Africa | 1,353 |

- Check that South Africa's first supplied observation is 5 March 2020, with one confirmed case.
- Check Italy's rapid March growth and China's large February increase.
- Change the date filters and test the reset button.
- Resize the browser to test tablet and desktop layouts.
- Check the browser developer console for errors.

## Data Source

COVID-19 Data Repository by Johns Hopkins CSSE, as identified in the supplied project dataset.

The dashboard presents the supplied sample observations and does not independently verify or supplement them.
