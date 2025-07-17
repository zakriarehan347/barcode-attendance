document.addEventListener('DOMContentLoaded', function () {
  const barcodeNumberInput = document.getElementById('barcode-number');
  const generateBarcodeBtn = document.getElementById('generate-barcode');
  const barcodeOutputDiv = document.getElementById('barcode-output');
  const printBarcodeBtn = document.getElementById('print-barcode');

  generateBarcodeBtn.addEventListener('click', () => {
    const value = barcodeNumberInput.value.trim();
    if (!value) {
      barcodeOutputDiv.innerHTML = '<span style="color:red;">Please enter a number.</span>';
      printBarcodeBtn.style.display = 'none';
      return;
    }
    barcodeOutputDiv.innerHTML = '<svg id="barcode-svg"></svg>';
    JsBarcode("#barcode-svg", value, { format: "CODE128", width: 2, height: 60, displayValue: false });
    printBarcodeBtn.style.display = 'inline-block';
  });

  printBarcodeBtn.addEventListener('click', () => {
    const printWindow = window.open('', '', 'width=400,height=200');
    printWindow.document.write('<html><head><title>Print Barcode</title></head><body style="text-align:center;">');
    printWindow.document.write(barcodeOutputDiv.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  });
}); 