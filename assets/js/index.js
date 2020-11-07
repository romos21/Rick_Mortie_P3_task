const getBtn = document.getElementById('get-characters');
const result = document.getElementById('result-content');
const inputName = document.getElementById('name');
const pageNumber = document.getElementById('page-number');
const showNextBtn = document.getElementById('show-next');
const showPrevBtn = document.getElementById('show-prev');



async function getStatus(page = 1, name) {
    let resultArr = [];
    result.innerHTML = ``;
    console.log(page,name);
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`);
        const result = await response.json();
        result.results.forEach(el => resultArr.push(el));

        console.log(resultArr);

        if(result.info.next){
            showNextBtn.style.display='block';
        }else{
            showNextBtn.style.display='none';
        }

        if(result.info.prev) {
            showPrevBtn.style.display='block';
        }else {
            showPrevBtn.style.display='none';
        }
    } catch (err) {
        result.textContent = 'NOT FOUND!';
        result.style.color = '#fff';
        return '';
    }
    resultArr.forEach(el => {
        const root = document.createElement('div');
        root.className = "result-element";
        root.innerHTML = `
            <img src="${el.image}">
            <div>
                <div>${el.name}</div>
                <div>${el.status}</div>
                <div>${el.species}</div>
                <div>${el.gender}</div>
            </div>
        `;

        result.appendChild(root);
    })
    /*pageNumber.textContent=page.toString();*/
    return '';
}

getBtn.onclick = () => {
    pageNumber.textContent = '0';
    console.log(pageNumber.textContent);
    return getStatus(++pageNumber.textContent, inputName.value);
};

showNextBtn.onclick = () => {
    return getStatus(++pageNumber.textContent, inputName.value);
}

showPrevBtn.onclick = () => {
    return getStatus(--pageNumber.textContent, inputName.value);
}