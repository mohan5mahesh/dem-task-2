async function getDate() {
  try {
    const data = await fetch(
      "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
      { method: "GET" }
    );
    const res = await data.json();
    const noofpage = Math.ceil(res.length / 10);
    const firstTenUsers = res.filter((user, index) => index < 10); //Load first ten users
    console.log(firstTenUsers);

    displaydata(firstTenUsers);
    const pagination = document.querySelector(".pagination");
    for (let i = 1; i <= noofpage; i++) {
      const page = document.createElement("button");
      page.innerText = i;
      page.onclick = function () {
        console.log("clicked...", i);
        const pageUsers = res.filter((user, index) =>
          filterUsers(index, (i - 1) * 10, i * 10)
        );
        refresusers();
        displaydata(pageUsers);
      };
      pagination.append(page);
    }
  } catch {
    console.log("error");
  }
}

function displaydata(res) {
  const user = document.createElement("div");
  user.className = "user-list";
  res.forEach((users) => {
    const contain = document.createElement("div");
    contain.className = "data";
    contain.innerHTML = `
   <h6>${users.id}</h6>
    <p>${users.name}</p>
     <p>${users.email}<p>
    `;

    user.append(contain);
  });
  document.body.append(user);
}

function refresusers() {
  document.querySelector(".user-list").remove();
}
function filterUsers(index, startIdx, endIdx) {
  return index >= startIdx && index < endIdx;
}
getDate();
