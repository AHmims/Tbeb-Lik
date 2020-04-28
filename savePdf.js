const fse = require('fs-extra');
const PDFDocument = require("pdfkit");
// 
const dataTemplate = {
    mle: "FST56OP",
    nom: "ali",
    prenom: "hmims",
    direction: "DOKALA",
    nbrJA: "12",
    nbrJV: "20",
    visaM: "UYUYUYUYUYUY"
}
// 
makeDoc(dataTemplate);
async function makeDoc(data) {
    const __FILEPATH = await getFileName(data.mle);
    // 
    let document = new PDFDocument({
        margin: 50
    });
    // HEADER
    document.image("serialisationResources/logo.png", 50, 40, {
            height: 50
        }).fontSize(10)
        .text(`${new Date().toGMTString()}`, 200, 60, {
            align: "right"
        })
        .text(`${data.mle}`, 200, 75, {
            align: "right"
        })
        .text(`${data.nom} ${data.prenom.toUpperCase()}`, 200, 90, {
            align: "right"
        })
        .moveDown();
    // CONTENT
    document.fontSize(20)
        .font('Helvetica')
        .text('Rapport', 50, 150, {});
    generateHr(document, 180);
    document.fontSize(12)
        .text('Nom :', 50, 200, {
            align: "left"
        })
        .text('Matricule :', 50, 220, {
            align: "left"
        })
        .text('Direction :', 50, 240, {
            align: "left"
        })
        .text('Nombre de jour du RM :', 50, 260, {
            align: "left"
        });
    generateHr(document, 280);

    document.text('Nombre de jour validée :', 300, 300, {
            align: "left"
        })
        .text('Visa de Medecin :', 300, 320, {
            align: "left"
        });
    // FILL DATA
    let fillData = [
        `${data.nom} ${data.prenom.toUpperCase()}`,
        data.mle,
        data.direction,
        data.nbrJA
    ]
    let startPos = 200;
    fillData.forEach(element => {
        document.text(element, 200, startPos, {
            align: "left"
        });
        startPos += 20;
    });
    // 
    document.text(data.nbrJV, 400, 300, {
            align: "right"
        })
        .text(data.visaM, 400, 320, {
            align: "right"
        }).moveDown();
    // 
    document.end();
    // doc.pipe(fs.createWriteStream(path));
    document.pipe(fse.createWriteStream(__FILEPATH));
}
// 
async function getFileName(matricule) {
    const __PATH = `data/rapports`;
    await fse.ensureDir(__PATH);
    const __PATH_YEARLY = __PATH + `/${new Date().getFullYear()}`;
    await fse.ensureDir(__PATH_YEARLY);
    const __USERPATH = __PATH_YEARLY + `/${matricule}`;
    await fse.ensureDir(__USERPATH);
    const nbRapports = (await fse.readdir(__USERPATH)).length + 1;
    const __FILENAME = __USERPATH + `/RAPP${nbRapports}.pdf`;
    // 
    return __FILENAME;
}

function generateHr(document, y) {
    document
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}





// createInvoice(invoice, 'output.pdf');
// 
function createInvoice(invoice, path) {
    let doc = new PDFDocument({
        margin: 50
    });

    generateHeader(doc);
    generateFooter(doc);

    doc.end();
    // doc.pipe(fs.createWriteStream(path));
    doc.pipe(fse.createWriteStream(path));
}
// 
function generateHeader(doc) {
    doc
        .image("logo.png", 50, 40, {
            height: 50
        })
        .fillColor("#444444")
        .fontSize(10)
        .text("123 Main Street", 200, 60, {
            align: "right"
        })
        .text("New York, NY, 10025", 200, 75, {
            align: "right"
        })
        .moveDown();
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            300, {
                align: "center",
                width: 500
            }
        );
}