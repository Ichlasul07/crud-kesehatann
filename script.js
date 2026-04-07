let dataPasien = JSON.parse(localStorage.getItem("pasien")) || [];
let editIndex = -1;

function tampilData() {
    let tabel = document.getElementById("tabelPasien");
    tabel.innerHTML = "";

    dataPasien.forEach((pasien, index) => {
        tabel.innerHTML += `
        <tr>
            <td>${pasien.nama}</td>
            <td>${pasien.umur}</td>
            <td>${pasien.diagnosa}</td>
            <td>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="hapusData(${index})">Hapus</button>
            </td>
        </tr>`;
    });
}

document.getElementById("formPasien").addEventListener("submit", function(e) {
    e.preventDefault();

    let nama = document.getElementById("nama").value;
    let umur = document.getElementById("umur").value;
    let diagnosa = document.getElementById("diagnosa").value;

    if (editIndex === -1) {
        dataPasien.push({ nama, umur, diagnosa });
    } else {
        dataPasien[editIndex] = { nama, umur, diagnosa };
        editIndex = -1;
    }

    localStorage.setItem("pasien", JSON.stringify(dataPasien));
    tampilData();
    this.reset();
});

function editData(index) {
    let pasien = dataPasien[index];
    document.getElementById("nama").value = pasien.nama;
    document.getElementById("umur").value = pasien.umur;
    document.getElementById("diagnosa").value = pasien.diagnosa;
    editIndex = index;
}

function hapusData(index) {
    dataPasien.splice(index, 1);
    localStorage.setItem("pasien", JSON.stringify(dataPasien));
    tampilData();
}

tampilData();