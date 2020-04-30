var pivot = new WebDataRocks({
    container: "wdr-component",
    width: "100%",
    height: 630,
    width: 700,
    toolbar: true,
    report: {
        "dataSource": {
            "dataSourceType": "json",
            "data": getData()
        },
        "slice": {
            "reportFilters": [{
                "uniqueName": "Date.Month"
            }],
            "rows": [{
                    "uniqueName": "Channel"
                },
                {
                    "uniqueName": "Campaign"
                }
            ],
            "columns": [{
                "uniqueName": "Measures"
            }],
            "measures": [{
                    "uniqueName": "Users",
                    "aggregation": "sum",
                    "active": false
                },
                {
                    "uniqueName": "Leads",
                    "aggregation": "sum",
                    "active": false
                },
                {
                    "uniqueName": "Opportunities",
                    "aggregation": "sum",
                    "active": false
                },
                {
                    "uniqueName": "Sales",
                    "aggregation": "sum",
                    "active": false
                },
                {
                    "uniqueName": "Campaign Cost",
                    "aggregation": "sum"
                },
                {
                    "uniqueName": "Revenue",
                    "formula": "sum(\"Sales\") * sum(\"Purchase Cost\")",
                    "caption": "Revenue",
                    "individual": true
                },
                {
                    "uniqueName": "Gross Profit",
                    "formula": "sum(\"Revenue\") - sum(\"Campaign Cost\")",
                    "caption": "Gross Profit",
                    "individual": true
                },
                {
                    "uniqueName": "ROI",
                    "formula": "(sum(\"Gross Profit\") - sum(\"Campaign Cost\")) / sum(\"Campaign Cost\")",
                    "caption": "ROI",
                    "format": "roi_format",
                    "active": false
                },
                {
                    "uniqueName": "Conversion Rate",
                    "formula": "sum(\"Leads\") / sum(\"Clicks\") ",
                    "individual": true,
                    "caption": "Conversion Rate",
                    "active": false
                },
                {
                    "uniqueName": "CPL",
                    "formula": "sum(\"Campaign Cost\") / sum(\"Leads\") ",
                    "caption": "CPL",
                    "active": false
                },
                {
                    "uniqueName": "CPO",
                    "formula": "sum(\"Campaign Cost\") / sum(\"Opportunities\") ",
                    "caption": "CPO",
                    "active": false
                },
                {
                    "uniqueName": "CPS",
                    "formula": "sum(\"Campaign Cost\") / sum(\"Sales\") ",
                    "caption": "CPS",
                    "active": false
                }
            ],
            "expands": {
                "rows": [{
                        "tuple": [
                            "Channel.Display Ads"
                        ]
                    },
                    {
                        "tuple": [
                            "Channel.SEM"
                        ]
                    },
                    {
                        "tuple": [
                            "Channel.Social"
                        ]
                    }
                ]
            }
        },
        "options": {
            "grid": {
                "type": "classic"
            }
        },
        "formats": [{
                "name": "",
                "maxDecimalPlaces": 2
            },
            {
                "name": "roi_format",
                "thousandsSeparator": " ",
                "decimalSeparator": ".",
                "currencySymbol": "%",
                "currencySymbolAlign": "right",
                "nullValue": "",
                "textAlign": "right",
                "isPercent": false
            }
        ],
        "conditions": [{
                "formula": "#value <= 13000",
                "measure": "Revenue",
                "format": {
                    "backgroundColor": "#f0f7da",
                    "color": "#000000",
                    "fontFamily": "Lucida Sans Unicode",
                    "fontSize": "12px"
                }
            },
            {
                "formula": "AND(#value > 13000, #value < 40000)",
                "measure": "Revenue",
                "format": {
                    "backgroundColor": "#c9df8a",
                    "color": "#000000",
                    "fontFamily": "Lucida Sans Unicode",
                    "fontSize": "12px"
                }
            },
            {
                "formula": "#value >= 40000",
                "measure": "Revenue",
                "format": {
                    "backgroundColor": "#77ab59",
                    "color": "#000000",
                    "fontFamily": "Lucida Sans Unicode",
                    "fontSize": "12px"
                }
            }
        ]

    },
    reportcomplete: function() {
        pivot.off("reportcomplete");
        pivotTableReportComplete = true;
        createGoogleChart1();
        createGoogleChart2();
        createGoogleChart3();
        createGoogleChart4();
        createGoogleChart5();
        createGoogleChart6();
        createGoogleChart7();
        createGoogleChart8();
        createLineChart();
        createLineChart2();
        createLineChart3();
        createLineChart4();
        createLineChart5();
    }
});
var pivotTableReportComplete = false;
var googleChartsLoaded = false;

