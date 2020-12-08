const allSelector = {
  tHasil : document.querySelector('.info'),
  pilihan : document.querySelectorAll('li img'),
  gKomputer : document.querySelector('.img-computer'),
  menang : document.querySelector('.menang'),
  kalah : document.querySelector('.kalah'),
  tReset : document.getElementById('btnReset')
};

function getPilihanComputer() {
  let comp = Math.random();
  if (comp < 0.34) return 'gunting';
  if (comp >= 0.34 && comp < 0.67) return 'batu';
  return 'kertas';
}

function getHasil(comp, player) {
  if (player == comp) return 'SERI!';
  if (player == 'gunting') return (comp == 'batu') ? 'KALAH!' : 'MENANG!';
  if (player == 'batu') return (comp == 'gunting') ? 'MENANG!' : 'KALAH!';
  if (player == 'kertas') return (comp == 'gunting') ? 'KALAH!' : 'MENANG!';
}

function putar() {
  const gambar = ['gunting', 'batu', 'kertas'];
  const waktuMulai = new Date().getTime();
  let i = 0;
  setInterval(() => {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval;
      return;
    }
    allSelector.gKomputer.setAttribute('src', gambar[i++] + '.png');
    if (i == gambar.length) {
      i = 0;
    }
  }, 100);
}

let menang = 0;
let kalah = 0;
allSelector.tReset.addEventListener('click', function() {
  menang = 0;
  kalah = 0;
  allSelector.menang.innerHTML = menang;
  allSelector.kalah.innerHTML = kalah;
});

allSelector.pilihan.forEach(function(pil) {
  pil.addEventListener('click', function() {
    const dalamListener = {
      pilihanComputer : getPilihanComputer(),
      pilihanPlayer : pil.className
    }
    const hasil = getHasil(dalamListener.pilihanComputer, dalamListener.pilihanPlayer);
    putar();

    setTimeout(() => {
      allSelector.tHasil.innerHTML = hasil;
      allSelector.gKomputer.setAttribute('src', dalamListener.pilihanComputer + '.png');
      if (allSelector.tHasil.innerHTML == 'MENANG!') {
        menang += 1;
      } else if (allSelector.tHasil.innerHTML == 'KALAH!') {
        kalah += 1;
      }
      allSelector.menang.innerHTML = menang;
      allSelector.kalah.innerHTML = kalah;
    }, 1000);
  });
});

