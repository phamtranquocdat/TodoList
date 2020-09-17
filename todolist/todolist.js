window.onload = function () {
  const dsRaw = localStorage.getItem("danhsach");
  const danhSach = (dsRaw && JSON.parse(dsRaw)) || [];

  danhSach.forEach((item, index) => {
    const cv = item.congviec;
    let newLi = document.createElement("li");
    console.log(cv)
    newLi.textContent = cv.title;
    newLi.id = item.id; 

    newLi.onclick = () => {
      click(newLi.id);
    };


    let newBtn = document.createElement("button");
    newBtn.id = "cancel";
    newBtn.textContent = "x";
    newBtn.onclick = (event) => {
      event.stopPropagation(), Xoa(newLi.id);
    };

    cv.status && (newLi.className = "check");
    newLi.appendChild(newBtn);

    document.getElementById("ul").appendChild(newLi);
  });

  let btnAdd = document.getElementById("add");

  btnAdd.onclick = function () {
    var cv = document.getElementById("cv").value;
    if (cv != "") {
      congviec = {
        title: cv,
        status: false,
      };

      let newLi = document.createElement("li");
      newLi.textContent = cv;
      newLi.id = danhSach.length;
      danhSach.push({ id: danhSach.length, congviec });

      newLi.onclick = () => {
        click(newLi.id);
      };
      let newBtn = document.createElement("button");
      newBtn.id = "cancel";
      newBtn.textContent = "x";
      newBtn.onclick = (event) => {
        event.stopPropagation(), Xoa(newLi.id);
      };
      //newBtn.onclick = () => Xoa(newLi.id);
      newLi.appendChild(newBtn);

      document.getElementById("ul").appendChild(newLi);
    } else {
      alert("nhap noi dung");
    }
    updateLocalStorage();
  };

  updateLocalStorage = function () {
    localStorage.setItem("danhsach", JSON.stringify(danhSach));
  };

  function Xoa(index) {
    const itemIndex = danhSach.findIndex((item) => item.id == index);
    if (itemIndex === -1) return;

    danhSach.splice(itemIndex, 1);
    let ul = document.getElementById("ul");
    let li = document.getElementById(index);
    ul.removeChild(li);
    updateLocalStorage();
  }

  function click(index) {
    let li = document.getElementById(index);
    li.className = "check";

    const item = danhSach.find((item) => item.id == index);
    console.log(index)
    item && item.congviec && (item.congviec.status = true);
    console.log(danhSach)
    updateLocalStorage();
  }
};
