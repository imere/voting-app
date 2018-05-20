const data = null;
Highcharts.setOptions = {
  chart: {
    backgroundColor: {
      linearGradient: [0, 800, 500, 500],
      stops: [[0, "rgba(255, 0, 0, 1)"]]
    }
  }
};

const opts = {
  title: {
    text: "Stock"
  },
  subtitle: {
    text: "json api"
  },
  xAxis: {
    type: "datetime"
  },
  yAxis: {
    title: {
      text: "range"
    },
    lalbels: {
      formatter: function(){
        return this.value/1000;
      }
    },
    plotlines: [{
      value: 0,
      width: 1,
      color: "#000000"
    }],
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
       pie: {
         dataLabels: {
            enabled: true,
            distance: -50,
            style: {
               fontWeight: 'bold',
               color: 'white',
               textShadow: '0px 1px 2px black'
            }
         },
         startAngle: -90,
         endAngle: 90,
         center: ['50%', '75%']
      },
      enableMouseTracking: true
    }
  },
  tooltip: {
    valueSuffix: "\xB0C"
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
    borderWidth: 1
  },
  series: []
};
;
const url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
$.ajax({
  url: url,
  method: "GET",
  dataType: "json",
  error: (jqXHR, textStatus, errThrown) => {
    conole.log(jqXHR);
  },
  success: data => {
    opts.series.push({
      type: "pie",
      innerSize: "40%",
      name: "",
      data: []
    });
    $.each(data.data, (k, v) => {
      opts.series[0].data.push(v[1]);
    });
    opts.series[0]["pointStart"] = Date.parse(data.data[0][0]);
    opts.series[0]["pointInterval"] = 86400000*30;
    opts["title"]["text"] = data.source_name;
    opts["subtitle"]["text"] = data.updated_at;
    Highcharts.chart("chart", opts);
  }
});
