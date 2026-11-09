
// COVID-19 Early Outbreak Dashboard
// Loads JSON, calculates metrics and renders Chart.js charts.

// ==========================================
// GLOBAL VARIABLES
// ==========================================

let countries = [];
let trendChart = null;
let dailyChart = null;

// ==========================================
// HTML ELEMENTS
// ==========================================

const countrySelect = document.getElementById("countrySelect");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const message = document.getElementById("message");

// ==========================================
// HELPER FUNCTION
// ==========================================

const numberFormat = value =>
    Number(value).toLocaleString("en-US");

// ==========================================
// LOAD COVID-19 DATASET
// ==========================================

async function loadData() {
    try {
        const response = await fetch("data/covid-19.json");

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: could not load JSON`
            );
        }

        const dataset = await response.json();

        if (!dataset || !Array.isArray(dataset.countries)) {
            throw new Error(
                "The JSON file does not contain a countries array."
            );
        }

        countries = dataset.countries;

        console.log("COVID-19 dataset loaded:", dataset);

        populateCountries();

    } catch (error) {

        console.error("Dataset loading error:", error);

        message.textContent =
            "Could not load the dataset. Run this project with Live Server and check data/covid-19.json.";

        countrySelect.innerHTML =
            '<option value="">Data unavailable</option>';
    }
}

// ==========================================
// POPULATE COUNTRY DROPDOWN
// ==========================================

function populateCountries() {

    countrySelect.innerHTML = "";

    countries.forEach(country => {

        const option = document.createElement("option");

        option.value = country.country;
        option.textContent = country.country;

        countrySelect.appendChild(option);
    });

    // Select China by default when available.

    if (countries.some(country => country.country === "China")) {
        countrySelect.value = "China";
    }

    updateDashboard();
}

// ==========================================
// GET SELECTED COUNTRY
// ==========================================

function selectedCountry() {

    return countries.find(
        country => country.country === countrySelect.value
    );
}

// ==========================================
// FILTER RECORDS BY DATE
// ==========================================

function filteredRecords(country) {

    if (!country || !Array.isArray(country.data)) {
        return [];
    }

    return [...country.data]
        .filter(row =>
            row.date >= startDateInput.value &&
            row.date <= endDateInput.value
        )
        .sort((a, b) =>
            a.date.localeCompare(b.date)
        );
}

// ==========================================
// DISPLAY COVID-19 METRICS
// ==========================================

function showMetrics(records) {

    const ids = [
        "confirmedCases",
        "totalDeaths",
        "totalRecovered",
        "activeCases"
    ];

    // Handle empty records.

    if (!records.length) {

        ids.forEach(id => {
            document.getElementById(id).textContent = "—";
        });

        return;
    }

    // Get the latest observation.

    const latest = records[records.length - 1];

    // Calculate active cases.

    const active =
        latest.confirmed -
        latest.deaths -
        latest.recovered;

    // Display formatted values.

    document.getElementById("confirmedCases").textContent =
        numberFormat(latest.confirmed);

    document.getElementById("totalDeaths").textContent =
        numberFormat(latest.deaths);

    document.getElementById("totalRecovered").textContent =
        numberFormat(latest.recovered);

    document.getElementById("activeCases").textContent =
        numberFormat(active);
}

// ==========================================
// RENDER OUTBREAK TREND LINE CHART
// ==========================================

function renderTrendChart(records) {

    if (trendChart) {
        trendChart.destroy();
    }

    trendChart = new Chart(
        document.getElementById("trendChart"),
        {
            type: "line",

            data: {
                labels: records.map(row => row.date),

                datasets: [

                    {
                        label: "Confirmed cases",
                        data: records.map(row => row.confirmed),
                        borderColor: "#2563eb",
                        backgroundColor: "#2563eb",
                        borderWidth: 3,
                        tension: 0.25
                    },

                    {
                        label: "Deaths",
                        data: records.map(row => row.deaths),
                        borderColor: "#ef4444",
                        backgroundColor: "#ef4444",
                        borderWidth: 3,
                        tension: 0.25
                    },

                    {
                        label: "Recoveries",
                        data: records.map(row => row.recovered),
                        borderColor: "#16a34a",
                        backgroundColor: "#16a34a",
                        borderWidth: 3,
                        tension: 0.25
                    }

                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                interaction: {
                    mode: "index",
                    intersect: false
                },

                plugins: {
                    legend: {
                        position: "top"
                    }
                },

                scales: {

                    y: {
                        beginAtZero: true,

                        title: {
                            display: true,
                            text: "Cumulative people"
                        }
                    },

                    x: {
                        title: {
                            display: true,
                            text: "Recorded date"
                        }
                    }

                }
            }
        }
    );
}

// ==========================================
// CALCULATE INTERVAL INCREASES
// ==========================================

// The dataset contains selected observations,
// not necessarily daily observations.
//
// Calculate the average daily increase between
// consecutive observations.

function calculateIntervalIncreases(country) {

    if (!country || !Array.isArray(country.data)) {
        return [];
    }

    const rows = [...country.data].sort(
        (a, b) => a.date.localeCompare(b.date)
    );

    const intervals = [];

    for (let i = 1; i < rows.length; i++) {

        const previous = rows[i - 1];
        const current = rows[i];

        const start = new Date(
            previous.date + "T00:00:00Z"
        );

        const end = new Date(
            current.date + "T00:00:00Z"
        );

        const days = Math.round(
            (end - start) / 86400000
        );

        if (days <= 0) {
            continue;
        }

        const increase =
            current.confirmed - previous.confirmed;

        intervals.push({

            startDate: previous.date,

            endDate: current.date,

            days: days,

            increase: increase,

            averagePerDay: increase / days

        });
    }

    return intervals.filter(item =>

        item.endDate >= startDateInput.value &&
        item.endDate <= endDateInput.value

    );
}

// ==========================================
// RENDER DAILY CASES BAR CHART
// ==========================================

function renderDailyChart(country) {

    if (dailyChart) {
        dailyChart.destroy();
    }

    const intervals =
        calculateIntervalIncreases(country);

    dailyChart = new Chart(
        document.getElementById("dailyChart"),
        {
            type: "bar",

            data: {

                labels: intervals.map(item =>
                    `${item.startDate} to ${item.endDate}`
                ),

                datasets: [

                    {
                        label: "Average new confirmed cases per day",

                        data: intervals.map(item =>
                            item.averagePerDay
                        ),

                        backgroundColor: "#60a5fa",

                        borderRadius: 5
                    }

                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: true
                    },

                    tooltip: {

                        callbacks: {

                            label: context => {

                                const item =
                                    intervals[context.dataIndex];

                                return [

                                    `Average per day: ${numberFormat(
                                        Math.round(item.averagePerDay)
                                    )}`,

                                    `Total increase in interval: ${numberFormat(
                                        item.increase
                                    )}`,

                                    `Days in interval: ${item.days}`

                                ];
                            }

                        }
                    }
                },

                scales: {

                    y: {

                        beginAtZero: true,

                        title: {
                            display: true,
                            text: "Average new cases per day"
                        }
                    },

                    x: {

                        title: {
                            display: true,
                            text: "Observation interval"
                        }
                    }

                }
            }
        }
    );
}

// ==========================================
// UPDATE COUNTRY INSIGHTS
// ==========================================

function updateInsight(country, records) {

    const element =
        document.getElementById("countryInsight");

    if (!records.length) {

        element.textContent =
            "There are no recorded observations for this country in the selected date range.";

        return;
    }

    const first = records[0];

    const latest = records[records.length - 1];

    const increase =
        latest.confirmed - first.confirmed;

    element.textContent =
        `${country.country} had ${numberFormat(latest.confirmed)} cumulative confirmed cases at its latest available observation (${latest.date}) in this selected period. Confirmed cases changed by ${numberFormat(increase)} between the first and last observations shown.`;
}

// ==========================================
// UPDATE ENTIRE DASHBOARD
// ==========================================

function updateDashboard() {

    const country = selectedCountry();

    if (!country) {
        return;
    }

    // Validate selected dates.

    if (
        !startDateInput.value ||
        !endDateInput.value ||
        startDateInput.value > endDateInput.value
    ) {

        message.textContent =
            "Choose a valid date range: the start date must not be after the end date.";

        return;
    }

    message.textContent = "";

    // Filter records.

    const records = filteredRecords(country);

    // Handle empty results.

    if (!records.length) {

        message.textContent =
            "No recorded observations are available in this date range. Try a wider range.";
    }

    // Update dashboard components.

    showMetrics(records);

    renderTrendChart(records);

    renderDailyChart(country);

    updateInsight(country, records);
}

// ==========================================
// RESET FILTERS
// ==========================================

function resetFilters() {

    startDateInput.value = "2020-02-01";

    endDateInput.value = "2020-03-31";

    updateDashboard();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

countrySelect.addEventListener(
    "change",
    updateDashboard
);

startDateInput.addEventListener(
    "change",
    updateDashboard
);

endDateInput.addEventListener(
    "change",
    updateDashboard
);

document.getElementById("resetFilter").addEventListener(
    "click",
    resetFilters
);

// ==========================================
// JASMINE TEST ACCESS
// ==========================================

// Expose functions for automated testing.

window.dashboardTest = {

    loadData,

    populateCountries,

    selectedCountry,

    filteredRecords,

    showMetrics,

    renderTrendChart,

    calculateIntervalIncreases,

    renderDailyChart,

    updateInsight,

    updateDashboard,

    resetFilters,

    getCountries: () => countries,

    getTrendChart: () => trendChart,

    getDailyChart: () => dailyChart

};

// ==========================================
// INITIALISE DASHBOARD
// ==========================================

// Normal dashboard operation automatically loads data.
//
// Jasmine tests can set:
// window.__DASHBOARD_TEST_MODE__ = true
//
// before loading this file to prevent automatic
// data loading during test setup.

if (!window.__DASHBOARD_TEST_MODE__) {

    loadData();

}