google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(onGoogleChartsLoaded);


function onGoogleChartsLoaded() {
    googleChartsLoaded = true;
    if (pivotTableReportComplete) {
        createGoogleChart1();
        createGoogleChart2();
        createGoogleChart3();
        createGoogleChart4();
        createGoogleChart5();
        createGoogleChart6();
        createGoogleChart7();
        createGoogleChart8();
        createLineChart();
        createLineChart2();
        createLineChart3();
        createLineChart4();
        createLineChart5();
    }
}

function createGoogleChart1() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "rows": [{
                        "uniqueName": "Date.Month"
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                            "uniqueName": "Total Leads",
                            "formula": "sum(\"Leads\")",
                            "caption": "Total Leads"
                        },
                        {
                            "uniqueName": "Total Opportunities",
                            "formula": "sum(\"Opportunities\")",
                            "caption": "Total Opportunities"
                        },
                        {
                            "uniqueName": "Total Sales",
                            "formula": "sum(\"Sales\")",
                            "caption": "Total Sales"
                        }
                    ]
                }
            },
            drawChart1,
            drawChart1
        );
    }
}

function drawChart1(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#5D353E'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#5D353E'
        },
        fontSize: 18,
        title: "Leads, Opportunities, Sales per Months",
        colors: ["#1b9e77", "#d95f02", "#7570b3"],
        legend: 'bottom',
        isStacked: true
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container1'));
    chart.draw(data, options);
}

function createGoogleChart2() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "reportFilters": [{
                        "uniqueName": "Channel",
                        "filter": {
                            "members": [
                                "Channel.Display Ads"
                            ]
                        }
                    }],
                    "rows": [{
                        "uniqueName": "Date.Month"
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                            "uniqueName": "Total Leads",
                            "formula": "sum(\"Leads\")",
                            "caption": "Total Leads"
                        },
                        {
                            "uniqueName": "Total Opportunities",
                            "formula": "sum(\"Opportunities\")",
                            "caption": "Total Opportunities"
                        },
                        {
                            "uniqueName": "Total Sales",
                            "formula": "sum(\"Sales\")",
                            "caption": "Total Sales"
                        }
                    ]
                }
            },
            drawChart2,
            drawChart2
        );
    }
}

function drawChart2(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#5D353E'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#5D353E'
        },
        fontSize: 18,
        title: "Leads, Opportunities, Sales of Display Ads per Months",
        colors: ["#1b9e77", "#d95f02", "#7570b3"],
        legend: 'bottom',
        isStacked: true
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container2'));
    chart.draw(data, options);
}

function createGoogleChart3() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "reportFilters": [{
                        "uniqueName": "Channel",
                        "filter": {
                            "members": [
                                "Channel.SEM"
                            ]
                        }
                    }],
                    "rows": [{
                        "uniqueName": "Date.Month"
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                            "uniqueName": "Total Leads",
                            "formula": "sum(\"Leads\")",
                            "caption": "Total Leads"
                        },
                        {
                            "uniqueName": "Total Opportunities",
                            "formula": "sum(\"Opportunities\")",
                            "caption": "Total Opportunities"
                        },
                        {
                            "uniqueName": "Total Sales",
                            "formula": "sum(\"Sales\")",
                            "caption": "Total Sales"
                        }
                    ]
                }
            },
            drawChart3,
            drawChart3
        );
    }
}

function drawChart3(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#5D353E'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#5D353E'
        },
        fontSize: 18,
        title: "Leads, Opportunities, Sales of SEM per Months",
        colors: ["#1b9e77", "#d95f02", "#7570b3"],
        legend: 'bottom',
        isStacked: true
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container3'));
    chart.draw(data, options);
}



