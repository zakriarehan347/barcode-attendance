// XLSX is now loaded globally via CDN, so no require needed
// const XLSX = require('xlsx');

let attendees = [];
let attendance = {};

const excelFileInput = document.getElementById('excel-file');
const barcodeInput = document.getElementById('barcode-input');
const statusDiv = document.getElementById('status');
const attendeeListDiv = document.getElementById('attendee-list');

function renderAttendeeList() {
  if (!attendees.length) {
    attendeeListDiv.innerHTML = '';
    return;
  }
  let html = '<table><tr><th>Card Number</th><th>Name</th><th>Role/Company</th><th>Status</th></tr>';
  attendees.forEach(a => {
    let att = attendance[a.card] || {};
    let status = att.status === 'checked-in' ? '<span class="checked-in">Checked In</span>' :
                 att.status === 'returned' ? '<span class="returned">Returned</span>' :
                 '';
    html += `<tr><td>${a.card}</td><td>${a.name || ''}</td><td>${a.roleOrCompany || ''}</td><td>${status}</td></tr>`;
  });
  html += '</table>';
  attendeeListDiv.innerHTML = html;
}

function setStatus(msg, type) {
  statusDiv.innerHTML = msg;
  statusDiv.className = type || '';
}

async function loadAttendanceAndAttendees() {
  attendance = await window.attendanceAPI.getAttendance();
  attendees = await window.attendanceAPI.getAttendees();
  renderAttendeeList();
  if (!attendees.length) {
    setStatus('Please load the attendee Excel file.', 'not-found');
  } else {
    setStatus('Ready to scan.', '');
  }
}

excelFileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    attendees = rows
      .slice(1)
      .filter(row => typeof row[0] === 'number' && !isNaN(row[0]) && row[1] !== '')
      .map(row => ({
        card: String(row[0]).trim(),
        name: row[1] ? String(row[1]).trim() : '',
        roleOrCompany: row[2] ? String(row[2]).trim() : ''
      }));
    await window.attendanceAPI.setAttendees(attendees);
    setStatus('Excel loaded. Ready to scan.', '');
    renderAttendeeList();
    barcodeInput.focus();
  };
  reader.readAsArrayBuffer(file);
});

barcodeInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const code = barcodeInput.value.trim();
    barcodeInput.value = '';
    if (!code) return;
    await handleScan(code);
    // Keep focus on the input for continuous scanning
    barcodeInput.focus();
  }
});

// Remove the click and keydown event listeners that were auto-focusing
// Users can now see and interact with the input field directly

async function handleScan(code) {
  if (!attendees.length) {
    setStatus('Please load the attendee Excel file first.', 'not-found');
    return;
  }
  const attendee = attendees.find(a => a.card === code);
  if (!attendee) {
    setStatus(`Card ${code} not found.`, 'not-found');
    return;
  }
  attendance = await window.attendanceAPI.getAttendance();
  let att = attendance[code] || {};
  if (!att.status) {
    att.status = 'checked-in';
    att.time = Date.now();
    setStatus(`Welcome, ${attendee.name || 'Attendee'}! Checked in.`, 'checked-in');
  } else if (att.status === 'checked-in') {
    att.status = 'returned';
    att.returnTime = Date.now();
    setStatus(`Welcome back, ${attendee.name || 'Attendee'}! Marked as returned.`, 'returned');
  } else if (att.status === 'returned') {
    setStatus(`${attendee.name || 'Attendee'} already marked as returned.`, 'returned');
  }
  attendance[code] = att;
  await window.attendanceAPI.setAttendance(attendance);
  renderAttendeeList();
}

// On load, load attendance and attendee list from main process
loadAttendanceAndAttendees();
