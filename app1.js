const fs = require('fs');

function createHTML(){
    var email = 'ivan.curada@gmail.com'
    var text = ' '
    var range = 9;
    for (let index = 0; index < range; index++) {
        text += email + text
    }

    const htmlStaticTemplate = `
    <html>
    <head>
        <style>
            body{
                background: transparent;
                font-family: Arial;
                font-size: 8pt;
                color: rgba(250, 230, 113, 0.4);
            }
            .container{
                display: flex;
                justify-content: center;
                align-items: center;
                margin:15;
                padding:0;
                line-height: 2;
                background: transparent;
                transform: rotate(-25deg);
                -webkit-transform: rotate(-25deg);   
                -webkit-transform-origin: 50% 50%; 
            }
        </style>
    </head>
    `
    const htmlDynamicTemplate = `
    <body>
        <div class='container'>
            ${text}
        </div>
    </body>
    </html>
    `
    const fullTemplate = htmlStaticTemplate + htmlDynamicTemplate
    fs.writeFile('template.html', fullTemplate, (err)=>{
        if(err) throw err;
        console.log('Template generated')
    })
    createPDF()
}

function createPDF(){
    var pdf = require('html-pdf');
    fs.readFile('template.html', {encoding:'utf-8'}, (err, data)=>{
        if(err) throw err;
        pdf.create(data.toString()).toFile('stamp.pdf', (err, res)=>{
            if(err) throw err;
            console.log(res);
            runChildProcess()
        })
    })
}
function runChildProcess(){
    var t0 = Date.now();
    var child = require('child_process').exec('python scripts/create_pdf.py')
    child.stdout.pipe(process.stdout)
    child.on('exit', ()=>{
        console.log(`Generate PDF finished in ${(Date.now() - t0)/1000} seconds`)
    })
}

createHTML()