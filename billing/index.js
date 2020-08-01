const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const TempData = {
  title: "CRWN CLOTHING",
  date: new Date().getTime(),
  name: "Bhagawat Dongre",
  age: 28,
  birthdate: "12/07/1990",
  course: "Computer Science",
}

class Billing {
  constructor() {
  }

  async generate(data = TempData, callback) {
    console.log(data);

    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
    var template = handlebars.compile(templateHtml);
    var html = template(data);

    var milis = new Date();
    milis = milis.getTime();

    fs.writeFile(`bills/${data.name}-${milis}.html`, html, function (err) {
      if (err) throw err;
      callback(path.resolve(`bills/${data.name}-${milis}.html`))
      console.log('bill generated!');
    });

    // var pdfPath = path.join('pdf', `${data.name}-${milis}.pdf`);

    // var options = {
    //   width: '1230px',
    //   headerTemplate: "<p></p>",
    //   footerTemplate: "<p></p>",
    //   displayHeaderFooter: false,
    //   margin: {
    //     top: "10px",
    //     bottom: "30px"
    //   },
    //   printBackground: true,
    //   path: pdfPath
    // }

    // const browser = await puppeteer.launch({
    //   args: ['--no-sandbox'],
    //   headless: true
    // });

    // var page = await browser.newPage();

    // await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    //   waitUntil: 'networkidle0'
    // });

    // await page.pdf(options);
    // await browser.close();


    // console.log(pdfPath);
    // callback('OKKOKOKOK');
  }
}

// const allColors = [
//   new Color('brightred', '#E74C3C'),
//   new Color('soothingpurple', '#9B59B6'),
//   new Color('skyblue', '#5DADE2'),
//   new Color('leafygreen', '#48C9B0'),
//   new Color('sunkissedyellow', '#F4D03F'),
//   new Color('groovygray', '#D7DBDD'),
// ];

// exports.getRandomColor = () => {
//   return allColors[Math.floor(Math.random() * allColors.length)];
// }

module.exports = Billing;
