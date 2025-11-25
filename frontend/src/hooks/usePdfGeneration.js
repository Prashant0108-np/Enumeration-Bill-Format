import { PDFDocument } from "pdf-lib";
import templatePdf from "../Enumeration_Bill_Format.pdf";

export const usePdfGeneration = () => {
  const generatePdf = async (formData) => {
    const existingPdfBytes = await fetch(templatePdf).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const secondPage = pages[1];
    const { height } = firstPage.getSize();

    // Fill form data on PDF (adjust coordinates as needed)
    firstPage.drawText(formData.cno || "", { x: 430, y: height - 17, size: 8 });
    firstPage.drawText(formData.examinerId || "", {
      x: 450,
      y: height - 30,
      size: 8,
    });
    firstPage.drawText(formData.examinerName || "", {
      x: 160,
      y: height - 103,
      size: 8,
    });
    firstPage.drawText(formData.examinerCode || "", {
      x: 430,
      y: height - 103,
      size: 8,
    });
    firstPage.drawText(formData.address || "", {
      x: 160,
      y: height - 125,
      size: 8,
    });
    firstPage.drawText(formData.college || "", {
      x: 183,
      y: height - 174,
      size: 8,
    });
    firstPage.drawText(formData.subject || "", {
      x: 450,
      y: height - 174,
      size: 8,
    });
    firstPage.drawText(formData.bankName || "", {
      x: 155,
      y: height - 150,
      size: 8,
    });
    firstPage.drawText(formData.branch || "", {
      x: 293,
      y: height - 150,
      size: 8,
    });
    firstPage.drawText(formData.ifsc || "", {
      x: 466,
      y: height - 150,
      size: 8,
    });
    firstPage.drawText(formData.accountNo || "", {
      x: 110,
      y: height - 163,
      size: 8,
    });
    firstPage.drawText(formData.micr || "", {
      x: 225,
      y: height - 163,
      size: 8,
    });
    firstPage.drawText(formData.phone || "", {
      x: 110,
      y: height - 140,
      size: 8,
    });
    firstPage.drawText(formData.pan || "", {
      x: 290,
      y: height - 140,
      size: 8,
    });

    // Part A Fields
    firstPage.drawText(formData.examinationName || "", { x: 120, y: height - 238, size: 8 });
    firstPage.drawText(formData.paperName || "", { x: 80, y: height - 250, size: 8 });
    firstPage.drawText(formData.papersSet || "", { x: 120, y: height - 275, size: 8 });
    firstPage.drawText(formData.paperRate || "", { x: 110, y: height - 285, size: 8 });
    firstPage.drawText(formData.durationHours || "", { x: 130, y: height - 295, size: 8 });
    firstPage.drawText(formData.additionalExaminers || "", { x: 170, y: height - 308, size: 8 });

    // Practical Examination (Page 1 bottom)
    firstPage.drawText(formData.practicalHeldOn || "", { x: 160, y: height - 330, size: 8 });
    firstPage.drawText(formData.practicalHeldAt || "", { x: 250, y: height - 330, size: 8 });
    firstPage.drawText(formData.practicalBatchSize || "", { x: 350, y: height - 330, size: 8 });
    firstPage.drawText(formData.practicalPapersSet || "", { x: 160, y: height - 340, size: 8 });
    firstPage.drawText(formData.practicalNoOfValuedScripts || "", { x: 370, y: height - 238, size: 8 });
    firstPage.drawText(formData.practicalRatePerValuedScript || "", { x: 318, y: height - 250, size: 8 });
    firstPage.drawText(formData.practicalConductNoOfCandidates || "", { x: 318, y: height - 274, size: 8 });
    firstPage.drawText(formData.practicalConductRatePerCandidate || "", { x: 318, y: height - 285, size: 8 });
    firstPage.drawText(formData.practicalValuationRatePerDissertation || "", { x: 308, y: height - 308, size: 8 });

    // Part B (Conveyance)
    firstPage.drawText(formData.convDate || "", { x: 30, y: height - 460, size: 8 });
    firstPage.drawText(formData.convFrom || "", { x: 100, y: height - 460, size: 8 });
    firstPage.drawText(formData.convTo || "", { x: 170, y: height - 460, size: 8 });
    firstPage.drawText(formData.convKms || "", { x: 260, y: height - 460, size: 8 });
    firstPage.drawText(formData.convVehicleNo || "", { x: 290, y: height - 460, size: 8 });
    firstPage.drawText(formData.convPurpose || "", { x: 380, y: height - 460, size: 8 });
    firstPage.drawText(formData.convAmount || "", { x: 450, y: height - 460, size: 8 });

    // Part C (Contingent Expenses)
    secondPage.drawText(formData.contDate || "", { x: 38, y: height - 80, size: 8 });
    secondPage.drawText(formData.contAmount || "", { x: 230, y: height - 82, size: 8 });

    // Totals Section
    firstPage.drawText(formData.totalPartA || "", { x: 450, y: height - 400, size: 8 });
    firstPage.drawText(formData.totalPartB || "", { x: 450, y: height - 517, size: 8 });
    secondPage.drawText(formData.totalPartC || "", { x: 450, y: height - 160, size: 8 });
    secondPage.drawText(formData.grandTotal || "", { x: 153, y: height - 185, size: 8 });
    secondPage.drawText(formData.grandTotalWords || "", { x: 120, y: height - 195, size: 8 });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return { generatePdf };
};
