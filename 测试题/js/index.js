window.addEventListener('load', function () {
    // 轮播图部分
    let arrow_l = document.querySelector('.arrow-l')
    let arrow_r = document.querySelector('.arrow-r')
    let rotation = document.querySelector('.rotation')
    let rotationWidth = rotation.offsetWidth

    rotation.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer)
        timer = null
    })

    rotation.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(function () {
            arrow_r.click()
        }, 2000)
    })

    let ul = rotation.querySelector('ul')
    let ol = rotation.querySelector('.dot')


    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li')
        li.setAttribute('index', i)
        ol.appendChild(li)
        li.addEventListener('click', function () {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'pitch'
            let index = this.getAttribute('index')
            num = index
            dot = index
            animate(ul, -index * rotationWidth)
        })
    }

    ol.children[0].className = 'pitch'
    let first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
    let num = 0
    let dot = 0
    let flag = true

    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false

            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * rotationWidth, function () {
                flag = true
            })
            dot++
            if (dot == ol.children.length) {
                dot = 0
            }
            dotChange()
        }
    })

    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * rotationWidth + 'px'

            }
            num--
            animate(ul, -num * rotationWidth, function () {
                flag = true
            })
            dot--
            dot = dot < 0 ? ol.children.length - 1 : dot
            dotChange()
        }
    })

    function dotChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[dot].className = 'pitch'
    }

    let timer = setInterval(function () {
        arrow_r.click()
    }, 2000);
    // 轮播图结束

    // 信息栏部分
    let line = document.querySelector('.resume .line')
    let select = document.querySelectorAll('.resume ul li')
    let detalis = document.querySelectorAll('.detalis div')
    let current = 0
    for (let i = 0; i < select.length; i++) {
        console.log(select[i].offsetParent);
        select[i].setAttribute('index', i)
        select[i].addEventListener('mouseenter', function () {
            animate(line, this.offsetLeft)
        })
        select[i].addEventListener('mouseleave', function () {
            animate(line, current)
        })
        select[i].addEventListener('click', function () {
            current = this.offsetLeft
            for (let i = 0; i < select.length; i++) {
                select[i].className = ''
            }
            select[i].className = 'current'
            let index = select[i].getAttribute('index')
            for (let i = 0; i < detalis.length; i++) {
                detalis[i].style.display = 'none'
            }
            detalis[index].style.display = 'block'
        })
    }
    // 信息栏结束

    // 数据可视化部分
    axios.get("https://edu.telking.com/api/?type=month")
        .then(function (response) {
            console.log(response.data.data);
            let myChart1 = echarts.init(document.querySelector('.data-table1'))
            let option1 = {
                title: {
                    text: '曲线图数据',
                    left: 'center'
                },

                tooltip: {
                    trigger: 'axis'
                },
                color: ['rgb(69,135,240)'],
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        lineStyle: { color: '#ccc' },
                        type: "dotted"
                    },
                    axisTick: {
                        show: false,
                        alignWithLable: true
                    },
                    data: response.data.data.xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: response.data.data.series,
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color: "rgba(69,135,240,0.3)"
                        }

                    }
                ]
            };
            myChart1.setOption(option1)
        }, function (err) {
            console.log(err);
        })

    axios.get("https://edu.telking.com/api/?type=week")
        .then(function (response) {
            console.log(response);
            let myChart2 = echarts.init(document.querySelector('.data-table2'))
            let option2 = {
                title: {
                    text: '饼状图',
                    subtext: 'Week Data',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Data From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: response.data.data.series[0], name: response.data.data.xAxis[0] },
                            { value: response.data.data.series[1], name: response.data.data.xAxis[1] },
                            { value: response.data.data.series[2], name: response.data.data.xAxis[2] },
                            { value: response.data.data.series[3], name: response.data.data.xAxis[3] },
                            { value: response.data.data.series[4], name: response.data.data.xAxis[4] },
                            { value: response.data.data.series[5], name: response.data.data.xAxis[5] },
                            { value: response.data.data.series[6], name: response.data.data.xAxis[6] }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart2.setOption(option2)


            let myChart3 = echarts.init(document.querySelector('.data-table3'))
            let option3 = {
                title: {
                    text: '柱状图数据',
                    left: 'center'
                },
                color: ['#4587f0'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisLine: {
                            lineStyle: { color: '#ccc' },
                            type: "dotted"
                        },
                        axisTick: {
                            show: false,
                            alignWithLable: true
                        },
                        data: response.data.data.xAxis,
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: response.data.data.series
                    }
                ]
            };
            myChart3.setOption(option3)
        }, function (err) {
            console.log(err);
        })
})