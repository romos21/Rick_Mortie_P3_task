const getBtn = document.getElementById('get-characters'),
    result = document.getElementById('result-content'),
    inputName = document.getElementById('name'),
    pageNumber = document.getElementById('page-number'),
    showNextBtn = document.getElementById('show-next'),
    showPrevBtn = document.getElementById('show-prev'),
    statusSelect = document.getElementById('status'),
    genderSelect = document.getElementById('gender'),
    speciesSelect = document.getElementById('species');

(async function selectInitialize(){

    let response=await fetch('https://rickandmortyapi.com/api/character');
    let result=await response.json();
    const arrayToInit=result.results;
    console.log(result);
    while(result.info.next){
        console.log(result);
        response=await fetch(result.info.next);
        result=await response.json();
        result.results.forEach(el=>arrayToInit.push(el));
    }
    let genderValues=[];
    let speciesValues=[];
    let statusValues=[];
    arrayToInit.forEach(el=>{
        if(!genderValues.includes(el.gender)){
            genderValues.push(el.gender);
        }
        if(!speciesValues.includes(el.species)){
            speciesValues.push(el.species);
        }
        if(!statusValues.includes(el.status)){
            statusValues.push(el.status);
        }
    })
    console.log(statusValues,speciesValues,genderValues);
    optionElAdd(statusValues,statusSelect);
    optionElAdd(speciesValues,speciesSelect);
    optionElAdd(genderValues,genderSelect);
}())

function optionElAdd(array,block){
    array.forEach(el=>{
        const root=document.createElement('option');
        root.textContent=el;
        block.appendChild(root);
    })
}

async function getStatus(page = 1, name,status,species,gender) {
    let resultArr = [];
    result.innerHTML = ``;
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}&status=${status}&species=${species}&gender=${gender}`);
        const result = await response.json();
        result.results.forEach(el => resultArr.push(el));

        console.log(resultArr);

        if (result.info.next) {
            showNextBtn.style.display = 'block';
        } else {
            showNextBtn.style.display = 'none';
        }

        if (result.info.prev) {
            showPrevBtn.style.display = 'block';
        } else {
            showPrevBtn.style.display = 'none';
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
    return '';
}

getBtn.onclick = () => {
    pageNumber.textContent = '0';
    return getStatus(++pageNumber.textContent, inputName.value,statusSelect.value,speciesSelect.value,genderSelect.value);
};

showNextBtn.onclick = () => {
    return getStatus(++pageNumber.textContent, inputName.value,statusSelect.value,speciesSelect.value,genderSelect.value);
}

showPrevBtn.onclick = () => {
    return getStatus(--pageNumber.textContent, inputName.value,statusSelect.value,speciesSelect.value,genderSelect.value);
}