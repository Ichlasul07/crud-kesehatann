// Ambil elemen
const form = document.getElementById('pasienForm');
const tabelBody = document.querySelector('#tabelPasien tbody');
let pasienData = JSON.parse(localStorage.getItem('pasienData')) || [];

// Render tabel
function renderTable() {
    tabelBody.innerHTML = '';
    pasienData.forEach((p, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${p.nama}</td>
            <td>${p.umur}</td>
            <td>${p.diagnosa}</td>
            <td>
                <button onclick="editData(${i})">Edit</button>
                <button onclick="hapusData(${i})">Hapus</button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// Tambah / Edit data
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const indexEdit = document.getElementById('indexEdit').value;
    const nama = document.getElementById('nama').value;
    const umur = document.getElementById('umur').value;
    const diagnosa = document.getElementById('diagnosa').value;

    const data = { nama, umur, diagnosa };

    if(indexEdit === '') {
        // Tambah
        pasienData.push(data);
    } else {
        // Edit
        pasienData[indexEdit] = data;
    }

    localStorage.setItem('pasienData', JSON.stringify(pasienData));
    form.reset();
    document.getElementById('indexEdit').value = '';
    renderTable();
});

// Edit
function editData(i) {
    document.getElementById('indexEdit').value = i;
    document.getElementById('nama').value = pasienData[i].nama;
    document.getElementById('umur').value = pasienData[i].umur;
    document.getElementById('diagnosa').value = pasienData[i].diagnosa;
}

// Hapus
function hapusData(i) {
    if(confirm('Hapus pasien ini?')) {
        pasienData.splice(i,1);
        localStorage.setItem('pasienData', JSON.stringify(pasienData));
        renderTable();
    }
}

// Inisialisasi
renderTable();