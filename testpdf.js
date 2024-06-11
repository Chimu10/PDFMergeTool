//  import PDFMerger from 'pdf-merger-js';
//  const PDFMerger = require('pdf-merger-js');


//  var merger = new PDFMerger();

// const mergerPDF = async (p1, p2) => {
//   await merger.add('p1');  //merge all pages. parameter is the path to file and filename.
//   await merger.add('p2'); // merge only page 2
  
//   await merger.save('public/merged.pdf'); //save under given name and reset the internal document
//   //   // Set metadata
//   //   await merger.setMetadata({
//   //     producer: "pdf-merger-js based script",
//   //     author: "John Doe",
//   //     creator: "John Doe",
//   //     title: "My live as John Doe"
//   //   });
  
//   // Export the merged PDF as a nodejs Buffer
//   // const mergedPdfBuffer = await merger.saveAsBuffer();
//   // fs.writeSync('merged.pdf', mergedPdfBuffer);
// };

// module.exports = {mergerPDF};\


const PDFMerger = async () => {
  const { default: PDFMerger } = await import('pdf-merger-js');
  return PDFMerger;
};

const mergerPDF = async (filePaths) => {
  const PDFMergerInstance = await PDFMerger();
  const merger = new PDFMergerInstance();

  // await merger.add(p1);  // merge all pages. parameter is the path to file and filename.
  // await merger.add(p2);  // merge only page 2
  for (const filePath of filePaths) {
    await merger.add(filePath);  // merge all pages. parameter is the path to file and filename.
  }
  const timestamp = new Date().getTime();
  const mergedFilePath = `public/${timestamp}.pdf`;
  await merger.save(mergedFilePath); // save under given name and reset the internal document
  return timestamp;
};

module.exports = { mergerPDF };