function createGoogleChart4() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "reportFilters": [{
                        "uniqueName": "Channel",
                        "filter": {
                            "members": [
                                "Channel.SEM"
                            ]
                        }
                    }],
                    "rows": [{
                        "uniqueName": "Date.Month"
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                            "uniqueName": "Total Leads",
                            "formula": "sum(\"Leads\")",
                            "caption": "Total Leads"
                        },
                        {
                            "uniqueName": "Total Opportunities",
                            "formula": "sum(\"Opportunities\")",
                            "caption": "Total Opportunities"
                        },
                        {
                            "uniqueName": "Total Sales",
                            "formula": "sum(\"Sales\")",
                            "caption": "Total Sales"
                        }
                    ]
                }
            },
            drawChart4,
            drawChart4
        );
    }
}

function drawChart4(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#5D353E'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#5D353E'
        },
        fontSize: 18,
        title: "Leads, Opportunities, Sales of SEM per Months",
        colors: ["#1b9e77", "#d95f02", "#7570b3"],
        legend: 'bottom',
        isStacked: true
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container4'));
    chart.draw(data, options);
}

function createGoogleChart5() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "rows": [{
                        "uniqueName": "Channel",
                        "filter": {
                            "members": [
                                "Channel.Social",
                                "Channel.SEM",
                                "Channel.Display Ads"
                            ]
                        }
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                        "uniqueName": "Revenue",
                        "formula": "sum(\"Sales\") * sum(\"Purchase Cost\")",
                        "caption": "Total Revenue",
                        "individual": true
                    }]
                }
            },
            drawChart5,
            drawChart5
        );
    }
}

function drawChart5(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#5D353E'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#5D353E'
        },
        fontSize: 18,
        title: "Main Revenue Driver, Display Ads vs SEM vs Social Media",
        legend: 'bottom',
        colors: ['#024B40', '#5D353E', '#26827E']
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container5'));
    chart.draw(data, options);

}


function createGoogleChart6() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "rows": [{
                        "uniqueName": "Channel"
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                        "uniqueName": "Total Leads",
                        "formula": "sum(\"Leads\")",
                        "caption": "Total Leads"
                    }]
                }
            },
            drawChart6,
            drawChart6
        );
    }
}

function drawChart6(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#024B40'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#024B40'
        },
        fontSize: 18,
        title: "Leads Source",
        legend: 'bottom',
        colors: ['#5D353E', '#26827E']
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container6'));
    chart.draw(data, options);

}

function createGoogleChart7() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "rows": [{
                        "uniqueName": "Channel"
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                        "uniqueName": "Total Opportunities",
                        "formula": "sum(\"Opportunities\")",
                        "caption": "Total Opportunities"
                    }]
                }
            },
            drawChart7,
            drawChart7
        );
    }
}

function drawChart7(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#024B40'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#000000'
        },
        fontSize: 18,
        title: "Converted Leads",
        legend: 'bottom',
        colors: ['#93bfa4', '#26827E']
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container7'));
    chart.draw(data, options);

}

function createGoogleChart8() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
                type: "column",
                "slice": {
                    "rows": [{
                        "uniqueName": "Channel"
                    }],
                    "columns": [{
                        "uniqueName": "Measures"
                    }],
                    "measures": [{
                        "uniqueName": "Total Sales",
                        "formula": "sum(\"Sales\")",
                        "caption": "Total Sales"
                    }]
                }
            },
            drawChart8,
            drawChart8
        );
    }
}

function drawChart8(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);
    var options = {
        tooltip: {
            textStyle: {
                color: '#024B40'
            },
            showColorCode: true
        },
        titleTextStyle: {
            fontName: 'Tahoma',
            bold: true,
            color: '#000000'
        },
        fontSize: 18,
        title: "Won Opportunities",
        legend: 'bottom',
        colors: ['#59c7db', '#26827E']
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container8'));
    chart.draw(data, options);
}

function createLineChart() {
    pivot.highcharts.getData({
            type: "spline",
            "slice": {
                "rows": [{
                    "uniqueName": "Date.Month",
                }],
                "columns": [{
                    "uniqueName": "Channel",
                    "filter": {
                        "members": [
                            "Channel.Display Ads",
                            "Channel.Social",
                            "Channel.SEM"
                        ]
                    }
                }],
                "measures": [{
                    "uniqueName": "Clicks",
                    "aggregation": "sum"
                }]
            }
        },
        function(data) {
            $('#highchartsContainer').highcharts(data);
        },
        function(data) {
            $('#highchartsContainer').highcharts(data);
        }
    );
}

