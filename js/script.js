// SIDEBAR

function toggleSidebar(){
document.querySelector(".sidebar").classList.toggle("active")
}




// LOADING

window.onload=function(){
setTimeout(()=>{
let loading=document.getElementById("loading")
if(loading) loading.style.display="none"
},800)
}


// TOAST

function showToast(message){

let toast=document.getElementById("toastBody")

if(toast){
toast.innerHTML=message
let myToast=new bootstrap.Toast(document.getElementById("liveToast"))
myToast.show()
}

}


// HISTORY STORAGE

function saveHistory(type,data){

let history=JSON.parse(localStorage.getItem("history"))||[]

history.push({
type:type,
data:data,
time:new Date().toLocaleString()
})

localStorage.setItem("history",JSON.stringify(history))

}



// ===========================
// SOAL BBM
// ===========================

function hitungBBM(){
  let jarak = parseFloat(document.getElementById("jarak").value)
  let konsumsiMobil = parseFloat(document.getElementById("konsumsi").value)
  let hargaBensin = parseFloat(document.getElementById("harga").value)

  if(isNaN(jarak) || isNaN(konsumsiMobil) || isNaN(hargaBensin)){
    showToast("Input belum lengkap atau bukan angka")
    return
  }

  let totalLiter = jarak / konsumsiMobil
  let totalBiaya = totalLiter * hargaBensin

  document.getElementById("liter").innerHTML = totalLiter.toFixed(2) + " Liter"
  document.getElementById("biaya").innerHTML = "Rp " + totalBiaya.toLocaleString()

  saveHistory("BBM", totalBiaya)

  showToast("Perhitungan BBM berhasil")
}




// ===========================
// LAPTOP
// ===========================

function hitungLaptop(){
  let totalLaptop = parseFloat(document.getElementById("totalLaptop").value)
  let jumlahLab = parseFloat(document.getElementById("jumlahLab").value)

  if(isNaN(totalLaptop) || isNaN(jumlahLab) || jumlahLab === 0){
    showToast("Input belum lengkap atau jumlah lab 0")
    return
  }

  let laptopPerLab = Math.floor(totalLaptop / jumlahLab)
  let sisaLaptop = totalLaptop % jumlahLab

  document.getElementById("perlab").innerHTML = laptopPerLab + " Laptop"
  document.getElementById("sisa").innerHTML = sisaLaptop + " Laptop"

  saveHistory("Laptop", laptopPerLab)

  showToast("Perhitungan laptop berhasil")
}



// ===========================
// KELULUSAN
// ===========================

function cekKelulusan(){
  let nilaiUAS = parseFloat(document.getElementById("uas").value)
  let nilaiTugas = parseFloat(document.getElementById("tugas").value)
  let kehadiran = parseFloat(document.getElementById("hadir").value)

  if(isNaN(nilaiUAS) || isNaN(nilaiTugas) || isNaN(kehadiran)){
    showToast("Input nilai belum lengkap atau bukan angka")
    return
  }

  let lulus = nilaiUAS >= 70 && nilaiTugas >= 60 && kehadiran >= 75

  let status = lulus ? "LULUS" : "TIDAK LULUS"
  let warna = lulus ? "green" : "red"

  document.getElementById("statusKelulusan").innerHTML = status
  document.getElementById("statusKelulusan").style.color = warna

  saveHistory("Kelulusan", status)

  showToast("Cek kelulusan selesai")
}



// ===========================
// LOAD HISTORY
// ===========================

function loadHistory(){

let data=JSON.parse(localStorage.getItem("history"))||[]

let table=""

data.forEach((d,i)=>{

table+=`
<tr>
<td>${i+1}</td>
<td>${d.type}</td>
<td>${d.data}</td>
<td>${d.time}</td>
</tr>
`

})

let el=document.getElementById("historyData")
if(el) el.innerHTML=table

}



// SEARCH HISTORY

function searchHistory(){

let input=document.getElementById("searchHistory").value.toLowerCase()

let rows=document.querySelectorAll("#historyData tr")

rows.forEach(row=>{

let text=row.innerText.toLowerCase()

row.style.display=text.includes(input)?"":"none"

})

}



// FILTER HISTORY

function filterHistory(){

let filter=document.getElementById("filterHistory").value

let rows=document.querySelectorAll("#historyData tr")

rows.forEach(row=>{

let text=row.innerText

if(filter==="all"){
row.style.display=""
}else{
row.style.display=text.includes(filter)?"":"none"
}

})

}



// ===========================
// STATISTIK DASHBOARD
// ===========================

function getStatistik(){

let data=JSON.parse(localStorage.getItem("history"))||[]

let bbm=0
let laptop=0
let kelulusan=0

data.forEach(d=>{

if(d.type==="BBM") bbm++
if(d.type==="Laptop") laptop++
if(d.type==="Kelulusan") kelulusan++

})

return {bbm,laptop,kelulusan}

}

function logout(){

if(confirm("Yakin ingin logout?")){

localStorage.removeItem("login")

window.location="login.html"

}

}

function animateIcon(){
  const icon = document.getElementById('loginIcon');
  icon.style.transform = "rotate(20deg) scale(1.3)";
  setTimeout(() => {
    icon.style.transform = "rotate(0deg) scale(1)";
  }, 300);
}

function login(){
  animateIcon(); // panggil animasi saat klik

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if(!user || !pass){
    showToast("Username atau Password belum diisi");
    return;
  }

  if(user === "admin" && pass === "12345"){
    localStorage.setItem("login","true");
    window.location = "dashboard.html";
  }else{
    showToast("Username atau Password salah");
  }
}