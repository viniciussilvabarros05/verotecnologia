import pdfMake from 'pdfmake/build/pdfmake'

import pdfFonts from 'pdfmake/build/vfs_fonts'



export function makeRelatorio(data) {

    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const date = new Date()

    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    const time = `${hour}:${minutes}:${seconds}`
    const reportTitle = [
        {
            text: "",
            fontSize: 10,
            bold: true,
            margin: [15, 0, 0, 15]
        }
    ]

    const dados = data.map(item => {
        return [
            { text: item.id, style: 'tableHeader', fontSize: 12 },
            { text: item.origem, style: 'tableHeader', fontSize: 12 },
            { text: item.destino, style: 'tableHeader', fontSize: 12 },
            { text: item.estado, style: 'tableHeader', fontSize: 12 },
            { text: time, style: 'tableHeader', fontSize: 12 }

        ]
    })

    const details = [
        
            {text:'Relatório', style:"tableHeader", fontSize:16},
        {
            table: {
                headerRows: 1,
                widths: [50, '*', '*', 100, 100],
                body: [
                   
                    [
                        { text: "ID", style: 'tableHeader', fontSize: 11 },
                        { text: "Origem", style: 'tableHeader', fontSize: 11 },
                        { text: "Destino", style: 'tableHeader', fontSize: 11 },
                        { text: "Estado", style: 'tableHeader', fontSize: 11 },
                        { text: "Horário", style: 'tableHeader', fontSize: 11 },
                    ],

                    ...dados
                ]

            },
            layout: "headerLineOnly"
        }

    ]

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [30, 15, 15, 30],
        header: [reportTitle],
        content: [details],
        defaultStyle: {
            fontSize: 15,
            bold: false
        }
    }
    pdfMake.createPdf(docDefinitions).open()
}