function createLineChart2() {
    pivot.highcharts.getData({
            type: "spline",
            "slice": {
                "rows": [{
                    "uniqueName": "Date.Month",
                }],
                "columns": [{
                    "uniqueName": "Channel",
                    "filter": {
                        "members": [
                            "Channel.Display Ads",
                            "Channel.Social"
                        ]
                    }
                }],
                "measures": [{
                    "uniqueName": "Conversion Rate",
                    "formula": "sum(\"Leads\") / sum(\"Clicks\") ",
                    "individual": true,
                    "caption": "Conversion Rate"
                }]
            }
        },
        function(data) {
            $('#highchartsContainer2').highcharts(data);
        },
        function(data) {
            $('#highchartsContainer2').highcharts(data);
        }
    );
}

function createLineChart3() {
    pivot.highcharts.getData({
            type: "spline",
            "slice": {
                "rows": [{
                    "uniqueName": "Date.Month",
                }],
                "columns": [{
                    "uniqueName": "Channel",
                    "filter": {
                        "members": [
                            "Channel.Display Ads",
                            "Channel.Social",
                            "Channel.SEM"
                        ]
                    }
                }],
                "measures": [{
                    "uniqueName": "CPL",
                    "formula": "sum(\"Campaign Cost\") / sum(\"Leads\") ",
                    "caption": "CPL"
                }]
            }
        },
        function(data) {
            $('#highchartsContainer3').highcharts(data);
        },
        function(data) {
            $('#highchartsContainer3').highcharts(data);
        }
    );
}

function createLineChart4() {
    pivot.highcharts.getData({
            type: "spline",
            "slice": {
                "rows": [{
                    "uniqueName": "Date.Month",
                }],
                "columns": [{
                    "uniqueName": "Channel",
                    "filter": {
                        "members": [
                            "Channel.Display Ads",
                            "Channel.Social",
                            "Channel.SEM"
                        ]
                    }
                }],
                "measures": [{
                    "uniqueName": "CPO",
                    "formula": "sum(\"Campaign Cost\") / sum(\"Opportunities\") ",
                    "caption": "CPO"
                }]
            }
        },
        function(data) {
            $('#highchartsContainer4').highcharts(data);
        },
        function(data) {
            $('#highchartsContainer4').highcharts(data);
        }
    );
}

function createLineChart5() {
    pivot.highcharts.getData({
            type: "spline",
            "slice": {
                "rows": [{
                    "uniqueName": "Date.Month",
                }],
                "columns": [{
                    "uniqueName": "Channel",
                    "filter": {
                        "members": [
                            "Channel.Display Ads",
                            "Channel.Social",
                            "Channel.SEM"
                        ]
                    }
                }],
                "measures": [{
                    "uniqueName": "CPS",
                    "formula": "sum(\"Campaign Cost\") / sum(\"Sales\") ",
                    "caption": "CPS"
                }]
            }
        },
        function(data) {
            $('#highchartsContainer5').highcharts(data);
        },
        function(data) {
            $('#highchartsContainer5').highcharts(data);
        }
    );
}

function exportPDF() {
    pivot.exportTo("pdf");
}

