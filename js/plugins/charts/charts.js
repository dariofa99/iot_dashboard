export class Charts {
    charts = {};

    chartCreated(divId) {
        return this.charts[divId] !== undefined && this.charts[divId] != null;
    }

    getChart(divId) {
        return this.charts[divId];
    }

    addChart(divId, chart) {
        this.charts[divId] = chart;
    }

    removeChart(divId) {
        this.charts[divId] = null;
    }

    createOrUpdateChart(divId, chartType, data, options) {
        var chart;

        // If the chart was previously created, use its object
        if (this.chartCreated(divId)) {
            chart = this.getChart(divId);
            console.log("Por qui")
        }
        else 
        {
            chart = this.initializeNewChart(chartType, divId);
            this.addChart(divId, chart);
            console.log("Por acas")
        }

        //console.log(chart);
        console.log(data);
        // Create a new DataTable object using the JavaScript Literal Initializer, and the received JSON data object
        //data = new google.visualization.DataTable(data);
        //gauge_data = google.visualization.arrayToDataTable(data)
        // Render chart
        chart.draw(data, options);
    }

    initializeNewChart(type, divId) {
        var container = document.getElementById(divId);
        switch (type) {
            case "scatter": return new google.visualization.ScatterChart(container);
            case "column": return new google.visualization.ColumnChart(container);
            case "line": return new google.visualization.LineChart(container);
            case "gauge": return new google.visualization.Gauge(container);;
            case "bar": return new google.visualization.LineChart(container);
            default: return null;
        }
    }
}