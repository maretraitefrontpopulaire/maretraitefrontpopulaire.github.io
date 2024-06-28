(function main(){
  document.getElementById("pension").addEventListener("input", updateResults);

  updateResults();

  function updateResults() {
    let pension = parseFloat(document.getElementById("pension").value);
    
    if (!isNaN(pension) || pension === 0) {
      const pensionNet1 = pension * (1 - getCSGRate1(pension) * 0.985);
      const pensionNet2 = ((pension < 1649)? 1649: pension) * (1 - getCSGRate2_5(pension) * 0.985);

      const difference = (pensionNet2 - pensionNet1) * 12;

      document.querySelector(".alert").style.color =
        difference < 0 ? "#EE2C17" : "#000";

      document.getElementById("win_lose").textContent =
        difference < 0 ? "Vous cédez une partie de votre pension au plus pauvres" : "Vous avez une pension plus élevée";

      document.getElementById("pensionNet1").textContent = pensionNet1.toFixed(0);
      document.getElementById("pensionNet2").textContent = pensionNet2.toFixed(0);
      document.getElementById("difference").textContent = difference.toFixed(0);
    } else {
      document.getElementById("pensionNet1").textContent = "0";
      document.getElementById("pensionNet2").textContent = "0";
      document.getElementById("difference").textContent = "0";
    }
  }

  function getCSGRate1(pension) {
    pension = pension * 12;
    
    if (pension <= 12230) return 0;
    if (pension <= 15988) return 0.038;
    if (pension < 24813) return 0.066;
    return 0.083;
  }

  function getCSGRate2(pension) {
    pension = pension * 12;
    let impot = 0;
    let tmpPension = pension;
    let i = 0;

    let bareme = [
      [0, 0],
      [4907, 0.038],
      [13324, 0.055],
      [19287, 0.075],
      [29817, 0.092],
      [59817, 0.112],
      [79817, 0.132],
    ];

    while(tmpPension > .99 && i < bareme.length)
    {
      if (i < bareme.length - 1)
      {
        impot += Math.min(tmpPension, bareme[i+1][0]) * bareme[i][1];
        tmpPension -= Math.min(tmpPension, bareme[i+1][0]);
      }
      else
      {
        impot += tmpPension * bareme[i][1];
      }

      i++;
    }

    return impot/pension;
  }

  function getCSGRate2_5(pension) {
    let pensionAnnuelle = pension * 12;
    let impot = 0;
    let tmpPensionAnnuelle = pensionAnnuelle;
    let i = 0;
  
    let bareme = [
      [0, 0.030],
      [19788, 0.075],
      [29817, 0.092],
      [59817, 0.112],
      [79817, 0.132],
    ];

    while(tmpPensionAnnuelle > .99 && i < bareme.length)
    {
      if (i < bareme.length - 1)
      {
        impot += Math.min(tmpPensionAnnuelle, bareme[i+1][0]) * bareme[i][1];
        tmpPensionAnnuelle -= Math.min(tmpPensionAnnuelle, bareme[i+1][0]);
      }
      else
      {
        impot += tmpPensionAnnuelle * bareme[i][1];
      }

      i++;
    }

    return impot / pensionAnnuelle;
  }

  function calculatePensionAfterCSG(pension, csgRate) {
    return pension * (1 - csgRate * 0.985);
  }

  function mySubmitFunction(e) {
    e.preventDefault();
    return false;
  }
})();