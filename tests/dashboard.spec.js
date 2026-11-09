
describe("COVID-19 Early Outbreak Dashboard", function () {

    describe("Page structure", function () {
        it("should have the correct page title", function () {
            expect(document.title).toBe("COVID-19 Early Outbreak Dashboard");
        });

        it("should display the dashboard heading", function () {
            expect(document.querySelector("h1").textContent)
                .toBe("COVID-19 Dashboard");
        });

        it("should display the historical dataset status", function () {
            expect(document.querySelector(".status").textContent)
                .toBe("Historical dataset");
        });

        it("should display the correct analysis period", function () {
            expect(document.body.textContent)
                .toContain("February–March 2020");
        });
    });

    describe("Filter elements", function () {
        it("should contain a country selector", function () {
            expect(document.getElementById("countrySelect")).not.toBeNull();
        });

        it("should contain a start date input", function () {
            const startDate = document.getElementById("startDate");

            expect(startDate).not.toBeNull();
            expect(startDate.type).toBe("date");
            expect(startDate.value).toBe("2020-02-01");
        });

        it("should contain an end date input", function () {
            const endDate = document.getElementById("endDate");

            expect(endDate).not.toBeNull();
            expect(endDate.type).toBe("date");
            expect(endDate.value).toBe("2020-03-31");
        });

        it("should restrict dates to the required period", function () {
            expect(document.getElementById("startDate").min)
                .toBe("2020-02-01");

            expect(document.getElementById("endDate").max)
                .toBe("2020-03-31");
        });

        it("should contain a reset filters button", function () {
            const button = document.getElementById("resetFilter");

            expect(button).not.toBeNull();
            expect(button.textContent).toBe("Reset filters");
        });
    });

    describe("COVID-19 metric cards", function () {
        const metricIds = [
            "confirmedCases",
            "totalDeaths",
            "totalRecovered",
            "activeCases"
        ];

        it("should display all four metric values", function () {
            metricIds.forEach(function (id) {
                expect(document.getElementById(id)).not.toBeNull();
            });
        });

        it("should initialise metric values with a placeholder", function () {
            metricIds.forEach(function (id) {
                expect(document.getElementById(id).textContent).toBe("—");
            });
        });

        it("should display the confirmed cases label", function () {
            expect(document.querySelector(".confirmed").textContent)
                .toContain("Confirmed cases");
        });

        it("should display the deaths label", function () {
            expect(document.querySelector(".deaths").textContent)
                .toContain("Deaths");
        });

        it("should display the recoveries label", function () {
            expect(document.querySelector(".recovered").textContent)
                .toContain("Recoveries");
        });

        it("should display the active cases label", function () {
            expect(document.querySelector(".active").textContent)
                .toContain("Active cases");
        });
    });

    describe("Charts", function () {
        it("should contain the outbreak trends chart", function () {
            expect(document.getElementById("trendChart")).not.toBeNull();
        });

        it("should contain the daily cases chart", function () {
            expect(document.getElementById("dailyChart")).not.toBeNull();
        });

        it("should use canvas elements for charts", function () {
            expect(document.getElementById("trendChart").tagName)
                .toBe("CANVAS");

            expect(document.getElementById("dailyChart").tagName)
                .toBe("CANVAS");
        });

        it("should display the outbreak trends heading", function () {
            expect(document.body.textContent)
                .toContain("Outbreak trends");
        });

        it("should display the new confirmed cases heading", function () {
            expect(document.body.textContent)
                .toContain("New confirmed cases");
        });

        it("should explain average daily increases", function () {
            expect(document.querySelector(".chart-note"))
                .not.toBeNull();
        });
    });

    describe("Country insights", function () {
        it("should contain the country insight section", function () {
            expect(document.getElementById("countryInsight"))
                .not.toBeNull();
        });

        it("should display the country insight heading", function () {
            expect(document.body.textContent)
                .toContain("Country insight");
        });
    });

    describe("Messages and accessibility", function () {
        it("should contain a status message element", function () {
            expect(document.getElementById("message")).not.toBeNull();
        });

        it("should support accessible status announcements", function () {
            const message = document.getElementById("message");

            expect(message.getAttribute("role")).toBe("status");
            expect(message.getAttribute("aria-live")).toBe("polite");
        });

        it("should provide accessible chart labels", function () {
            expect(document.getElementById("trendChart")
                .getAttribute("aria-label"))
                .toBe("Line chart of COVID-19 trends");

            expect(document.getElementById("dailyChart")
                .getAttribute("aria-label"))
                .toBe("Bar chart of average daily new cases");
        });
    });

    describe("Footer", function () {
        it("should display the Johns Hopkins CSSE data source", function () {
            expect(document.body.textContent)
                .toContain("COVID-19 Data Repository by Johns Hopkins CSSE");
        });

        it("should display the historical analysis notice", function () {
            expect(document.body.textContent)
                .toContain("For historical analysis only");
        });
    });

});
