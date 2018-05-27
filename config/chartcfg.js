module.exports = {
  chart: {
    plotBackgroundColor: '#f5f5f5',
    plotBorderColor: '#f5f5f5',
    type: 'pie'
    // spacing: [0, 0, 0, 0]
  },
  credits: {
    enabled: false,
    text: '',
    href: ''
  },
  title: {
    floating: false,
    text: ''
  },
  subtitle: {
    text: ''
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        distance: -30,
        style: {
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0px 1px 2px black'
        },
        showInLegend: true
      },
      // startAngle: -90,
      // endAngle: -90,
      center: ['50%', '50%'],
      point: {
        events: {

        }
      }
    },
    enableMouseTracking: true
  },
  tooltip: {
    valueSuffix: ''
  },
  legend: {
    floating: true,
    layout: 'horizontal',
    align: 'center',
    borderWidth: 1
  },
  series: [
    {
      innerSize: '40%',
      name: '',
      data: [
        ['1947-01-01', 243.1],
        ['1947-04-01', 246.3],
        ['1947-07-01', 250.1],
        ['1947-10-01', 260.3],
        ['1948-01-01', 266.2],
        ['1948-04-01', 272.9],
        ['1948-07-01', 279.5],
        ['1948-10-01', 280.7],
        ['1949-01-01', 275.4],
        ['1949-04-01', 271.7],
        {name: '1949-07-01', y: 273.3},
        ['1949-10-01', 271],
        ['1950-01-01', 281.2],
        ['1950-04-01', 290.7],
        ['1950-07-01', 308.5]
      ]
    }
  ]
}