function getData() {
    return [{
            "Channel": {
                "type": "string"
            },
            "Campaign": {
                "type": "string"
            },
            "Clicks": {
                "type": "number"
            },
            "Campaign Cost": {
                "type": "number"
            },
            "CPC": {
                "type": "number"
            },
            "Users": {
                "type": "number"
            },
            "Sessions": {
                "type": "number"
            },
            "Bounce Rate": {
                "type": "number"
            },
            "Pages per Session": {
                "type": "number"
            },
            "Leads": {
                "type": "number"
            },
            "Opportunities": {
                "type": "number"
            },
            "Sales": {
                "type": "number"
            },
            "Date": {
                "type": "date"
            },
            "Purchase Cost": {
                "type": "number"
            }
        },
        {
            "Channel": "Social",
            "Campaign": "Facebook",
            "Clicks": 1314,
            "Campaign Cost": 93.82,
            "CPC": 0.07,
            "Users": 923,
            "Sessions": 1284,
            "Bounce Rate": "72.27%",
            "Leads": 150,
            "Opportunities": 120,
            "Sales": 115,
            "Date": "1/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Instagram",
            "Clicks": 902,
            "Campaign Cost": 213.73,
            "CPC": 0.24,
            "Users": 727,
            "Sessions": 905,
            "Bounce Rate": "57.02%",
            "Leads": 42,
            "Opportunities": 34,
            "Sales": 20,
            "Date": "1/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Twitter",
            "Clicks": 91,
            "Campaign Cost": 10.94,
            "CPC": 0.12,
            "Users": 81,
            "Sessions": 93,
            "Bounce Rate": "61.29%",
            "Leads": 11,
            "Opportunities": 9,
            "Sales": 3,
            "Date": "1/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "LinkedIn",
            "Clicks": 2,
            "Campaign Cost": 0.36,
            "CPC": 0.18,
            "Users": 2,
            "Sessions": 13,
            "Bounce Rate": "23.08%",
            "Leads": 0,
            "Opportunities": 0,
            "Sales": 0,
            "Date": "1/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Facebook",
            "Clicks": 2962,
            "Campaign Cost": 116.07,
            "CPC": 0.04,
            "Users": 2176,
            "Sessions": 2651,
            "Bounce Rate": "72.35%",
            "Leads": 207,
            "Opportunities": 190,
            "Sales": 170,
            "Date": "2/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "SEM",
            "Campaign": "Bing Ads",
            "Clicks": 803,
            "Campaign Cost": 185.4,
            "CPC": 0.23,
            "Users": 677,
            "Sessions": 824,
            "Bounce Rate": "58.50%",
            "Leads": 89,
            "Opportunities": 75,
            "Sales": 50,
            "Date": "2/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "SEM",
            "Campaign": "Google Search Ads",
            "Clicks": 92,
            "Campaign Cost": 9.75,
            "CPC": 0.11,
            "Users": 82,
            "Sessions": 83,
            "Bounce Rate": "68.67%",
            "Leads": 7,
            "Opportunities": 5,
            "Sales": 2,
            "Date": "2/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "LinkedIn",
            "Clicks": 23,
            "Campaign Cost": 1.63,
            "CPC": 0.07,
            "Users": 22,
            "Sessions": 27,
            "Bounce Rate": "37.04%",
            "Leads": 1,
            "Opportunities": 0,
            "Sales": 0,
            "Date": "2/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Display Ads",
            "Campaign": "Google Display Network",
            "Clicks": 4396,
            "Campaign Cost": 127.54,
            "CPC": 0.03,
            "Users": 2914,
            "Sessions": 4024,
            "Bounce Rate": "73.46%",
            "Leads": 402,
            "Opportunities": 390,
            "Sales": 387,
            "Date": "3/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Display Ads",
            "Campaign": "Display Ads Network - 2",
            "Clicks": 751,
            "Campaign Cost": 184.7,
            "CPC": 0.25,
            "Users": 631,
            "Sessions": 771,
            "Bounce Rate": "57.85%",
            "Leads": 110,
            "Opportunities": 102,
            "Sales": 91,
            "Date": "3/2/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Facebook",
            "Clicks": 133,
            "Campaign Cost": 16.64,
            "CPC": 0.13,
            "Users": 120,
            "Sessions": 143,
            "Bounce Rate": "53.15%",
            "Leads": 16,
            "Opportunities": 10,
            "Sales": 10,
            "Date": "3/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "SEM",
            "Campaign": "Google Search Ads",
            "Clicks": 132,
            "Campaign Cost": 53.71,
            "CPC": 0.41,
            "Users": 113,
            "Sessions": 134,
            "Bounce Rate": "64.18%",
            "Leads": 49,
            "Opportunities": 45,
            "Sales": 42,
            "Date": "3/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Twitter",
            "Clicks": 6,
            "Campaign Cost": 1.1,
            "CPC": 0.18,
            "Users": 5,
            "Sessions": 7,
            "Bounce Rate": "57.14%",
            "Leads": 0,
            "Opportunities": 0,
            "Sales": 0,
            "Date": "3/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Facebook",
            "Clicks": 2539,
            "Campaign Cost": 114.18,
            "CPC": 0.04,
            "Users": 1949,
            "Sessions": 2540,
            "Bounce Rate": "71.38%",
            "Leads": 317,
            "Opportunities": 310,
            "Sales": 309,
            "Date": "4/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Display Ads",
            "Campaign": "Google Display Network",
            "Clicks": 727,
            "Campaign Cost": 274.18,
            "CPC": 0.38,
            "Users": 622,
            "Sessions": 756,
            "Bounce Rate": "62.04%",
            "Leads": 101,
            "Opportunities": 100,
            "Sales": 99,
            "Date": "4/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Display Ads",
            "Campaign": "Display Ads Network - 2",
            "Clicks": 244,
            "Campaign Cost": 92.02,
            "CPC": 0.38,
            "Users": 196,
            "Sessions": 238,
            "Bounce Rate": "61.34%",
            "Leads": 70,
            "Opportunities": 65,
            "Sales": 65,
            "Date": "4/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Instagram",
            "Clicks": 8,
            "Campaign Cost": 1.67,
            "CPC": 0.21,
            "Users": 8,
            "Sessions": 8,
            "Bounce Rate": "50.00%",
            "Leads": 2,
            "Opportunities": 2,
            "Sales": 1,
            "Date": "4/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Display Ads",
            "Campaign": "Google Display Network",
            "Clicks": 2567,
            "Campaign Cost": 131.7,
            "CPC": 0.05,
            "Users": 2056,
            "Sessions": 2534,
            "Bounce Rate": "75.02%",
            "Leads": 528,
            "Opportunities": 518,
            "Sales": 515,
            "Date": "5/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Display Ads",
            "Campaign": "Display Ads Network - 2",
            "Clicks": 524,
            "Campaign Cost": 56.44,
            "CPC": 0.11,
            "Users": 530,
            "Sessions": 607,
            "Bounce Rate": "86.33%",
            "Leads": 99,
            "Opportunities": 90,
            "Sales": 88,
            "Date": "5/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Twitter",
            "Clicks": 390,
            "Campaign Cost": 187.85,
            "CPC": 0.48,
            "Users": 350,
            "Sessions": 458,
            "Bounce Rate": "58.52%",
            "Leads": 2,
            "Opportunities": 1,
            "Sales": 1,
            "Date": "5/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "SEM",
            "Campaign": "Bing Ads",
            "Clicks": 272,
            "Campaign Cost": 71.2,
            "CPC": 0.26,
            "Users": 231,
            "Sessions": 271,
            "Bounce Rate": "66.79%",
            "Leads": 120,
            "Opportunities": 115,
            "Sales": 111,
            "Date": "5/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "LinkedIn",
            "Clicks": 10,
            "Campaign Cost": 1.7,
            "CPC": 0.17,
            "Users": 12,
            "Sessions": 17,
            "Bounce Rate": "29.41%",
            "Leads": 2,
            "Opportunities": 1,
            "Sales": 0,
            "Date": "5/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Facebook",
            "Clicks": 2350,
            "Campaign Cost": 130.95,
            "CPC": 0.06,
            "Users": 1555,
            "Sessions": 2051,
            "Bounce Rate": "82.64%",
            "Leads": 362,
            "Opportunities": 351,
            "Sales": 347,
            "Date": "6/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Twitter",
            "Clicks": 411,
            "Campaign Cost": 175.41,
            "CPC": 0.43,
            "Users": 364,
            "Sessions": 482,
            "Bounce Rate": "49.79%",
            "Leads": 22,
            "Opportunities": 17,
            "Sales": 16,
            "Date": "6/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "SEM",
            "Campaign": "Google Search Ads",
            "Clicks": 204,
            "Campaign Cost": 55.59,
            "CPC": 0.27,
            "Users": 178,
            "Sessions": 207,
            "Bounce Rate": "68.60%",
            "Leads": 78,
            "Opportunities": 67,
            "Sales": 65,
            "Date": "6/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "LinkedIn",
            "Clicks": 112,
            "Campaign Cost": 8.29,
            "CPC": 0.07,
            "Users": 81,
            "Sessions": 96,
            "Bounce Rate": "90.63%",
            "Leads": 34,
            "Opportunities": 28,
            "Sales": 10,
            "Date": "6/1/2018",
            "Purchase Cost": 50
        },
        {
            "Channel": "Social",
            "Campaign": "Instagram",
            "Clicks": 8,
            "Campaign Cost": 1.51,
            "CPC": 0.19,
            "Users": 9,
            "Sessions": 12,
            "Bounce Rate": "41.67%",
            "Leads": 3,
            "Opportunities": 2,
            "Sales": 1,
            "Date": "6/1/2018",
            "Purchase Cost": 50
        }
    ]
}